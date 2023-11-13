// Define your story objects with text, choices, consequences, and images
const story = [
    {
        text: "You find yourself in a dark cave.",
        choices: ["Go deeper into the cave", "Try to find a way out"],
        consequences: [1, 2],
        image: "cave.jpg"
    },
    {
        text: "You venture deeper into the cave and discover a treasure chest.",
        choices: ["Open the chest", "Leave it and continue exploring"],
        consequences: [3, 4],
        image: "treasure.jpg"
    },
    {
        text: "You find yourself trapped in the cave with no way out.",
        choices: ["Keep searching for an exit", "Accept your fate"],
        consequences: [2, 5],
        image: "trapped.jpg"
    },
    {
        text: "You open the chest and find a pile of gold coins.",
        choices: ["Take the gold", "Leave it and continue exploring"],
        consequences: [6, 4],
        image: "gold.jpg"
    },
    {
        text: "You decide to leave the treasure and continue exploring the cave.",
        choices: ["Go deeper into the cave", "Try to find a way out"],
        consequences: [1, 2],
        image: "cave.jpg"
    },
    {
        text: "You search for an exit and finally find daylight. You've escaped the cave!",
        choices: [],
        consequences: [],
        image: "escape.jpg"
    },
    {
        text: "You take the gold and become rich, but the cave collapses, trapping you inside forever.",
        choices: [],
        consequences: [],
        image: "trapped_forever.jpg"
    },
    {
        text: "You accept your fate and remain trapped in the cave forever.",
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
        text: "You take the gold and make a daring escape just before the cave collapses. You're rich and safe!",
        choices: [],
        consequences: [],
        image: "rich_escape.jpg"
    },
    {
        text: "You find a hidden passage that leads to a secret world. You live happily ever after.",
        choices: [],
        consequences: [],
        image: "secret_world.jpg"
    }
];

let currentStage = 0;

// Function to start/restart the game
function startGame() {
    currentStage = 0;
    updatePage();
}

// Function to update the page with the current story stage
function updatePage() {
    const stage = story[currentStage];
    const storyElement = document.getElementById("story");
    const choicesElement = document.getElementById("choices");
    const imageElement = document.getElementById("image");

    storyElement.textContent = stage.text;

    // Clear previous choices
    choicesElement.innerHTML = "";

    // Display choices and add event listeners
    for (let i = 0; i < stage.choices.length; i++) {
        const choiceButton = document.createElement("button");
        choiceButton.textContent = stage.choices[i];
        choiceButton.addEventListener("click", () => makeChoice(i));
        choicesElement.appendChild(choiceButton);
    }

    // Display image
    imageElement.innerHTML = `<img src="${stage.image}" alt="Scene">`;

    // Check for an ending
    if (stage.choices.length === 0) {
        // Game over
        choicesElement.innerHTML = '<button onclick="startGame()">Restart</button>';
    }
}

// Function to handle player choices
function makeChoice(choiceIndex) {
    const stage = story[currentStage];
    const nextStageIndex = stage.consequences[choiceIndex];
    
    if (nextStageIndex !== undefined) {
        currentStage = nextStageIndex;
        updatePage();
    }
}

// Start the game
startGame();
