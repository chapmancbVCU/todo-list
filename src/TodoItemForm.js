/******************************************************************************
 * IMPORTS
 *****************************************************************************/
import { Project } from "./Project";


/**
 * @class The TodoItemForm class is responsible for rendering the form for 
 * creating a new todo list item.
 * @author Chad Chapman
 */
export class TodoItemForm {
    /**
     * Default constructor.
     */
    constructor() {

    }

    /**
     * Initializes and renders form for adding a todo item.
     * @returns HTMLDivElement
     */
    initializeComponents() {
        const todoItemFormContainer = document.createElement('div');
        todoItemFormContainer.setAttribute('id', 'modal-form-container');

        const todoItemForm = document.createElement('form');
        todoItemForm.classList.add('modal-form');
        todoItemForm.setAttribute('method', 'get');
        todoItemForm.setAttribute('action', '#');
        todoItemForm.setAttribute('id', 'add-note-form');

        // Setup title
        const titleRow = document.createElement('div');
        titleRow.classList.add('form-row');
        const todoItemFormLabel = document.createElement('label');
        todoItemFormLabel.setAttribute('for', 'todo-title');
        todoItemFormLabel.textContent = 'Todo List Item:';
        titleRow.appendChild(todoItemFormLabel);
        const title = document.createElement('input');
        title.setAttribute('id', 'todo-title');
        title.setAttribute('name', 'todo-title');
        title.setAttribute('type', 'text');
        title.setAttribute('maxlength', '35');
        title.setAttribute('required', '');
        title.setAttribute('placeholder', 'Ex: Get groceries');
        titleRow.appendChild(title);
        todoItemForm.appendChild(titleRow);

        // Setup description textarea
        const editorArea = document.createElement('tinymce-editor');
        editorArea.setAttribute('id', 'todo-description');
        editorArea.setAttribute('selector', 'todo-description');
        editorArea.setAttribute('name', 'todo-description');
        editorArea.setAttribute('plugins', 'advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table code help wordcount');
        editorArea.setAttribute('toolbar', 'undo redo | bold italic backcolor underline strikethrough | outdent indent | alignleft aligncenter alignright alignjustify | removeformat | help');
        editorArea.setAttribute('menubar', 'false');
        editorArea.setAttribute('height', '300');
        editorArea.setAttribute('placeholder', 'Describe item here.');
        todoItemForm.appendChild(editorArea);

        // Setup due by date
        const dueByRow = document.createElement('div');
        dueByRow.classList.add('form-row');
        const dueByLabel = document.createElement('label');
        dueByLabel.setAttribute('for', 'due-by-date');
        dueByLabel.textContent = 'Due By:';
        dueByRow.appendChild(dueByLabel);
        const dueByInput = document.createElement('input');
        dueByInput.setAttribute('id', 'due-by-date');
        dueByInput.setAttribute('name', 'due-by-date');
        dueByInput.setAttribute('type', 'date');
        dueByInput.setAttribute('required', '');
        dueByRow.appendChild(dueByInput);
        todoItemForm.appendChild(dueByRow);

        // Setup projects dropdown menu.
        const projectsInputRow = document.createElement('div');
        projectsInputRow.classList.add('form-row');

        const projectsLabel = document.createElement('label');
        projectsLabel.setAttribute('for', 'parent-project');
        projectsLabel.textContent = 'Project:';
        projectsInputRow.appendChild(projectsLabel);

        const projectsMenu = document.createElement('select');
        projectsMenu.setAttribute('id', 'parent-project');
        projectsMenu.setAttribute('name', 'parent-project');

        const defaultOption = document.createElement('option');
        defaultOption.setAttribute('value', 'None');
        defaultOption.text = 'None';
        projectsMenu.appendChild(defaultOption);

        // Search local storage for projects.
        for(let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);

            if(key.includes('ProjectObj_')) {
                let project = new Project();
                project = project.getItem(key);
                const projectTitle = project.getTitle();
                const projectOption = document.createElement('option');
                projectOption.setAttribute('value', `${projectTitle}`);
                projectOption.textContent = `${projectTitle}`;
                projectsMenu.appendChild(projectOption);
            }
        }

        projectsInputRow.appendChild(projectsMenu);
        todoItemForm.appendChild(projectsInputRow);
        
