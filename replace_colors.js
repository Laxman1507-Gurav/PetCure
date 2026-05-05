const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.jsx')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('frontend/src');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/text-slate-[123]00/g, 'text-main');
  content = content.replace(/text-slate-[45]00/g, 'text-muted');
  fs.writeFileSync(file, content, 'utf8');
});

console.log('Done replacing text colors.');
