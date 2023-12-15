import { getAllPlayers } from "../db/connection.js";

export async function normalizedPlayersData(){
  const allPlayers = await getAllPlayers()
  let cleanedPlayers = []
  for(let i = 0; i < allPlayers.length; i++){
    let player = {}
    player.username = allPlayers[i].username;
    player.won = allPlayers[i].gamesWon;
    player.bestStreak = 0;
    cleanedPlayers.push(player)
  }
  return cleanedPlayers;
}