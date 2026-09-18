const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'src', 'components');
const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('.tsx'));

files.forEach(file => {
  const filePath = path.join(componentsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace py-24 with py-16 md:py-24
  let modified = content.replace(/py-24/g, 'py-16 md:py-24');
  
  // Add transform-gpu to glass-card containers for hardware acceleration
  modified = modified.replace(/className="(.*?)glass-card(.*?)transition-all/g, 'className="$1glass-card$2transition-all transform-gpu will-change-transform');
  
  if (content !== modified) {
    fs.writeFileSync(filePath, modified, 'utf8');
    console.log(`Updated padding & GPU flags in ${file}`);
  }
});
