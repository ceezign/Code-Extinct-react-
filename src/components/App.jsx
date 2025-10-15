import { languages } from "./languages"

export default function App(){


  const languageElements = languages.map((lang) => (
  <div 
  className="chip" 
  style={{backgroundColor: lang.backgroundColor, color: lang.color}}
  key={lang.name}
  >
    {lang.name}
  </div>
  ))

  return(
    <main>
      <header>
        <h1>Code Extinct</h1>
        <p>Guess the word within 8 attempts to keep the 
          programming world safe from Assembly!</p>
      </header>
      <section className="game-status"> 
          <h2>You Win!</h2>
          <p>restart the game</p>
      </section>


      <section className="language-chips">
        {languageElements}
      </section>
    </main>
  )
}