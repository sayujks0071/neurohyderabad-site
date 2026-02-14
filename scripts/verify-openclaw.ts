import fs from 'fs';
import path from 'path';

async function verifyOpenClaw() {
  console.log('Verifying OpenClaw configuration...');

  try {
    const soulPath = path.join(process.cwd(), 'openclaw', 'SOUL.md');
    console.log(`Checking for SOUL.md at: ${soulPath}`);

    if (fs.existsSync(soulPath)) {
      const content = fs.readFileSync(soulPath, 'utf-8');
      console.log('✅ SOUL.md found and read successfully.');
      console.log('--- Content Preview ---');
      console.log(content.substring(0, 200) + '...');
      console.log('--- End Preview ---');

      if (content.includes("Dr. Sayuj Krishnan's expert AI Medical Assistant")) {
          console.log('✅ Content verification passed: Contains expected persona.');
      } else {
          console.error('❌ Content verification failed: Persona not found.');
          process.exit(1);
      }

    } else {
      console.error('❌ SOUL.md not found.');
      process.exit(1);
    }

  } catch (error) {
    console.error('❌ Error reading SOUL.md:', error);
    process.exit(1);
  }

  // Also check TOOLS.md
    try {
    const toolsPath = path.join(process.cwd(), 'openclaw', 'TOOLS.md');
    console.log(`Checking for TOOLS.md at: ${toolsPath}`);

    if (fs.existsSync(toolsPath)) {
      const content = fs.readFileSync(toolsPath, 'utf-8');
      console.log('✅ TOOLS.md found and read successfully.');
       if (content.includes("searchContent") && content.includes("checkAvailability")) {
          console.log('✅ Tools verification passed: Contains expected tools.');
      } else {
          console.error('❌ Tools verification failed: Expected tools not found.');
          process.exit(1);
      }
    } else {
      console.error('❌ TOOLS.md not found.');
      process.exit(1);
    }

  } catch (error) {
    console.error('❌ Error reading TOOLS.md:', error);
    process.exit(1);
  }

  console.log('🎉 OpenClaw integration verification successful!');
}

verifyOpenClaw();
