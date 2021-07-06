import { toggleSavingThrowProficiency, getSavingThrowModifier } from "../domain.js";

export const renderSavingThrowModifier = (ability, state) => {
    const modifier = document.getElementById(`saving-throw-modifier-${ability}`);
    modifier.textContent = getSavingThrowModifier(ability, state);
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
            // FIX NaN on click
            renderSavingThrowModifier(ability, state);
        });

        const savingThrowModifier = document.createElement("span");
        listEntry.appendChild(savingThrowModifier);
        savingThrowModifier.id = `saving-throw-modifier-${ability}`;

        const name = document.createElement("label");
        listEntry.appendChild(name);
        name.textContent = ability;
    });

    root.appendChild(list);
    allAbilities.forEach(ability => {
        renderSavingThrowModifier(ability, state);
    });
};
