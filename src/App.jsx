import React, { useState } from "react";

const GuessingGame = () => {
  const [randomNumber, setRandomNumber] = useState(generateRandomNumber());
  const [remainingGuesses, setRemainingGuesses] = useState(3);
  const [userGuess, setUserGuess] = useState("");
  const [message, setMessage] = useState("");
  const [gameOver, setGameOver] = useState(false);

  function generateRandomNumber() {
    return Math.floor(Math.random() * 10) + 1;
  }

  const handleGuessInput = (e) => {
    setUserGuess(e.target.value);
  };
  //Tahmini kontrol etme
  const checkGuess = () => {
    const guessNumber = parseInt(userGuess);

    if (isNaN(guessNumber) || guessNumber < 1 || guessNumber > 10) {
      setMessage(`Lütfen 1 ile 10 arasında geçerli bir sayı girin.`);
      return;
    }

    if (guessNumber === randomNumber) {
      setMessage("Tebrikler! Doğru sayıyı buldunuz!");
      endGame();
    } else {
      const newRemainingGuesses = remainingGuesses - 1;
      setRemainingGuesses(newRemainingGuesses);

      if (newRemainingGuesses === 0) {
        setMessage(`Oyunu kaybettiniz. Doğru sayı: ${randomNumber}`);
        endGame();
      } else {
        setMessage(
          guessNumber > randomNumber
            ? "Daha düşük bir sayı girin!"
            : "Daha yüksek bir sayı girin!"
        );
      }
    }

    setUserGuess("");
  };
  // Oyunu bitirme fonksiyonu
  const endGame = () => {
    setGameOver(true);
  };

  // Oyunu sıfırlama fonksiyonu
  const resetGame = () => {
    setRandomNumber(generateRandomNumber());
    setRemainingGuesses(3);
    setUserGuess("");
    setMessage("");
    setGameOver(false);
  };

  return (
    <div>
      <h1>Sayı Tahmin Oyunu</h1>
      <p>{`Kalan tahmin hakkı: ${remainingGuesses}`}</p>
      <input
        type="number"
        value={userGuess}
        onChange={handleGuessInput}
        disabled={gameOver}
        placeholder=" Bir sayı giriniz"
      />
      <button onClick={checkGuess} disabled={gameOver}>
        Tahmin Gönder
      </button>
      <p>{message}</p>
      {gameOver && <button onClick={resetGame}>Yeni Oyun Başlat</button>}
    </div>
  );
};

export default GuessingGame;
