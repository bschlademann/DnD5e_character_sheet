"use strict"
const root = document.getElementById("root");

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

state.abilities.allAbilities.map(ability => {
    const skills = abilitiesAndSkills[ability]
    // ... render skills
});
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

const attributeBonus = attribute => Math.floor((attribute-10)/2);

const clamp = (min, max, value) => value < min ? min : value > max ? max : value;

// state
const state = {
    skills: {
        proficiencies: [],
        abilityBySkill: {
            athletics: "strength"
        },
    },
    abilities: {
        byValue: {
            strength: 10,
        },
        allAbilities: [
            "strength",
            "constitution",
            "intelligence",
            "wisdom",
            "dexterity",
            "charisma",
        ],
    },
};

// logic
const getAbilityModifier = (state, ability) => attributeBonus(state.abilities.byValue[ability]);
const getAbilityModifierCurried = (ability) => (state) => attributeBonus(state.abilities.byValue[ability]);

const getWisom = getAbilityModifierCurried('wisdom');
const getStrength = getAbilityModifierCurried('strength');
const getCons = getAbilityModifierCurried('constitution');
const getAthletics = (state) => skillBonus(state.abilities.byValue.strength);

const skillSelectorBySkill = {
    athletics: getAthletics,
}
// ...

const wisdom = getWisdom(state);
class Skill {
    elementName = undefined;
    skill = undefined;
    constructor(skill) {
        this.skill = skill;
        this.elementName = `element-${skill}`;
    }
    getElement() {
        return document.getElementById(this.elementName);
    }
    render() {
        this.getElement().value = skillSelectorBySkill[skill](state);
    }
    validate(value) {
        return value;
    }
}

const athletics = new Skill('atheletics');
athletics.getElement();

const abilityModifier = {
    render() {
        abilityModifier.textContent = modifierSign(state.wisdom);
    },
    validate(value) {
        return clamp(3, 18, value)
    },
    setState(value) {
        state.wisdom = attributeBonus(this.validate(value));
    }
}

const renderAbilityModier = () => {
    abilityScore.value = attributeBonus(state.strength);
}

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
        abilityModifier.id = `ability-modifier-${ability}`
        abilityModifierSign.textContent = modifierSign(abilityModifier.textContent);
        abilityScore.addEventListener("input", e => {
c           state.abilities.byValue.wisdom = e.target.value;
            abilityModifier.render();

            skill.setState(e.target.value);
            skill.render();
        });
        listElement.appendChild(abilityModifier);

        abilityList.appendChild(listElement)
        abilityList.id = "ability-list"
    });

    root.appendChild(abilityList);
};

const getAbilityDependencyBySkillName = (abilitiesAndSkills, skill) => Object.keys(abilitiesAndSkills).find(ability => [...abilitiesAndSkills[ability]].includes(skill));

const skillsAndDependenciesList = (abilitiesAndSkills) => {
    const skillListWithDependencies = document.createElement("ul");
    const abilities = Object.keys(abilitiesAndSkills);
    let skillNames = [];
    abilities.forEach(ability => {
        skillNames.push(...abilitiesAndSkills[ability])
    });
    skillNames.sort();
    skillNames.forEach(skill => {

        /**
         * for each skill:
         * name
         * attribute it depends on
         * proficiency checkbox
         * value that depends on PB and proficiencies
         * add event listener to each value-element if its corresponding checkbox is checked         * 
         * replace number fields with something else / div.textContent?
         */


        const skillListElement = document.createElement("li");
        const skillDependency = getAbilityDependencyBySkillName(abilitiesAndSkills, skill);
        const abilityNameText = document.createTextNode(`${skill} (${skillDependency})`);
        const abilityLabel = document.createElement("label");
        const proficiencyCheckbox = document.createElement("input");
        const skillBonus = document.createElement("input");

        skillListElement.appendChild(proficiencyCheckbox);
        proficiencyCheckbox.type = "checkbox";
        skillListElement.appendChild(skillBonus);
        skillBonus.type = "number";
        skillBonus.disabled = true;
        // skillBonus.value = document.getElementById(``);
        proficiencyCheckbox.addEventListener("change", e => {
            /**
             * skillBonus type = div.textContent
             */
            const skill = document.getElementById(`ability-modifier-${skillDependency}`);
            const proficiencyBonus = document.getElementById("sheet-header-proficiency-bonus");
            // if (e.target.checked === true) {
            //     skill.value = 0 + proficiencyBonus.value;
            // } else {
            //     skill.value = 0;
            // }
        });
        abilityLabel.appendChild(abilityNameText);
        skillListElement.appendChild(abilityLabel);
        skillListElement.id = `skill-${skill.replaceAll(" ", "-")}`;
        skillListWithDependencies.appendChild(skillListElement);
        skillListWithDependencies.id = "skill-list";

        
    });

    root.appendChild(skillListWithDependencies);
};

sheetHeader(sheetHeaderEntries);
attributeList(abilitiesAndSkills);
skillsAndDependenciesList(abilitiesAndSkills);
