import setuptools

with open("README.md", "r", encoding="utf-8") as fh:
    long_description = fh.read()


def get_version():
    from amilatest.__version__ import version

    return version


setuptools.setup(
    name="amilatest",
    version=get_version(),
    author="Nico Schett",
    author_email="nicoschett@icloud.com",
    description="A dependency-analyzer for requirements.txt files",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/schett-net/ami",
    project_urls={
        "Bug Tracker": "https://github.com/schett-net/ami/issues",
    },
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    packages=setuptools.find_packages(),
    python_requires=">=3.6",
    entry_points={
        **{
            "console_scripts": [
                "amilatest = amilatest.cli:main",
            ]
        }
    },
    install_requires=[
        "enhancements",
        "packaging",
        "requirements-parser",
        "tabulate",
        "alive_progress",
    ],
)
