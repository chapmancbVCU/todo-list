/******************************************************************************
 * IMPORTS
 *****************************************************************************/
import { Editor } from "@tinymce/tinymce-webcomponent";
import tinymce from 'tinymce';
import * as editor from './editor';
import { NotesForm } from "./NotesForm.js";
import { TodoItem } from "./TodoItem.js";
import { TodoItemForm } from "./TodoItemForm.js";
import { Project } from "./Project.js";
import { ProjectsForm } from "./ProjectsForm.js";
import { Note } from "./Note.js";


/**
 * @class Contains the class Class that supports functions for rendering form for 
 * adding an item.  More specifically the modal div that presents a web form.
 * @author Chad Chapman
 */
export class AddItem {
    /**
     * Default constructor.
     */
    constructor() {
        // Instance variables.
        this.addButtonContainer = document.createElement('div');
        this.notesForm = new NotesForm();
        this.projectsForm = new ProjectsForm();
        this.todoItemForm = new TodoItemForm();
    }

    /**
     * Contains event listener for when user clicks the submit button on the 
     * add note form.  Actions include form validation, adding the note to 
     * local storage, resetting form, closing modal, and reloading the page.
     * @returns void
     */
    addNoteSubmitButtonEventListener() {
        const noteFormSubmit = document.querySelector('#add-note-form');
        noteFormSubmit.addEventListener('submit', (event) => {
            event.preventDefault();

            // Get the following information from the form.
            let title = document.getElementById('note-title').value;
            let description = document.getElementById('notes-content').value;

            if(title == "" || title == null) {
                title.setCustomValidity();
            } else if (description == "" || description == null) {
                description.setCustomValidity();
            } else {
                // Add to local storage.
                const note = new Note('NoteItemObj', title, description);
                let date = new Date(Date.now());
                note.setTodoItem(note, `NoteItemObj_${date}`); 

                // Reset form and close modal.
                document.forms[0].reset();
                AddItem.closeModal();
                location.reload();
            }
        });
    }

    /**
     * Contains event listener for when user clicks the submit button on the 
     * add projects form.  Actions include form validation, adding the project  
     * to local storage, resetting form, closing modal, and reloading the page.
     * @returns void
     */
    addProjectSubmitButtonEventListener() {
        const projectFormSubmit = document.querySelector('#add-project-form');
        projectFormSubmit.addEventListener('submit', (event) => {
            event.preventDefault();

            // Get the following information from the form.
            let title = document.getElementById('projects-title').value;

            // Perform form validation.
            if(title == "") {
                title.setCustomValidity();
            } else {
                const project = new Project('ProjectObj', title, 0);
                let date = new Date(Date.now());
                project.setTodoItem(project, `ProjectObj_${date}`);

                // Reset form and close modal.
                document.forms[0].reset();
                AddItem.closeModal();
                location.reload();
            }
        });
    }

    /**
     * Contains event listener for when user clicks the submit button on the 
     * add todo item form.  Actions include form validation, adding Todo item 
     * to local storage, resetting form, closing modal, and reloading the page.
     * @returns void
     */
    addTodoItemSubmitButtonEventListener() {
        const todoFormSubmit = document.querySelector('#add-note-form');
        todoFormSubmit.addEventListener('submit', (event) => {
            event.preventDefault();

            // Get the following information from the form.
            let title = document.getElementById('todo-title').value;
            let description = document.getElementById(
                'todo-description').value;
            let dueByDate = document.getElementById('due-by-date').value;
            let selectedProject = document.getElementById(
                'parent-project').value;

            // Perform form validation.
            if(title == "") {
                title.setCustomValidity();
            } else if (dueByDate == "") {
                dueByDate.setCustomValidity();
            } else {    
                // Get value for radio button
                let priority;
                document.getElementsByName('set-priority').forEach(radio => {
                    if (radio.checked) {
                        priority = radio.value;
                    }
                });

                // Add to local storage.
                const todoItem = new TodoItem(
                    'TodoItemObj', 
                    selectedProject, 
                    title, 
                    description, 
                    dueByDate, 
                    priority,
                    false);

                let date = new Date(Date.now());
                todoItem.setTodoItem(todoItem, `TodoItemObj_${date}`); 

                for(let i = 0; i < localStorage.length; i++) {
                    let key = localStorage.key(i);
                    if(key.includes('ProjectObj_')) {
                        let project = new Project();
                        project = project.getItem(key);
                        const projectTitle = project.getTitle();
                        if(projectTitle === selectedProject) {
                            project.incrementSubTasksCount();
                            project.setTodoItem(project, key);
                        }
                    }
                }
                // Reset form and close modal.
                document.forms[0].reset();
                AddItem.closeModal();
                location.reload();
            }
        });
    }

