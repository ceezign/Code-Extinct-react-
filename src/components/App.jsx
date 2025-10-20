import { useState } from "react"
import { languages } from "./languages"
import clsx from "clsx";

export default function App(){

  // state values
  const [currentWord, setCurrentWord] = useState("react");
  const [guessedLetters, setGuessedLetters] = useState([])

  // derived values
  const wrongGuessCount = 
    guessedLetters.filter(letter => !currentWord.includes(letter)).length
  console.log(wrongGuessCount)

  const isGameWon = 
    currentWord.split("").every(letter => guessedLetters.includes(letter))

  const isGameLost = wrongGuessCount >= languages.length - 1

  const isGameOver = isGameWon || isGameLost
  


  // static values
  const alphabet = "abcdefghijklmnopqrstuvwxyz"

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

  const letterElements =  currentWord.split("").map((letter, index) => (
    <span key={index}>{guessedLetters.includes(letter)  ? 
                      letter.toUpperCase() : " " }</span>
  ))



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
        onClick={() =>addGuessedLetter(letter)}
      >{letter.toUpperCase()}</button>
    )
  })

  const gameStatusClass = clsx("game-status", {
    won: isGameWon,
    lost: isGameLost
  })


  return(
    <main>
      <header>
        <h1>Code Extinct</h1>
        <p>Guess the word within 8 attempts to keep the 
          programming world safe from Assembly!</p>
      </header>
      <section className={gameStatusClass}> 
          { isGameOver ? (
            isGameWon ? (
              <>
                <h2>You Win!</h2>
                <p>Well Done! </p>
              </> 
            ) : (
              <>
                <h2>Game over!</h2>
                <p>you lose! Better start learning PHP</p>
              </>
            )
            ) : (null)
          }
      </section>




      <section className="language-chips">
        {languageElements}
      </section>

      <section className="word">
        {letterElements}
      </section>

      <section className="keyboard">
        {keyboardAlphabets}
      </section>

      {isGameOver ? <button className="new-game">New Game</button> : null}
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