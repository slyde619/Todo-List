// Define UI variables
const form = document.querySelector('#form-task')
const taskList = document.querySelector('.collection')
const clearBtn = document.querySelector('.clear-tasks')
const filter = document.querySelector('#filter')
const taskInput = document.querySelector('#task')

// Load all event listeners
loadEventListeners()

// Load event listeners
function loadEventListeners(){
  // DOM load event
  document.addEventListener('DOMContentLoaded', getTask)
  // Add Task event
  form.addEventListener('submit', addTask)
  // Remove task 
  taskList.addEventListener('click', deleteTask)
  // Clear Tasks
  clearBtn.addEventListener('click', clearTasks) 
  // Filter Task Events
  filter.addEventListener('keyup', filterTasks)
}

// Get Task
function getTask(){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = []
  } else{
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }
  // loop through each task
  tasks.forEach(function(task){
    // create li element
    const li = document.createElement('li')

    // Add className
    li.className = 'collection-item'

    // Create text node and append to li
    li.appendChild(document.createTextNode(task))

    // create new link element
    const link = document.createElement('a')
    // add className
    link.className = 'delete-item secondary-content'

    // Add icon html
    link.innerHTML = `<i class="fas fa-times clear"></i>`

    // Append link to li
    li.appendChild(link)

    // Append li to ul
    taskList.appendChild(li)
  })

}
// Add Task
function addTask(e){

  if(taskInput.value === ''){
    alert('Add a task')
    
  } 

  // create li element
  const li = document.createElement('li')

  // Add className
  li.className = 'collection-item'

  // Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value))

  // create new link element
  const link = document.createElement('a')
  // add className
  link.className = 'delete-item secondary-content'

  // Add icon html
  link.innerHTML = `<i class="fas fa-times clear"></i>`

  // Append link to li
  li.appendChild(link)

  // Append li to ul
  taskList.appendChild(li)

  // Store Task in Local Storage
  storeTasksInLocalStorage(taskInput.value)


  // clear task after submission
  taskInput.value = ''
  e.preventDefault()

}

// Store tasks In LS
function storeTasksInLocalStorage(taskLists){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = []
  } else{
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.push(taskLists)
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

// Delete Task function
function deleteTask(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are you sure?')){
      e.target.parentElement.parentElement.remove()

      // Remove Task from lS once deleted
      removeTaskFromLocalStorage(e.target.parentElement.parentElement)
    }
  }
}

// Remove Task From LS
function removeTaskFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = []
  } else{
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }
  
  // Loop through it
  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1)
    }
  })
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

// Clear Tasks
function clearTasks(){

  // taskList.innerHTML = ''

  // faster Approach
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild)
  }

  filter.value = ' '

  // Clear From LS
  clearTaskFromLocalStorage()
}

function clearTaskFromLocalStorage(){
  localStorage.clear()
}

// Filter Task Inputs
function filterTasks(e){
  // Create a var to accept input
  const text = e.target.value.toLowerCase()

  // Loop through
  document.querySelectorAll('.collection-item').forEach(function(task){

    const item = task.firstChild.textContent

    if(item.toLowerCase().indexOf(text) !== -1){
      task.style.display = 'block';
    } else{
      task.style.display = 'none';
    }
  })
}

