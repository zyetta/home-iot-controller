import mongoose from 'mongoose';

let connURI: string;
let conn: mongoose.Connection | null = null;
const connOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxPoolSize: 50,
    family: 4
};

async function getConnection(): Promise<mongoose.Connection | null> {
    console.log('Connecting to Mongo Client ...');
    connURI = process.env.CLUSTER_URI as string;
    if (!conn) conn = await mongoose.createConnection(connURI, connOptions);
    return conn;
}

export async function getConnectionToDatabase(databaseName: string): Promise<mongoose.Connection | undefined> {
    console.log(`getConnectionToDatabase: creating connection to ${databaseName}`);
    conn = await getConnection();
    if (conn) return conn.useDb(databaseName);
    return undefined;
}
