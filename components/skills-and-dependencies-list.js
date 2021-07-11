import { getSkillModifier, toggleSkillProficiency, rollSkillCheck } from "../domain.js";

export const renderSkillModifier = (skill, skillsByAbility, state) => {
    const modifier = document.getElementById(`skill-modifier-${skill}`);
    modifier.textContent = getSkillModifier(skill, skillsByAbility, state);
};

export const renderAbilityDependency = (skill, skillsByAbility) => {
    const abilityDependency = document.getElementById(`ability-dependency-${skill}`);
    const ability = skillsByAbility[skill];
    abilityDependency.textContent = `(${ability})`;
};
export const renderSkillCheck = (skill, skillsByAbility, state) => {
    const output = document.getElementById("dice-roll-output");
    const result = rollSkillCheck(skill, skillsByAbility, state);
    output.textContent = `${skill} skill check: ${result.roll + result.modifier} (${result.roll} + ${result.modifier})`;
};

export const skillsAndDependenciesList = (allSkills, skillsByAbility, state) => {
    const root = document.getElementById("root");

    const list = document.createElement("ul");

    allSkills.forEach(skill => {

        const listEntry = document.createElement("li");
        list.appendChild(listEntry);
        list.id = "skill-list";

        const proficiencyCheckBox = document.createElement("input");
        listEntry.appendChild(proficiencyCheckBox);
        proficiencyCheckBox.type = "checkbox";
        proficiencyCheckBox.id = `proficiency-checkbox-${skill}`;
        proficiencyCheckBox.addEventListener("click", checkBoxClick => {
            toggleSkillProficiency(checkBoxClick, skill, state);
            renderSkillModifier(skill, skillsByAbility, state);
        });

        const skillModifier = document.createElement("span");
        listEntry.appendChild(skillModifier);
        skillModifier.id = `skill-modifier-${skill}`;

        const name = document.createElement("label");
        listEntry.appendChild(name);
        name.textContent = skill.replaceAll("_", " ");
        name.addEventListener("click", () => {
            renderSkillCheck(skill, skillsByAbility, state);
        });

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
