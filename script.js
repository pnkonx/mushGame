





document.addEventListener('DOMContentLoaded', function () {
  const playButton = document.getElementById('playButton');
  const basket = document.getElementById('basket');
  const idBook = document.getElementById('idBook');
  const field = document.getElementById('field');
  const optionsContainer = document.getElementById('optionsContainer');
  const endButton = document.getElementById('endButton');
  const gameResults = document.getElementById('gameResults');
  const resetButton = document.getElementById('resetButton');
  const signBoardBlank = document.getElementById('signBoardBlank');
  const signBoardText = document.getElementById('signBoardText');

  function startGame() {
    signBoard.style.display = 'none';
      playButton.style.display = 'none';
      basket.style.display = 'block';
      idBook.style.display = 'block';
      field.style.display = 'block';
      signBoardBlank.style.display = 'block';
      signBoardText.style.display = 'block';
      endButton.style.display = 'block';
      signBoardText.innerText = 'Welcome, if you are ready to get started, start clicking in the field next to the pond!';
      console.log('yes it is working');
  }

  playButton.addEventListener('click', startGame);
});