const encryptionForm = document.querySelector(".encryption-form");




let encryptedOutput = "";
const LZW = (message) => {
    const combinations = [];
    const encrypted = [];
    if(!message) return;
    for (let i = 0; i < message.length; i++) {
        if (!combinations.includes(message[i])) {
            combinations.push(message[i]);
        }
    }

    for (let i = 0; i < message.length; i++) {
        if (combinations.includes(message[i])) {
            let newCombination = message[i];
            if(i == message.length-1) {
                encrypted.push(combinations.indexOf(newCombination) + 1);
                break;
            }
            for (let j = i + 1; j < message.length; j++) {
                newCombination += message[j];
                if (!combinations.includes(newCombination)) {
                    encrypted.push(combinations.indexOf(newCombination.slice(0, newCombination.length - 1)) + 1);
                    combinations.push(newCombination);
                    if (newCombination.length >= 3) {
                        i += newCombination.length - 2;
                    }
                    break;
                }

                if (j == message.length - 1) {
                    if (!combinations.includes(newCombination)) {
                        combinations.push(newCombination);
                        encrypted.push(combinations.indexOf(newCombination.slice(0, newCombination.length - 1)) + 1);
                    } else {
                        encrypted.push(combinations.indexOf(newCombination) + 1);
                    }
                    i = message.length;
                }
            }
        }
    }
    console.log(combinations);
    console.log(encrypted);
    encryptedOutput=encrypted.join("");

    generateTable(combinations);
};

const generateTable = (combinations) => {
    let existingTable = document.querySelector(".combinations-value table");
    if(existingTable) {
        document.querySelector(".combinations-value").removeChild(existingTable);
    }
    let table = document.createElement("table");
    table.classList = "table table-sm";
    document.querySelector(".combinations-value").append(table);
    let tableHead = document.createElement("thead");
    let tableBody = document.createElement("tbody");
    let tableHeadRow = document.createElement("tr");
    let tableHeadRowIndex = document.createElement("th");
    let tableHeadRowEntry = document.createElement("th");
    tableHeadRowIndex.textContent = "index";
    tableHeadRowEntry.textContent = "entry";
    tableHeadRow.append(tableHeadRowIndex,tableHeadRowEntry);
    tableHead.append(tableHeadRow);
    table.append(tableHead);
    
    for(let i=0;i<combinations.length;i++) {
        let tableRow = document.createElement("tr");
        let tableDataIndex = document.createElement("td");
        let tableDataEntry = document.createElement("td");
        tableDataIndex.innerHTML = `<b>${i+1}</b>`;
        tableDataEntry.textContent = combinations[i];
        tableRow.append(tableDataIndex, tableDataEntry);
        tableBody.append(tableRow);
        table.append(tableBody);
    }
}

const handleEncryption = (event) => {
    event.preventDefault();
    let inputElement = document.querySelector(".encryption-input");
    LZW(inputElement.value);
    document.querySelector(".entered-value").textContent = inputElement.value;
    document.querySelector(".output-value").textContent = encryptedOutput;
    inputElement.value = "";
}

encryptionForm.addEventListener("submit", handleEncryption);
