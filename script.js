const playButton = document.getElementById('playButton');
  const basket = document.getElementById('basket');
  const idBook = document.getElementById('idBook');
  const field = document.getElementById('field');
  const optionsContainer = document.getElementById('optionsContainer');
  const endButton = document.getElementById('endButton');
  const gameResults = document.getElementById('gameResults');
  const resetButton = document.getElementById('resetButton');
  const signBoard = document.getElementById('signBoard');
  const signBoardBlank = document.getElementById('signBoardBlank');
  const signBoardText = document.getElementById('signBoardText');
  const topBasket = document.getElementById('topBasket');
  const bottomBasket = document.getElementById('bottomBasket');
  const basketContent = document.getElementById('basketContent');
  const resultSize = document.getElementById('resultSize');

  let displayedStatements = [];
  let mushroomCounts = {};

  const mushroomSpecies = [
    {
      name: 'Morel',
      statements: [
        'I am wrinkly and pitted',
        'I grow in old burn areas',
        'I have a cone like cap',
        'My stem is hollow and I do not have gills'
      ]
    },
    {
      name: 'Chanterelle',
      statements: [
        'I am golden to yellow in color',
        'My stem peels like string cheese',
        'I have ridges with little ridges connecting them, for gills',
        'I have a cup shaped cap'
      ]
    },
    {
      name: 'Porcini',
      statements: [
        'I have a greasy, tacky, brown cap',
        'My stem is very bulbous near the base',
        'I have pores not gills',
        'I have a classsic half moon bulbous cap'
      ]
    },
    {
      name: 'Lobster',
      statements: [
        'I am bright orange to red',
        'This happens to russula and lactarius mushrooms that have been parasitized',
        'Sometimes I look deformed and lumpy',
        'My gills often dissapear completely'
      ]
    },
    {
      name: 'Shrimp',
      statements: [
        'I have a burgundy purple cap',
        'I have red blushing up my stem',
        'I smell slightly like fish',
        'I have uniform white gills'
      ]
    }
  ];


  function startGame() {
      signBoard.style.display = 'none';
      playButton.style.display = 'none';
      basket.style.display = 'block';
      idBook.style.display = 'block';
      field.style.display = 'block';
      signBoardBlank.style.display = 'block';
      signBoardText.style.display = 'block';
      endButton.style.display = 'block';
      signBoardText.innerText = 'Welcome, if you are ready to get started, start clicking in the field!';

      topBasket.innerHTML = '';
      bottomBasket.innerHTML = '';

      console.log('yes it is working');
  
      mushroomSpecies.forEach((mushroom, index) => {
            
        // Create a div element for each mushroom name and append it to topBasket
        const nameDiv = document.createElement('div');
        nameDiv.innerText = mushroom.name;
        nameDiv.style.width = `${100 / mushroomSpecies.length}%`; // Equal width for each name
        nameDiv.style.textAlign = 'center';
        nameDiv.style.display = 'inline-block';
        nameDiv.style.marginTop = '10px';
        topBasket.appendChild(nameDiv);

        // Create a div element for each number placeholder and append it to bottomBasket
        const numberDiv = document.createElement('div');
        numberDiv.innerText = '0';
        numberDiv.style.width = `${100 / mushroomSpecies.length}%`; // Equal width for each number
        numberDiv.style.textAlign = 'center';
        numberDiv.style.display = 'inline-block';
        bottomBasket.appendChild(numberDiv);
    });
  }
  

 
function openBook() {
  page.style.display = 'block';//show idbook page
}

function closeBook(event) {
  event.stopPropagation();//stop open book function
  page.style.display = 'none';//hide idbook page
}

function checkBasket() {
  basketContent.style.display = 'block';//show basket contents
};
function closeBasket(event) {
  event.stopPropagation();//stop basket from opening
  basketContent.style.display = 'none';//hide basket contents
};



