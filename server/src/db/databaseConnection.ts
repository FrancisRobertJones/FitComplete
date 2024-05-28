import mongoose, { Connection } from 'mongoose';

class DatabaseConnection {
    private static _instance: DatabaseConnection;
    private client: Promise<typeof mongoose> | null = null;

    private constructor() {}

    static getInstance(): DatabaseConnection {
        if (!this._instance) {
            this._instance = new DatabaseConnection();
        }
        return this._instance;
    }

    async connect(): Promise<void> {
        if (!this.client) {
            this.client = mongoose.connect(process.env.DB_ENDPOINT as string, {}).then((connection) => {
                console.log('MongoDB connection established successfully');
                return connection;
            }).catch((error: mongoose.Error) => {
                console.error(`MongoDB connection failed with error: ${error.message}`);
                throw error;
            });
        }
        return this.client.then(() => {});
    }

    getConnection(): Connection {
        if (!this.client) {
            throw new Error('Database not connected. Call connect() first.');
        }
        return mongoose.connection;
    }
}

export default DatabaseConnection;