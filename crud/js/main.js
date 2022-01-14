'use strict';

const openModal = () => document.getElementById('modal')
  .classList.add('active');

const closeModal = () => {
  clearFields();
  document.getElementById('modal').classList.remove('active');
};

const getLocalStorage = () => JSON.parse(localStorage.getItem('db_customer')) ?? [];
const setLocalStorage = (db_customer) => localStorage.setItem('db_customer', JSON.stringify(db_customer));

// Create
const createCustomer = (customer) => {
  const db_customer = getLocalStorage();
  db_customer.push(customer);
  setLocalStorage(db_customer);
};

// Read
const readCustomer = () => getLocalStorage();

// Update
const updateCustomer = (index, customer) => {
  const db_customer = readCustomer();
  db_customer[index] = customer;
  setLocalStorage(db_customer);
};

// Delete
const deleteCustomer = (index) => {
  const db_customer = readCustomer();
  db_customer.splice(index, 1);
  setLocalStorage(db_customer);
  updateScreenTable();
};

// Layout interaction
const areValidFields = () => document.getElementById('form').reportValidity();

const clearFields = () => {
  const fields = document.querySelectorAll('.modal-field');
  fields.forEach(field => field.value = '');
  document.getElementById('name').dataset.index = 'new'
};

const saveCustomer = () => {
  if (areValidFields()) {  
    const customer = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      city: document.getElementById('city').value
    };
    const index = document.getElementById('name').dataset.index;
    if (index == 'new') {
    createCustomer(customer);
    updateScreenTable();
    closeModal();
    } else {
      updateCustomer(index, customer);
      updateScreenTable();
      closeModal();
    };
  };
};

const createRow = (customer, index) => {
  const newRow = document.createElement('tr');
  newRow.innerHTML = `
    <td>${customer.name}</td>
    <td>${customer.email}</td>
    <td>${customer.phone}</td>
    <td>${customer.city}</td>
    <td> 
      <button type="button" class="button green" data-action="update-${index}">Update</button>
      <button type="button" class="button red" data-action="delete-${index}">Delete</button>
    </td>
  `;
  document.querySelector('#table_customer>tbody').appendChild(newRow);
};

const clearScreenTable = () => {
  const rows = document.querySelectorAll('#table_customer>tbody tr');
  rows.forEach(row => row.parentNode.removeChild(row));
};

const updateScreenTable = () => {
  const db_customer = readCustomer();
  clearScreenTable();
  db_customer.forEach(createRow);
};

const fillFields = (customer) => {
  document.getElementById('name').value = customer.name;
  document.getElementById('name').dataset.index = customer.index;
  document.getElementById('email').value = customer.email;
  document.getElementById('phone').value = customer.phone;
  document.getElementById('city').value = customer.city;
};

const editCustomer = (index) => {
  const customer = readCustomer()[index];
  customer.index = index;
  fillFields(customer);
  openModal();
};

const updateDelete = (event) => {
  if (event.target.type == 'button') {
    const [ action, index ] = event.target.dataset.action.split('-');

    if (action == 'update') {
      editCustomer(index);
    } else {
      const customer = readCustomer()[index];
      const response = confirm(`Are you sure you want to delete the customer ${customer.name}?`);
      if (response) {
        deleteCustomer(index);
      };
    };
  };
};

updateScreenTable();

// Events
document.getElementById('registerCustomer')
  .addEventListener('click', openModal);

document.getElementById('modalClose')
  .addEventListener('click', closeModal);
  
document.getElementById('save')
  .addEventListener('click', saveCustomer);

document.querySelector('#table_customer>tbody')
  .addEventListener('click', updateDelete);
