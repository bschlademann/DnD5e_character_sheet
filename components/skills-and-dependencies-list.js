import { getSkillModifier } from "../domain.js";

const renderSkillModifier = (skill, skillsByAbility, state) => {
    const modifier = document.getElementById(`skill-modifier-${skill}`);
    modifier.textContent = getSkillModifier(skill, skillsByAbility, state);
};

const renderAbilityDependency = (skill, skillsByAbility) => {
    const abilityDependency = document.getElementById(`ability-dependency-${skill}`);
    const ability = skillsByAbility[skill.replaceAll(" ", "_")];
    abilityDependency.textContent = `(${ability})`;
};

const addProficiencyBonus = () => {};

export const skillsAndDependenciesList = (allSkills, skillsByAbility, state) => {
    const root = document.getElementById("root");

    const list = document.createElement("ul");

    allSkills.forEach(skill => {

        /**
         * for each skill:
         * proficiency checkbox
         * value that depends on PB and proficiencies
         * name
         * attribute it depends on 
         * add event listener to each value-element if its corresponding checkbox is checked
         */
        const listEntry = document.createElement("li");
        list.appendChild(listEntry);
        list.id = "skill-list";

        const proficiencyCheckBox = document.createElement("input");
        listEntry.appendChild(proficiencyCheckBox);
        proficiencyCheckBox.type = "checkbox";
        proficiencyCheckBox.id = `proficiency-checkbox-${skill}`;

        const skillModifier = document.createElement("span");
        listEntry.appendChild(skillModifier);        
        skillModifier.id = `skill-modifier-${skill}`;

        const name = document.createElement("label");
        listEntry.appendChild(name);
        name.textContent = skill;

        const abilityDependency = document.createElement("span");
        listEntry.appendChild(abilityDependency);
        abilityDependency.id = `ability-dependency-${skill}`;
    });

    root.appendChild(list);      

    allSkills.forEach(skill => {
    renderSkillModifier(skill, skillsByAbility, state);        
    renderAbilityDependency(skill, skillsByAbility);
    });
};