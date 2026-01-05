const JobSkill = require('../domain/JobSkill');
const { query, queryOne } = require('./database');

class JobSkillRepositoryImpl {
    async findAll(limit = 10, offset = 0) {
        // Kolom description sengaja tidak di-select untuk optimasi STB
        const sql = 'SELECT job_id, category, job_title, job_skill_set FROM jobs LIMIT ? OFFSET ?';
        const rows = await query(sql, [limit, offset]);
        return rows.map(row => new JobSkill(row));
    }

    async findById(id) {
        const sql = 'SELECT * FROM jobs WHERE job_id = ?';
        const row = await queryOne(sql, [id]);
        return row ? new JobSkill(row) : null;
    }

    async findByCategory(category, limit = 10) {
        const sql = 'SELECT * FROM jobs WHERE category = ? LIMIT ?';
        const rows = await query(sql, [category, limit]);
        return rows.map(row => new JobSkill(row));
    }
}

module.exports = JobSkillRepositoryImpl;