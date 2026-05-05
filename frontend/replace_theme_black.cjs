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
    
    // Replace zinc with pure black or white equivalents
    let newContent = content
      .replace(/bg-zinc-(800|900|950)/g, 'bg-black')
      .replace(/bg-zinc-[1-7]00/g, 'bg-white')
      .replace(/text-zinc-(300|400|500)/g, 'text-white/80')
      .replace(/text-zinc-[6-9]00/g, 'text-black')
      .replace(/border-zinc-[0-9]+/g, 'border-white/20')
      .replace(/shadow-zinc-[0-9]+/g, 'shadow-white/10')
      .replace(/from-zinc-[0-9]+/g, 'from-black')
      .replace(/via-zinc-[0-9]+/g, 'via-black/50')
      .replace(/to-zinc-[0-9]+/g, 'to-transparent');
      
    if (content !== newContent) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log('Updated: ' + filePath);
    }
  }
});