function pickMushroom() {
  signBoardText.innerText = "";// Clear the content of the signBoardText div

  // If all statements are displayed, reset the displayedStatements array
  if (displayedStatements.length === mushroomSpecies.length * 4) {
      displayedStatements = [];
  }

  let randomSpeciesIndex, randomStatementIndex, randomStatement;
  
  do {
      randomSpeciesIndex = Math.floor(Math.random() * mushroomSpecies.length);
      randomStatementIndex = Math.floor(Math.random() * mushroomSpecies[randomSpeciesIndex].statements.length);
      randomStatement = mushroomSpecies[randomSpeciesIndex].statements[randomStatementIndex];
  } while (displayedStatements.includes(`${randomSpeciesIndex}-${randomStatementIndex}`));

  displayedStatements.push(`${randomSpeciesIndex}-${randomStatementIndex}`);

  const statementDiv = document.createElement('div');
  statementDiv.innerText = randomStatement; // Update with a random statement
  statementDiv.style.marginBottom = '20px'; // Adding space below the statement

  // Append the statementDiv to the signBoardText div
  signBoardText.appendChild(statementDiv);

  const optionsContainer = document.createElement('div');
  optionsContainer.classList.add('options-container');
  optionsContainer.style.display = 'flex'; // Set display to flex for row layout
  optionsContainer.style.justifyContent = 'space-around'; // Optional: Adjust alignment

  const answerOptions = [];
  const correctSpecies = mushroomSpecies[randomSpeciesIndex].name;
  answerOptions.push(correctSpecies);

  while (answerOptions.length < 3) {
      const randomIndex = Math.floor(Math.random() * mushroomSpecies.length);
      const randomSpecies = mushroomSpecies[randomIndex].name;
      if (!answerOptions.includes(randomSpecies) && randomSpecies !== correctSpecies) {
          answerOptions.push(randomSpecies);
      }
  }

  // Shuffle the answer options randomly before displaying them
  const shuffledOptions = shuffleArray(answerOptions);

  shuffledOptions.forEach((option, index) => {
      const optionDiv = document.createElement('div');
      optionDiv.innerText = option;
      optionDiv.classList.add('option');
      optionDiv.style.marginRight = '40px';
      optionDiv.style.cursor = 'pointer';
      optionDiv.addEventListener('click', () => {
          if (option === correctSpecies) {
              const pickedShroomsToAdd = Math.floor(Math.random() * 13) + 1; // Generate random number
              const speciesName = mushroomSpecies.find(species => species.name === correctSpecies).name;

              // Check if the species exists in the counts object, initialize if not
              if (!mushroomCounts[speciesName]) {
                  mushroomCounts[speciesName] = 0;
              }

              // Add the pickedShroomsToAdd to the count of the correct species
              mushroomCounts[speciesName] += pickedShroomsToAdd;

              // Display the updated count directly without checking for '0'
              const numberDiv = bottomBasket.children[mushroomSpecies.findIndex(species => species.name === correctSpecies)];
              numberDiv.innerText = mushroomCounts[speciesName].toString();
              signBoardText.innerText = `You were able to correctly identify ${pickedShroomsToAdd} ${correctSpecies} mushrooms!`;
              console.log('pickedShroomsToAdd:', pickedShroomsToAdd);
           } else {
              // Display message for wrong answer
              signBoardText.innerText = "You were unable to correctly identify that mushroom. We do not add mushrooms we can't identify to our basket. Try again!";
          }
      });
      optionsContainer.appendChild(optionDiv); // Append options to the optionsContainer div
  });

  signBoardText.appendChild(optionsContainer); // Append optionsContainer to the signBoardText div

  // Shuffle function to randomly rearrange the options
  function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
  }
}

function endGame() {
  basket.style.display = 'none';
  idBook.style.display = 'none';
  signBoardBlank.style.display = 'none';
  resetButton.style.display = 'block';
  gameResults.style.display = 'block';
  // Clear existing content in gameResults
  gameResults.innerHTML = '<div id="resultsHeader"><h2>Here is your Basket with all the mushrooms you collected</h2></div>';
  
  /*gameResults.style.fontSize = '.7em';*/
  gameResults.style.height = '35vh';
  // Iterate through each mushroom species
  mushroomSpecies.forEach(mushroom => {
    const speciesName = mushroom.name;
    const speciesCount = mushroomCounts[speciesName] || 0;

    // Display the name and total number in the gameResults div
    gameResults.innerHTML += `<div id="${speciesName.toLowerCase()}" style="text-align: center; margin: 5px;">
      <p style="font-size: .8em; font-weight: bold;">${speciesName} Mushrooms Collected: ${speciesCount}</p>
    </div>`;
  });

}

function resetGame() {
  displayedStatements = [];
  mushroomCounts = {};
  endButton.style.display = 'none';
  basket.style.display = 'none';
   idBook.style.display = 'none';
   signBoardBlank.style.display = 'none';
   resetButton.style.display = 'none';
   gameResults.style.display = 'none';
  
  playButton.style.display = 'block';
   signBoard.style.display = 'block';
  
}
