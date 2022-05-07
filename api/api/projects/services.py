from uuid import uuid4
import aiofiles
from fastapi import File, HTTPException
import aiohttp
import requests
import json
import os


async def trigger_github_event(
    project_github_remote: str,
    project_github_cwd: str,
    project_github_access_token: str,
    migration_url: str,
):
    url = f"https://api.github.com/repos/{project_github_remote}/dispatches"

    headers = requests.structures.CaseInsensitiveDict()
    headers["Accept"] = "application/vnd.github.everest-preview+json"
    headers["Content-Type"] = "application/x-www-form-urlencoded"
    headers["Authorization"] = f"token {project_github_access_token}"

    async with aiohttp.ClientSession(headers=headers) as session:
        data = json.dumps(
            {
                "event_type": "UPDATE_JAEN_DATA",
                "client_payload": {
                    "jaendata_url": migration_url,
                    "cwd": project_github_cwd,
                },
            }
        ).encode("utf-8")

        async with session.post(url, data=data) as response:
            try:
                response.raise_for_status()
            except:
                raise HTTPException(
                    status_code=response.status,
                    detail=f"Error while triggering GitHub event: {response.reason}",
                )

            return response.status


async def project_sheet_create_file(
    project_id: int,
    in_file: File,
    old_file_path: str = None,
):

    if old_file_path:
        os.remove(old_file_path)

    extention = os.path.splitext(in_file.filename)[1]

    out_dir_path = f"/data/projects/{project_id}/sheets/"
    out_file_path = f"{out_dir_path}{uuid4()}{extention}"

    os.makedirs(os.path.dirname(out_dir_path), exist_ok=True)

    async with aiofiles.open(out_file_path, 'wb') as out_file:
        content = await in_file.read()
        await out_file.write(content)

    return out_file_path

async def project_sheet_delete_file(file_path: str):
    try:
        os.remove(file_path)
    except FileNotFoundError:
        pass