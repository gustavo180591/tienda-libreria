import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const VERSION_STACK_PATH = join(__dirname, '..', 'version-stack.md');

function updateProgress() {
  try {
    // Read the file
    let content = readFileSync(VERSION_STACK_PATH, 'utf8');
    
    // Count total checkboxes and checked items
    const totalItems = (content.match(/- \[x\]|\[ \]/g) || []).length;
    const checkedItems = (content.match(/- \[x\]/g) || []).length;
    
    // Calculate percentage (with 0 decimal places)
    const percentage = totalItems > 0 
      ? Math.round((checkedItems / totalItems) * 100) 
      : 0;
    
    // Update the first line with the progress
    const lines = content.split('\n');
    lines[0] = `Stack Tecnológico – Versiones Recomendadas [${percentage}%]`;
    
    // Write the updated content back to the file
    writeFileSync(VERSION_STACK_PATH, lines.join('\n'));
    
    console.log(`Updated progress: ${percentage}% (${checkedItems}/${totalItems} items completed)`);
  } catch (error) {
    console.error('Error updating progress:', error.message);
    process.exit(1);
  }
}

// Run the update
updateProgress();
