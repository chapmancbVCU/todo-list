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
import { Page } from './Page';
import { TasksContent } from './TasksContent';
import { Editor } from "@tinymce/tinymce-webcomponent";
import tinymce from "tinymce";


/******************************************************************************
 * INITIAL PAGE SETUP
 *****************************************************************************/
const page = new Page();
const contentContainer = page.getContentContainer();
const addItemSelector = document.querySelector('#add-item-button');
const clearLocalStorageSelector = document.querySelector('#clear-item-button');
const homeTab = document.querySelector('#home');
const notesTab = document.querySelector('#notes');
const todayTab = document.querySelector('#today');
const weekTab = document.querySelector('#week');

const tasksContainer = new TasksContent();
tasksContainer.renderTasks();

let selectedTab = "";


/******************************************************************************
 * Event listeners
 *****************************************************************************/
// Temp event listener for clearing local storage.
clearLocalStorageSelector.addEventListener('click', function(){
    localStorage.clear();
    location.reload();
});

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
        addItem.addNoteSubmitButtonEventListener();
    });

    const projectsLinkSelector = 
        document.querySelector('#projects-page-link');
    projectsLinkSelector.addEventListener('click', function() {
        addItem.removeModalFormFromDOM();
        modalMainSelector.appendChild(addItem.renderProjectsForm());
        addItem.addProjectSubmitButtonEventListener();
    });

    const todoLinkSelector = document.querySelector('#todo-page-link');
    todoLinkSelector.addEventListener('click', function() {
        addItem.removeModalFormFromDOM();
        modalMainSelector.appendChild(addItem.renderTodoItemForm());
        addItem.addTodoItemSubmitButtonEventListener();
    });
});

homeTab.addEventListener('click', function() {
    selectedTab = 'HOME';
    sessionStorage.setItem('SelectedTab', selectedTab);
});
notesTab.addEventListener('click', function() {
    selectedTab = 'NOTES';
    sessionStorage.setItem('SelectedTab', selectedTab);
});
todayTab.addEventListener('click', function() {
    selectedTab = 'TODAY';
    sessionStorage.setItem('SelectedTab', selectedTab);
});
weekTab.addEventListener('click', function() {
    selectedTab = 'WEEK';
    sessionStorage.setItem('SelectedTab', selectedTab);
});
