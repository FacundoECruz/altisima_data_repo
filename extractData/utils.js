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
  const games = normalizeHistories(gamesData)
  // const playersHistoriesByGame = getPlayersHistoryPerGame(games)
  // const playersHistoriesByPlayer = groupHistoriesByPlayer(playersHistories);
}

function normalizeHistories(gamesData){
  console.log("gamesData[1]")
  console.log(gamesData[1].results)
  console.log("gamesData[33]")
  console.log(gamesData[33].results)
}

function getPlayersHistoryPerGame(games){
  let playersHistories = []
  for(let i = 0; i < games.length; i++){

  }
}

function groupHistoriesByPlayer(histories){

}