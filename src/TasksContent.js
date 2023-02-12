/******************************************************************************
 * IMPORTS
 *****************************************************************************/
import EditIcon from './icons/note-edit.png';
import DeleteIcon from './icons/trash-can.png';
import { Project } from './Project';
import { TodoItem } from "./TodoItem"; 


/**
 * Contains the TasksContent class which is responsible for rendering contents 
 * of local storage as a list.  Other features include functions for viewing 
 * details of available content and updating such content with forms.
 * @class The TasksContent class is responsible for managing what is rendered 
 * in the main section of the page that lists what items are in local storage.
 * @author Chad Chapman
 */
export class TasksContent {
    /**
     * Default constructor.
     */
    constructor() {
        this.tasksContainer = document.querySelector('#tasks-container');
    }

    /**
     * This function performs the close operation of a modal that is 
     * implemented by this class.  It is usually called when the user presses 
     * the close button in the title bar or a cancel button.
     * @param {HTMLDivElement} parentContainer 
     */
    closeModals(parentContainer) {
        parentContainer.style.display = 'none';
        parentContainer.remove();
    }
    
    /**
     * This function is called by the event listener in the 
     * renderConfirmDeleteModal function.  It performs the delete operation 
     * and updates the parent project so that its subtask count variable is 
     * decremented.
     * @param {String} key The string that identifies a particular todo list 
     * item in local storage. 
     * @param {TodoItem} todoItem The todo list item we may want to delete.
     */
    deleteTodoItemButton(key, todoItem) {
        const parentProject = todoItem.getParentProject();

        // Decrement sub task count for parent project.
        for(let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            if(key.includes('ProjectObj_')) {
                let project = new Project();
                project = project.getItem(key);
                const projectTitle = project.getTitle();
                if(projectTitle === parentProject) {
                    project.decrementSubTasksCount();
                    project.setTodoItem(project, key);
                }
            }
        }

        // Finally delete todo list item from local storage and refresh page.
        localStorage.removeItem(key);
        location.reload();
    }

    /**
     * This function is responsible for rendering list of items in the tasks
     * content section of the page.  Possible lists includes todo items, notes 
     * and projects.
     */
    renderTasks() {
        /* Before we do anything we need to know which tab is selected
            in order to know what to render. */
        const selectedTab = sessionStorage.getItem('SelectedTab');
        for(let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            
            if(key.includes('TodoItemObj_')) {
                let todoItem = new TodoItem();
                todoItem = todoItem.getItem(key);

                /* Render todo items depending on which tab is clicked in the 
                sidebar. */
                if(selectedTab == null || selectedTab.includes('HOME')) {
                    this.renderTodoItem(key, todoItem);
                } else if (selectedTab.includes('TODAY')) {
                    let todaysDate = (new Date()).toISOString().split('T')[0];
                    if(todoItem.getDueDate() == todaysDate) {
                        this.renderTodoItem(key, todoItem);
                    }
                } else if (selectedTab.includes('WEEK')) {
                   // alert('week');
                } else if (selectedTab.includes('ProjectObj_')) {
                    /* Detect the parent project and populate the tasks 
                    content container with only those todo items. */
                    let project = new Project();
                    project = project.getItem(selectedTab);
                    if(todoItem.getParentProject() == project.getTitle()) {
                        this.renderTodoItem(key, todoItem);
                    }

                }
            } else if(key.includes('NoteItemObj_')) {
                if(selectedTab.includes('NOTES')) {
                    this.renderNote(key);
                }
            } else if(selectedTab.includes('PROJECTS_TAB')) {
                if(key.includes('ProjectObj_')) {
                    this.renderProject(key);
                }
            }
       }
    }

