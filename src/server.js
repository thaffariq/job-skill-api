require('dotenv').config();
const app = require('./app');
const { initDatabase } = require('./infrastructure/database');

const PORT = process.env.PORT || 6161;

const start = async () => {
    try {
        await initDatabase();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error('Failed to start:', err);
        process.exit(1);
    }
};

start();