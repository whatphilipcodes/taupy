import symlinkDir from 'symlink-dir';
import { join, dirname } from 'path';

const __filename = "./";
const __dirname = dirname(__filename);

const target = join(__dirname, 'src-tauri', 'target');
const link = join(__dirname, 'dist-full');

symlinkDir(target, link)
  .then(() => console.log('Symlink created successfully'))
  .catch(err => console.error('Error creating symlink:', err));