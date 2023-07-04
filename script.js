const form = document.getElementById("form");
const students = [];

//student to be edited
let editedStudent=null;

//added event listener to submit button
form.addEventListener("submit",getFormData)
//collecting data from form
function getFormData(event){
    
    event.preventDefault();
    let formElement=event.target;
    const button = document.getElementsByTagName("button")[0];
    //checking whether editing existing data or adding new data
    if(button.innerText ==="Edit Student"){
        //editing existing record
        editedStudent.name = formElement["name"].value ;
        editedStudent.age = formElement["age"].value ;
        editedStudent.grade =formElement["gpa"].value ;
        editedStudent.degree = formElement["degree"].value ;
        editedStudent.email = formElement["email"].value ;
        button.innerText="Add Student";
        button.className="add-student"; 
    }else{
        //adding new record
        let userData = {
            ID : students[students.length -1] === undefined ? 1 : students[students.length - 1].ID +1,
            name: formElement["name"].value, 
            age:formElement["age"].value,
            grade: formElement["gpa"].value, 
            degree: formElement["degree"].value, 
            email: formElement["email"].value
        }
        //pushing form data into students
        students.push(userData);        
    }
    //displaying row into the table
    addDataIntoTable(students);
    //reset form after submission
    event.target.reset();
}
//displaying table onto UI
function addDataIntoTable(students){
    const tableData = document.getElementById("tableData");
    tableData.innerHTML="";
    students.forEach((userData) => {
        let {ID,name,age,grade,degree,email}=userData;
        let tableRow = document.createElement("tr");
        tableRow.innerHTML = `<td class="id">${ID}</dh>
        <td class="name">${name}</td>
        <td class="email">${email}</td>
        <td class="age">${age}</td>
        <td class="gpa">${grade}</td>
        <td class="degree">
            <div class="degree-name">${degree}</div>
            <div class="items">
                <button >
                    <img class="edit" src="./icons/edit.png" alt="edit">
                </button>
                 <button >
                    <img class="delete" src="./icons/delete.png" alt="delete">
                </button>
            </div>
        </td>
        `;
        tableData.appendChild(tableRow);
    })
}
//adding events listeners on table to edit and delete record
const table = document.getElementById("table");
table.addEventListener("click" , (e) => {
    //deleteing the row data
    if(e.target.classList.contains("delete")){
        const row = e.target.closest("tr");
        const rowID = row.children[0].innerText ;
        let index;
        //deleteing record from students array
        for(let i = 0 ;i < students.length; i++){
            if(rowID == students[i].ID){
                index=i;
                break;
            }
        }
        students.splice(index,1);
        row.remove();
    }
    //editing the exisitng record
    if(e.target.classList.contains("edit")){
        const row = e.target.closest("tr");
        const rowID = row.children[0].innerText ;
        const button = document.getElementsByTagName("button")[0];
        button.innerText="Edit Student";
        button.className="edit-student";
        let column=row.children;
        //prefilling the existing data
        form["name"].value = column[1].innerText;
        form["email"].value = column[2].innerText ;
        form["age"].value = column[3].innerText;
        form["gpa"].value = column[4].innerText ;
        form["degree"].value = column[5].innerText ;
        //assigning record to be edited to global variable editedStudent
        for(let i = 0 ;i < students.length; i++){
            if(rowID == students[i].ID){
                editedStudent=students[i];
                break;
            }
        }
    }
})

const search = document.getElementById("searchInput");
//searching record in the table
search.addEventListener("keyup",(e)=>{
    const searchedString=search.value.toLowerCase().trim();
    let filteredData = [];

    students.forEach(data => {
        let {name,email,degree} = data;
        if(name.toLowerCase().includes(searchedString) || 
                 email.toLowerCase().includes(searchedString) || 
                 degree.toLowerCase().includes(searchedString)){
            filteredData.push(data);
        }
    })
    addDataIntoTable(filteredData)
})