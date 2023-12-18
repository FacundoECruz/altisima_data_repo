import { normalizeGameData } from "./cleanData/cleanGames.js";
import { normalizedPlayersData } from "./cleanData/cleanPlayers.js";
import { addStreaks } from "./transform/addStreaks.js";

// const normalizedGames = await normalizeGameData();
const normalizedPlayers = await normalizedPlayersData();
// const playersWithStreaks = addStreaks(normalizedGames, normalizedPlayers)

console.log(normalizedPlayers)

// exportToCsv("./csv/games.csv", normalizedGames);
// exportToCsv("./csv/players.csv", playersWithStreaks);

// function exportToCsv(filePath, data) {
//   try {
//     // Obtener las columnas del encabezado
//     const headers = Object.keys(data[0]);
//     // Escribir encabezados en el archivo
//     const csvContent = [headers.join(",")];
//     // Escribir datos en el archivo
//     for (const row of data) {
//       const rowValues = headers.map((header) => row[header]);
//       csvContent.push(rowValues.join(","));
//     }
//     // Escribir en el archivo
//     fs.writeFileSync(filePath, csvContent.join("\n"));

//     console.log(`Archivo CSV creado con éxito en ${filePath}`);
//   } catch (error) {
//     console.error("Error al exportar a CSV:", error.message);
//   }
// }
