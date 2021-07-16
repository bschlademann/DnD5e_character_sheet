import {
    setCharacterName,
    setCharacterClass,
    getCharacterClass,
    setCharacterSubclass,
    setCharacterLevel,
    setCharacterBackground,
    setCharacterAlignment,
    setCharacterRace,
    setProficiencyBonus,
    getCharacterLevel,
} from "../domain.js";
import { allAlignments, allcharacterClasses, allCharacterSubClasses, allBackgrounds, allRaces } from "../data.js";

/**
 * subclass:
 * class needs to go in state
 * read from there to select key in "subclass" object to get only sunclasses for selected class
 * deactivate subclass-select-element depending on class and level (mostly gets activated on lv3, but e.g. for clerics at lv2)
 * eventlisteners on class-select and level-input
 * if ([select]value !== ""){use [select]value as key for subclass object to generate options}
 */

export const getProficiencyBonus = (proficiencyBonus, state) => {
    proficiencyBonus.value = state.proficiencies.proficiencyBonus;
};

export const renderProficiencyBonus = (state) => {
    const proficiencyBonus = document.getElementById("sheet-header-proficiency-bonus");
    getProficiencyBonus(proficiencyBonus, state);
};

export const toggleSubclassDropdownDisable = (characterClass, characterLevel) => {
    
    const subclassDropdown = document.getElementById("sheet-header-subclass");

    const subClassThresholdReached = (characterLevel >= 3)
        || (characterLevel >= 2 && (characterClass === "cleric" || characterClass === "druid" || characterClass === "wizard"))
        || (characterClass === "sorcerer")
        || (characterClass === "warlock");

    if (subClassThresholdReached) {
        subclassDropdown.disabled = false;
    } else {
        subclassDropdown.disabled = true;
    };
};

export const renderInput = (labelText, state) => {

    const header = document.getElementById("sheet-header");

    const headerEntry = document.createElement("div");
    const headerLabel = document.createElement("label");
    const headerEntryInput = document.createElement("input");

    headerLabel.textContent = labelText;
    headerEntry.appendChild(headerLabel);
    headerEntry.appendChild(headerEntryInput);
    headerEntryInput.className = "sheet-header-input";
    headerEntryInput.id = `sheet-header-${labelText.replace(" ", "-").toLowerCase()}`;

    if (labelText === "character name") {
        headerEntryInput.addEventListener("change", input => {
            const characterName = input.target.value;
            setCharacterName(characterName, state);
        });
    };

    if (labelText === "level") {
        headerEntryInput.type = "number";
        headerEntryInput.value = 1;
        headerEntryInput.min = 1;
        headerEntryInput.max = 20;

        headerEntryInput.addEventListener("input", (e) => {
            setCharacterLevel(e.target.value, state);
            setProficiencyBonus(state);
            renderProficiencyBonus(state);
            const characterClass = getCharacterClass(state);
            const characterLevel = getCharacterLevel(state);
            toggleSubclassDropdownDisable(characterClass, characterLevel);
        });
    };

    if (labelText === "proficiency bonus") {
        headerEntryInput.type = "number";
        headerEntryInput.value = 2;
        headerEntryInput.min = 2;
        headerEntryInput.max = 6;
        headerEntryInput.disabled = true;
    };
    header.appendChild(headerEntry);
};

export const renderDropdown = (labelText, state) => {
    const header = document.getElementById("sheet-header");

    const headerEntry = document.createElement("div");
    const headerLabel = document.createElement("label");
    const dropdown = document.createElement("select");

    headerLabel.textContent = labelText;
    headerEntry.appendChild(headerLabel);
    headerEntry.appendChild(dropdown);

    let data = [];
    if (labelText !== "subclass") {
        switch (labelText) {
            case "alignment": data = allAlignments;
                break;
            case "class": {
                data = allcharacterClasses;
                dropdown.addEventListener("input", selectedClass => {
                    const characterClass = selectedClass.target.value;
                    setCharacterClass(characterClass, state);
                    const characterLevel = getCharacterLevel(state);
                    toggleSubclassDropdownDisable(characterClass, characterLevel);

                    



                });
            };
                break;
            case "background": data = allBackgrounds;
                break;
            case "race": data = allRaces;
                break;
        };
        data.forEach(entry => {
            const option = document.createElement("option");
            dropdown.appendChild(option);

            option.text = entry;
        });
    } else {
        const option = document.createElement("option");
        dropdown.appendChild(option);
        option.text = "choose a class first"
        dropdown.disabled = true;
    };
    dropdown.id = `sheet-header-${labelText}`;
    header.appendChild(headerEntry);
};

export const sheetHeader = (sheetHeaderEntries, state) => {
    const root = document.getElementById("root");
    const header = document.createElement("div");
    root.appendChild(header);
    header.setAttribute("id", "sheet-header");

    sheetHeaderEntries.forEach(labelText => {
        if (labelText === "character name" || labelText === "level" || labelText === "proficiency bonus") {
            renderInput(labelText, state);
        } else {
            renderDropdown(labelText, state);
        };
    });
};
