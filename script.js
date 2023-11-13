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

// Function to handle player choices and game endings
function makeChoice(choiceIndex) {
    const stage = story[currentStage];
    const nextStageIndex = stage.consequences[choiceIndex];

    if (nextStageIndex !== undefined) {
        currentStage = nextStageIndex;
        updatePage();
    } else {
        // Handle different endings based on specific scenarios
        switch (currentStage) {
            case 5: // Escaping the cave
                if (choiceIndex === 0) {
                    showEnding("Congratulations! You've escaped the cave and won the game.", "escape.jpg");
                } else {
                    showEnding("You took a wrong turn and got lost in the cave forever.", "lost.jpg");
                }
                break;
            case 9: // Becoming rich and safe
                if (choiceIndex === 0) {
                    showEnding("You take the gold and make a daring escape just before the cave collapses. You're rich and safe!", "rich_escape.jpg");
                } else {
                    showEnding("You took too long to decide, and the cave collapsed, trapping you inside forever.", "trapped_forever.jpg");
                }
                break;
            case 10: // Living happily ever after in a secret world
                showEnding("You find a hidden passage that leads to a secret world. You live happily ever after.", "secret_world.jpg");
                break;
            case 7: // Accepting your fate and remaining trapped
                showEnding("You accept your fate and remain trapped in the cave forever.", "trapped_forever.jpg");
                break;
            case 8: // Opening the chest but getting poisoned and dying
                showEnding("You open the chest, but it's a trap! You're poisoned and die.", "poisoned.jpg");
                break;
            case 6: // Taking the gold but being trapped when the cave collapses
                showEnding("You take the gold and become rich, but the cave collapses, trapping you inside forever.", "trapped_forever.jpg");
                break;
            case 2: // Handle the "Keep searching for an exit" choice in stage 2
                if (choiceIndex === 0) {
                    // Add custom logic here for this choice
                    showEnding("You keep searching and eventually find an exit. Congratulations, you've escaped the cave!", "escape.jpg");
                } else {
                    // Handle the "Accept your fate" choice
                    showEnding("You accept your fate and remain trapped in the cave forever.", "trapped_forever.jpg");
                }
                break;
            default:
                break;
        }
    }
}
// Function to display an ending
function showEnding(text, image) {
    const storyElement = document.getElementById("story");
    const choicesElement = document.getElementById("choices");
    const imageElement = document.getElementById("image");

    storyElement.textContent = text;

    // Remove choices buttons
    choicesElement.innerHTML = "";

    // Display the ending image
    imageElement.innerHTML = `<img src="${image}" alt="Ending Scene">`;

    // Add a restart button
    choicesElement.innerHTML += '<button onclick="startGame()">Restart</button>';
}

// Start the game
startGame();
