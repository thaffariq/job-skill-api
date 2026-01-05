const authenticate = (req, res, next) => {
    const apiKey = req.headers['x-api-key'] || req.query.apiKey;
    const SECRET = process.env.API_KEY || 'tst-uas-fariq-2026';

    if (apiKey === SECRET) {
        next();
    } else {
        res.status(401).json({ success: false, error: 'Unauthorized: Invalid or Missing API Key' });
    }
};

module.exports = { authenticate };