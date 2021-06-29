import {clamp, getAbilityModifier} from './domain.js';

export const renderAbilityModifier = (ability, state) => {
    const modifier = document.getElementById(`${ability}-modifier`);
    modifier.textContent = getAbilityModifier(ability, state);
};

export const abilityList = (allAbilities, state) => {
    const root = document.getElementById("root");
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
            // TODO: extract
            state.ability_scores[ability] = clampedAbilityScore;
            renderAbilityModifier(ability, state);
        });
        listElement.appendChild(abilityModifier);

        abilityList.appendChild(listElement);
        abilityList.id = "ability-list";
    });

    root.appendChild(abilityList);
};