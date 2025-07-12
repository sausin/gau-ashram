import { favicons } from 'favicons';
import fs from 'fs';
import path from 'path';

const source = './public/logo_short.png';
const outDir = './dist';

const configuration = {
  path: '/',
  appName: 'Gau Samwardhan Ashram and Jankalyan Sanstha',
  appShortName: 'Gau Mandir',
  appDescription: 'Reviving India\'s ecological and cultural heritage through indigenous cow conservation, natural healing, and sustainable rural development.',
  developerName: 'Gau Samwardhan Ashram and Jankalyan Sanstha',
  developerURL: 'https://lakshyasanstha.org',
  background: '#fff',
  theme_color: '#fff',
  display: 'standalone',
  orientation: 'any',
  start_url: '/',
  version: '1.0',
  logging: true,
  online: false,
  preferOnline: false,
  icons: {
    android: true,
    appleIcon: true,
    appleStartup: false, // Disable huge startup images
    coast: false,
    favicons: true,
    firefox: false,
    windows: false, // Disable Windows tiles to save space
    yandex: false,
  },
};

(async () => {
  try {
    // Generate favicons (image processing already done by process-images.mjs)
    console.log('Generating favicons...');
    const response = await favicons(source, configuration);

    fs.mkdirSync(outDir, { recursive: true });

    response.images.forEach(image => {
      fs.writeFileSync(path.join(outDir, image.name), image.contents);
    });

    response.files.forEach(file => {
      fs.writeFileSync(path.join(outDir, file.name), file.contents);
    });

    // Inject the generated HTML into the index.html
    const indexHtmlPath = path.join(outDir, 'index.html');
    let indexHtml = fs.readFileSync(indexHtmlPath, 'utf-8');
    const htmlToInject = response.html.join('\n    ');
    indexHtml = indexHtml.replace(
      '</head>',
      `  ${htmlToInject}\n</head>`
    );
    fs.writeFileSync(indexHtmlPath, indexHtml);

    console.log('Favicons generated and injected successfully!');

  } catch (error) {
    console.error(error.message);
  }
})();
