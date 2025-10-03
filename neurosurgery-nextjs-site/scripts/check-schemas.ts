import fs from "fs/promises";
import path from "path";

async function validateSchema(filePath: string): Promise<{ valid: boolean; errors: string[] }> {
  const errors: string[] = [];
  
  try {
    const content = await fs.readFile(filePath, "utf8");
    const schema = JSON.parse(content);
    
    // Check required fields for Physician schema
    if (schema["@type"] === "Physician") {
      const required = ["@context", "@type", "name", "medicalSpecialty", "address"];
      for (const field of required) {
        if (!schema[field]) {
          errors.push(`Missing required field: ${field}`);
        }
      }
      
      // Check address structure
      if (schema.address && typeof schema.address === "object") {
        const addressRequired = ["@type", "addressLocality", "addressRegion", "addressCountry"];
        for (const field of addressRequired) {
          if (!schema.address[field]) {
            errors.push(`Missing address field: ${field}`);
          }
        }
      }
    }
    
    // Check for valid JSON-LD structure
    if (!schema["@context"]) {
      errors.push("Missing @context field");
    }
    
    if (!schema["@type"]) {
      errors.push("Missing @type field");
    }
    
    return { valid: errors.length === 0, errors };
  } catch (error) {
    return { valid: false, errors: [`Invalid JSON: ${error instanceof Error ? error.message : 'Unknown error'}`] };
  }
}

async function checkAllSchemas() {
  console.log("🔍 Validating JSON-LD schemas...");
  
  const schemasDir = path.join(process.cwd(), "schemas");
  let totalFiles = 0;
  let validFiles = 0;
  let totalErrors = 0;
  
  try {
    const files = await fs.readdir(schemasDir);
    const jsonldFiles = files.filter(file => file.endsWith(".jsonld"));
    
    for (const file of jsonldFiles) {
      totalFiles++;
      const filePath = path.join(schemasDir, file);
      const result = await validateSchema(filePath);
      
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
    console.log(`   Invalid files: ${totalFiles - validFiles}`);
    console.log(`   Total errors: ${totalErrors}`);
    
    if (totalErrors > 0) {
      console.log(`\n❌ Schema validation failed with ${totalErrors} errors`);
      process.exit(1);
    } else {
      console.log(`\n✅ All schemas are valid!`);
    }
    
  } catch (error) {
    console.error("❌ Failed to read schemas directory:", error instanceof Error ? error.message : 'Unknown error');
    process.exit(1);
  }
}

checkAllSchemas().catch(console.error);
