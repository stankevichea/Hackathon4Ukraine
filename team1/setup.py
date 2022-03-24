#!/usr/bin/env python

"""The setup script."""

from setuptools import setup, find_packages

with open("README.md") as readme_file:
    readme = readme_file.read()


with open("requirements.txt") as f:
    requirements = f.readlines()

setup(
    author="Paulina, Michal and Mykyta",
    author_email="mykytamakarov@gmail.com",
    python_requires=">=3.6",
    classifiers=[
        "Development Status :: 2 - Pre-Alpha",
        "Intended Audience :: Developers",
        "Natural Language :: English",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.6",
        "Programming Language :: Python :: 3.7",
        "Programming Language :: Python :: 3.8",
    ],
    description="Bot for QA",
    install_requires=requirements,
    long_description=readme,
    include_package_data=True,
    keywords="help_ua_bot",
    name="help_ua_bot",
    packages=find_packages(include=["help_ua_bot", "help_ua_bot.*"]),
    version="0.1.0",
)
