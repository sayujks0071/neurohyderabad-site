import { db } from '../src/lib/db';
import * as fs from 'fs';
import * as path from 'path';

async function main() {
    console.log('🔌 Setting up Slack integration in database...');

    try {
        const sqlPath = path.join(process.cwd(), 'src', 'lib', 'db', 'setup_slack.sql');
        const sql = fs.readFileSync(sqlPath, 'utf8');

        // Split by statement (rudimentary split, but works for this file)
        const statements = sql
            .split(';')
            .map(s => s.trim())
            .filter(s => s.length > 0);

        for (const statement of statements) {
            console.log(`Executing: ${statement.substring(0, 50)}...`);
            await db.query(statement);
        }

        console.log('✅ Database setup complete!');
    } catch (error) {
        console.error('❌ Error setting up database:', error);
        process.exit(1);
    }
}

main();
