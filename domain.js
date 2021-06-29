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

export const getAbilityModifier = (ability, state) => abilityModifier(state.ability_scores[ability]);

export const proficiencyBonusAdaption = (state) => {
    const characterLevel = state.sheet_header_entries.level;
    const proficiencyIncreaseThresholds = [5, 9, 13, 17];
    let proficiencyBonusIncrease = 0;
    proficiencyIncreaseThresholds.forEach(thresholdLevel => {
        if (characterLevel >= thresholdLevel) { proficiencyBonusIncrease++ }
    });
    state.proficiencies.proficiency_bonus = 2 + proficiencyBonusIncrease;
    console.log("pb:", state.proficiencies.proficiency_bonus);
};

export const clamp = (min, max, value) => value < min ? min : value > max ? max : value;

export const updateHeaderEntries = (value, state) => {
    state.sheet_header_entries.level = value;
}