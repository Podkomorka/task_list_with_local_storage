// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

// Define loader
function loadEventListeners() {

  // DOM Load event, this happens on page load
  document.addEventListener('DOMContentLoaded', getTasks);

  // Add task event
  form.addEventListener('submit', addTask);

  // Remove task event
  taskList.addEventListener('click', removeTask);

  // Clear all task event
  clearBtn.addEventListener('click', clearTasks);

  // Filter tasks event
  filter.addEventListener('keyup', filterTasks);
}

// Gets Tasks from Local Storage and creates the list of tasks
// we call this function in the page loader event
function getTasks() {

  let tasks;

  // if there isnt a task list in local storage make one
  if(localStorage.getItem('tasks') === null) {

    tasks = [];

  } else {

    // otherwise grab the task list from local storage and turn it into an array
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){

    // Create li element
    const li = document.createElement('li');

    // Add class
    li.className = 'collection-item';

    // Create text node and append to li
    li.appendChild(document.createTextNode(task));

    // Create new link element
    const link = document.createElement('a');

    // Add class
    link.className = 'delete-item secondary-content';

    // Add icon html
    link.innerHTML = '<i class="fa-solid fa-x"></i>';

    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);
  })
}

// Add Task
function addTask(e) {

  // Check if task field is blank
  if(taskInput.value.trim() == '') {

    // Alert
    alert('Cannot leave task field blank');

    // Clear input field
    taskInput.value = '';
  } else {

    // Create li element
    const li = document.createElement('li');

    // Add class
    li.className = 'collection-item';

    // Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));

    // Create new link element
    const link = document.createElement('a');

    // Add class
    link.className = 'delete-item secondary-content';

    // Add icon html
    link.innerHTML = '<i class="fa-solid fa-x"></i>';

    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);

    // Store in Local Storage
    storeTaskInLocalStorage(taskInput.value);

    // Clear input field
    taskInput.value = '';
  }

  e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task) {

  let tasks;

  // if there isnt a task list in local storage make one
  if(localStorage.getItem('tasks') === null) {

    tasks = [];

  } else {

    // otherwise grab the task list from local storage and turn it into an array
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  // add the new task onto the array of tasks
  tasks.push(task);

  // set the local storage to the new set of tasks turned back into a string
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task
function removeTask(e) {

  // If click an X icon with parent that is a delete button (if you clicked the X)
  if(e.target.parentElement.classList.contains('delete-item')) {

    // If the confirmation alert is ok
    if(confirm(`Delete ${e.target.parentElement.previousSibling.textContent}?`)) {

      // Remove the entire li associated with that X
      e.target.parentElement.parentElement.remove();

      // call Remove from local storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove a task from local Storage
function removeTaskFromLocalStorage(taskItem) {

  let tasks;

  // if there isnt a task list in local storage make one
  if(localStorage.getItem('tasks') === null) {

    tasks = [];
 
  } else {

    // otherwise grab the task list from local storage and turn it into an array
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  
  // Check each task in local storage
  tasks.forEach(function(task, index){

    // When it finds the task you're trying to delete
    if(taskItem.textContent === task) {

      // Delete it from the task array
      tasks.splice(index, 1);
    }
  });

  // set the local storage to the new set of tasks turned back into a string
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Tasks
function clearTasks(e) {

  // Slower method because the browser needs to parse the HTML
  // taskList.innerHTML = '';

  // Faster because directly modifies the DOM
  // While there is an li in the ul
  while(taskList.firstChild) {

    // Remove the first li
    taskList.removeChild(taskList.firstChild);
  }

  // call Clear from local storage
  clearTasksFromLocalStorage();
}

// Clear Tasks from local storage
function clearTasksFromLocalStorage() {

  // remove the entire tasks list from local storage
  localStorage.removeItem('tasks');
}

// Filter Tasks
function filterTasks(e) {

  // Save current value typed in the filter
  const text = e.target.value.toLowerCase();

  // get a node list of all li's and for each of them
  // hide the li unless the typed filter value is in the li text node
  document.querySelectorAll('.collection-item').forEach(function(task) {

    // Get text of the li
    const item = task.firstChild.textContent;

    // indexOf returns the position of first instance of value, or -1 if none
    if(item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}
