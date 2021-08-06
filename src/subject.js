// const subjectForm = document.getElementById("subject-form");
// const subjectInput = document.querySelector("#subject-form input");
// const subjectDropdown = document.querySelector("#subject-select");
// const subjectDeleteButton = document.querySelector("#subject-form button");

// const SUBJECT_KEY = "subjects";

// // https://stackoverflow.com/questions/7843355/submit-two-forms-with-one-button

// let subjectList=[];

// function saveSubjects() {
//     localStorage.setItem(SUBJECT_KEY, JSON.stringify(subjectList));
// }

// function paintSubject(newSubject) {
//     const option = document.createElement("option");
//     option.id = newSubject.id;
//     option.innerText = newSubject.text;
//     subjectDropdown.appendChild(option);
// }

// function handleSubjectSubmit(event) {
//     event.preventDefault();
//     const newSubject = subjectInput.value;
//     subjectInput.value = "";
//     const newSubjectObj = {
//         text: newSubject,
//         id: Date.now(),
//     };
//     subjectList.push(newSubjectObj);
//     paintSubject(newSubjectObj);
//     saveSubjects();
// }

// subjectDeleteButton.addEventListener("submit",deleteSubject);
       


// const savedSubjects = localStorage.getItem(SUBJECT_KEY);

// if (savedSubjects !== null) {
//     const parsedSubjects = JSON.parse(savedSubjects);
//     subjectList=parsedSubjects;
//     parsedSubjects.forEach(paintSubject)
// }