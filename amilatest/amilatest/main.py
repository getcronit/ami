from typing import Union
import requirements
import subprocess

from packaging import version

from tabulate import tabulate
from alive_progress import alive_bar
import json


class Analyzer:
    _headers = [
        "Packagename",
        "Specified",
        "Major",
        "Minor",
        "Patch",
    ]

    def __init__(
        self, path_to_requirements: str, json_output=True, include_requires_python=False
    ) -> None:
        self._path_to_requirements = path_to_requirements
        self._table = []
        self.json_output = json_output
        self.include_requires_python = include_requires_python

    def _get_file_lines_length(self) -> int:
        with open(self._path_to_requirements, "r") as fd:
            iter = requirements.parse(fd)

            return sum(1 for _ in iter)

    def _analyze(self) -> None:
        with open(self._path_to_requirements, "r") as fd:
            with alive_bar(self._get_file_lines_length()) as bar:
                for req in requirements.parse(fd):
                    bar.text(req.name)

                    try:

                        cmd = ["pip", "index", "versions", req.name]

                        if not self.include_requires_python:
                            cmd.append("--ignore-requires-python")

                        full_version_output = subprocess.check_output(
                            cmd,
                            stderr=subprocess.DEVNULL,
                        ).decode("utf-8")

                        available_versions = []

                        for line in full_version_output.splitlines():

                            if "Available versions: " in line:
                                available_versions = line.split("Available versions: ")[
                                    1
                                ].split(", ")

                        current_version = version.parse(req.specs[0][1])

                        newer_versions = [
                            version.parse(v)
                            for v in available_versions
                            if version.parse(v) > current_version
                        ]

                        latest_version = None
                        latest_minor_version = None
                        latest_patch_version = None

                        if newer_versions:

                            if newer_versions[0].major > current_version.major:
                                latest_version = str(newer_versions[0])

                            for v in newer_versions:
                                if v.major == current_version.major:
                                    if v.minor > current_version.minor:
                                        latest_minor_version = str(v)
                                        break

                            for v in newer_versions:
                                if (
                                    v.major == current_version.major
                                    and v.minor == current_version.minor
                                ):
                                    latest_patch_version = str(v)
                                    break

                        self._table.append(
                            [
                                req.name,
                                str(current_version),
                                (latest_version),
                                (latest_minor_version),
                                (latest_patch_version),
                            ]
                        )

                    except:
                        self._table.append(
                            [
                                f"{req.name} (Error)",
                                "?",
                                "?",
                                "?",
                                "?",
                            ]
                        )

                    bar()

    def analyze(self) -> Union[str, None]:
        self._analyze()

        if self.json_output:
            result = []
            for row in self._table:
                e = {}
                for i in range(len(self._headers)):
                    e[self._headers[i].lower()] = row[i]

                result.append(e)

            json_string = json.dumps(result)

            return json_string
        else:
            return tabulate(self._table, self._headers, tablefmt="pretty")
