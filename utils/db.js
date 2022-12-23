import mongoose from 'mongoose';

const connection = {};

async function connect() {
	if (connection.isConnected) {
		console.log('Already connected');
		return;
	}
	if (mongoose.connections.length > 0) {
		connection.isConnected = mongoose.connections[0].readyState;
		if (connect.isConnected === 1) {
			console.log('Connection already exist');
			return;
		}
		// Disconnect becuase it's not in connected mode
		await mongoose.disconnect();
	}
	const db = await mongoose.connect(process.env.MONGODB_URI);
	console.log('New connection');
	connection.isConnected = db.connections[0].readyState;
}

async function disconnect() {
	if (connection.isConnected) {
		if (process.env.NODE_ENV === 'production') {
			await mongoose.disconnect();
			connection.isConnected = false;
		} else {
			console.log('Not disconnected');
		}
	}
}

function convertDoctoObj(doc) {
	doc._id = doc._id.toString();
	doc.createdAt = doc.createdAt.toString();
	doc.updatedAt = doc.updatedAt.toString();
	return doc;
}

const db = { connect, disconnect, convertDoctoObj };
export default db;
