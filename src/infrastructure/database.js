const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');

let db = null;
const DB_PATH = process.env.DB_PATH || path.join(__dirname, '../../database/jobs_skills_catalog.db');

const initDatabase = async () => {
    if (db) return db;
    const SQL = await initSqlJs();
    if (fs.existsSync(DB_PATH)) {
        const buffer = fs.readFileSync(DB_PATH);
        db = new SQL.Database(buffer);
        // Optimasi khusus STB agar hemat RAM
        db.exec('PRAGMA journal_mode = WAL; PRAGMA cache_size = -2000;');
        console.log('Database loaded successfully');
    } else {
        console.error('Database file not found at:', DB_PATH);
        db = new SQL.Database();
    }
    return db;
};

const query = async (sql, params = []) => {
    const database = await initDatabase();
    const stmt = database.prepare(sql);
    if (params.length > 0) stmt.bind(params);
    const rows = [];
    while (stmt.step()) rows.push(stmt.getAsObject());
    stmt.free();
    return rows;
};

const queryOne = async (sql, params = []) => {
    const rows = await query(sql, params);
    return rows.length > 0 ? rows[0] : null;
};

module.exports = { initDatabase, query, queryOne };