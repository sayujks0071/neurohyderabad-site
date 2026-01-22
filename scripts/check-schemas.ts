const fs = require('fs');
const path = require('path');

function validateSchema(filePath) {
  const errors = [];
  try {
    const content = fs.readFileSync(filePath, "utf8");
    const schema = JSON.parse(content);
    
    if (schema["@type"] === "Physician") {
      const required = ["@context", "@type", "name", "medicalSpecialty", "address"];
      for (const field of required) {
        if (!schema[field]) errors.push(`Missing required field: ${field}`);
      }
      if (schema.address && typeof schema.address === "object") {
        const addressRequired = ["@type", "addressLocality", "addressRegion", "addressCountry"];
        for (const field of addressRequired) {
          if (!schema.address[field]) errors.push(`Missing address field: ${field}`);
        }
      }
    }
    
    if (!schema["@context"]) errors.push("Missing @context field");
    if (!schema["@type"]) errors.push("Missing @type field");
    
    return { valid: errors.length === 0, errors };
  } catch (error) {
    return { valid: false, errors: [`Invalid JSON: ${error.message}`] };
  }
}

function checkAllSchemas() {
  console.log("🔍 Validating JSON-LD schemas...");
  const schemasDir = path.join(process.cwd(), "schemas");
  let totalFiles = 0;
  let validFiles = 0;
  let totalErrors = 0;
  
  try {
    const files = fs.readdirSync(schemasDir);
    const jsonldFiles = files.filter(file => file.endsWith(".jsonld"));
    
    for (const file of jsonldFiles) {
      totalFiles++;
      const filePath = path.join(schemasDir, file);
      const result = validateSchema(filePath);
      
      if (result.valid) {
        validFiles++;
        console.log(`✅ ${file}`);
      } else {
        totalErrors += result.errors.length;
        console.log(`❌ ${file}`);
        result.errors.forEach(error => console.log(`   - ${error}`));
      }
    }
    
    console.log(`\n📊 Schema Validation Results:`);
    console.log(`   Total files: ${totalFiles}`);
    console.log(`   Valid files: ${validFiles}`);
    console.log(`   Total errors: ${totalErrors}`);
    
    if (totalErrors > 0) {
      console.log(`\n❌ Schema validation failed with ${totalErrors} errors`);
      process.exit(1);
    } else {
      console.log(`\n✅ All schemas are valid!`);
    }
    
  } catch (error) {
    console.error("❌ Failed to read schemas directory:", error.message);
    process.exit(1);
  }
}

checkAllSchemas();
