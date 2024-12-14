import fs from 'fs';
import path from 'path';

const buildDir = path.resolve('build');
const pluginDir = path.resolve('pizza-rewards');

// Create plugin directory
if (!fs.existsSync(pluginDir)) {
  fs.mkdirSync(pluginDir);
}

// Copy build files to plugin directory
fs.cpSync(buildDir, path.join(pluginDir, 'build'), { recursive: true });

// Copy PHP file to plugin directory
fs.copyFileSync('pizza-rewards.php', path.join(pluginDir, 'pizza-rewards.php'));

// Create asset manifest
const assetManifest = {
  'main.js': 'static/js/main.js',
  'main.css': 'static/css/main.css',
};

fs.writeFileSync(
  path.join(pluginDir, 'build', 'asset-manifest.json'),
  JSON.stringify(assetManifest, null, 2)
);

console.log('WordPress plugin prepared successfully!');