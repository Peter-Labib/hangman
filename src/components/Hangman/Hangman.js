import React, { useState } from "react";
import "./Hangman.css";
import { randomWord } from '../helpers/words'
import img0 from "../../img/0.jpg";
import img1 from "../../img/1.jpg";
import img2 from "../../img/2.jpg";
import img3 from "../../img/3.jpg";
import img4 from "../../img/4.jpg";
import img5 from "../../img/5.jpg";
import img6 from "../../img/6.jpg";

const Hangman = props => {
  const [gameStates, setGameStates] = useState({ guessed: new Set(), nWrong: 0 })
  const [answer, setAnswer] = useState(randomWord())

  const guessedWord = () => {
    return answer
      .split("")
      .map(ltr => gameStates.guessed.has(ltr) ? ltr : "_");
  }

  const handleGuess = (evt) => {
    const ltr = evt.target.value
    setGameStates(prev => ({
      guessed: prev.guessed.add(ltr),
      nWrong: prev.nWrong + (answer.includes(ltr) ? 0 : 1)
    }))
  }

  const generateButtons = () => {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
      <button
        key={ltr}
        value={ltr}
        onClick={handleGuess}
        disabled={gameStates.guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }

  const reset = () => {
    setGameStates({ guessed: new Set(), nWrong: 0 })
    setAnswer(randomWord())
  }

  const gameOver = gameStates.nWrong >= props.maxWrong
  const altImg = `${gameStates.nWrong}/${props.maxWrong} Guesses`
  const isWinner = guessedWord().join('') === answer
  let gameState = generateButtons()
  if (isWinner) gameState = 'You win'
  if (gameOver) gameState = `You lose: ${answer}`

  return (
    <div className='Hangman'>
      <h1>Hangman</h1>
      <img src={props.images[gameStates.nWrong]} alt={altImg} />
      <p>Gussed wrong: {gameStates.nWrong}</p>
      <p className='Hangman-word'>{gameOver ? answer : guessedWord()}</p>
      <p className='Hangman-btns'>{gameState}</p>
      <button onClick={reset} id='reset'>Reset ?</button>
    </div>
  );
}

Hangman.defaultProps = {
  maxWrong: 6,
  images: [img0, img1, img2, img3, img4, img5, img6]
}

export default Hangman;
