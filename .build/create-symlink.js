import symlinkDir from 'symlink-dir';
import { join, dirname } from 'path';

const [, , linkInput, targetInput] = process.argv;

if (!linkInput || !targetInput) {
  console.error('Please provide the link and target directories');
  process.exit(1);
}

const linkSegments = linkInput.replace('\\', '/').split('/');
const targetSegments = targetInput.replace('\\', '/').split('/');

const root = dirname('.');
const link = join(root, ...linkSegments);
const target = join(root, ...targetSegments);

symlinkDir(target, link)
  .then(() => console.log('symlink created successfully:', link, '->', target))
  .catch((err) => console.error('error creating symlink:', err));
