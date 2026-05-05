const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

walkDir('./src', function(filePath) {
  if (filePath.endsWith('.jsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace text variables with explicit colors
    content = content.replace(/text-main/g, 'text-black');
    content = content.replace(/text-muted/g, 'text-gray-800');
    
    // Replace overlay gradients in auth pages
    content = content.replace(/bg-gradient-to-t from-black\/10 via-black\/10 to-transparent/g, 'bg-black/40');
    
    // Replace subtle white borders/backgrounds used in dark mode
    content = content.replace(/bg-white\/5(?!0)/g, 'bg-gray-50');
    content = content.replace(/border-white\/10(?!0)/g, 'border-gray-200');
    
    if (content !== fs.readFileSync(filePath, 'utf8')) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Updated explicit light classes in: ' + filePath);
    }
  }
});
