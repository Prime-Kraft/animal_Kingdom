import { useState } from 'react'

import { animals } from './animals'

import{ clsx }  from "clsx"

export default function App() {

  // state values
  const [currentWord, setCurrentWord] = useState("Elephant")

  const [playerGuessArray, setPlayerGuessArray] = useState([])

  const [wrongGuessCount, setWrongGuessCount] = useState(0)

  const alphabet = "abcdefghijklmnopqrstuvwxyz"


  const isWonx = currentWord.toUpperCase().split("").every((letter) => {
    return  playerGuessArray.includes(letter)
  })

//
  const isLost = wrongGuessCount >= 9

  const isGameOver = isWonx || isLost



  function getPlayerGuess(letter) {
    setPlayerGuessArray(prevItem => {
    return !prevItem.includes(letter)? [...prevItem, letter]: prevItem
  })
  }

  const correctGuessArray =   playerGuessArray.filter((item) => {
    return currentWord.toUpperCase().split("").includes(item)


  })



  // here transform  currentword into each letter to be a span element
  // Transform currentWord into individual letter spans
  const letterElement = currentWord.toUpperCase().split("").map((letter, index) => {
      const isAmongGuess = playerGuessArray.includes(letter)

      const isGameOverGuess = isGameOver || isAmongGuess



      const st = clsx("letter-span", {
          redText: isGameOver &&  !playerGuessArray.includes(letter)
      })

      return (
          <span key={index} className={st}>
              {isGameOverGuess ? letter : ""}
          </span>
      )
  })

  const buttonKeyElements = alphabet.toUpperCase().split("").map((letter, index) => {

    const isGuessed = playerGuessArray.includes(letter)

    const isCorrect = isGuessed && correctGuessArray.includes(letter)

    const isWrong = isGuessed && !correctGuessArray.includes(letter)




    const btnStyle = clsx("key-btn", { correct: isCorrect, wrong: isWrong })



    return <button key={index} onClick={() => getPlayerGuess(letter)} className={btnStyle}  > {letter}</button>
  })










  const animalElements = animals.map((animal, index) => {
    const spanStyle = {
      backgroundColor: animal.backgroundColor,
      color: animal.color,
    }
    const wrongGuessArray = playerGuessArray.filter((letter) => {
      return !correctGuessArray.includes(letter)
    })

  const  wrongGuessCount =  wrongGuessArray.length

  setWrongGuessCount(wrongGuessCount)
    const killAnimal = index < wrongGuessCount



    const animalKillClassName = clsx("span-container", {animalKill: killAnimal})

    return <span key={index} className={animalKillClassName} style={spanStyle}> {animal.name}</span>
  })

  function renderGameStatus() {

    if (isLost) {
      return (
        < div className='lost-status' > <h3> Game Over!</h3>
        <p> You lose! You have failed all the Animals, All their blood will be on you  😭 </p>
        </div >
      )
    }

    else if (isWonx) {
      return (
        < div className='win-status' > <h3> You win!</h3>
      <p> Well done! 🎉, The Animal Kingdom is so proud of you for rescusing them  </p>
     </div >
     )
    }
  }

  function handleNewGame() {

  }


  return (
    <>
      <main className='main-container'>
        <header className='header-container'>
          <h1> Save the Animal Kingdom</h1>
          <p> Guess the word in under 8 attempts to keep the animal world safe from
            potchers!</p>
        </header>
        <section className='game-status'>
          <>

           {renderGameStatus()}
          </>
        </section>
        <section className='animals-span'>
          {animalElements}
        </section>
        <section className='letters-container'>
          {letterElement}
        </section>
        <section className='key-container'>
          {buttonKeyElements}
        </section>
        <section>
         {isGameOver? <button onClick={handleNewGame} className='new-btn'>
            New Game </button>: null }
        </section>
      </main>

    </>
  )
}
