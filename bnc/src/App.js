import { useState, useEffect } from "react";
import "./App.css";
import {
  generateRandomNumber,
  isAlreadyAttempted,
  isAttemptProper,
  determineBullsAndCows,
  isGameOver,
} from "./gameUtil";
import GameOver from "./components/GameOver";
import AttemptLogs from "./components/AttemptLogs";

function App() {
  const [logs, updateLogs] = useState(Array.from(Array(8), () => []));
  const [secretNumber, _setSecretNumber] = useState(generateRandomNumber());
  const [attempt, setAttempt] = useState("");
  const [gameState, setGameState] = useState("IN PROGRESS");

  function handleInput() {
    try {
      if (!isAttemptProper(attempt)) {
        throw new Error("invalid number");
      }
      if (isAlreadyAttempted(logs, attempt)) {
        throw new Error("number already guessed");
      }

      let updatedLog = insertAttemptLog();
      updateLogs(updatedLog);
      // clear input field
      setAttempt("");
      // calculate gamestate on proper submission
      setGameState(isGameOver(updatedLog));
    } catch (error) {
      // clear input for invalid inputs as well
      setAttempt("");
    }
  }

  // insert the new attempt in most recent slot. return new log.
  function insertAttemptLog() {
    let newLog = [...logs]; // create copy
    for (let i = 0; i < 8; i++) {
      if (newLog[i].length === 0) {
        // check bulls n cows.
        // update attempts as tuple: ["1234", "1A2B"]
        newLog[i] = [attempt, determineBullsAndCows(secretNumber, attempt)];
        break;
      }
    }
    return newLog;
  }

  // update attempt as input changes.
  function handleInputChange(e) {
    setAttempt(e.target.value);
  }

  // reset the states, effectively starting a new game.
  function reset() {
    updateLogs(Array.from(Array(8), () => []));
    _setSecretNumber(generateRandomNumber());
    setAttempt("");
    setGameState("IN PROGRESS");
  }

  // handle enter to "guess" in input.
  // https://github.com/NatTuck/scratch-2021-01/blob/bea430447baec22eb1a5e41d4d1fcce0191b36a3/4550/0202/hangman/src/App.js#L58
  function keyPress(ev) {
    if (ev.key === "Enter") {
      handleInput();
    }
  }

  // when this function renders, set title
  useEffect(() => {
    document.title = "Bulls and Cows";
  }, []);

  return (
    <div className="container">
      <div className="row">
        <h1>Bulls and Cows</h1>
      </div>

      <div className="row">
        <input
          className="column column-offset-20 column-40"
          type="number"
          onKeyPress={keyPress}
          onChange={handleInputChange}
          value={attempt}
          disabled={gameState !== "IN PROGRESS" ? "disabled" : ""}
          placeholder="1234"
        ></input>
        <button
          disabled={gameState !== "IN PROGRESS" ? "disabled" : ""}
          onClick={() => handleInput()}
        >
          Guess
        </button>
        <button className="button button-outline" onClick={() => reset()}>
          Reset
        </button>
      </div>
      <div className="row">
        <AttemptLogs logs={logs} />
      </div>
      <div className="row">
        <GameOver gameState={gameState} secretNumber={secretNumber} />
      </div>
      <a
        href="https://en.wikipedia.org/wiki/Bulls_and_Cows"
        rel="noreferrer"
        target="_blank"
      >
        Bulls and Cows (Wikipedia)
      </a>
      <br />
      <a href="http://danyun.me">danyun.me</a>
    </div>
  );
}

export default App;
