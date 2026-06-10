const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../../src');

function findFiles(dirPath, arrayOfFiles) {
  files = fs.readdirSync(dirPath);

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = findFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, "/", file));
    }
  });

  return arrayOfFiles;
}

const allFiles = findFiles(dir, []).filter(f => f.endsWith('.tsx') || f.endsWith('.ts'));

allFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  if (content.includes('Đ')) {
    // Determine the relative path to src/components/DirhamIcon
    const fileDir = path.dirname(file);
    const componentsDir = path.join(__dirname, '../../src/components');
    let relPath = path.relative(fileDir, componentsDir).replace(/\\/g, '/');
    if (relPath === '') relPath = '.';
    if (!relPath.startsWith('.')) relPath = './' + relPath;
    const importPath = `${relPath}/DirhamIcon`;
    
    // Add import if not present
    if (!content.includes('DirhamIcon') && file.endsWith('.tsx')) {
      const lastImportIndex = content.lastIndexOf('import ');
      if (lastImportIndex !== -1) {
        const endOfLastImport = content.indexOf('\n', lastImportIndex);
        content = content.slice(0, endOfLastImport + 1) + `import DirhamIcon from '${importPath}';\n` + content.slice(endOfLastImport + 1);
      } else {
        content = `import DirhamIcon from '${importPath}';\n` + content;
      }
    }

    // Replace Đ based on context
    // In JSX text nodes or spans
    content = content.replace(/<span>Đ<\/span>/g, '<DirhamIcon />');
    content = content.replace(/>Đ /g, '><DirhamIcon className="w-[0.9em] h-[0.9em] inline-block align-baseline mr-1" />');
    content = content.replace(/ Đ /g, ' <DirhamIcon className="w-[0.9em] h-[0.9em] inline-block align-baseline mr-1" /> ');
    
    // In template literals like `Đ ${price}` -> `<DirhamIcon /> ${price}` 
    // Wait, in template literals it's usually inside JSX.
    // If it's pure string like in translations: 'Price (Đ)' -> we can't use React component in string.
    // For translations, maybe keep Đ or use AED? The user asked to put the image. In text like translation, we might have to use Đ or change it to React node.
    // Let's replace 'Đ ' in template literals if it's inside JSX, but if it's returning a string (like in alert or notes), it will break.
    // Let's do selective replacement for now.
    
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
