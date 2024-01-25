// Global variables
const addNewTaskBtn = document.querySelector(".add-new-task-btn");
const taskForm = document.querySelector(".task-form");
const cancelBtn = document.querySelector(".cancel-btn");

const duringQt = document.querySelector(".during-qt");
const endedQt = document.querySelector(".ended-qt");
const todayQt = document.querySelector(".today-qt");
let listBackground = ["#ff3c3c", "#7676ff", "#7eff64"];
let duringQuantity = 0;
let endedQuantity = 0;
let todayQuantity = 0;

// Displaying taskform div
addNewTaskBtn.addEventListener("click", () => {
    taskForm.classList.remove("hidden");
})

// Hiding taskform div
cancelBtn.addEventListener("click", () => {
    taskForm.classList.add("hidden");
    clearInputFields();
})

// Displaying today's date function
const today = new Date();
const longDay = new Date().toLocaleString('en-us', {  weekday: 'long' })
const shortDay = today.getDate();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const todayDate = longDay + ", " + ("0" + shortDay).slice(-2) + "." + ("0" + month).slice(-2) + "." + year;
const dateParagraph = document.querySelector(".tasks-area .date");
dateParagraph.innerHTML = todayDate;


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

// Collecting data from the form
const confirmTaskBtn = document.querySelector(".confirm-task-btn");
confirmTaskBtn.addEventListener("click", () => {
    let title = document.querySelector(".titleInput").value;
    let description = document.querySelector(".descriptionInput").value;
    let list = document.querySelector(".listSelector").value;
    let date = document.querySelector(".dateSelector").value;
    let bg;

    if (title === "") {
        alert("Podaj tytuł");
    }
    else {
        const tasksDiv = document.querySelector(".tasks-area .tasks");

        // List color function
        let selectElement = document.querySelectorAll(".listSelector");
        let optionNames = [...selectElement[0].options].map(o => o.text)
        for (let i = 0; i < optionNames.length; i++) {
            if (optionNames[i] == list) {
                bg = listBackground[i];
            }
        }

        tasksDiv.innerHTML += 
        `    
        <div class="task">
            <div class="short">
                <label><input type="checkbox" class="task-chkbox" name="checkbox" value="${title}"><p>${title}</p></label>
                <button class="view-more-btn"><i class="fa-solid fa-chevron-right"></i></button>
            </div>
    
            <div class="view-more">
                <div class="description">${description}</div>
                <div class="task-info">
                    <div class="list"><div class="color" style="background: ${bg}"></div>${list}</div>
                    <div class="subtasks">
                        <div class="list-quantity">${subtasks.length}</div> Subtasks
                        <div class="subtasks-list-hover">
                        </div>
                    </div>
                    <div class="date"><i class="fa-solid fa-calendar-xmark"></i> ${date.split("-").reverse().join("-")}</div>
                    <div class="settings">
                        <i class="fa-solid fa-ellipsis"></i>
                        <div class="settings-box">
                            <div class="setting edit-task-btn"><i class="fa-solid fa-pen-to-square"></i> Edit</div>
                            <div class="setting delete-task-btn"><i class="fa-solid fa-trash"></i> Delete</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `

        subtasks = [];
        console.log(subtasks)

        const todayDateCheck = year + "-" + ("0" + month).slice(-2) + "-" + ("0" + shortDay).slice(-2)
        if (date === todayDateCheck) {
            todayQuantity++;
            todayQt.innerHTML = todayQuantity;
        }

        duringQuantity++;
        duringQt.innerHTML = duringQuantity;

        const taskChkbox = document.querySelectorAll(".task-chkbox");
        taskChkbox.forEach(chkbox => {
            chkbox.addEventListener("click", () => {
                const taskName = chkbox.parentElement.children[1];
                taskName.style.textDecoration = "line-through";
                chkbox.disabled = true;
                duringQuantity--;
                endedQuantity++;
                duringQt.innerHTML = duringQuantity;
                endedQt.innerHTML = endedQuantity;
            })
        })

        changeQuantity();
        viewMore();
        clearInputFields();
        openTaskSettings();
        deleteTask();
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
let subtaskInput = document.querySelector(".add-subtask-input");
let subtasks = [];
subtaskInput.addEventListener("keyup", (ev) => {
    if (ev.key === "Enter") {
        let subtaskList = document.querySelector(".subtasks-list ul");
        const subtask = subtaskInput.value;
        subtaskList.innerHTML += `<li>${subtask}</li>`
        subtasks.push(subtask);
        const subtasksList = document.querySelector(".subtasks-list-hover");
        subtasksList.innerHTML += `<p>${subtask}</p>`
        document.querySelector(".add-subtask-input").value = "";
    }
})


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

                // updateListSelector();
                listBackground.push(colorSelector);
                
            }
        }
    })
})

// Removing task by clicking delete button (includes function for subtracting quantities)
const deleteTask = () => {
    const listQuantity = document.querySelectorAll(".lists .list-quantity");
    const deleteTaskBtn = document.querySelectorAll(".delete-task-btn");

    deleteTaskBtn.forEach(btn => {
        btn.addEventListener("click", () => {
            const task = btn.parentElement.parentElement.parentElement.parentElement.parentElement;
            const listName = btn.parentElement.parentElement.parentElement.children[0].textContent;
            console.log(listName);
            task.remove();

            listQuantity.forEach(list => {
                let quantity = parseInt(list.textContent);
                const sidebarListName = list.previousElementSibling.textContent;
                if (listName === sidebarListName) {
                    quantity--;
                    list.innerHTML = quantity;
                }
            })
        })
    })
}

// Quantity system
const changeQuantity = () => {
    const listSelector = document.querySelector(".listSelector").value;
    const listQuantity = document.querySelectorAll(".lists .list-quantity");
    listQuantity.forEach(list => {
        let quantity = parseInt(list.textContent);
        const listName = list.previousElementSibling.textContent;
        if (listName === listSelector) {
            quantity++;
            list.innerHTML = quantity;
        }
    })
}

// Dark theme
const darkthemeBtn = document.querySelector(".darktheme-btn");
darkthemeBtn.addEventListener("click", () => {
    document.documentElement.style.setProperty('--sidebarBg', '#1e262e');
    document.documentElement.style.setProperty('--sidebarHover', '#303e4d');
    document.documentElement.style.setProperty('--black', '#fff');
    document.documentElement.style.setProperty('--white', '#293540');
    document.documentElement.style.setProperty('--input', '#f2f2f2');
    document.documentElement.style.setProperty('--text', '#cfd9e3');
    document.documentElement.style.setProperty('--circle', '#3e4f5e');
    document.documentElement.style.setProperty('--stroke', '#3e4f5e');
    document.querySelector(".add-new-task-btn").style.color = "#fff";
    document.querySelector(".confirm-task-btn").style.color = "#fff";

})


// Open mobilemenu 
const mobileMenuBtn = document.querySelector(".mobileMenu");
mobileMenuBtn.addEventListener("click", () => {
    const sidebar = document.querySelector(".sidebar");
    sidebar.classList.add("active");
})