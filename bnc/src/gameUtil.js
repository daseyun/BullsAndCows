// generate a random number of 4 digits
// cannot start with 0
// each digits must be unique
export function generateRandomNumber() {
  let validNums = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  // generate random index from validNums
  let randomIdx = Math.floor(Math.random() * validNums.length);
  // remove idx element from validNums and store it.
  let genNumber = validNums.splice(randomIdx, 1)[0];

  // 0 is now valid digit
  validNums.push(0);
  for (let i = 0; i < 3; i++) {
    randomIdx = Math.floor(Math.random() * validNums.length);
    // same as above, but push the existing element to next digit
    genNumber = genNumber * 10 + validNums.splice(randomIdx, 1)[0];
  }
  return genNumber;
}

// find bulls and cows and spit out string in format: "1A1B"
// A: bulls -- correct number && position
// B: cows -- correct number
export function determineBullsAndCows(secretNum, attempt) {
  let bulls = 0;
  let cows = 0;

  secretNum = secretNum.toString();
  attempt = attempt.toString();

  let possibleCows = [];
  for (let i = 0; i < secretNum.length; i++) {
    if (secretNum[i] === attempt[i]) {
      bulls += 1;
    } else {
      possibleCows.push(attempt[i]);
    }
  }
  for (let j = 0; j < possibleCows.length; j++) {
    if (secretNum.includes(possibleCows[j])) {
      cows += 1;
    }
  }
  return bulls + "A" + cows + "B";
}

// check if attempt was already inputted before.
export function isAlreadyAttempted(logs, attempt) {
  for (let i = 0; i < logs.length; i++) {
    if (logs[i][0] === attempt) {
      return true;
    }
  }
  return false;
}

// check if attempt is valid: 4 digits. all unique. no start with 0.
export function isAttemptProper(attempt) {
  attempt = attempt.toString();
  let set = new Set();

  // can't start with 0.
  if (attempt[0] === "0") {
    return false;
  }
  // check for unique 4 digits.
  for (let i = 0; i < attempt.length; i++) {
    if (set.has(attempt[i]) || isNaN(attempt[i])) {
      return false;
    }
    set.add(attempt[i]);
  }

  if (set.size !== 4) {
    return false;
  }

  return true;
}

// return "WIN", "LOSE", "IN PROGRESS"
export function isGameOver(logs) {
  for (let i = 0; i < 8; i++) {
    // find win condition
    if (logs[i][1] === "4A0B") {
      return "WIN";
    }
    // any entry within 8 is empty.
    if (logs[i].length === 0) {
      return "IN PROGRESS";
    }
  }
  // no win was found within 8 tries.
  return "LOSE";
}