    /**
     * Renders the confirm delete todo item modal.  This modal prompts the 
     * user if they are sure they want to delete this item.
     * @param {String} key The string that identifies a particular todo list 
     * item in local storage. 
     * @param {TodoItem} todoItem The todo list item we may want to delete.
     */
    renderConfirmDeleteModal(key, todoItem) {
        const contentContainer = document.querySelector('#content');

        const confirmDeleteModal = document.createElement('div');
        confirmDeleteModal.classList.add('todo-item-details-bg-modal');
        confirmDeleteModal.style.display = 'flex';

        const confirmDeleteModalContent = document.createElement('div');
        confirmDeleteModalContent.classList.add(
            'todo-item-delete-modal-content');
        
        // Setup title and close button.
        const confirmDeleteModalTitleContainer = document.createElement('div');
        confirmDeleteModalTitleContainer.classList.add(
            'todo-item-confirm-delete-title-container');

        const deleteItemTitle = document.createElement('div');
        deleteItemTitle.textContent = 'Delete Todo List Item';
        deleteItemTitle.classList.add('modal-title');
        confirmDeleteModalTitleContainer.appendChild(deleteItemTitle);

        const closeButton = document.createElement('div');
        closeButton.classList.add('close');
        closeButton.textContent = '+';
        confirmDeleteModalTitleContainer.appendChild(closeButton);
        closeButton.addEventListener('click', () => {
            this.closeModals(confirmDeleteModal);
        });
        confirmDeleteModalContent.appendChild(
            confirmDeleteModalTitleContainer);

        // Setup main content for delete todo item modal.
        const deleteItemModalMain = document.createElement('div');
        const deleteMessage = document.createElement('div');
        deleteMessage.classList.add('todo-item-delete-message');
        deleteMessage.textContent = 
            `Confirm you want to delete: ${todoItem.getTitle()}`;

        deleteItemModalMain.appendChild(deleteMessage);

        // Setup ok and cancel buttons.
        const deleteModalButtonsContainer = document.createElement('div');
        deleteModalButtonsContainer.classList.add(
            'todo-item-cancel-delete-buttons-container');
        const okButton = document.createElement('button');
        okButton.classList.add('todo-item-cancel-delete-button');
        okButton.textContent = 'OK';
        okButton.addEventListener('click', () => {
            this.deleteTodoItemButton(key, todoItem);
            this.closeModals(confirmDeleteModal);
            location.reload();
        });
        deleteModalButtonsContainer.appendChild(okButton);

        const cancelButton = document.createElement('button');
        cancelButton.classList.add('todo-item-cancel-delete-button');
        cancelButton.textContent = "Cancel";
        cancelButton.addEventListener('click', () => {
            this.closeModals(confirmDeleteModal);
        });
        deleteModalButtonsContainer.appendChild(cancelButton);

        deleteItemModalMain.appendChild(deleteModalButtonsContainer);
        
        confirmDeleteModalContent.appendChild(deleteItemModalMain);
        confirmDeleteModal.appendChild(confirmDeleteModalContent);
        contentContainer.appendChild(confirmDeleteModal); 
    }

    /**
     * Renders the modal that displays details for a particular todo item when 
     * you click on the details button.
     * @param {TodoItem} todoItem The todo item whose information we want to 
     * show to the user.
     */
    renderDetailsModal(todoItem) {
        const contentContainer = document.querySelector('#content');

        const detailsContainer = document.createElement('div');
        detailsContainer.classList.add('todo-item-details-bg-modal');
        detailsContainer.style.display = 'flex';

        const detailsModalContent = document.createElement('div');
        detailsModalContent.classList.add('todo-item-details-modal-content');
        
        // Setup title and close button.
        const detailsModalTitleContainer = document.createElement('div');
        detailsModalTitleContainer.classList.add(
            'todo-item-details-modal-title-container');
        
        const detailsTitle = document.createElement('div');
        detailsTitle.textContent = `${todoItem.getTitle()}`;
        detailsTitle.classList.add('modal-title');
        detailsModalTitleContainer.appendChild(detailsTitle);

        const closeButton = document.createElement('div');
        closeButton.classList.add('close');
        closeButton.textContent = '+';
        detailsModalTitleContainer.appendChild(closeButton);
        closeButton.addEventListener('click', () => {
            this.closeModals(detailsContainer);
        });
        detailsModalContent.appendChild(detailsModalTitleContainer);

        // Setup main content for details modal.
        const detailsModalMain = document.createElement('div');

        const parentProject = document.createElement('div');
        parentProject.classList.add('todo-item-details-content');
        parentProject.textContent = `Project: ${todoItem.getParentProject()}`;
        detailsModalMain.appendChild(parentProject);

        const dueByDate = document.createElement('div');
        dueByDate.classList.add('todo-item-details-content');
        dueByDate.textContent = `Due by: ${todoItem.getDueDate()}`;
        detailsModalMain.appendChild(dueByDate);

        const priority = document.createElement('div');
        priority.classList.add('todo-item-details-content');
        priority.textContent = 
            `Priority: ${this.setPriorityString(todoItem.getPriority())}`;
        detailsModalMain.appendChild(priority);

        const description = document.createElement('div');
        description.classList.add('todo-item-details-content');
        description.setAttribute('id', 'todo-item-details');
        description.setAttribute('style', 'overflow-y:scroll;');
        description.classList.add('todo-item-description');
        detailsModalMain.appendChild(description);

        detailsModalContent.appendChild(detailsModalMain);
        detailsContainer.appendChild(detailsModalContent);
        contentContainer.appendChild(detailsContainer);
        document.getElementById('todo-item-details').innerHTML = todoItem.getDescription();
    }

