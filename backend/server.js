require('dotenv').config();

const app = require('./src/app');
const connectDB = require('./src/config/db');
const revokedTokenModel = require('./src/models/revokedToken.model');

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        await connectDB();
        // autoIndex is disabled in production; revocation needs these indexes before serving.
        await revokedTokenModel.createIndexes();

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server; check database connectivity and revocation indexes');
        process.exit(1);
    }
}

startServer();
