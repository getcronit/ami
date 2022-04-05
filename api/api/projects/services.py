from fastapi import HTTPException
import aiohttp
import requests
import json


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
