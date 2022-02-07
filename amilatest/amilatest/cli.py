from amilatest.main import Analyzer
from argparse import ArgumentParser


def main() -> None:
    parser = ArgumentParser(
        description="A dependency-analyzer for requirements.txt files",
        allow_abbrev=False,
    )

    parser.add_argument(
        "-r",
        "--requirements",
        dest="requirements_file",
        default="./requirements.txt",
        help="Path to requirements.txt file",
    )

    parser.add_argument(
        "-j",
        "--json",
        dest="json_output",
        default=False,
        help="Output in JSON format",
        action="store_true",
    )

    parser.add_argument(
        "--include-requires-python",
        dest="include_requires_python",
        help="Include the Requires-Python information to analyze based on the current Python version",
        action="store_true",
    )

    args = parser.parse_args()

    requirements_file_path = args.requirements_file

    output = Analyzer(
        requirements_file_path,
        args.json_output,
        include_requires_python=args.include_requires_python,
    ).analyze()

    print(output)
