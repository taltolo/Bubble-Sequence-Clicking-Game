import React, { useState, useEffect } from "react";
import "./Border.css";

const Border = () => {
  const [computersteps, setComputerSteps] = useState([]);
  const [currentstep, setCurrentSTep] = useState();
  const [userSteps, setUserSteps] = useState([]);
  const [numOfClicks, setNumOfClicks] = useState(0);
  const [stepNumber, setStepNumber] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [currenScore, setCurrenScore] = useState(0);
  const [scoreHistory, setScoreHistory] = useState([]);
  const [startGame, setStartGame] = useState(false);
  const [name, setName] = useState();

  const handleClick = (step) => {
    let randomStet = getRandomStep();

    if (computersteps?.length && step !== computersteps[stepNumber]) {
      if (!(stepNumber === numOfClicks && step === currentstep)) {
        setGameOver(true);
        return;
      }
    }

    if (step === currentstep && stepNumber === numOfClicks) {
      setComputerSteps([...computersteps, currentstep]);
      setCurrentSTep(randomStet);
      setCurrenScore(currenScore + 10);
    } else {
      setUserSteps([...userSteps, step]);
      setCurrenScore(currenScore + 10);
    }

    if (stepNumber === numOfClicks) {
      setStepNumber(0);
      setUserSteps([]);
    } else {
      setStepNumber(stepNumber + 1);
    }
  };

  useEffect(() => {
    console.log("computersteps", computersteps);
    setNumOfClicks(computersteps.length);
  }, [computersteps]);

  const getRandomStep = () => Math.floor(Math.random() * 6);

  useEffect(() => {
    let randomStet = getRandomStep();
    setCurrentSTep(randomStet);
  }, []);

  const getColor = (step) => {
    switch (step) {
      case 0:
        return "red";
      case 1:
        return "blue";
      case 2:
        return "green";
      case 3:
        return "yellow";
      case 4:
        return "pink";
      case 5:
        return "orange";
      default:
        return "inherit";
    }
  };

  const restartGame = () => {
    setComputerSteps([]);
    setUserSteps([]);
    setNumOfClicks(0);
    setStepNumber(0);
    setCurrenScore(0);
    setGameOver(false);
    setScoreHistory(getSort());
    setCurrentSTep(getRandomStep());
  };

  const getSort = () => {
    let newArray = [...scoreHistory, currenScore];
    return newArray.sort().reverse();
  };
  const play = () => {
    if (name.length) {
      setStartGame(true);
    }
  };

  if (!startGame) {
    return (
      <>
        <h1>Welcome</h1>
        <h3>please enter your name:</h3>
        <input name="name" onChange={(e) => setName(e.target.value)} />
        <div>
          <button onClick={play}>Start Game</button>
        </div>
      </>
    );
  }

  return (
    <div>
      <h1 className="headLine">
        Hi {name} | Score={!gameOver ? currenScore : 0} | step {stepNumber + 1}{" "}
        of {numOfClicks + 1} steps | Your history score:
        {scoreHistory.map((score, index) => (
          <p key={index}>{scoreHistory?.length ? 0 : score}</p>
        ))}
      </h1>
      <div style={{   display: "grid",
  gridTemplateColumns: 'auto auto auto' }}>
        {[0, 1, 2, 3, 4, 5].map((step, index) => (
            <button
              className="buble"
              onClick={() => handleClick(index)}
              style={{
                backgroundColor:
                  step === currentstep ? getColor(step) : "inherit",
              }}
            >
              {step}
            </button>
        ))}
      </div>

      {gameOver && (
        <div>
          <h1>Game Over</h1>
          <button onClick={restartGame}>Restart</button>
        </div>
      )}
    </div>
  );
};

export default Border;
