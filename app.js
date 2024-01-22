// Global variables
const addNewTaskBtn = document.querySelector(".add-new-task-btn");
const taskForm = document.querySelector(".task-form");
const cancelBtn = document.querySelector(".cancel-btn");

// Displaying taskform div
addNewTaskBtn.addEventListener("click", () => {
    taskForm.classList.remove("hidden");
})

// Hiding taskform div
cancelBtn.addEventListener("click", () => {
    taskForm.classList.add("hidden");
    clearInputFields();
})

// Viewing more function
const viewMore = () => {
    const viewMoreBtn = document.querySelectorAll(".view-more-btn");
    viewMoreBtn.forEach(viewMore => {
        let div = viewMore.parentElement.nextElementSibling;
        viewMore.addEventListener("click", () => {
            div.classList.toggle("hidden");
        })
    })
}

// Displaying today's date function
const today = new Date();
const longDay = new Date().toLocaleString('en-us', {  weekday: 'long' })
const shortDay = today.getDate();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const todayDate = longDay + ", " + ("0" + shortDay).slice(-2) + "." + ("0" + month).slice(-2) + "." + year;
const dateParagraph = document.querySelector(".tasks-area .date");
dateParagraph.innerHTML = todayDate;


// Collecting data from the form
const confirmTaskBtn = document.querySelector(".confirm-task-btn");
confirmTaskBtn.addEventListener("click", () => {
    let title = document.querySelector(".titleInput").value;
    let description = document.querySelector(".descriptionInput").value;
    let list = document.querySelector(".listSelector").value;
    let date = document.querySelector(".dateSelector").value;

    if (title === "") {
        alert("Podaj tytuł");
    }
    else {
        const tasksDiv = document.querySelector(".tasks-area .tasks");
        tasksDiv.innerHTML += 
        `    
        <div class="task">
            <div class="short">
                <label><input type="checkbox" name="checkbox" value="${title}">${title}</label>
                <button class="view-more-btn"><i class="fa-solid fa-chevron-right"></i></button>
            </div>
    
            <div class="view-more">
                <div class="description">${description}</div>
                <div class="subtasks-list">
                    <ul>
                        
                    </ul>
                </div>
                <div class="task-info">
                    <div class="list"><div class="color"></div>${list}</div>
                    <div class="subtasks"><div class="list-quantity">${subtasks.length}</div> Subtasks</div>
                    <div class="date"><i class="fa-solid fa-calendar-xmark"></i> ${date.split("-").reverse().join("-")}</div>
                    <div class="settings">
                        <i class="fa-solid fa-ellipsis"></i>
                        <div class="settings-box">
                            <div class="setting"><i class="fa-solid fa-pen-to-square"></i> Edit</div>
                            <div class="setting"><i class="fa-solid fa-trash"></i> Delete</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
        viewMore();
        clearInputFields();
        openTaskSettings();
        addSubtaskToList();
    }

})

// Clearing input fields
const clearInputFields = () => {
    document.querySelector(".titleInput").value = "";
    document.querySelector(".descriptionInput").value = "";
    document.querySelector(".listSelector").value = "Personal";
    document.querySelector(".dateSelector").value = "";
    document.querySelector(".subtasks-list ul").innerHTML = "";
}

// Opening settings of task
const openTaskSettings = () => {
    const settingsIcon = document.querySelectorAll(".task-info .settings");
    settingsIcon.forEach(e => {
        e.addEventListener("click", () => {
            const settingsBox = e.children[1];
            settingsBox.classList.toggle("active");
        })
    })
}

// Adding subtasks to list
const addSubtaskToList = () => {
    let subtaskInput = document.querySelector(".add-subtask-input");
    let subtasks = [];
    subtaskInput.addEventListener("keyup", (ev) => {
        if (ev.key === "Enter") {
            let subtaskList = document.querySelector(".subtasks-list ul");
            const subtask = subtaskInput.value;
            subtaskList.innerHTML += `<li>${subtask}</li>`
            subtasks.push(subtask);
            document.querySelector(".add-subtask-input").value = "";
        }
    })
}


let yourList = [];

// Adding new list to sidebar
const addNewListPopup = document.querySelector(".add-new-list-popup");
const addNewListBtn = document.querySelector(".add-new-list-btn");
const lists = document.querySelector(".sidebar .lists");
const listNameSelector = document.querySelector(".listnameSelector");

addNewListBtn.addEventListener("click", () => {
    addNewListPopup.classList.add("active");
    listNameSelector.addEventListener("keyup", (ev) => {
        if (ev.key === "Enter") {
            const listNameSelectorValue = document.querySelector(".listnameSelector").value;
            const colorSelector = document.querySelector(".colorSelector").value;
            if (listNameSelectorValue === "") {
                alert("Podaj nazwę listy!");
            }
            else {
                addNewListPopup.classList.remove("active");
                lists.innerHTML += 
                `
                <div class="list">
                    <div class="list-color" style="background: ${colorSelector}"></div>
                    <div class="list-name">${listNameSelectorValue}</div>
                    <div class="list-quantity">0</div>
                </div>
                `
                yourList.push(listNameSelectorValue);
                updateListSelector();
            }
        }
    })
})


// Updating select list tag
const updateListSelector = () => {
    const listSelector = document.querySelector(".listSelector");
    for (let i = 0; i < yourList.length; i++) {
        listSelector.innerHTML += `
            <option>${yourList[i]}</option>
        `
    }
}