// Define your story objects with text, choices, consequences, and images
const story = [
    {
        text: "You find yourself in a dark castle.",
        choices: ["Explore the castle", "Try to find a way out"],
        consequences: [1, 2],
        image: "castle1.jpg"
    },
    {
        text: "You venture deeper into the castle and discover a treasure chest.",
        choices: ["Open the chest", "Leave it and continue exploring"],
        consequences: [3, 4],
        image: "treasure.jpg"
    },
    {
        text: "You find yourself trapped in the castle with no way out.",
        choices: ["Keep searching for an exit", "Accept your fate"],
        consequences: [1, 7],
        image: "trapped.jpg"
    },
    {
        text: "You open the chest and find a pile of gold coins.",
        choices: ["Take the gold", "Leave it and continue exploring"],
        consequences: [6, 1],
        image: "gold.jpg"
    },
    {
        text: "You decide to leave the treasure and continue exploring the castle.",
        choices: ["Explore the castle", "Try to find a way out"],
        consequences: [1, 2],
        image: "castle.jpg"
    },
    {
        text: "You search for an exit and finally find daylight. You've escaped the castle!",
        choices: [],
        consequences: [],
        image: "escape.jpg"
    },
    {
        text: "You take the gold and become rich, but the castle collapses, trapping you inside forever.",
        choices: [],
        consequences: [],
        image: "trapped_forever.jpg"
    },
    {
        text: "You accept your fate and remain trapped in the castle forever.",
        choices: [],
        consequences: [],
        image: "trapped_forever.jpg"
    },
    {
        text: "You open the chest, but it's a trap! You're poisoned and die.",
        choices: [],
        consequences: [],
        image: "poisoned.jpg"
    },
    {
        text: "You take the gold and make a daring escape just before the castle collapses. You're rich and safe!",
        choices: [],
        consequences: [],
        image: "rich_escape.jpg"
    },
    {
        text: "You find a hidden passage that leads to a secret world. You live happily ever after.",
        choices: [],
        consequences: [],
        image: "secret_world.jpg"
    },
    {
        text: "You enter a dark forest.",
        choices: ["Explore the forest", "Try to find a way back"],
        consequences: [11, 12],
        image: "forest.jpg"
    },
    {
        text: "You encounter a mysterious creature.",
        choices: ["Approach the creature", "Run away"],
        consequences: [13, 14],
        image: "creature.jpg"
    },
    {
        text: "You find an ancient artifact.",
        choices: ["Take the artifact", "Leave it and continue exploring"],
        consequences: [0, 0],
        image: "artifact.jpg"
    },
    {
        text: "You reach a crossroads in the forest.",
        choices: ["Go left", "Go right"],
        consequences: [17, 18],
        image: "crossroads.jpg"
    },
];

// Selecting elements from the HTML
const storyElement = document.getElementById('story');
const choicesElement = document.getElementById('choices');
const imageElement = document.getElementById('image');

let currentState = 0; // This will keep track of the current state of the game

function startGame() {
    currentState = 0;
    showStory(currentState);
}

function showStory(stateIndex) {
    const state = story[stateIndex];
    
    // Update story text
    storyElement.innerText = state.text;

    // Clear previous choices
    choicesElement.innerHTML = '';

    // Check if there are choices available
    if (state.choices.length > 0) {
        // If there are choices, display them
        state.choices.forEach((choice, index) => {
            const button = document.createElement('button');
            button.innerText = choice;
            button.addEventListener('click', () => selectChoice(state.consequences[index]));
            choicesElement.appendChild(button);
        });
    } else {
        // If there are no choices, display a restart button
        const restartButton = document.createElement('button');
        restartButton.innerText = 'Restart Game';
        restartButton.addEventListener('click', startGame);
        choicesElement.appendChild(restartButton);
    }

    // Update image
    displayImage(state.image);
}


function selectChoice(nextState) {
    // Check if the player chooses to open the chest
    if (currentState === 1 && nextState === 3) { // Assuming currentState 1 is where the chest is, and nextState 3 is opening it
        // Generate a random number between 1 and 3
        const randomOutcome = Math.floor(Math.random() * 3) + 1;

        // Determine the outcome based on the random number
        switch (randomOutcome) {
            case 1:
                nextState = 3; // "You open the chest and find a pile of gold coins."
                break;
            case 2:
                nextState = 6; // "You take the gold and become rich, but the castle collapses, trapping you inside forever."
                break;
            case 3:
                nextState = 8; // "You open the chest, but it's a trap! You're poisoned and die."
                break;
        }
    }
    if (nextState >= story.length || nextState < 0) {
        // Restart the game if the next state is out of bounds
        startGame();
    } else {
        showStory(nextState);
    }
}

function displayImage(imageFileName) {
    if (imageFileName) {
        imageElement.innerHTML = `<img src="${imageFileName}" alt="Story Image">`;
        imageElement.style.display = 'block'; // Make sure the container is visible
    } else {
        imageElement.innerHTML = '';
        imageElement.style.display = 'none'; // Hide the container when there is no image
    }
}

// Start the game when the script loads
startGame();

