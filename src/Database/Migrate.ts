import fs from "fs";
import path from "path";
import sql from "./index";

interface Migration {
  migration: string;
}

const MIGRATION_DIR = path.resolve(__dirname, "../../migrations");

(async () => {
  await sql.run(`
    CREATE TABLE IF NOT EXISTS migrations (
      id INTEGER PRIMARY KEY, 
      migration TEXT,
      lastExecuted TEXT
    )
  `);

  const executed = (await sql.all<Migration>('SELECT migration FROM migrations'))
    .map((row: Migration) => row.migration);
  const migrations = fs.readdirSync(MIGRATION_DIR)
    .map(file => path.join(MIGRATION_DIR, file))
    .filter(file => executed.indexOf(file) === -1);

  for (const migration of migrations) {
    try {
      await require(migration).default(await sql.getConnection());
    } catch (err) {
      console.log(`Error running migration "${migration}"`, err);
      process.exit(0);
    }

    await sql.run(`
      INSERT INTO migrations
        (migration, lastExecuted)
        VALUES ('${migration}', '${new Date().toISOString()}')
    `);

    console.log(`SUCCESS ${migration}`);
  }

  console.log(`${migrations.length} migrations complete`);
  process.exit(0);
})();
