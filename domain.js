// all functions that use state

export const createState = () => ({
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
});

export const abilityModifier = ability => Math.floor((ability - 10) / 2);

export const clamp = (min, max, value) => value < min ? min : value > max ? max : value;

export const updateHeaderEntries = (value, state) => {
    state.sheet_header_entries.level = value;
};

export const setAbilityScore = (ability, clampedAbilityScore, state) => {
    state.ability_scores[ability] = clampedAbilityScore;
};

export const setProficiencyBonus = (state) => {
    const characterLevel = state.sheet_header_entries.level;
    const proficiencyIncreaseThresholds = [5, 9, 13, 17];
    let proficiencyBonusIncrease = 0;
    proficiencyIncreaseThresholds.forEach(thresholdLevel => {
        if (characterLevel >= thresholdLevel) { proficiencyBonusIncrease++ }
    });
    state.proficiencies.proficiency_bonus = 2 + proficiencyBonusIncrease;
};

export const getAbilityModifier = (ability, state) => abilityModifier(state.ability_scores[ability]);

export const roll1d20 = () => Math.floor(Math.random() * 20) + 1;

export const rollAbilityCheck = (ability, state) => roll1d20() + getAbilityModifier(ability, state);

export const getSkillModifier = (skill, skillyByAbility, state) => {
    const ability = skillyByAbility[skill];
    const abilityModifier = getAbilityModifier(ability, state);
    const proficiencyBonus = state.proficiencies.proficiencyBonus;
    if (state.proficiencies.skills.includes(skill)) {
        return abilityModifier + proficiencyBonus;
    } else {
        return abilityModifier;
    };
};

export const rollSkillCheck = (skill, state) => roll1d20() + getskillmodifier(skill, skillyByAbility, state);

export const getSavingThrowModifier = (ability, state) => {
    const abilityModifier = getAbilityModifier(ability, state);
    const proficiencyBonus = state.proficiencies.proficiencyBonus;
    if (state.proficiencies.saving_throws.includes(ability)) {
        return abilityModifier + proficiencyBonus;
    } else {
        return abilityModifier;
    };
};

export const rollSavingThrow = (ability, state) => roll1d20() + getSavingThrowModifier(ability, state);