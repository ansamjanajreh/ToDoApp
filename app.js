const TASKS_KEY = "TASKS";
let tasks = [];

//check if the localStorage
const savedTasks = localStorage.getItem(TASKS_KEY);
if (savedTasks) {
  tasks = JSON.parse(savedTasks);
} else {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}

//update the array in localStorage
const updateLocalStorage = () => {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
};

//function to update "tasks" array
const updateTasks = () => {
  const savedTasks = localStorage.getItem(TASKS_KEY);
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
  }
};

const toDoList = () => {
  console.log(`
Task Manager Menu:
1- Add New Task
2- Display Tasks
3- Toggle Task
4- Edit Task
5- Delete Task
6- Search Task
7- Exit
    `);
};

//to display the tasks
const displayTasks = () => {
  updateTasks();
  if (tasks.length === 0) console.log("No Tasks");
  else
    tasks.forEach((task, index) =>
      console.log(
        `${index + 1} - ${task.desc} [${
          task.completed ? "Completed" : "Not Completed"
        }]`
      )
    );
};

//to add tast
const addTask = () => {
  const newTask = prompt("Enter Task Description");
  tasks.push({ desc: newTask, completed: false });
  updateLocalStorage();
  console.log("Task Added");
};

//to edit on tasks state
const toggleTask = () => {
  const taskId = parseInt(prompt("Enter Task id To Update Task State")) - 1;
  if (tasks[taskId]) {
    tasks[taskId].completed = !tasks[taskId].completed;
    console.log("Task toggle complete");
  } else {
    console.log("Task Not Found");
  }
  updateLocalStorage();
};

//to edit on task description
const editTask = () => {
  const taskId = parseInt(prompt("Enter Task id To Update")) - 1;
  if (tasks[taskId]) {
    const newDescription = prompt("Enter New Description :");
    tasks[taskId].desc = newDescription;
    console.log("Task Updated Successfully");
  } else {
    console.log("Task Not Found");
  }
  updateLocalStorage();
};

//to delete the task
const deleteTask = () => {
  const taskId = parseInt(prompt("Enter Task id To Delete")) - 1;
  if (tasks[taskId]) {
    tasks.splice(taskId, 1);
    console.log("Task deleted.");
  } else {
    console.log("Task not found.");
  }
  updateLocalStorage();
};

//to search in tasks using term
const search = () => {
  updateTasks();
  const term = prompt("Enter Search Term");

  if (term === null || term.trim() === "") {
    console.log("Search term cannot be empty or null.");
    return;
  }

  const res = tasks.filter(
    (task) => task.desc && task.desc.toLowerCase().includes(term.toLowerCase())
  );

  if (res.length) {
    res.forEach((task, index) => {
      console.log(
        `${index + 1} - ${task.desc} [${
          task.completed ? "Completed" : "Not Completed"
        }]`
      );
    });
  } else {
    console.log("No Tasks Found");
  }
};

const getValidInput = () => {
  const Input = parseInt(prompt("Please Enter Your Input (1-7) :"));
  if (isNaN(Input) || Input > 7 || Input < 1)
    return "Invalid Value! , Try Again ";
  else return Input;
};

let isRunning = true;
while (isRunning) {
  toDoList();

  let n = getValidInput();
  switch (n) {
    case 1:
      addTask();
      break;
    case 2:
      displayTasks();
      break;
    case 3:
      toggleTask();
      break;
    case 4:
      editTask();
      break;
    case 5:
      deleteTask();
      break;
    case 6:
      search();
      break;
    case 7:
      console.log("Thanks For Using Tasks Application");
      isRunning = false;
      break;

    default:
      console.log("Invalid Value, try again");
      break;
  }
}
