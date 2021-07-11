"use strict"

export const diceRollOutput = () => {
    const root = document.getElementById("root");
    const output = document.createElement("div");
    root.appendChild(output);
    output.id = "dice-roll-output";
};
