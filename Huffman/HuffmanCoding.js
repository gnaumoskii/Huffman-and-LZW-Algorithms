const huffmanForm = document.querySelector(".huffman-form");

let value;
let outputDataArray = [];
//let elementsArray = [];

class Node {
    constructor(firstElement, secondElement, val) {
        this.val = val;
        this.left = firstElement;
        this.right = secondElement;
    }
}

class BinaryTree {
    constructor(rootNode) {
        this.root = rootNode;
    }
}

const huffmanCodingHandler = (event) => {
    let charMap = new Map();
    event.preventDefault();
    let inputElement = document.querySelector(".huffman-input");
    value = inputElement.value;
    inputElement.value = "";

    for (let i = 0; i < value.length; i++) {
        if (charMap.has(value[i])) {
            charMap.get(value[i]).val++;
            charMap.get(value[i]).percentage = Number.parseFloat((charMap.get(value[i]).val / value.length) * 100).toFixed(2);
        } else {
            charMap.set(value[i], { val: 1, percentage: Number.parseFloat((1 / value.length) * 100).toFixed(2) });
        }
    }

    //console.log(charMap);
    const arr = convertMapToArr(charMap);
    const elementsArray = convertMapToArr(charMap);
    //console.log(arr);
    //console.log(arr);
    const binaryTree = new BinaryTree(generateTree(arr));
    console.log(binaryTree);
    //console.log(elementsArray);
    generateTable(binaryTree, elementsArray);
    encodeData(value);
};

const convertMapToArr = (map) => {
    const arr = [];
    let temp = Array.from(map);
    temp = temp.sort((a, b) => +a[1].percentage - +b[1].percentage);
    for (let element of temp) {
        arr.push({ letter: element[0], val: +element[1].percentage });
    }
    
    return arr;
};

const generateTree = (arr) => {
    while (arr.length > 1) {
        let firstTwo = arr.splice(0, 2);
        let rest = arr.splice(0);
        let newNode = new Node(firstTwo[0], firstTwo[1], +firstTwo[0].val + +firstTwo[1].val);
        if (rest.length == 0) {
            arr.push(newNode);
        } else {
            arr.push(newNode);
            arr.push(...rest);
        }
        console.log(arr);
        console.log(newNode);
    }

    return arr[0];
};

const getBinaryCode = (node, element) => {
    let code = "";
    let tempCode = [];
    const findElementInTree = (currentNode, temp) => {
        if (currentNode.val == element.val && currentNode.letter == element.letter) {
            if (temp.length) {
               // console.log(temp);
                code = temp.join("");
            } else {
                code = "0";
            }
        }
        if (currentNode.left) {
            temp.push("0");
            findElementInTree(currentNode.left, temp);
            
        }
        if (currentNode.right) {
            temp.push("1");
            findElementInTree(currentNode.right, temp);
            
        }
        temp.pop();
    };

    findElementInTree(node, tempCode);
    return code;
};

const generateTableRow = (element, code, table, tableBody) => {
    let tableRow = document.createElement("tr");
    let tableDataLetter = document.createElement("td");
    tableDataLetter.textContent = element.letter;
    let tableDataCode = document.createElement("td");
    tableDataCode.textContent = code;
    let tableDataFrequency = document.createElement("td");
    tableDataFrequency.textContent = Number.parseFloat(element.val / 100).toFixed(2);
    let tableDataFrequencyPercentage = document.createElement("td");
    tableDataFrequencyPercentage.textContent = element.val + "%";
    tableRow.append(tableDataLetter, tableDataFrequency,tableDataFrequencyPercentage, tableDataCode);
    tableBody.append(tableRow);
};

const generateTable = (binaryTree, elementsArray) => {
    outputDataArray = [];
    const table = document.querySelector("table");
    let tableBody = document.querySelector("tbody");
    if (tableBody) {
        table.removeChild(tableBody);
        tableBody = document.createElement("tbody");
        table.append(tableBody);
    }

    for (let i = 0; i < elementsArray.length; i++) {
        let binaryCode = getBinaryCode(binaryTree.root, elementsArray[i]);
        outputDataArray.push({...elementsArray[i], binary: binaryCode});
        generateTableRow(elementsArray[i], binaryCode, table, tableBody);
    }
    console.log(outputDataArray);
};


const encodeData = (inputData) => {
    let encoded = "";
    for(let i=0;i<inputData.length; i++) {
        encoded += outputDataArray.find(element => element.letter == inputData[i]).binary;
    }
    
    const inputElement = document.querySelector(".entered-value");
    inputElement.textContent = inputData;
    const outputElement = document.querySelector(".output-value");
    outputElement.textContent = encoded;
}

huffmanForm.addEventListener("submit", huffmanCodingHandler);
