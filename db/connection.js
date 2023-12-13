import { MongoClient } from 'mongodb';

const url = "mongodb://localhost:27017";
const dbName = "backupAltisimaProduccion";

async function getAllGames() {
  const client = new MongoClient(url);

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("games");
    const games = await collection.find({}).toArray();
    return games;
  } catch (error) {
    console.error('Error al obtener todos los juegos:', error);
    throw error;
  } finally {
    await client.close();
  }
}

export { getAllGames };
