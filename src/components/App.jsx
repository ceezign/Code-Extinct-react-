import { useState } from "react"
import { languages } from "./languages"
import clsx from "clsx";
import { getFarewellText } from "./utils";
import { getRandomWord } from "./utils";
import ReactConfetti from "react-confetti";

export default function App(){

  // state values
  const [currentWord, setCurrentWord] = useState(() => getRandomWord());
  const [guessedLetters, setGuessedLetters] = useState([])

  // derived values
  const numGuessesLeft = languages.length - 1
  const wrongGuessCount = 
    guessedLetters.filter(letter => !currentWord.includes(letter)).length

  const isGameWon = 
    currentWord.split("").every(letter => guessedLetters.includes(letter))

  const isGameLost = wrongGuessCount >= languages.length - 1

  const isGameOver = isGameWon || isGameLost

  const lastGuessLetter = guessedLetters[guessedLetters.length - 1]
  const isLastGuessIncorrect = lastGuessLetter && !currentWord.includes(lastGuessLetter)


  // static values
  const alphabet = "abcdefghijklmnopqrstuvwxyz"

  function startNewGame(){
    setCurrentWord(getRandomWord())
    setGuessedLetters([]);
  }

  function addGuessedLetter(letter){
    setGuessedLetters(prevLetters => 
      prevLetters.includes(letter) ? 
        prevLetters :
        [...prevLetters, letter]
    )
  }



  const languageElements = languages.map((lang, index) => {
    const isLanguageLost = index < wrongGuessCount
    const className = clsx("chip", isLanguageLost && "lost")
  return (<div 
  className={className}
  style={{backgroundColor: lang.backgroundColor, color: lang.color}}
  key={lang.name}
  >
    {lang.name}
  </div>
  )})


  const letterElements =  currentWord.split("").map((letter, index) => {
    const shouldReavelLetter = isGameLost || guessedLetters.includes(letter)
    const letterClassName = clsx(
      isGameLost && !guessedLetters.includes(letter) && "missed-letters"
    )
    return ( 
      <span key={index} className={letterClassName}>
        {shouldReavelLetter ? letter.toUpperCase() : "" }
      </span>
    )
  });



  const keyboardAlphabets = alphabet.split("").map((letter) => {
    const isGuessed = guessedLetters.includes(letter)
    const isCorrect = isGuessed && currentWord.includes(letter)
    const isWrong = isGuessed && !currentWord.includes(letter)
    const className = clsx({
      correct: isCorrect,
      wrong: isWrong
    })

    console.log(className)
    return (
      <button 
        className={className}
        key={letter} 
        disabled={isGameOver}
        aria-disabled={guessedLetters.includes(letter)}
        aria-label={`Letter ${letter}`}
        onClick={() =>addGuessedLetter(letter)}
      >{letter.toUpperCase()}</button>
    )
  })


  
  const gameStatusClass = clsx("game-status", {
    won: isGameWon,
    lost: isGameLost,
    farewell: !isGameOver && isLastGuessIncorrect
  })


  function renderGameStatus() {
  if (!isGameOver && isLastGuessIncorrect) {
    return (
      <>
      <p className="farewell-message">
        {getFarewellText(languages[wrongGuessCount - 1].name)}
      </p>
      </>
    )
  }


  if (isGameWon) {
    return (
      <>
        <h2>You Win!</h2>
        <p>Well Done! </p>
      </>
    )
  } 
  if (isGameLost) {
    return (
      <>
        <h2>Game over!</h2>
        <p>you lose! Better start learning PHP</p>
      </>
    )
  }

  return null
}


  return(
    <main>
      {isGameWon && <ReactConfetti recycle={false} numberOfPieces={1000} />}
      <header>
        <h1>Code Extinct</h1>
        <p>Guess the word within 8 attempts to keep the 
          programming world safe from PHP!</p>
      </header>
      <section aria-live="polite" role="status" className={gameStatusClass}> 
          { renderGameStatus() }
      </section>


      <section className="language-chips">
        {languageElements}
      </section>

      <section className="word">
        {letterElements}
      </section>

      {/* visually hidden aria-live region for status update */}
      <section className="sr-only" aria-live="polite" role="status">
        <p>
          {currentWord.includes(lastGuessLetter) ?
            `Correct! The letter ${lastGuessLetter} is in the word` :
            `Sorry, the letter ${lastGuessLetter} is not in the word`
          }
          You have {numGuessesLeft} attempts left 
        </p>
        <p>
          currentWord: {currentWord.split("").map(letter => 
          guessedLetters.includes(letter) ? letter + "." : "blank.").join(" ")}
        </p>
      </section>

      <section className="keyboard">
        {keyboardAlphabets}
      </section> 

      {isGameOver ? <button className="new-game" onClick={startNewGame}>New Game</button> : null}
    </main>
  )
}

// function renderGameStatus() {
//   if (!isGameOver) {
//     return null
//   }

//   if (isGameWon) {
//     return (
//       <>
//         <h2>You Win!</h2>
//         <p>Well Done! </p>
//       </>
//     )
//   } else {
//     return (
//       <>
//         <h2>Game over!</h2>
//         <p>you lose! Better start learning PHP</p>
//       </>
//     )
//   }
// }


// isGameOver ? (
//             isGameWon ? (
//               <>
//                 <h2>You Win!</h2>
//                 <p>Well Done! </p>
//               </> 
//             ) : (
//               <>
//                 <h2>Game over!</h2>
//                 <p>you lose! Better start learning PHP</p>
//               </>
//             )
//             ) : (null)