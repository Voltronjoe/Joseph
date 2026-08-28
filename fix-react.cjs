const fs = require('fs');

const files = [
  'src/pages/AdminLogin.tsx',
  'src/pages/Home.tsx',
  'src/pages/Login.tsx',
  'src/pages/Signup.tsx',
  'src/pages/admin/Dashboard.tsx'
];

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  if (!content.includes('import React')) {
    content = 'import React from "react";\n' + content;
  }
  fs.writeFileSync(f, content);
});
