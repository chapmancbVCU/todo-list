/**
 * index.js is the main entry point for execution of JavaScript code for this 
 * todo list project.  It contains many of the event listeners needed for the 
 * webpage to work properly.
 * @author Chad Chapman
 */

/******************************************************************************
 * IMPORTS
 *****************************************************************************/
import _ from 'lodash';
import './css/styles.css';
import { AddItem } from './AddItem';
import { Page } from './page';
import { TasksContent } from './TasksContent';
import { Editor } from "@tinymce/tinymce-webcomponent";
import tinymce from "tinymce";

/******************************************************************************
 * INITIAL PAGE SETUP
 *****************************************************************************/
const page = new Page();
const contentContainer = page.getContentContainer();
const addItemSelector = document.querySelector('#add-item-button');
const tasksContainer = new TasksContent();
tasksContainer.renderTasks();


/******************************************************************************
 * Event listeners
 *****************************************************************************/
// Event listener for creating add item modal.
addItemSelector.addEventListener('click', function(){
    const addItem = new AddItem();
    contentContainer.appendChild(addItem.initializeComponents());
    addItem.addTodoItemSubmitButtonEventListener();
    const closeModal = document.querySelector('.close');
    const modalMainSelector = document.querySelector('.modal-main');

    // Inside this event listener we need another one for closing the modal.
    closeModal.addEventListener('click', function() {
        AddItem.closeModal();
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
        addItem.addTodoItemSubmitButtonEventListener();
    });
});
