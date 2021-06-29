import {createState} from './domain.js';
import {sheetHeaderEntries, allAbilities} from './data.js';
import { sheetHeader } from './components/sheet-header.js';
import { abilityList } from './components/ability-list.js';
import { skillsAndDependenciesList } from './components/skills-and-dependencies-list.js';

const render = () => {
    const state = createState();

    sheetHeader(sheetHeaderEntries, state);
    abilityList(allAbilities, state);
    // skillsAndDependenciesList(allAbilities, state);
};

render();