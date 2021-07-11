import { toggleSavingThrowProficiency, getSavingThrowModifier, rollSavingThrow } from "../domain.js";

export const renderSavingThrowModifier = (ability, state) => {
    const modifier = document.getElementById(`saving-throw-modifier-${ability}`);
    modifier.textContent = getSavingThrowModifier(ability, state);
};

export const renderSavingThrow = (ability, state) => {
    const output = document.getElementById("dice-roll-output");
    output.textContent = `${ability} saving throw: ${rollSavingThrow(ability, state)}`;
    
    const result = rollSavingThrow(ability, state);
    output.textContent = `${ability} sabing throw check: ${result.roll + result.modifier} (${result.roll} + ${result.modifier})`;
};

export const savingThrows = (allAbilities, state) => {
    const root = document.getElementById("root");

    const list = document.createElement("ul");

    allAbilities.forEach(ability => {
        const listEntry = document.createElement("li");
        list.appendChild(listEntry);
        list.id = "saving-throw-list";

        const proficiencyCheckBox = document.createElement("input");
        listEntry.appendChild(proficiencyCheckBox);
        proficiencyCheckBox.type = "checkbox";
        proficiencyCheckBox.id = `proficiency-checkbox-${ability}`;
        proficiencyCheckBox.addEventListener("click", checkBoxClick => {
            toggleSavingThrowProficiency(checkBoxClick, ability, state);
            renderSavingThrowModifier(ability, state);
        });

        const savingThrowModifier = document.createElement("span");
        listEntry.appendChild(savingThrowModifier);
        savingThrowModifier.id = `saving-throw-modifier-${ability}`;

        const name = document.createElement("label");
        listEntry.appendChild(name);
        name.textContent = ability;
        name.addEventListener("click", () => {
            renderSavingThrow(ability, state);
        });
    });

    root.appendChild(list);
    allAbilities.forEach(ability => {
        renderSavingThrowModifier(ability, state);
    });
};