    renderEditProjectModal(key,project) {
        const contentContainer = document.querySelector('#content');

        const editProjectModal = document.createElement('div');
        editProjectModal.classList.add('project-details-bg-modal');
        editProjectModal.style.display = 'flex';

        const editProjectModalContent = document.createElement('div')
        editProjectModalContent.classList.add('project-details-modal-content');

        // Setup title and close button.
        const editProjectTitleContainer = document.createElement('div');
        editProjectTitleContainer.classList.add(
            'edit-project-title-container');
        
        const editProjectTitle = document.createElement('div');
        editProjectTitle.textContent = 'Edit Project Title';
        editProjectTitle.classList.add('modal-title');
        editProjectTitleContainer.appendChild(editProjectTitle);

        const closeButton = document.createElement('div');
        closeButton.classList.add('close');
        closeButton.textContent = '+';
        editProjectTitleContainer.appendChild(closeButton);
        closeButton.addEventListener('click', () => {
            this.closeModals(editProjectModal);
        });
        editProjectModalContent.appendChild(editProjectTitleContainer);

        // Setup main content for edit project name modal.
        const editProjectTitleModalMain = document.createElement('div');
        const projectsForm = document.createElement('form');
        projectsForm.classList.add('modal-form');
        projectsForm.setAttribute('method', 'get');
        projectsForm.setAttribute('action', '#');

        // Setup title
        const titleRow = document.createElement('div');
        titleRow.classList.add('form-row');
        const projectsFormLabel = document.createElement('label');
        projectsFormLabel.setAttribute('for', 'projects-title');
        projectsFormLabel.textContent = 'Project Title:';
        titleRow.appendChild(projectsFormLabel);
        const title = document.createElement('input');
        title.setAttribute('id', 'projects-title');
        title.setAttribute('name', 'projects-title');
        title.setAttribute('type', 'text');
        title.setAttribute('minlength', '5');
        title.setAttribute('maxlength', '20');
        title.setAttribute('required', '');
        title.setAttribute('value', `${project.getTitle()}`);
        titleRow.appendChild(title);
        projectsForm.appendChild(titleRow);

        // Setup submit button
        const buttonsRow = document.createElement('div');
        buttonsRow.classList.add('project-edit-cancel-delete-buttons-container');
        const submitButton = document.createElement('button');
        submitButton.setAttribute('id', 'edit-project-button');
        submitButton.setAttribute('type', 'submit');
        submitButton.classList.add('project-edit-cancel-delete-button');
        submitButton.textContent = 'Submit';
        submitButton.addEventListener('click', () => {
            let newTitle = document.getElementById('projects-title').value;
            project.setTitle(newTitle);
            project.setTodoItem(project, key);
            location.reload();
        });
        buttonsRow.appendChild(submitButton);

        const cancelButton = document.createElement('button');
        cancelButton.classList.add('todo-item-cancel-delete-button');
        cancelButton.textContent = "Cancel";
        cancelButton.addEventListener('click', () => {
            this.closeModals(editProjectModal);
        });
        buttonsRow.appendChild(cancelButton);
        projectsForm.appendChild(buttonsRow);

        editProjectTitleModalMain.appendChild(projectsForm);

        editProjectModalContent.appendChild(editProjectTitleModalMain);
        editProjectModal.appendChild(editProjectModalContent);
        contentContainer.appendChild(editProjectModal);
    }

    /**
     * Renders a form so that the user can update details for a particular 
     * todo list item.
     * @param {String} key The string that identifies a particular todo list 
     * item in local storage. 
     * @param {TodoItem} todoItem The todo list item we want to edit.
     */
    renderEditTodoListDetailsModal(key, todoItem) {
        alert('Edit details link');
    }

    renderNote(key) {
        const noteItemContainer = document.createElement('div');
        noteItemContainer.textContent = 'Notes container';

        this.tasksContainer.appendChild(noteItemContainer);
    }

