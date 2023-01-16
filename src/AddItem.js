/******************************************************************************
 *         Name: AddItem.js
 *       Author: Chad Chapman
 * Date Created: January 14, 2023
 *  Description: Class that contains functions for rendering form for adding 
 *               an item.  More specifically the modal div that presents a 
 *               web form.
******************************************************************************/

/******************************************************************************
 * IMPORTS
 *****************************************************************************/
import { NotesForm } from "./NotesForm.js";
import { ProjectsForm } from "./ProjectsForm.js";
import { TodoItemForm } from "./TodoItemForm.js";


/**
 * Class that contains functions for rendering form for adding an item.  More 
 * specifically, the modal div that presents a web form.
 */
export class AddItem {
    /**
     * Default constructor.
     */
    constructor() {
        const addButtonContainer = document.createElement('div');
        const notesForm = new NotesForm();
        const projectsForm = new ProjectsForm();
        const todoItemForm = new TodoItemForm();
    }

    /**
     * Function that initializes the modal for adding items.
     * @returns HTMLDivElement The div that contains the modal.
     */
    initializeComponents() {
        this.addItemContainer = document.createElement('div')
        this.addItemContainer.classList.add('bg-modal');
        this.addItemContainer.style.display = 'flex';

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
        modalMain.appendChild(this.renderModalPagesContainer());
        modalContent.appendChild(modalMain);

        this.addItemContainer.appendChild(modalContent);
        return this.addItemContainer;
    }

    /**
     * Closes the modal when you press the close button.
     */
    closeModal() {
        this.addItemContainer.style.display = 'none';
        this.addItemContainer.remove();
    }

    renderModalPagesContainer() {
        const modalPagesContainer = document.createElement('div');
        modalPagesContainer.textContent = 'pages go here';

        return modalPagesContainer;
    }

    renderModalSideBar() {
        const modalSideBar = document.createElement('div');
        modalSideBar.setAttribute('id', 'modal-sidebar');
        modalSideBar.classList.add('modal-sidebar');

        const toDoPageLink = document.createElement('div');
        toDoPageLink.setAttribute('id', 'todo-page-link');
        toDoPageLink.textContent = 'Todo List';
        modalSideBar.appendChild(toDoPageLink);

        const projectsPageLink = document.createElement('div');
        projectsPageLink.setAttribute('id', 'projects-page-link');
        projectsPageLink.textContent = 'My Projects';
        modalSideBar.appendChild(projectsPageLink);

        const notesPageLink = document.createElement('div');
        notesPageLink.setAttribute('id', 'notes-page-link');
        notesPageLink.textContent = 'Notes';
        modalSideBar.appendChild(notesPageLink);

        return modalSideBar;
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