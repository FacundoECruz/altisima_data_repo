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

export function getHistories(gamesData){
  // sortGamesByDate()
  const playersHistories = normalizeAndRetrieveHistories(gamesData)
  console.log(playersHistories);
}

function normalizeAndRetrieveHistories(gamesData){
  let playersHistories = [];
  for(let i = 0; i < gamesData.length; i++){
    if(gamesData[i].results[0][0].history){
      let springGameHistories = springGameData(gamesData[i].results[0])
      for(let j = 0; j < springGameHistories.length; j++){
        playersHistories.push(springGameHistories[j])
      }
      playersHistories.push()
    } else{
      // let expressGameHistories = expressGameData(gamesData[i].results)
      // for(let k = 0; k < gameHistories.length; k++){
      //   playersHistories.push(gameHistories[k])
      // }
      // playersHistories.push()
      console.log("Es de express")
    }
  }
  return playersHistories;
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

function expressGameData(game){
  return "Express"
}