    /**
     * Renders a row that contains information about a project.  This row 
     * contains the project name and icons for editing the name and deleting 
     * the project from local storage.
     * @param {String} key The string that identifies a particular project 
     * that is contained in local storage.
     */
    renderProject(key) {
        let project = new Project();
        project = project.getItem(key);
        const projectsContainer = document.createElement('div');
        projectsContainer.classList.add('project-list-item');

        // Setup title.
        const projectTitle = document.createElement('div');
        projectTitle.classList.add('project-list-item-title');
        projectTitle.textContent = `${project.getTitle()}`;
        projectsContainer.appendChild(projectTitle);

        // Setup edit and delete icons.
        const iconsContainer = document.createElement('div');
        iconsContainer.classList.add('project-list-item-icons-container');
        const editIcon = new Image();
        editIcon.classList.add('project-list-item-icon');
        editIcon.src = EditIcon;
        iconsContainer.appendChild(editIcon);
        const deleteIcon = new Image();
        deleteIcon.classList.add('project-list-item-icon');
        deleteIcon.src = DeleteIcon;

        iconsContainer.appendChild(deleteIcon);
        projectsContainer.appendChild(iconsContainer);
        this.tasksContainer.appendChild(projectsContainer);

        // Event listener for delete button.
        deleteIcon.addEventListener('click', () => {
            alert('delete');
        });

        // Event listener for edit button.
        editIcon.addEventListener('click', () => {
            this.renderEditProjectModal(key, project);
        })
    }
    /**
     * Renders a row on the tasks content area for a particular todo list item.
     * @param {String} key The key for a particular todo list item in local 
     * storage.
     */
    renderTodoItem(key, todoItem) {
        const todoItemContainer = document.createElement('div');
        todoItemContainer.classList.add('todo-item');
        this.setTodoItemRowColor(todoItemContainer, todoItem);
        // Setup left side of todo item row.
        const left = document.createElement('div');
        left.classList.add('todo-item-left-side');    

        // Setup checkbox and title.
        const titleLabel = document.createElement('label')
        titleLabel.classList.add('todo-item-title');
        titleLabel.setAttribute('for', `${todoItem.getTitle()}-is-complete`);
        const toggleChecked = document.createElement('input');
        toggleChecked.setAttribute('type', 'checkbox');
        toggleChecked.setAttribute('id', `${todoItem.getTitle()}-is-complete`);


        toggleChecked.setAttribute('value', 'is-complete');
        titleLabel.appendChild(toggleChecked);
        const titleContent = document.createElement('span');
        titleContent.classList.add('todo-item-text');
        titleContent.textContent = `${todoItem.getTitle()}`;
        titleLabel.appendChild(titleContent);
        left.appendChild(titleLabel);
        todoItemContainer.appendChild(left);

        // Setup right side of todo item row.
        const right = document.createElement('div');
        right.classList.add('todo-item-right-side');

        // Show details button.
        const detailsButton = document.createElement('button');
        detailsButton.classList.add('todo-item-details-button');
        detailsButton.textContent = 'DETAILS';
        right.appendChild(detailsButton);

        // Show due date.
        const dueDate = document.createElement('div');
        dueDate.textContent = `${todoItem.getDueDate()}`;
        dueDate.classList.add('todo-item-date');
        dueDate.classList.add('todo-item-text');
        right.appendChild(dueDate);

        // Show edit and delete icons.
        const editIcon = new Image();
        editIcon.classList.add('todo-item-icon');
        editIcon.src = EditIcon;
        right.appendChild(editIcon);
        const deleteIcon = new Image();
        deleteIcon.classList.add('todo-item-icon');
        deleteIcon.src = DeleteIcon;
        right.appendChild(deleteIcon);

        todoItemContainer.appendChild(right);
        this.tasksContainer.appendChild(todoItemContainer);

        // Event listener for delete button.
        deleteIcon.addEventListener('click', () => {
            this.renderConfirmDeleteModal(key, todoItem);
        });

        // Event listener for details button.
        detailsButton.addEventListener('click', () => {
            this.renderDetailsModal(todoItem);
        });

        // Event listener for edit button.
        editIcon.addEventListener('click', () => {
            this.renderEditTodoListDetailsModal(key, todoItem);
        })

        // Check if item is completed and set value of checkbox.
        if(todoItem.getIsComplete() === true) {
            document.getElementById(
                `${todoItem.getTitle()}-is-complete`).checked = true;
        } else if (todoItem.getIsComplete() === false) {
            document.getElementById(
                `${todoItem.getTitle()}-is-complete`).checked = false;
        }

        // Event handler for checkbox.
        toggleChecked.addEventListener('click', () => {
            todoItem.setIsComplete();
            todoItem.setTodoItem(todoItem, key);
            location.reload();
        });
    }

    /**
     * This function uses the priority level of a particular todo item
     * too set a class for the todo list item row depending on its priority.
     * @param {HTMLDivElement} todoItemRow The DIV element that contains 
     * information about a particular todo list item.
     * @param {TodoItem} todoItem The todo item object whose priority level 
     * we want to test.
     */
    setTodoItemRowColor(todoItemRow, todoItem) {
        if(todoItem.getPriority() === 'low-priority') {
            todoItemRow.classList.add('todo-item-low-priority');
        } else if (todoItem.getPriority() === 'medium-priority') {
            todoItemRow.classList.add('todo-item-medium-priority');
        } else if (todoItem.getPriority() == 'high-priority') {
            todoItemRow.classList.add('todo-item-high-priority');
        }
    }

    /**
     * This function returns the string that represent the priority level of 
     * a particular todo item in the details modal.
     * @param {String} priority The string whose value we are testing so we 
     * can set the text for the priority level.
     * @returns Returns either the strings "Low", "Medium", or "High" 
     * depending on the value of the priority paramenter.
     */
    setPriorityString(priority) {
        return (priority === 'low-priority') ? 'Low' 
            : (priority === 'medium-priority') ? 'Medium'
            : 'High';
    }
}