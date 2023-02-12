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
let selectedTab = '';

/**
 * Instance of page class.  Building of page content starts here.
 * @type {Page}
 */
const page = new Page();

/**
 * The parent HTMLDivElement for all content of this page.  It is identified 
 * by the id #content.
 * @type {HTMLDivElement}
 */
const contentContainer = page.getContentContainer();

/**
 * Query selector for add item button.  Its id is #add-item-button.
 * @type {Element}
 */
const addItemSelector = document.querySelector('#add-item-button');

/**
 * Query selector for clear local storage button. Its id is 
 * #clear-local-storage-button.
 * @type {Element}
 */
const clearLocalStorageSelector = document.querySelector(
    '#clear-local-storage-button');

/**
 * Query selector for the Home label on the sidebar.  Its id is #home.
 * @type {Element}
 */
const homeTab = document.querySelector('#home');

/**
 * Query selector for the Notes label on the sidebar.  Its id is #notes.
 * @type {Element}
 */
const notesTab = document.querySelector('#notes');

/**
 * Query selector for the Projects row label on the sidebar.  Its id is 
 * #project-row-label.
 * @type {Element}
 */
const projectsTab = document.querySelector('#project-row-label');

/**
 * Query selector for the Today label on the sidebar.  Its id is #today.
 * @type {Element}
 */
const todayTab = document.querySelector('#today');

/**
 * Query selector for the Weel label on the sidebar.  Its id is #weel.
 * @type {Element}
 */
const weekTab = document.querySelector('#week');

/**
 * This tasks content object is responsible for rendering content in the tasks 
 * content container.  This is where information about notes, projects, and 
 * todo items are listed.  From here, information about the previously 
 * described items can be viewed, updated, or deleted.
 * @type {TasksContent}
 */
const tasksContainer = new TasksContent();
tasksContainer.renderTasks();


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
    location.reload();
});

notesTab.addEventListener('click', function() {
    selectedTab = 'NOTES';
    sessionStorage.setItem('SelectedTab', selectedTab);
    location.reload();
});

projectsTab.addEventListener('click', function() {
    selectedTab = 'PROJECTS_TAB';
    sessionStorage.setItem('SelectedTab', selectedTab);
    location.reload();
});

todayTab.addEventListener('click', function() {
    selectedTab = 'TODAY';
    sessionStorage.setItem('SelectedTab', selectedTab);
    location.reload();
});

weekTab.addEventListener('click', function() {
    selectedTab = 'WEEK';
    sessionStorage.setItem('SelectedTab', selectedTab);
    location.reload();
});
