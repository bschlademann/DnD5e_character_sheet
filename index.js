"use strict"
const root = document.getElementById("root");

// const sheetLists = require("./sheet_lists.json");
// import * as sheetLists from "./sheet_lists.json";

// let sheetHeaderEntries, attributes, skills, proficiencies;
// [sheetHeaderEntries, attributes, skills, proficiencies].forEach(headerEntry => {
//     headerEntry = sheetLists.headerEntry;
// });
// const sheetHeaderEntries = sheetLists.sheetHeaderEntries;

/**
 * proficiency bonus value input -> text field 
 */

const sheetHeaderEntries = [
    "character name",
    "class",
    "subclass",
    "level",
    "background",
    "alignment",
    "race",
    "proficiency bonus"
];
const abilitiesAndSkills = {
    "strength": [
        "athletics"
    ],
    "dexterity": [
        "acrobatics",
        "sleight of hand",
        "stealth"
    ],
    "constitution": [],
    "intelligence": [
        "arcana",
        "history",
        "investigation",
        "nature",
        "religion"
    ],
    "wisdom": [
        "animal handling",
        "insight",
        "medicine",
        "perception",
        "survival"
    ],
    "charisma": [
        "deception",
        "intimidation",
        "performance",
        "persuasion"
    ]
};
const proficiencies = {
    "ARMOR": ["none"],
    "WEAPONS": ["simple"],
    "TOOLS": ["none"],
    "SAVES": ["none"]
};

const sheetHeader = (sheetHeaderEntries) => {
    const header = document.createElement("div");

    root.appendChild(header);
    header.setAttribute("id", "sheet-header");

    sheetHeaderEntries.forEach(labelText => {
        const headerEntry = document.createElement("div");
        const headerLabel = document.createElement("label")
        const headerLabelText = document.createTextNode(labelText);
        const headerEntryInput = document.createElement("input");

        headerLabel.appendChild(headerLabelText);
        headerEntry.appendChild(headerLabel);
        headerEntry.appendChild(headerEntryInput);
        headerEntryInput.className = "sheet-header-input";
        headerEntryInput.id = `sheet-header-${labelText.replace(" ", "-").toLocaleLowerCase()}`

        if (labelText === "level") {
            headerEntryInput.type = "number";
            headerEntryInput.value = 1;
            headerEntryInput.min = 1;
            headerEntryInput.max = 20;

            headerEntryInput.addEventListener("input", () => {

                const characterLevel = document.getElementById("sheet-header-level");
                let proficiencyBonus = document.getElementById("sheet-header-proficiency-bonus");
                const proficiencyIncreaseThresholds = [5, 9, 13, 17];
                let proficiencyBonusIncrease = 0;

                proficiencyIncreaseThresholds.forEach(thresholdLevel => {
                    if (characterLevel.value >= thresholdLevel) { proficiencyBonusIncrease++ }
                });

                proficiencyBonus.value = 2 + proficiencyBonusIncrease;

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
    });
    root.appendChild(header);
};

const modifierSign = n => n < 0 ? "" : "+";

const attributeList = (abilitiesAndSkills) => {

    const abilities = Object.keys(abilitiesAndSkills);
    const abilityList = document.createElement("ul");

    abilities.forEach(ability => {

        const listElement = document.createElement("li");
        const text = document.createTextNode(ability);
        const label = document.createElement("label");
        const abilityScore = document.createElement("input");
        const abilityModifierSign = document.createElement("span");
        const abilityModifier = document.createElement("span");

        label.appendChild(text);
        listElement.appendChild(label);
        listElement.id = `ability-${ability}`
        listElement.appendChild(abilityScore);
        abilityScore.type = "number";
        abilityScore.value = 10;
        abilityScore.min = 3;
        abilityScore.max = 18;
        listElement.appendChild(abilityModifierSign);
        listElement.appendChild(abilityModifier);
        abilityModifier.textContent = 0;
        abilityModifierSign.textContent = modifierSign(abilityModifier.textContent);
        abilityScore.addEventListener("input", e => {
            const score = e.target.value;
            const mod = Math.floor((score - 10) / 2);
            abilityModifier.textContent = mod;
            abilityModifierSign.textContent = modifierSign(abilityModifier.textContent);
        });
        listElement.appendChild(abilityModifier);

        abilityList.appendChild(listElement)
        abilityList.id = "ability-list"
    });

    root.appendChild(abilityList);
};

function getAbilityNameBySkillName(object, value) {
    return Object.keys(object).find(key => [...object[key]].includes(value));
};

const skillsAndDependenciesList = (abilitiesAndSkills) => {
    const skillListWithDependencies = document.createElement("ul");
    const abilities = Object.keys(abilitiesAndSkills);
    let skillNames = [];
    abilities.forEach(ability => {
        skillNames.push(...abilitiesAndSkills[ability])
    });
    skillNames.sort();
    skillNames.forEach(skill => {

        const skillListElement = document.createElement("li");
        const skillDependency = getAbilityNameBySkillName(abilitiesAndSkills, skill)
        const abilityNameText = document.createTextNode(`${skill} (${skillDependency})`);
        const abilityLabel = document.createElement("label");

        abilityLabel.appendChild(abilityNameText);
        skillListElement.appendChild(abilityLabel);
        skillListElement.id = `skill-${skill.replaceAll(" ", "-")}`;
        skillListWithDependencies.appendChild(skillListElement);
        skillListWithDependencies.id = "skill-list";

        /**
         * for each skill:
         * name
         * attribute it depends on
         * proficiency checkbox
         * value that depends on PB and proficiencies
         * add event listener to each value-element if its corresponding checkbox is checked
         * 
         * replace number fields with something else / div.textContent?
         */

    });

    root.appendChild(skillListWithDependencies);
};

sheetHeader(sheetHeaderEntries);
attributeList(abilitiesAndSkills);
skillsAndDependenciesList(abilitiesAndSkills);
