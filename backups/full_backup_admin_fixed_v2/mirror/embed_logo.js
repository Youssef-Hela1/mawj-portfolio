const fs = require('fs');
const path = require('path');

const imagePath = path.join(__dirname, 'MAWJ_white.png');
const cssPath = path.join(__dirname, 'styles.css');

try {
    const imageBuffer = fs.readFileSync(imagePath);
    const base64Image = imageBuffer.toString('base64');
    const dataURI = `data:image/png;base64,${base64Image}`;

    let cssContent = fs.readFileSync(cssPath, 'utf8');

    // Regex to replace the url(...) content for mask-image
    // We target both -webkit-mask-image and mask-image
    // and both url("...") and url(...)

    // Simple replace for local file name
    const newCssContent = cssContent.replace(/url\(["']?MAWJ_white\.png["']?\)/g, `url("${dataURI}")`);

    fs.writeFileSync(cssPath, newCssContent);
    console.log('Successfully embedded base64 image into styles.css');
} catch (error) {
    console.error('Error:', error);
}
