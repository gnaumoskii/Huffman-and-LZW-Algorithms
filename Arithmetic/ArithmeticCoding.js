const arithmeticForm = document.querySelector(".arithmetic-form");

let value;

const handleArithmetic = (event) => {
    let charMap = new Map();
    event.preventDefault();
    let inputElement = document.querySelector(".arithmetic-input");
    value = inputElement.value;
    inputElement.value = "";
    let currentRange = 0.0;
    for (let i = 0; i < value.length; i++) {
        
        if (charMap.has(value[i])) {
            charMap.get(value[i]).val++;
            charMap.get(value[i]).percentage = Number.parseFloat((charMap.get(value[i]).val / value.length)).toFixed(2);
        } else {
            charMap.set(value[i], { val: 1, percentage: Number.parseFloat((1 / value.length)).toFixed(2)});
        }
    }

    const elementsArray = convertMapToArr(charMap);
    let outputRange;

    const arithmeticCoding = (range, counter) => {
            if (counter == value.length) {
                outputRange = [...range];
                return;
            };
            let currentRange = range[0];
            if(counter >= 1) {
                for(let i=0;i<elementsArray.length;i++) {
                    if(i == elementsArray.length-1) {
                        elementsArray[i].range = [currentRange, range[1]];
                    } else {
                        elementsArray[i].range = [currentRange, (range[1] - range[0])* elementsArray[i].val + currentRange];
                    }
                    
                    currentRange += (range[1] - range[0])* elementsArray[i].val;
                }
            }
            let currentElement = elementsArray.find(element => element.letter == value[counter]);
            arithmeticCoding(currentElement.range, counter+1);
            
    }
    
    arithmeticCoding([0.0,1.0], 0);

    generateTable(elementsArray)

    const enteredDataElement = document.querySelector(".entered-value");
    enteredDataElement.textContent = value;
    const outputDataElement = document.querySelector(".output-value");
    let transformedOutput = outputRange.map(e => +e.toFixed(10));
    outputDataElement.textContent = `~[${transformedOutput.join(", ")}]`;

};


const convertMapToArr = (map) => {
    const arr = [];
    let temp = Array.from(map);
    temp = temp.sort();
    let currentRange = [0.0, 1.0];
    for (let element of temp) {
        arr.push({ letter: element[0], val: +element[1].percentage, range: [currentRange[0], currentRange[0] + currentRange[1] * +element[1].percentage] });
        currentRange[0] += currentRange[1] * +element[1].percentage;
    }
    return arr;
};



const generateTableRow = (element, table, tableBody) => {
    let tableRow = document.createElement("tr");
    let tableDataLetter = document.createElement("td");
    tableDataLetter.textContent = element.letter;
    let tableDataFrequency = document.createElement("td");
    tableDataFrequency.textContent = Number.parseFloat(element.val).toFixed(2);
    let tableDataFrequencyPercentage = document.createElement("td");
    tableDataFrequencyPercentage.textContent = Number.parseFloat(element.val * 100).toFixed(2) + "%";
    tableRow.append(tableDataLetter, tableDataFrequency,tableDataFrequencyPercentage);
    tableBody.append(tableRow);
};

const generateTable = (elementsArray) => {
    outputDataArray = [];
    const table = document.querySelector("table");
    let tableBody = document.querySelector("tbody");
    if (tableBody) {
        table.removeChild(tableBody);
        tableBody = document.createElement("tbody");
        table.append(tableBody);
    }

    for(const element of elementsArray) {
        generateTableRow(element, table, tableBody);
    }
};


arithmeticForm.addEventListener("submit", handleArithmetic);
