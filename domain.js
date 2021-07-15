// all functions that use state

export const createState = () => ({
    sheetHeaderEntries: {
        characterName: "",
        class: "",
        subclass: "",
        level: 1,
        background: "",
        alignment: "",
        race: "",
    },
    abilityScores: {
        strength: 10,
        dexterity: 10,
        constitution: 10,
        intelligence: 10,
        wisdom: 10,
        charisma: 10,
    },
    proficiencies: {
        proficiencyBonus: 2,
        armor: [],
        weapons: [],
        tools: [],
        skills: [],
        savingThrows: [],
    },
});

export const setCharacterName = (characterName, state) => state.sheetHeaderEntries.characterName = characterName;

export const setCharacterClass = (characterClass, state) => state.sheetHeaderEntries.class = characterClass;

export const getCharacterClass = state => state.sheetHeaderEntries.class;

export const setCharacterSubclass = (characterSubclass, state) => state.sheetHeaderEntries.subclass = characterSubclass;

export const getCharacterSubClass = state => state.sheetHeaderEntries.subclass;

export const setCharacterLevel = (characterLevel, state) => {
    state.sheetHeaderEntries.level = characterLevel;
};
export const getCharacterLevel = state => state.sheetHeaderEntries.level;

export const setCharacterBackground = (charackterBackground, state) => {
    state.sheetHeaderEntries.background = charackterBackground;
};
export const setCharacterAlignment = (characterAlignment, state) => {
    state.sheetHeaderEntries.alignment = characterAlignment;
};
export const setCharacterRace = (characterRace, state) => {
    state.sheetHeaderEntries.race = characterRace;
};

export const abilityModifier = ability => Math.floor((ability - 10) / 2);

export const clamp = (min, max, value) => value < min ? min : value > max ? max : value;

export const updateHeaderEntries = (value, state) => {
    state.sheetHeaderEntries.level = value;
};

export const setAbilityScore = (ability, clampedAbilityScore, state) => {
    state.abilityScores[ability] = clampedAbilityScore;
};

export const setProficiencyBonus = (state) => {
    const characterLevel = state.sheetHeaderEntries.level;
    const proficiencyIncreaseThresholds = [5, 9, 13, 17];
    let proficiencyBonusIncrease = 0;
    proficiencyIncreaseThresholds.forEach(thresholdLevel => {
        if (characterLevel >= thresholdLevel) { proficiencyBonusIncrease++; }
    });
    state.proficiencies.proficiencyBonus = 2 + proficiencyBonusIncrease;
};

export const getAbilityModifier = (ability, state) => abilityModifier(state.abilityScores[ability]);

export const roll1d20 = () => Math.floor(Math.random() * 20) + 1;

export const rollAbilityCheck = (ability, state) => { return { roll: roll1d20(), modifier: getAbilityModifier(ability, state) } };

export const getSkillModifier = (skill, skillsByAbility, state) => {
    const ability = skillsByAbility[skill];
    const abilityModifier = getAbilityModifier(ability, state);
    const proficiencyBonus = state.proficiencies.proficiencyBonus;
    if (state.proficiencies.skills.includes(skill)) {
        return abilityModifier + proficiencyBonus;
    } else {
        return abilityModifier;
    };
};

export const rollSkillCheck = (skill, skillsByAbility, state) => { return { roll: roll1d20(), modifier: getSkillModifier(skill, skillsByAbility, state) } };

export const getSavingThrowModifier = (ability, state) => {
    const abilityModifier = getAbilityModifier(ability, state);
    const proficiencyBonus = state.proficiencies.proficiencyBonus;
    if (state.proficiencies.savingThrows.includes(ability)) {
        const result = abilityModifier + proficiencyBonus;
        return result;
    } else {
        return abilityModifier;
    };
};

export const rollSavingThrow = (ability, state) => { return { roll: roll1d20(), modifier: getSavingThrowModifier(ability, state) } };

export const toggleSkillProficiency = (checkBoxClick, skill, state) => {
    if (checkBoxClick.target.checked) {
        state.proficiencies.skills.push(skill);
    } else {
        const skillsInState = state.proficiencies.skills;
        const skillToRemove = skillsInState.indexOf(skill);
        skillsInState.splice(skillToRemove);
    };
};

export const toggleSavingThrowProficiency = (checkBoxClick, ability, state) => {
    if (checkBoxClick.target.checked) {
        state.proficiencies.savingThrows.push(ability);
    } else {
        const savingThrowsInState = state.proficiencies.savingThrows;
        const savingThrowToRemove = savingThrowsInState.indexOf(ability);
        savingThrowsInState.splice(savingThrowToRemove);
    };
};
