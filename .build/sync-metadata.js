import fs from 'fs/promises';
import TOML from '@iarna/toml';

async function main() {
  // Read metadata.json
  const metadata = JSON.parse(await fs.readFile('metadata.json', 'utf8'));

  // Update package.json
  const packageJson = JSON.parse(await fs.readFile('package.json', 'utf8'));
  packageJson.name = metadata.name.toLowerCase();
  packageJson.version = metadata.version;
  await fs.writeFile('package.json', JSON.stringify(packageJson, null, 2));

  // Update src-tauri/capabilities/default.json
  const capabilitiesPath = 'src-tauri/capabilities/default.json';
  const capabilities = JSON.parse(await fs.readFile(capabilitiesPath, 'utf8'));
  capabilities.permissions.forEach((permission) => {
    if (permission.identifier === 'shell:allow-spawn') {
      permission.allow[0].name = `../dist-back/${metadata.backend_identifier}`;
    }
  });
  await fs.writeFile(capabilitiesPath, JSON.stringify(capabilities, null, 2));

  // Update src-tauri/Cargo.toml
  const cargoPath = 'src-tauri/Cargo.toml';
  const cargoToml = TOML.parse(await fs.readFile(cargoPath, 'utf8'));
  cargoToml.package.name = metadata.name.toLowerCase();
  cargoToml.package.version = metadata.version;
  cargoToml.package.description = metadata.description;
  cargoToml.package.authors = metadata.authors;
  await fs.writeFile(cargoPath, TOML.stringify(cargoToml));

  // Update pyproject.toml
  const pyprojectPath = 'pyproject.toml';
  const pyprojectToml = TOML.parse(await fs.readFile(pyprojectPath, 'utf8'));
  pyprojectToml.tool.poetry.name = metadata.name;
  pyprojectToml.tool.poetry.version = metadata.version;
  pyprojectToml.tool.poetry.description = metadata.description;
  pyprojectToml.tool.poetry.authors = metadata.authors;
  await fs.writeFile(pyprojectPath, TOML.stringify(pyprojectToml));

  // Update src-tauri/tauri.conf.json
  const tauriConfigPath = 'src-tauri/tauri.conf.json';
  const tauriConfig = JSON.parse(await fs.readFile(tauriConfigPath, 'utf8'));
  tauriConfig.productName = metadata.name;
  tauriConfig.identifier = metadata.bundle_identifier;
  tauriConfig.version = metadata.version;
  tauriConfig.bundle.externalBin = [
    `../dist-back/${metadata.backend_identifier}`,
  ];
  // Update window title
  tauriConfig.app.windows[0].title = metadata.name;
  await fs.writeFile(tauriConfigPath, JSON.stringify(tauriConfig, null, 2));
}

main()
  .then(() => {
    console.log('Successfully synced metadata across project files');
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
