import { MongoClient } from "mongodb";
import fs from "fs";

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
    console.error(`Error al obtener todos los ${collection}:`, error);
    throw error;
  } finally {
    await client.close();
  }
}

async function getAllPlayers() {
  const client = new MongoClient(url);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("players");
    const games = await collection.find({}).toArray();
    return games;
  } catch (error) {
    console.error(`Error al obtener todos los ${collection}:`, error);
    throw error;
  } finally {
    await client.close();
  }
}

async function getGamesFromJson() {
  const filePath = "../altisima_produccion_db_backups/13-12-23/games.json";
  const games = await fs.promises
    .readFile(filePath, "utf8")
    .then((data) => {
      try {
        const gamesData = JSON.parse(data);
        return gamesData;
      } catch (error) {
        console.error("Error al analizar el JSON:", error.message);
      }
    })
    .catch((err) => console.error("Error al leer el archivo:", err));
  return games;
}

async function getPlayersFromJson(){
  const filePath = "../altisima_produccion_db_backups/13-12-23/players.json";
  const players = await fs.promises
    .readFile(filePath, "utf8")
    .then((data) => {
      try {
        const playersData = JSON.parse(data);
        return playersData;
      } catch (error) {
        console.error("Error al analizar el JSON:", error.message);
      }
    })
    .catch((err) => console.error("Error al leer el archivo:", err));
  return players;
}

export { getAllGames, getAllPlayers, getGamesFromJson, getPlayersFromJson };
