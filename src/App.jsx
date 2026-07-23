import { useState } from "react";
import "./App.css";
import "./page.css";

function shuffle(cards) {
  const shuffled = [...cards];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}



function Card({ card, handleClick }) {
  return (
    <div className="card">
      <img src={card.logo}>
      </img>
      <button onClick={() => handleClick(card.id)}>
        SELECT
      </button>
    </div>
  );
}

export default function App() {
  const [Cpoints, setCpoints ] = useState(0);
  const [maxP, setmaxP] = useState(0);
  const [cards, setCards] = useState([
    { id: 0, logo: 'src/assets/berlin.png', isclicked: false },
    { id: 1, logo: 'src/assets/dubai.png', isclicked: false },
    { id: 2, logo: 'src/assets/kolkata.png', isclicked: false },
    { id: 3, logo: 'src/assets/los_angeles.png', isclicked: false },
    { id: 4, logo: 'src/assets/mumbai.png', isclicked: false },
    { id: 5, logo: 'src/assets/saint_paul.png', isclicked: false },
  ]);


  function resetGame()
  {
    setCards(prevCards => prevCards.map(card => (

      {
        ...card,
        isclicked: false,
      }
    )));
    setCpoints(0);
  }

  function setmaxpoint()
  {
    setCpoints(prev => {
      const newPoints = prev + 1;

      setmaxP(prevMax => Math.max(prevMax, newPoints));

      return newPoints;
    });
  }


  function handleClick(id) {
    setCards(prevCards => {
      const clickedCard = prevCards.find(card => card.id === id);

      if (clickedCard.isclicked) {
        resetGame();
        return cards;
      }
      
      const updatedCards = prevCards.map(card =>
        card.id === id
          ? { ...card, isclicked: true }
          : card
      );
      
      setmaxpoint();
      return shuffle(updatedCards);
    });


  }

  return (
    <>
      <h2>
        Points: {Cpoints}
      </h2>
      <h2>
        Max Points: {maxP}
      </h2>
      
      <div className="cardLists">
        {cards.map(card => (
          <Card
            key={card.id}
            card={card}
            handleClick={handleClick}
          />
        ))}
      </div>
    </>
    
  );
}