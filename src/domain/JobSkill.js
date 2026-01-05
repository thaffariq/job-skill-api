class JobSkill {
    constructor(data) {
        this.job_id = data.job_id;
        this.category = data.category;
        this.job_title = data.job_title;
        
        // Parsing aman untuk kolom job_skill_set
        try {
            this.job_skill_set = typeof data.job_skill_set === 'string' 
                ? JSON.parse(data.job_skill_set.replace(/'/g, '"')) 
                : data.job_skill_set;
        } catch (e) {
            // Jika gagal parse (misal format bukan array), simpan sebagai string/original
            this.job_skill_set = data.job_skill_set;
        }
    }

    toPublicFormat() {
        return {
            id: this.job_id,
            category: this.category,
            title: this.job_title,
            skills: this.job_skill_set
        };
    }
}

module.exports = JobSkill;