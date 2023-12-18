import { getAllGames, getGamesFromJson } from "./connection.js";

export async function getCompletedGames() {
  // const allGames = await getAllGames();
  const allGames = await getGamesFromJson();
  const roundCriteriaForCompletedGame = 10;

  let completedGames = [];
  for (let i = 0; i < allGames.length; i++) {
    if (allGames[i].round === roundCriteriaForCompletedGame) {
      completedGames.push(allGames[i]);
    }
  }
  // console.log("Expected games = 35");
  // console.log(`${completedGames.length} partidas completas`);
  return completedGames;
}



