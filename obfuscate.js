import JavaScriptObfuscator from 'javascript-obfuscator';
import fs from 'fs';
import path from 'path';

const distPath = './dist';

// Recursively walk through the dist folder:
function walk(dir, callback) {
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      walk(filePath, callback);
    } else {
      callback(filePath);
    }
  });
}

// Process all .js files:
walk(distPath, filePath => {
  if (filePath.endsWith('.js')) {
    const code = fs.readFileSync(filePath, 'utf8');

    const result = JavaScriptObfuscator.obfuscate(code, {
      compact: true,
      controlFlowFlattening: true,
      controlFlowFlatteningThreshold: 1,
      simplify: true,
      stringArray: true,
      stringArrayEncoding: ['base64'],
      stringArrayThreshold: 1,
      renameGlobals: true,
      deadCodeInjection: true,
      deadCodeInjectionThreshold: 0.4,
      numbersToExpressions: true,
      shuffleStringArray: true,
      splitStrings: true,
      splitStringsChunkLength: 5,
      target: 'browser',
    });

    fs.writeFileSync(filePath, result.getObfuscatedCode(), 'utf8');
    console.log('Obfuscated:', filePath);
  }
});
