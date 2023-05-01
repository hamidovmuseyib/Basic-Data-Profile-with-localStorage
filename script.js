var selectedRow = null;
var employees = []; 

function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();
        if (selectedRow == null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
        localStorage.setItem("employees", JSON.stringify(employees));
    }
}
function readFormData() {
    var formData = {};
    formData["fullName"] = document.getElementById("fullName").value;
    formData["city"] = document.getElementById("city").value;
    formData["eMail"] = document.getElementById("eMail").value;
    formData["number"] = document.getElementById("number").value;
    return formData;
}
function insertNewRecord(data) {
     employees.push(data); 

    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.fullName;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.city;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.eMail;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.number;
    cell4 = newRow.insertCell(4);
    cell4.innerHTML = `<a onClick="onEdit(this)">Düzəliş et</a>
                       <a onClick="onDelete(this)">Sil</a>`;
}

function resetForm() {
    document.getElementById("fullName").value = "";
    document.getElementById("city").value = "";
    document.getElementById("eMail").value = "";
    document.getElementById("number").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("fullName").value = selectedRow.cells[0].innerHTML;
    document.getElementById("city").value = selectedRow.cells[1].innerHTML;
    document.getElementById("eMail").value = selectedRow.cells[2].innerHTML;
    document.getElementById("number").value = selectedRow.cells[3].innerHTML;
}

function updateRecord(formData) {
     var index = selectedRow.rowIndex - 1;
     employees[index] = formData;

    selectedRow.cells[0].innerHTML = formData.fullName;
    selectedRow.cells[1].innerHTML = formData.city;
    selectedRow.cells[2].innerHTML = formData.eMail;
    selectedRow.cells[3].innerHTML = formData.number;
}

function onDelete(td) {
    if (confirm('Silmək istədiyinizə əminsiz ?')) {
        row = td.parentElement.parentElement;
         var index = row.rowIndex - 1;
        employees.splice(index, 1);
        document.getElementById("employeeList").deleteRow(row.rowIndex);
        resetForm();
        localStorage.setItem("employees", JSON.stringify(employees)); 
    }
}

function validate() {
    isValid = true;
    if (document.getElementById("fullName").value == "") {
        isValid = false;
        document.getElementById("fullNameValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("fullNameValidationError").classList.contains("hide"))
            document.getElementById("fullNameValidationError").classList.add("hide");
    }
    return isValid;
}

var storedEmployees = localStorage.getItem("employees");
if (storedEmployees) {
    employees = JSON.parse(storedEmployees);
    employees.forEach(function(employee) {         
        insertNewRecord(employee);
     });
 }
