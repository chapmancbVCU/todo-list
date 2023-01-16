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

    // Inside this event listener we need another one for closing the modal.
    closeModal.addEventListener('click', function() {
        addItem.closeModal();
    });

    const notesLinkSelector = document.querySelector('#notes-page-link');
    notesLinkSelector.addEventListener('click', function() {
        console.log('notes');
    });

    const projectsLinkSelector = document.querySelector('#projects-page-link');
    projectsLinkSelector.addEventListener('click', function() {
        console.log('projects');
    });

    const todoLinkSelector = document.querySelector('#todo-page-link');
    todoLinkSelector.addEventListener('click', function() {
        console.log('todo');
    });
});

