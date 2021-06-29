"use strict"
const root = document.getElementById("root");
const data = require("http://192.186.0.8")

/**
 * FIXME: seperate logic, validation, rendering
 * minimize state
 * when something can be derived from state, don't put it in state but use a function to derive the value where appropriate
 */

const state = {
    sheet_header_entries: {
        character_name: "",
        class: "",
        subclass: "",
        level: 1,
        background: "",
        alignment: "",
        race: ""
    },
    ability_scores: {
        strength: 10,
        dexterity: 10,
        constitution: 10,
        intelligence: 10,
        wisdom: 10,
        charisma: 10
    },
    proficiencies: {
        proficiency_bonus: 2,
        armor: [],
        weapons: [],
        tools: [],
        skills: [],
        saving_throws: []
    },
};
// logic
const abilityModifier = ability => Math.floor((ability - 10) / 2);
const getAbilityModifier = (ability, src = state) => abilityModifier(src.ability_scores[ability]);
const proficiencBonusAdaption = (state) => {
    const characterLevel = state.sheet_header_entries.level;
    const proficiencyIncreaseThresholds = [5, 9, 13, 17];
    let proficiencyBonusIncrease = 0;
    proficiencyIncreaseThresholds.forEach(thresholdLevel => {
        if (characterLevel >= thresholdLevel) { proficiencyBonusIncrease++ }
    });
    state.proficiencies.proficiency_bonus = 2 + proficiencyBonusIncrease;
    console.log("pb:", state.proficiencies.proficiency_bonus);
};
const clamp = (min, max, value) => value < min ? min : value > max ? max : value;

// rendering
const renderProficiencyBonus = (state) => {
    const proficiencyBonus = document.getElementById("sheet-header-proficiency-bonus");
    proficiencyBonus.value = state.proficiencies.proficiency_bonus;
};
const renderAbilityModifier = (ability) => {
    const modifier = document.getElementById(`${ability}-modifier`);
    modifier.textContent = getAbilityModifier(ability);
};


const initialRender = () => {

    // const sheetHeaderEntries = [
    //     "character name",
    //     "class",
    //     "subclass",
    //     "level",
    //     "background",
    //     "alignment",
    //     "race",
    //     "proficiency bonus"
    // ];
    // const allAbilities = [
    //     "strength",
    //     "constitution",
    //     "intelligence",
    //     "wisdom",
    //     "dexterity",
    //     "charisma",
    // ];
    // const allSkills = [
    //     'acrobatics',
    //     'animal handling',
    //     'arcana',
    //     'athletics',
    //     'deception',
    //     'history',
    //     'insight',
    //     'intimidation',
    //     'investigation',
    //     'medicine',
    //     'nature',
    //     'perception',
    //     'performance',
    //     'persuasion',
    //     'religion',
    //     'sleight of hand',
    //     'stealth',
    //     'survival'
    // ];
    // const skillsByAbility = {
    //     ATHLETICS: "strength",
    //     ACROBATICS: "dexterity",
    //     SLEIGHT_OF_HAND: "dexterity",
    //     STEALTH: "dexterity",
    //     ARCANA: "intelligence",
    //     HISTORY: "intelligence",
    //     INVESTIGATION: "intelligence",
    //     NATURE: "intelligence",
    //     RELIGION: "intelligence",
    //     ANIMAL_HANDLING: "wisdom",
    //     INSIGHT: "wisdom",
    //     MEDICINE: "wisdom",
    //     PERCEPTION: "wisdom",
    //     SURVIVAL: "wisdom",
    //     DECEPTION: "charisma",
    //     INTIMIDATION: "charisma",
    //     PERFORMANCE: "charisma",
    //     PERSUASION: "charisma"
    // };

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
            headerEntryInput.id = `sheet-header-${labelText.replace(" ", "-").toLowerCase()}`

            if (labelText === "level") {
                headerEntryInput.type = "number";
                headerEntryInput.value = 1;
                headerEntryInput.min = 1;
                headerEntryInput.max = 20;

                headerEntryInput.addEventListener("input", (e) => {
                    state.sheet_header_entries.level = e.target.value;
                    proficiencBonusAdaption(state);
                    renderProficiencyBonus(state);
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

    const abilityList = (allAbilities) => {

        const abilityList = document.createElement("ul");

        allAbilities.forEach(ability => {

            const listElement = document.createElement("li");
            const text = document.createTextNode(ability);
            const label = document.createElement("label");
            const abilityScore = document.createElement("input");
            const abilityModifier = document.createElement("span");

            label.appendChild(text);
            listElement.appendChild(label);
            listElement.id = `ability-${ability}`
            listElement.appendChild(abilityScore);
            abilityScore.id = `${ability}-value`
            abilityScore.type = "number";
            abilityScore.value = 10;
            listElement.appendChild(abilityModifier);
            abilityModifier.textContent = 0;
            abilityModifier.id = `${ability}-modifier`;
            abilityScore.addEventListener("input", () => {
                const clampedAbilityScore = clamp(3, 18, abilityScore.value);
                abilityScore.value = clampedAbilityScore;
                state.ability_scores[ability] = clampedAbilityScore;
                renderAbilityModifier(ability);
            });
            listElement.appendChild(abilityModifier);

            abilityList.appendChild(listElement);
            abilityList.id = "ability-list";
        });

        root.appendChild(abilityList);
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
    abilityList(allAbilities);
    // skillsAndDependenciesList(allAbilities);



};
initialRender();


