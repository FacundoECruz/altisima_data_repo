import moment from "moment";

export function addStreaks(normalizedGames, normalizedPlayers) {
  //Sort by date
  normalizeDate(normalizedGames);
  normalizedGames.sort((a, b) => a.date - b.date);

  const bestStreakMap = getStreakMap(normalizedGames, "best");
  const worstStreakMap = getStreakMap(normalizedGames, "worst");
  for (let i = 0; i < normalizedPlayers.length; i++) {
    normalizedPlayers[i].bestStreak =
      bestStreakMap.get(normalizedPlayers[i].username) ?? 0;
    normalizedPlayers[i].worstStreak =
      worstStreakMap.get(normalizedPlayers[i].username) ?? 0;
  }
  return normalizedPlayers;
}

function normalizeDate(normalizedGames) {
  for (let i = 0; i < normalizedGames.length; i++) {
    const timestamp = moment(
      normalizedGames[i].date,
      "DD/M/YYYY HH:mm:ss"
    ).valueOf();
    normalizedGames[i].date = timestamp;
  }
}

function getStreakMap(normalizedGames, type) {
  const playersMap = new Map();
  normalizedGames.forEach((game) => {
    const { username } = game;
    if (!playersMap.has(username)) {
      playersMap.set(username, getValues(game));
    } else {
      playersMap.get(username).push(...Object.values(getValues(game)));
    }
  });
  getStreak(playersMap, type);
  return playersMap;
}

function getValues(game) {
  const roundValues = [];
  for (const prop in game) {
    if (game.hasOwnProperty(prop) && prop.startsWith("round")) {
      roundValues.push(game[prop]);
    }
  }
  return roundValues;
}

function getStreak(playersMap, type) {
  return playersMap.forEach((data, username) => {
    let maxStreak = 0;
    let currentStreak = 0;

    for (let j = 0; j < data.length; j++) {
      if (type === "best") {
        if (data[j] > 0) {
          currentStreak++;
          maxStreak = Math.max(maxStreak, currentStreak);
        } else {
          currentStreak = 0;
        }
      } else {
        if (data[j] < 0) {
          currentStreak++;
          maxStreak = Math.max(maxStreak, currentStreak);
        } else {
          currentStreak = 0;
        }
      }
    }
    playersMap.set(username, maxStreak);
  });
}
