import { getCompletedGames } from "../db/filterGames.js";

export async function normalizeGameData() {
  const games = await getCompletedGames();
  let normalizedGames = getNormalizedElements(games);
  // normalizedGames.sort(function (a, b) {
  //   return a.date - b.date;
  // });
  return normalizedGames;
}

function getNormalizedElements(games) {
  let normalizedGames = [];
  for (let i = 0; i < games.length; i++) {
    if (isSpringGame(games[i].date)) {
      games[i].results = normalizeSpringResults(
        games[i].results,
        games[i].date
      );
      for (let j = 0; j < games[i].results.length; j++) {
        normalizedGames.push(games[i].results[j]);
      }
    } else {
      let date = formatDate(games[i].date);
      games[i].results = normalizeExpressResults(games[i].results, date);
      for (let k = 0; k < games[i].results.length; k++) {
        normalizedGames.push(games[i].results[k]);
      }
    }
  }
  return normalizedGames;
}

function isSpringGame(gameDate) {
  const differentDateCriteria = 20;
  return gameDate.length < differentDateCriteria;
}

function formatDate(dateToFormat) {
  const dateObject = new Date(dateToFormat);
  const day = dateObject.getUTCDate();
  const month = (dateObject.getUTCMonth() + 1).toString().padStart(2, "0");
  const year = dateObject.getUTCFullYear();
  const hour = dateObject.getUTCHours().toString().padStart(2, "0");
  const mins = dateObject.getUTCMinutes().toString().padStart(2, "0");
  const newDate = `${day}/${month}/${year} ${hour}:${mins}`;
  return newDate;
}

// Ambas retornan el objeto results tal como va a ir en el json
// Normaliza los results de los games de Spring
function normalizeSpringResults(results, date) {
  const result = results[0]; //Es un array dentro de un array
  let response = deployHistoryAndAddDate(result, date);
  return response;
}

// Normaliza los resultados de los games de Express
function normalizeExpressResults(results, date) {
  const result = expressGameData(results);
  const final = deployHistoryAndAddDate(result, date);
  return final;
}

function deployHistoryAndAddDate(result, date) {
  let response = [];
  for (let i = 0; i < result.length; i++) {
    let player = deployHistory(result, i);
    player.date = date;
    response.push(player);
  }
  return response;
}

function deployHistory(result, i) {
  let player = {};
  player.username = result[i].username;
  player.score = result[i].score;
  const history = result[i].history;
  for (let j = 0; j < history.length; j++) {
    player["round" + (j + 1)] = history[j];
  }
  return player;
}

function expressGameData(results) {
  const firstEmptyRound = 0;
  const firstRoundWithResults = 1;
  const playersQty = results[firstEmptyRound].length;
  const totalRounds = results.length;
  let playersGameResult = [];

  generatePlayersTemplate(results, playersGameResult);
  for (let i = firstRoundWithResults; i < totalRounds; i++) {
    getRoundResultAndPutIntoHistory(results, i, playersQty, playersGameResult);
  }
  assignLastRoundScore(playersGameResult, results);
  return playersGameResult;
}

function generatePlayersTemplate(results, playersGameHistory) {
  for (let k = 0; k < results[0].length; k++) {
    let player = { username: results[0][k].username, score: 0, history: [] };
    playersGameHistory.push(player);
  }
}

function getRoundResultAndPutIntoHistory(
  results,
  i,
  playersQty,
  playersGameHistory
) {
  let round = results[i];
  for (let j = 0; j < playersQty; j++) {
    if (round[j].bidsLost === 0) {
      playersGameHistory[j].history.push(round[j].bid + 5);
    } else {
      playersGameHistory[j].history.push(-round[j].bidsLost);
    }
  }
}

function assignLastRoundScore(playersGameResult, results) {
  for (let i = 0; i < playersGameResult.length; i++) {
    playersGameResult[i].score = results[results.length - 1][i].score;
  }
}

// export function getHistories(gamesData) {
//   const playersHistories = normalizeAndRetrieveHistories(gamesData);
//   return playersHistories;
// }

// function normalizeAndRetrieveHistories(gamesData) {
//   let playersHistories = [];
//   for (let i = 0; i < gamesData.length; i++) {
//     const isSpringData = gamesData[i].results[0][0].history;
//     if (isSpringData) {
//       getSpringGamesHistories(gamesData, i, playersHistories);
//     } else {
//       getExpressGamesHistories(gamesData, i, playersHistories);
//     }
//   }
//   return playersHistories;
// }

// function getSpringGamesHistories(gamesData, i, playersHistories) {
//   let springGameHistories = springGameData(gamesData[i].results[0]);
//   for (let j = 0; j < springGameHistories.length; j++) {
//     playersHistories.push(springGameHistories[j]);
//   }
// }

// function springGameData(results) {
//   let playersGameHistory = [];
//   for (let i = 0; i < results.length; i++) {
//     let playerData = {};
//     playerData.username = results[i].username;
//     playerData.history = results[i].history;
//     playersGameHistory.push(playerData);
//   }
//   return playersGameHistory;
// }

// function getExpressGamesHistories(gamesData, i, playersHistories) {
//   let expressGameHistories = expressGameData(gamesData[i].results);
//   for (let k = 0; k < expressGameHistories.length; k++) {
//     playersHistories.push(expressGameHistories[k]);
//   }
// }
