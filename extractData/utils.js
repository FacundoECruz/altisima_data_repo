// Todas las funciones de este modulo reciben un array de games

// Devuelve un array con las fechas de todas las partidas
// Imprime en pantalla si la cantidad de partidas y fechas difiere
export function getDates(games){
  let dates = []
  for(let i = 0; i < games.length; i++){
    dates.push(games[i].date)
  }
  if(games.length !== dates.length){
    console.log("La cantidad de fechas difiere de la cantidad de partidas")
  }
  return dates;
}

// export function sortGamesByDate(){}

export function getHistories(gamesData){

  const playersHistories = normalizeAndRetrieveHistories(gamesData)
  console.log(playersHistories);
}

function normalizeAndRetrieveHistories(gamesData){
  let playersHistories = [];
  for(let i = 0; i < gamesData.length; i++){
    if(gamesData[i].results[0][0].history){
      getSpringGamesHistories(gamesData, i, playersHistories);
    } else{
      getExpressGamesHistories(gamesData, i, playersHistories);
    }
  }
  return playersHistories;
}

function getSpringGamesHistories(gamesData, i, playersHistories) {
  let springGameHistories = springGameData(gamesData[i].results[0]);
  for (let j = 0; j < springGameHistories.length; j++) {
    playersHistories.push(springGameHistories[j]);
  }
}

function springGameData(results){
  let playersGameHistory = [];
  for(let i = 0; i < results.length; i++){
    let playerData = {};
    playerData.username = results[i].username;
    playerData.history = results[i].history;
    playersGameHistory.push(playerData)
  }
  return playersGameHistory;
}

function getExpressGamesHistories(gamesData, i, playersHistories) {
  let expressGameHistories = expressGameData(gamesData[i].results);
  for (let k = 0; k < expressGameHistories.length; k++) {
    playersHistories.push(expressGameHistories[k]);
  }
}

function expressGameData(results){
  const playersQty = results[0].length;
  const totalRounds = results.length
  let playersGameHistory = []

  for(let k = 0; k < results[0].length; k++){
    let player = {username: results[0][k].username, history: []}
    playersGameHistory.push(player)
  }

  for(let i = 1; i < totalRounds; i++){
    let round = results[i];
    for(let j = 0; j < playersQty; j++){
      if(round[j].bidsLost === 0){
        playersGameHistory[j].history.push(round[j].bid + 5)
      } else {
        playersGameHistory[j].history.push(-round[j].bidsLost)
      }
    }
  }

  return playersGameHistory;
}
