/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for (let i = 0; i < games.length; i++){


        // create a new div element, which will become the game card
        const gameCard = document.createElement('div');

        // add the class game-card to the list
        gameCard.classList.add('game-card');

        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        gameCard.innerHTML = `

            <img src="${games[i].img}" alt="${games[i].name}" class="game-img">
            <h2> ${games[i].name}</h2>
            <p>Description: ${games[i].description}</p>
            <p>Backers: ${games[i].backers}</p>
        `;

        // append the game to the games-container
        gamesContainer.appendChild(gameCard);
    }
}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContribution = GAMES_JSON.reduce((acc, game) => {
    return acc + game.backers;
}, 0);

contributionsCard.textContent = totalContribution;

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.textContent = totalContribution.toLocaleString('en-US');

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const totalAmount = GAMES_JSON.reduce((acc, game) =>{
    return acc + game.pledged;
}, 0);

raisedCard.textContent = totalAmount;

// set inner HTML using template literal
raisedCard.textContent = `$${totalAmount.toLocaleString()}`;

// Display the total number of games in the gamesCard.
// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

gamesCard.innerHTML = `${GAMES_JSON.length}`;




/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly(games) {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let unfundedGames = games.filter((game) =>{
        return game.pledged < game.goal;
    })

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);
}
//filterUnfundedOnly(GAMES_JSON);

// show only games that are fully funded
function filterFundedOnly(games) {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let fundedGames = games.filter((game) =>{
        return game.pledged >= game.goal;
    })

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(fundedGames);
}
//filterFundedOnly(GAMES_JSON);

// show all games
function showAllGames(games) {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(games);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", function() {
    filterUnfundedOnly(GAMES_JSON);
});
fundedBtn.addEventListener("click", () => filterFundedOnly(GAMES_JSON));
allBtn.addEventListener("click", () => showAllGames(GAMES_JSON));

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const gamesUnfunded = GAMES_JSON.reduce((count, game) =>{
    return count + (game.pledged < game.goal ? 1 : 0);
}, 0);

//descriptionContainer.textContent = gamesUnfunded;

// create a string that explains the number of unfunded games using the ternary operator
const raisedTotal = GAMES_JSON.reduce((total, game) =>{
    return total + game.pledged;
}, 0)

const gamesTotal = GAMES_JSON.length;

const displayStr = `A total of $${raisedTotal.toLocaleString()} has been raised  
                    for ${gamesTotal} game${gamesTotal === 1 ? '' : 's'}.
                   Currently, ${gamesUnfunded} game${gamesUnfunded === 1 ? '' : 's'} 
                   ${gamesUnfunded === 1 ? 'remains' : 'remain'} unfunded. 
                   We need your help to fund these amazing games! ^_^`;



// create a new DOM element containing the template string and append it to the description container
const paragraph = document.createElement('p');

paragraph.textContent = displayStr;

descriptionContainer.appendChild(paragraph);


/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [firstGame, secondGame, ...remainder] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
const topGame = document.createElement('p');
topGame.textContent = `${firstGame.name}`;
firstGameContainer.appendChild(topGame);

// do the same for the runner up item
const runnerUp = document.createElement('p');
runnerUp.textContent = secondGame.name;
secondGameContainer.appendChild(runnerUp);