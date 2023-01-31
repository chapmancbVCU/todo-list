/******************************************************************************
 *         Name: index.js
 *       Author: Chad Chapman
 * Date Created: December 26, 2022
 *  Description: Functions that support implementation of Todo List website
******************************************************************************/

/******************************************************************************
 * IMPORTS
 *****************************************************************************/
import _ from 'lodash';
import './css/styles.css';
import { AddItem } from './AddItem';
import { Page } from './page';
import * as editor from './editor';
import { TodoItem } from './TodoItem';

const test = new TodoItem('foo', 'bar', 'foo', 'foo');
test.setTodoItem(test);
test.getTodoItem();
/******************************************************************************
 * INITIAL PAGE SETUP
 *****************************************************************************/
const page = new Page();
const contentContainer = page.getContentContainer();
const addItemSelector = document.querySelector('#add-item-button');


/******************************************************************************
 * Event listeners
 *****************************************************************************/
// Event listener for creating add item modal.
addItemSelector.addEventListener('click', function(){
    const addItem = new AddItem();
    contentContainer.appendChild(addItem.initializeComponents());
    const closeModal = document.querySelector('.close');
    const element = document.getElementById('bg-modal');
    const modalMainSelector = document.querySelector('.modal-main');

    // Inside this event listener we need another one for closing the modal.
    closeModal.addEventListener('click', function() {
        addItem.closeModal();
    });

    // Event listeners for links inside modal for selecting forms.
    const notesLinkSelector = document.querySelector('#notes-page-link');
    notesLinkSelector.addEventListener('click', function() {
        addItem.removeModalFormFromDOM();
        modalMainSelector.appendChild(addItem.renderNotesForm());
    });

    const projectsLinkSelector = 
        document.querySelector('#projects-page-link');
    projectsLinkSelector.addEventListener('click', function() {
        addItem.removeModalFormFromDOM();
        modalMainSelector.appendChild(addItem.renderProjectsForm());
    });

    const todoLinkSelector = document.querySelector('#todo-page-link');
    todoLinkSelector.addEventListener('click', function() {
        addItem.removeModalFormFromDOM();
        modalMainSelector.appendChild(addItem.renderTodoItemForm());
    });
});