        // Setup buttons
        const buttonsRow = document.createElement('div');
        buttonsRow.classList.add('buttons-form-row');

        // Priority buttons container
        const priorityButtonsContainer = document.createElement('fieldset');
        priorityButtonsContainer.classList.add('priority-buttons-container');
        const priorityButtonsLegend = document.createElement('legend');
        priorityButtonsLegend.textContent = 'Priority:';
        priorityButtonsContainer.append(priorityButtonsLegend);

        const lowPriorityButtonContainer = document.createElement('div');
        lowPriorityButtonContainer.classList.add('priority-button');
        lowPriorityButtonContainer.classList.add('low-priority-button-container');
        const lowPriorityButton = document.createElement('input');
        lowPriorityButton.setAttribute('id', 'low-priority');
        lowPriorityButton.setAttribute('name', 'set-priority');
        lowPriorityButton.setAttribute('type', 'radio');
        lowPriorityButton.setAttribute('value', 'low-priority');
        lowPriorityButton.setAttribute('checked', '');
        lowPriorityButtonContainer.appendChild(lowPriorityButton);
        const lowPriorityButtonLabel = document.createElement('label');
        lowPriorityButtonLabel.setAttribute('for', 'low-priority');
        lowPriorityButtonLabel.classList.add('priority-button-label');
        lowPriorityButtonLabel.textContent = 'Low';
        lowPriorityButtonContainer.appendChild(lowPriorityButtonLabel);
        priorityButtonsContainer.append(lowPriorityButtonContainer);

        const mediumPriorityButtonContainer = document.createElement('div');
        mediumPriorityButtonContainer.classList.add('priority-button');
        mediumPriorityButtonContainer.classList.add('medium-priority-button-container');
        const mediumPriorityButton = document.createElement('input');
        mediumPriorityButton.setAttribute('id', 'medium-priority');
        mediumPriorityButton.setAttribute('name', 'set-priority');
        mediumPriorityButton.setAttribute('type', 'radio');
        mediumPriorityButton.setAttribute('value', 'medium-priority');
        mediumPriorityButtonContainer.appendChild(mediumPriorityButton);
        const mediumPriorityButtonLabel = document.createElement('label');
        mediumPriorityButtonLabel.setAttribute('for', 'medium-priority');
        mediumPriorityButtonLabel.classList.add('priority-button-label');
        mediumPriorityButtonLabel.textContent = 'Medium';
        mediumPriorityButtonContainer.appendChild(mediumPriorityButtonLabel);
        priorityButtonsContainer.appendChild(mediumPriorityButtonContainer);

        const highPriorityButtonContainer = document.createElement('div');
        highPriorityButtonContainer.classList.add('priority-button');
        highPriorityButtonContainer.classList.add('high-priority-button-container');
        const highPriorityButton = document.createElement('input');
        highPriorityButton.setAttribute('id', 'high-priority');
        highPriorityButton.setAttribute('name', 'set-priority');
        highPriorityButton.setAttribute('type', 'radio');
        highPriorityButton.setAttribute('value', 'high-priority');
        highPriorityButtonContainer.appendChild(highPriorityButton);
        const highPriorityButtonLabel = document.createElement('label');
        highPriorityButtonLabel.setAttribute('for', 'high-priority');
        highPriorityButtonLabel.classList.add('priority-button-label');
        highPriorityButtonLabel.textContent = 'High';
        highPriorityButtonContainer.appendChild(highPriorityButtonLabel);
        priorityButtonsContainer.appendChild(highPriorityButtonContainer);

        buttonsRow.appendChild(priorityButtonsContainer);

        // Submit button container
        const submitButtonContainer = document.createElement('div');
        submitButtonContainer.classList.add('add-todo-button-container');
        const submitButton = document.createElement('button');
        submitButton.setAttribute('id', 'add-todo-item-button');
        submitButton.setAttribute('type', 'submit');
        submitButton.classList.add('add-todo-button');
        submitButton.textContent = 'Add';
        submitButtonContainer.appendChild(submitButton);
        buttonsRow.appendChild(submitButtonContainer);

        todoItemForm.appendChild(buttonsRow);
        todoItemFormContainer.appendChild(todoItemForm);
        return todoItemFormContainer;
    }
}