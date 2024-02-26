let inputArea = document.querySelector('.input-area');
let addField = document.querySelector('#add-field');
let selected = document.querySelector('#adding-input');
let information = [];

addField.addEventListener('click', () => {
let inputValue = selected.value;
let newDiv = document.createElement('div')
let newLabel = document.createElement('label');
newLabel.textContent = `${inputValue} field: `;
let delButton = document.createElement('button');
delButton.textContent = 'Delete';
newDiv.appendChild(newLabel);
newDiv.className = 'newDiv'
let count = 1; 

if(inputValue !== "dropdown"){
    let newFiled = document.createElement('input');
    newFiled.type = inputValue
    newDiv.appendChild(newFiled);
    information.push({type: inputValue, label: `file-${inputValue}`, options: ['delete']});
}else{
    let newSelect = document.createElement('select');
    newSelect.appendChild(document.createElement('option')).textContent = "Choose";
    newDiv.appendChild(newSelect);
    let addButton = document.createElement('button');
    addButton.textContent = 'Add options';
    let buttonToDeleteOp = document.createElement('button');
    buttonToDeleteOp.textContent = 'X';
    newDiv.appendChild(buttonToDeleteOp)
    newDiv.appendChild(addButton);
    addButton.addEventListener('click', ()=>{
            let newOption = document.createElement('option');
            newOption.textContent = `option${count}`;
            newSelect.appendChild(newOption);
            count++;
            buttonToDeleteOp.addEventListener('click', () => {
                newOption.remove();
            })
    })
    information.push({type: inputValue, label: `file-${inputValue}`, options: ['delete', 'add option']});
}
newDiv.appendChild(delButton);
inputArea.appendChild(newDiv);
delButton.onclick = function() {
    newDiv.remove()
}

Sortable.create(inputArea, {
    animation: 150,
    handle: '.newDiv',
  });

})

function toExportFile(){
let jsonData = JSON.stringify(information);
let blob = new Blob([jsonData], {type: 'application/json'});
let aTag = document.createElement('a');
aTag.href = URL.createObjectURL(blob);
aTag.download = 'field-config.json';
aTag.click();
}

function toImportFile(event) {
let file = event.target.files[0];
let reader = new FileReader();
reader.onload = (elem) => {
    try {
        information = JSON.parse(elem.target.result);
      } catch (error) {
        alert('Invalid JSON file.');
      }
    };
    reader.readAsText(file);
}