    /**
     * Function that initializes the modal for adding items.
     * @returns HTMLDivElement The div that contains the modal.
     */
    initializeComponents() {
        const addItemContainer = document.createElement('div')
        addItemContainer.classList.add('bg-modal');
        addItemContainer.style.display = 'flex';

        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');

        const modalTitleContainer = document.createElement('div');
        modalTitleContainer.classList.add('modal-title-container');
        const modalTitle = document.createElement('div');
        modalTitle.classList.add('modal-title');
        modalTitle.textContent = 'Add New Item';
        modalTitleContainer.appendChild(modalTitle);
        modalTitleContainer.appendChild(this.renderCloseButton());

        modalContent.append(modalTitleContainer);
        
        const modalMain = document.createElement('div');
        modalMain.classList.add('modal-main');
        modalMain.appendChild(this.renderModalSideBar());
        modalMain.appendChild(this.renderTodoItemForm());
        modalContent.appendChild(modalMain);
        
        addItemContainer.appendChild(modalContent);
        return addItemContainer;
    }

    /**
     * Closes the modal when you press the close button.
     * @returns void
     */
    static closeModal() {
        const modal = document.querySelector('.bg-modal');
        modal.style.display = 'none';
        modal.remove();
    }

    /**
     * Removes current modal form from DOM when user selects a different form 
     * in the modal sidebar.
     * @returns void
     */
    removeModalFormFromDOM() {
        const modalMainSelector = 
            document.querySelector('#modal-form-container');
        modalMainSelector.remove();
    }

    /**
     * Renders the modal sidebar.
     * @returns HTMLDivElemtnt The sidebar for the modal that allows users to 
     * add new projects, todo items, and notes.
     */
    renderModalSideBar() {
        const modalSideBar = document.createElement('div');
        modalSideBar.setAttribute('id', 'modal-sidebar');
        modalSideBar.classList.add('modal-sidebar');

        const todoPageLink = document.createElement('div');
        todoPageLink.setAttribute('id', 'todo-page-link');
        todoPageLink.classList.add('modal-page-link');
        todoPageLink.textContent = 'Todo List';
        modalSideBar.appendChild(todoPageLink);

        const projectsPageLink = document.createElement('div');
        projectsPageLink.setAttribute('id', 'projects-page-link');
        projectsPageLink.classList.add('modal-page-link');
        projectsPageLink.textContent = 'My Projects';
        modalSideBar.appendChild(projectsPageLink);

        const notesPageLink = document.createElement('div');
        notesPageLink.setAttribute('id', 'notes-page-link');
        notesPageLink.classList.add('modal-page-link');
        notesPageLink.textContent = 'Notes';
        modalSideBar.appendChild(notesPageLink);

        return modalSideBar;
    }

    /**
     * Returns the form that allows a user to add a new note.
     * @returns HTMLFormElement The form for adding a new note.
     */
    renderNotesForm() {;
        return this.notesForm.initializeComponents();  
    }

    /**
     * Returns the form that allows a user to add a new project.
     * @returns HTMLFormElement The form for adding a new project.
     */
    renderProjectsForm() {
        return this.projectsForm.initializeComponents();
    }

    /**
     * Returns the form that allows a user to add a new todo list item.
     * @returns HTMLFormElement The form for adding a new todo list item.
     */
    renderTodoItemForm() {

        return this.todoItemForm.initializeComponents();
    }

    /**
     * Function that renders the modal's close button.
     * @returns HTMLDivElement The div that contains the close button.
     */
    renderCloseButton() {
        const closeButton = document.createElement('div');
        closeButton.classList.add('close');
        closeButton.textContent = '+';
        return closeButton;
    }
}