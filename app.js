import { getCompletedGames } from "./db/filterGames.js";
import { getHistories } from "./extractData/utils.js";

const games = await getCompletedGames();

getHistories(games)





