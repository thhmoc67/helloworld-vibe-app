#!/usr/bin/env node
/**
 * Ensures assets/hw-vibe points at ~/Desktop/HW vibe assets.
 * Run automatically via postinstall, or manually: npm run link:assets
 */
const fs = require('fs');
const path = require('path');
const os = require('os');

const projectRoot = path.join(__dirname, '..');
const linkPath = path.join(projectRoot, 'assets', 'hw-vibe');
const sourcePath = path.join(os.homedir(), 'Desktop', 'HW vibe assets');

function main() {
  if (!fs.existsSync(sourcePath)) {
    console.warn(
      `[link-hw-assets] Source not found: ${sourcePath}\n` +
        'Copy HW vibe assets to your Desktop or update sourcePath in scripts/link-hw-assets.js.',
    );
    process.exit(0);
  }

  if (fs.existsSync(linkPath)) {
    const stat = fs.lstatSync(linkPath);
    if (stat.isSymbolicLink()) {
      const current = fs.readlinkSync(linkPath);
      if (path.resolve(current) === path.resolve(sourcePath)) {
        console.log('[link-hw-assets] Symlink already correct.');
        return;
      }
      fs.unlinkSync(linkPath);
    } else {
      console.log('[link-hw-assets] assets/hw-vibe exists as a directory — skipping.');
      return;
    }
  }

  fs.symlinkSync(sourcePath, linkPath, 'dir');
  console.log(`[link-hw-assets] Linked ${linkPath} → ${sourcePath}`);
}

main();
