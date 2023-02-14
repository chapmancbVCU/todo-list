import { TodoItem } from "./TodoItem";
/**
 * @class Class for rendering and handling data entry for adding a new project.
 * @author Chad Chapman
 */
export class ProjectsForm {
    /**
     * Default constructor.
     */
    constructor() {

    }

    /**
     * Renders the form for getting input about a new project.
     * @returns HTMLDivElement The form responsible for getting information 
     * about a project. 
     */
    initializeComponents() {
        const projectsFormContainer = document.createElement('div');
        projectsFormContainer.setAttribute('id', 'modal-form-container');

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
        title.setAttribute('maxlength', '20');
        title.setAttribute('required', '');
        title.setAttribute('placeholder', 'Project title less than 20 characters');
        titleRow.appendChild(title);
        projectsForm.appendChild(titleRow);

        // Setup submit button
        const buttonsRow = document.createElement('div');
        buttonsRow.classList.add('buttons-form-row');
        const submitButton = document.createElement('button');
        submitButton.setAttribute('id', 'add-project-button');
        submitButton.setAttribute('type', 'submit');
        submitButton.classList.add('add-project-button');
        submitButton.textContent = 'Add';
        buttonsRow.appendChild(submitButton);
        projectsForm.appendChild(buttonsRow);

        projectsFormContainer.appendChild(projectsForm);
        return projectsFormContainer;
    }

    /**
     * Renders the form for updating the details for a project.  This function 
     * also performs form validation and submit operations.
     * @param {String} key The string that identifies a particular project  
     * in local storage. 
     * @param {Project} project The project whose title we want to edit.
     * @returns void
     */ 
    static renderEditProjectModal(key, project) {
        const contentContainer = document.querySelector('#content');

        // Before we proceed we need to get original title.
        const originalTitle = project.getTitle();

        // Begin setup of modal.
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
        title.setAttribute('maxlength', '20');
        title.setAttribute('required', '');
        title.setAttribute('value', `${originalTitle}`);
        titleRow.appendChild(title);
        projectsForm.appendChild(titleRow);

        // Setup submit button
        const buttonsRow = document.createElement('div');
        buttonsRow.classList.add(
            'project-edit-cancel-delete-buttons-container');
        const submitButton = document.createElement('button');
        submitButton.setAttribute('id', 'edit-project-button');
        submitButton.setAttribute('type', 'submit');
        submitButton.classList.add('project-edit-cancel-delete-button');
        submitButton.textContent = 'Submit';
        submitButton.addEventListener('click', (event) => {
            let newTitle = document.getElementById('projects-title').value;
            event.preventDefault();

            // Perform form validation.
            if(newTitle == "") {
                alert("Title is a required field");
            } else {
                // Update the project.
                project.setTitle(newTitle);
                project.setTodoItem(project, key);

                /* Update the parent project for child todo items.  To do this 
                we must got through each todo item in storage and compare.  If 
                there is a match we perform the update. */
                for(let i = 0; i < localStorage.length; i++) {
                    const todoItemKey = localStorage.key(i);
                    if(todoItemKey.includes('TodoItemObj_')) {
                        let todoItem = new TodoItem();
                        todoItem = todoItem.getItem(todoItemKey);
                        if(todoItem.getParentProject() === originalTitle) {
                            todoItem.setParentProject(newTitle);
                            todoItem.setTodoItem(todoItem, todoItemKey);
                        }
                    }
                }
                location.reload();
            }
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
}