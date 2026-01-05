/**
 * JobSkill Repository Interface
 */
class JobSkillRepository {
    async findAll(limit, offset) {
        throw new Error('Method not implemented');
    }

    async findById(id) {
        throw new Error('Method not implemented');
    }

    async findByCategory(category, limit) {
        throw new Error('Method not implemented');
    }
}

module.exports = JobSkillRepository;