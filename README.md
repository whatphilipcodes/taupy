# TauPy
This template is supposed to help with the creation of desktop applications that rely on a python backend. It uses [tauri](https://tauri.app/) for the main runtime and [react](https://react.dev/) for the frontend. The python environment is managed by [poetry](https://python-poetry.org/) and the frontend packages are managed by [pnpm](https://pnpm.io/). The project aims to be a scarce starting point to be easily transformed into the desired application.

### Features
- preset pipelines seamlessly hooking into `tauri dev` and `tauri build`
- custom port manager to handle dev and build environments
- automatic process shutdown upon exiting the application
- built-in python env management via poetry
- easy to understand folder structure

### Prerequisites
- **rust (tauri runtime)**

    for macOS use [homebrew](https://brew.sh/)
    ```bash
    brew install rustup
    ```
    for windows use [scoop](https://scoop.sh/)
    ```bash
    scoop install main/rustup
    ```
    this project was built using rust 1.82.0, feel free to try newer stable versions
    ```bash
    rustup install 1.82.0
    rustup default 1.82.0
    ```
    for more in-depth OS specific information refer to the [tauri docs](https://tauri.app/start/prerequisites/)

- **node (frontend runtime)**

    for macOS use [homebrew](https://brew.sh/)
    ```bash
    brew install node
    brew install pnpm
    ```
    for windows use [scoop](https://scoop.sh/)
    ```bash
    scoop install main/nodejs-lts
    scoop install nodejs-lts pnpm
    ```


- **python (backend runtime)**

    for macOS use [homebrew](https://brew.sh/)
    ```bash
    brew install python@3.12
    ```
    for windows use [scoop](https://scoop.sh/)
    ```bash
    scoop install python@3.12
    ```

- **poetry (py env management)**

    it is remommended to use `pipx` to install `poetry`

    `pipx`

    for macOS use [homebrew](https://brew.sh/)
    ```bash
    brew install pipx
    pipx ensurepath
    ```
    for windows use [scoop](https://scoop.sh/)
    ```bash
    scoop install pipx
    pipx ensurepath
    ```

    `poetry`

    ```bash
    pipx install poetry
    ```

### Installation

- **required**

    create the python env and install the dependencies
    ```bash
    poetry install
    ```
    dowbload the frontend dependencies
    ```bash
    pnpm install
    ````