import app from './app.js';
import connectDB from './config/db.js';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server is started at port ${PORT}`);
        });

    } catch (error) {
        console.log("Server startup failed", error);
        process.exit(1);
    }
}

startServer();