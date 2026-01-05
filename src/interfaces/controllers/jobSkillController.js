const JobSkillRepositoryImpl = require('../../infrastructure/JobSkillRepositoryImpl');
const repo = new JobSkillRepositoryImpl();

class JobSkillController {
    async getAll(req, res, next) {
        try {
            const limit = parseInt(req.query.limit) || 10;
            const page = parseInt(req.query.page) || 1;
            const offset = (page - 1) * limit;
            const category = req.query.category;

            let skills;
            if (category) {
                skills = await repo.findByCategory(category, limit);
            } else {
                skills = await repo.findAll(limit, offset);
            }
            
            res.json({ success: true, page, data: skills.map(s => s.toPublicFormat()) });
        } catch (error) { next(error); }
    }

    async getById(req, res, next) {
        try {
            const skill = await repo.findById(req.params.id);
            if (!skill) return res.status(404).json({ success: false, error: 'Not found' });
            res.json({ success: true, data: skill.toPublicFormat() });
        } catch (error) { next(error); }
    }
}

module.exports = new JobSkillController();