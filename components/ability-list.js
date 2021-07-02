import { clamp, getAbilityModifier, setAbilityScore, rollAbilityCheck } from '../domain.js';

export const renderAbilityModifier = (ability, state) => {
    const modifier = document.getElementById(`${ability}-modifier`);
    const value = getAbilityModifier(ability, state);
    const symbol = value >= 0 ? "+" : "";
    modifier.textContent = symbol + getAbilityModifier(ability, state);
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
        label.addEventListener("click", () => console.log(`${ability}-check:`, rollAbilityCheck(ability, state)));
        listElement.appendChild(label);
        listElement.id = `ability-${ability}`
        listElement.appendChild(abilityScore);
        abilityScore.id = `${ability}-value`
        abilityScore.type = "number";
        abilityScore.value = 10;
        listElement.appendChild(abilityModifier);
        abilityModifier.textContent = "+0";
        abilityModifier.id = `${ability}-modifier`;
        abilityScore.addEventListener("input", () => {
            const clampedAbilityScore = clamp(3, 18, abilityScore.value);
            abilityScore.value = clampedAbilityScore;
            setAbilityScore(ability, clampedAbilityScore, state)
            renderAbilityModifier(ability, state);
        });
        listElement.appendChild(abilityModifier);

        abilityList.appendChild(listElement);
        abilityList.id = "ability-list";
    });

    root.appendChild(abilityList);
};