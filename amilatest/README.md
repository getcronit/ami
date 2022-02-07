# Foobar

AmiLATEST is a dependency checker for your python project. It is a tool to help you find outdated dependencies, and generate a report that suggests upgrade possibilities at major, minor, and patch levels.

AmiLATEST can be used as CLI or as a library.

## Installation

Use the package manager [pip](https://pip.pypa.io/en/stable/) to install amilatest.

```bash
pip install amilatest
```

## Usage as CLI

The CLI is a simple command line interface to AmiLATEST.
For basic usage, simply run `amilatest` within your project directory (where your `requirements.txt` is located). It will then check all those dependencies and generate a report.

```bash
amilatest
```

By default the report is displayed on the terminal as a table. If you want to see the report in a processable format, you can use the `--json` flag.

```bash
amilatest --json
```

## Usage as library

AmiLATEST can also be integrated into your project as a library. To do so, you need to import `Analyzer` class from the `amilatest` module.

```python
from amilatest import Analyzer

a = Analyzer('./requirements.txt')

json_output = a.analyze()
```

# Limitations

- Currently AmiLATEST depends on the `pip index` command, which comes with pip version 22 or higher.
- Editable requirements are not supported, so you can't use `--editable` flag. When using `pip freeze`, you must
  use the `--exclude-editable` flag to get rid of the editable requirements.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
