import {setProficiencyBonus, updateHeaderEntries} from '../domain.js';


export const getProficiencyBonus = (proficiencyBonus, state) => {
    proficiencyBonus.value = state.proficiencies.proficiencyBonus;
}

export const renderProficiencyBonus = (state) => {
    const proficiencyBonus = document.getElementById("sheet-header-proficiency-bonus");
    getProficiencyBonus(proficiencyBonus, state);
};

export const sheetHeader = (sheetHeaderEntries, state) => {
    const header = document.createElement("div");
    const root = document.getElementById("root");

    root.appendChild(header);
    header.setAttribute("id", "sheet-header");

    sheetHeaderEntries.forEach(labelText => {
        const headerEntry = document.createElement("div");
        const headerLabel = document.createElement("label")
        const headerLabelText = document.createTextNode(labelText);
        const headerEntryInput = document.createElement("input");

        headerLabel.appendChild(headerLabelText);
        headerEntry.appendChild(headerLabel);
        headerEntry.appendChild(headerEntryInput);
        headerEntryInput.className = "sheet-header-input";
        headerEntryInput.id = `sheet-header-${labelText.replace(" ", "-").toLowerCase()}`

        if (labelText === "level") {
            headerEntryInput.type = "number";
            headerEntryInput.value = 1;
            headerEntryInput.min = 1;
            headerEntryInput.max = 20;

            headerEntryInput.addEventListener("input", (e) => {
                updateHeaderEntries(e.target.value, state);
                setProficiencyBonus(state);
                renderProficiencyBonus(state);
            });
        };

        if (labelText === "proficiency bonus") {
            headerEntryInput.type = "number";
            headerEntryInput.value = 2;
            headerEntryInput.min = 2;
            headerEntryInput.max = 6;
            headerEntryInput.disabled = true;
        };

        header.appendChild(headerEntry);
    });

    root.appendChild(header);
};