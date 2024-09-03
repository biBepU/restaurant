const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'backend', 'src', 'public');

// Create the public directory if it doesn't exist
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}
