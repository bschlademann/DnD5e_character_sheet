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
    getCharacterSubClass,
    getProficiencyBonus,
} from "../domain.js";
import { allAlignments, allcharacterClasses, allCharacterSubClasses, allBackgrounds, allRaces } from "../data.js";

export const renderProficiencyBonus = (state) => {
    const proficiencyBonus = document.getElementById("sheet-header-proficiency-bonus");
    getProficiencyBonus(proficiencyBonus, state);
};

export const renderSubclassOptions = (state) => {
    const subclassDropdown = document.getElementById("sheet-header-subclass");
    const characterClass = getCharacterClass(state);
    const subclasses = allCharacterSubClasses[characterClass];

    subclassDropdown.innerHTML = "";

    subclasses.forEach(subclass => {
        const option = document.createElement("option");
        subclassDropdown.appendChild(option);
        option.text = subclass;
        option.value = subclass.replace(" ", "-");
    });
};

export const subclassDisabledMessage = (characterClass, subClassThresholdReached) => {
    if (characterClass === "") {
        return "choose a class";
    } else if (subClassThresholdReached === false) {
        return "higher level needed";
    };
};

export const toggleSubclassDropdownDisable = (characterClass, characterLevel, state) => {
    const subclassDropdown = document.getElementById("sheet-header-subclass");
    const messageNode = (str) => document.createTextNode(str);
    // FIX: "message" stays "higher level needed" even after innerHtml = ""... why? 
    // -> is it an invisible textNode?
    // -> does some part of the code run multiple times and overwrites the first CHild with "higher level needed" for a moment?
    // FIX: when level is lowered below threshold: remove all dropdown-options and add a new one: "level to low"
    const subClassThresholdReached = (characterLevel >= 3 && characterClass !== "")
        || (characterLevel >= 2 && (characterClass === "cleric" || characterClass === "druid" || characterClass === "wizard"))
        || (characterClass === "sorcerer")
        || (characterClass === "warlock");

    if (subClassThresholdReached) {
        subclassDropdown.disabled = false;
        renderSubclassOptions(state);
    } else {
        subclassDropdown.disabled = true;
        subclassDropdown.innerHTML = "";
        const messageText = subclassDisabledMessage(characterClass, subClassThresholdReached);
        const message = messageNode(messageText);
        subclassDropdown.appendChild(message);
    };

    if (characterClass === "") {
        messageNode.text = "choose a class first";
        subclassDropdown.disabled = true;
    } else {
        messageNode.text = "higher level needed";
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

        headerEntryInput.addEventListener("input", e => {
            setCharacterLevel(e.target.value, state);
            setProficiencyBonus(state);
            renderProficiencyBonus(state);
            const characterClass = getCharacterClass(state);
            const characterLevel = getCharacterLevel(state);
            toggleSubclassDropdownDisable(characterClass, characterLevel, state);
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
                dropdown.addEventListener("change", e => {
                    const characterClass = e.target.value;
                    setCharacterClass(characterClass, state);
                    console.log("characterClass in state:", getCharacterClass(state));
                    const characterLevel = getCharacterLevel(state);
                    toggleSubclassDropdownDisable(characterClass, characterLevel, state);
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
        option.text = "choose a class first";
        dropdown.disabled = true;

        dropdown.addEventListener("change", subclassSelect => {
            const characterSubclass = subclassSelect.target.value.replace("-", " ");
            setCharacterSubclass(characterSubclass, state);
        });
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
