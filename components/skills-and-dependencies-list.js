import {allSkills, skillsByAbility} from '../data.js';

export const skillsAndDependenciesList = (abilitiesAndSkills, state) => {
    const root = document.getElementById("root");

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