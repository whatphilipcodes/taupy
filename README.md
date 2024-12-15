<h1><img src="./public/taupy.svg" alt="logo" width="80" align="center"/>&nbsp;&nbsp;&nbsp;TauPy</h1>

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
    download the frontend dependencies
    ```bash
    pnpm install
    ````

### Debugging
Be aware that even though running the `dev command` will put executable files into the `./src-tauri/target/debug` directory, these artifacts cannot be run.
To generate an actual usable debug build in that location, run the `debug-build` command first. For more information on debugging in Tauri in general refer to the [tauri docs](https://tauri.app/develop/debug/).

### Template Sync
This repo includes an automatic sync workflow running as a cron job (once every day at 00:00h per default) using the [template-sync](https://github.com/marketplace/actions/actions-template-sync) action. For this to work correctly, in your repository settings, you have to enable 'Allow GitHub Actions to create and approve pull requests' under `Actions > General`. This feature is entirely optional and if you don't want to keep the template updated just remove `.github/workflows/template-sync.yml`.

### Disclaimer
As I am only getting started with Rust, Tauri and writing desktop applications in general, I cannot guarantee the security of this template. If you find any security issues, please report them in the `issues` section, prefably with a PR attached, and I will do my best to incorporate the changes. Any other suggestions or ideas on how to improve this template are also welcome.
