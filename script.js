// Define your story objects with text, choices, consequences, and images
const story = [
    {
        text: "You find yourself in a dark castle.",
        choices: ["Explore the castle", "Try to find a way out"],
        consequences: [1, 2],
        image: "castle.jpg"
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
        consequences: [5, 6], // Updated consequences for this stage
        image: "trapped.jpg"
    },
    {
        text: "You open the chest and find a pile of gold coins.",
        choices: ["Take the gold", "Leave it and continue exploring"],
        consequences: [7, 4],
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
            // ... Other cases ...
            case 2: // Handle the "Keep searching for an exit" choice in stage 2
                if (choiceIndex === 0) {
                    // Add custom logic here for this choice
                    const randomOutcome = Math.random(); // Generate a random number
                    if (randomOutcome < 0.5) {
                        // Player succeeds in finding an exit
                        showEnding("You keep searching and eventually find an exit. Congratulations, you've escaped the castle!", "escape.jpg");
                    } else {
                        // Player fails to find an exit
                        showEnding("You keep searching but find nothing. Eventually, you run out of supplies and perish in the castle.", "perish.jpg");
                    }
                } else {
                    // Handle the "Accept your fate" choice
                    showEnding("You accept your fate and remain trapped in the castle forever.", "trapped_forever.jpg");
                }
                break;
            // ... Other cases ...
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
