'use strict';

const getFromDatabase = () => JSON.parse(localStorage.getItem('toDoList')) ?? [];
const updateDatabase = (database) => localStorage.setItem('toDoList', JSON.stringify(database));

const createTask = (task, status, index) => {
  const item = document.createElement('label');
  item.classList.add('todo__item');
  item.innerHTML = `
    <input type="checkbox" ${status} data-index=${index}>
    <div>${task}</div>
    <input type="button" value="X" data-index=${index}>  
  `;
  document.getElementById('toDoList').appendChild(item);
};

const clearTasks = () => {
  const toDoList = document.getElementById('toDoList');
  while(toDoList.firstChild) {
    toDoList.removeChild(toDoList.lastChild);
  };
};

const renderTasks = () => {
  clearTasks();
  const database = getFromDatabase();
  database.forEach((item, index) => createTask(item.task, item.status, index));
};

const addTask = (event) => {
  const key = event.key;
  const taskText = event.target.value;

  if (key === 'Enter' && taskText !== '') {
    const database = getFromDatabase();
    database.push({'task': taskText, 'status': ''});
    updateDatabase(database);
    renderTasks();
    event.target.value = '';
  };
};

const removeTask = (index) => {
  const database = getFromDatabase();
  database.splice(index, 1);
  updateDatabase(database);
  renderTasks();
};

const updateTask = (index) => {
  const database = getFromDatabase();
  database[index].status = database[index].status === '' ? 'checked' : ''; 
  updateDatabase(database);
  renderTasks();
};

const clickedElement = (event) => {
  const htmlElement = event.target;
  if (htmlElement.type === 'button') {
    const index = htmlElement.dataset.index;
    removeTask(index);
  } else if (htmlElement.type === 'checkbox') {
    const index = htmlElement.dataset.index;
    updateTask(index);
  };
};

document.getElementById('newTask').addEventListener('keypress', addTask);
document.getElementById('toDoList').addEventListener('click', clickedElement);

renderTasks();
