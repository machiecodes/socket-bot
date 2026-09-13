const Database = require("better-sqlite3");

const db = new Database("../memory.db");
db.pragma('journal_mode = WAL');


