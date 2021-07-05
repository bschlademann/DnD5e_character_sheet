import { getSkillModifier } from "../domain.js";

const renderSkillModifier = (skill, skillsByAbility, state) => {
    const modifier = document.getElementById(`skill-modifier-${skill}`);
    modifier.textContent = getSkillModifier(skill, skillsByAbility, state);
};

const renderAbilityDependency = (skill, skillsByAbility) => {
    const abilityDependency = document.getElementById(`ability-dependency-${skill}`);
    const ability = skillsByAbility[skill];
    abilityDependency.textContent = `(${ability})`;
};

const addProficiencyBonus = () => {};

export const skillsAndDependenciesList = (allSkills, skillsByAbility, state) => {
    const root = document.getElementById("root");

    const list = document.createElement("ul");

    allSkills.forEach(skill => {

        /**
         * for each skill:
         * add event listener to each checkbox to rerender value of skill modifier
         */

        const listEntry = document.createElement("li");
        list.appendChild(listEntry);
        list.id = "skill-list";

        const proficiencyCheckBox = document.createElement("input");
        listEntry.appendChild(proficiencyCheckBox);
        proficiencyCheckBox.type = "checkbox";
        proficiencyCheckBox.id = `proficiency-checkbox-${skill}`;
        proficiencyCheckBox.addEventListener("click", e => {
            if (e.target.checked){
                state.proficiencies.skills.push(skill);
                renderSkillModifier(skill, skillsByAbility, state);
            } else {
                const skillsInState = state.proficiencies.skills;
                const skillToRemove = skillsInState.indexOf(skill);
                skillsInState.splice(skillToRemove)
                renderSkillModifier(skill, skillsByAbility, state)
            }
        })

        const skillModifier = document.createElement("span");
        listEntry.appendChild(skillModifier);        
        skillModifier.id = `skill-modifier-${skill}`;

        const name = document.createElement("label");
        listEntry.appendChild(name);
        name.textContent = skill.replaceAll("_", " ");

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