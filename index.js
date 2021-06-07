"use strict"
const root = document.getElementById("root");

// const sheetLists = require("./sheet_lists.json");
// import * as sheetLists from "./sheet_lists.json";

// let sheetHeaderEntries, attributes, skills, proficiencies;
// [sheetHeaderEntries, attributes, skills, proficiencies].forEach(headerEntry => {
//     headerEntry = sheetLists.headerEntry;
// });
// const sheetHeaderEntries = sheetLists.sheetHeaderEntries;

const sheetHeaderEntries = [
    "character name",
    "class",
    "subclass",
    "level",
    "background",
    "alignment",
    "race"
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
        };

        header.appendChild(headerEntry);
    })
    root.appendChild(header);
};

const attributeList = (abilitiesAndSkills) => {
    const abilities = Object.keys(abilitiesAndSkills);
    const abilityList = document.createElement("div");
    abilities.forEach(ability => {

        const abilityListElement = document.createElement("div");
        const nameText = document.createTextNode(ability);
        const label = document.createElement("label");
        const abilityScore = document.createElement("input");

        label.appendChild(nameText);
        abilityListElement.appendChild(label);
        abilityListElement.id = `ability-${ability}`
        abilityListElement.appendChild(abilityScore);
        abilityScore.type = "number";
        abilityScore.value = 10;
        abilityScore.min = 3;
        abilityScore.max = 18;
        abilityList.appendChild(abilityListElement)
        abilityList.id = "ability-list"
    });
    root.appendChild(abilityList);
};

function getAbilityNameBySkillName(object, value) {
    return Object.keys(object).find(key => [...object[key]].includes(value));
};

const skillsAndDependenciesList = (abilitiesAndSkills) => {
    const skillListWithDependencies = document.createElement("div");
    const abilities = Object.keys(abilitiesAndSkills);
    let skillNames = [];
    abilities.forEach(ability => {
        skillNames.push(...abilitiesAndSkills[ability])
    });
    skillNames.sort();
    skillNames.forEach(skill => {

        const skillListElement = document.createElement("div");
        const skillDependency = getAbilityNameBySkillName(abilitiesAndSkills, skill)
        const abilityNameText = document.createTextNode(`${skill} (${skillDependency})`);
        const abilityLabel = document.createElement("label");

        abilityLabel.appendChild(abilityNameText);
        skillListElement.appendChild(abilityLabel);
        skillListElement.id = `skill-${skill.replaceAll(" ", "-")}`;
        skillListWithDependencies.appendChild(skillListElement);
        skillListWithDependencies.id = "skill-list";
    })

    root.appendChild(skillListWithDependencies);
};


sheetHeader(sheetHeaderEntries);
attributeList(abilitiesAndSkills);
skillsAndDependenciesList(abilitiesAndSkills);
