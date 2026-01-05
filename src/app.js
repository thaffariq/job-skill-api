const express = require('express');
const cors = require('cors');
const compression = require('compression');
const jobSkillRoutes = require('./interfaces/routes/jobSkillRoutes');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(compression());
app.use(express.json());

// Manual API Documentation Endpoint
app.get('/', (req, res) => {
    res.json({
        name: 'Job-Skill Requirements API',
        version: '1.0.0',
        description: 'Layanan Katalog Keahlian untuk UAS TST',
        auth: 'X-API-Key header required',
        endpoints: {
            health: 'GET /api/health',
            list_skills: 'GET /api/skills?limit=10&page=1',
            detail_skill: 'GET /api/skills/:id'
        }
    });
});

app.use('/api', jobSkillRoutes);

// Menangani 404 dan Error Global agar respon selalu JSON
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;