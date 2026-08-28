const fs = require('fs');

const files = [
  'src/pages/Home.tsx',
  'src/pages/Chat.tsx',
  'src/pages/Nearby.tsx',
  'src/pages/Verify.tsx',
  'src/pages/Categories.tsx',
  'src/pages/About.tsx',
  'src/pages/AdminLogin.tsx',
];

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  
  // Safely replace without double applying
  const replace = (regex, replacement) => {
    content = content.replace(regex, (match) => {
      if (match.includes('dark:')) return match;
      return replacement;
    });
  };

  replace(/\bbg-white\b(?! dark:bg-slate-950)/g, 'bg-white dark:bg-slate-950');
  replace(/\bbg-slate-50\b(?! dark:bg-slate-900)/g, 'bg-slate-50 dark:bg-slate-900');
  replace(/\bbg-slate-100\b(?! dark:bg-slate-800)/g, 'bg-slate-100 dark:bg-slate-800');
  
  replace(/\btext-slate-900\b(?! dark:text-white)/g, 'text-slate-900 dark:text-white');
  replace(/\btext-slate-800\b(?! dark:text-slate-200)/g, 'text-slate-800 dark:text-slate-200');
  replace(/\btext-slate-600\b(?! dark:text-slate-400)/g, 'text-slate-600 dark:text-slate-400');
  replace(/\btext-slate-500\b(?! dark:text-slate-400)/g, 'text-slate-500 dark:text-slate-400');
  
  replace(/\bring-slate-200\b(?! dark:ring-slate-800)/g, 'ring-slate-200 dark:ring-slate-800');
  replace(/\bborder-slate-200\b(?! dark:border-slate-800)/g, 'border-slate-200 dark:border-slate-800');
  replace(/\bborder-slate-100\b(?! dark:border-slate-800)/g, 'border-slate-100 dark:border-slate-800');

  fs.writeFileSync(f, content);
});
