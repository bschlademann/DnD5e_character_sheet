import { createState } from './domain.js';
import { sheetHeaderEntries, allAbilities, allSkills, skillsByAbility } from './data.js';
import { sheetHeader } from './components/sheet-header.js';
import { abilityList } from './components/ability-list.js';
import { skillsAndDependenciesList } from './components/skills-and-dependencies-list.js';

const render = () => {
    const state = createState();

    sheetHeader(sheetHeaderEntries, state);
    abilityList(allAbilities, state);
    skillsAndDependenciesList(allSkills, skillsByAbility, state);
};

render();

// TODO: fetch stuff from dnd5api (class, saves, etc)