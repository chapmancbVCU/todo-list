/******************************************************************************
 *         Name: TodoItemForm.js
 *       Author: Chad Chapman
 * Date Created: January 15, 2023
 *  Description: Class for rendering and handling data entry for adding a new
 *               todo list.
******************************************************************************/
import { Editor } from "@tinymce/tinymce-webcomponent";
import tinymce from "tinymce";
export class TodoItemForm {
    constructor() {

    }

    initializeComponents() {
        const todoItemFormContainer = document.createElement('div');
        todoItemFormContainer.setAttribute('id', 'modal-form-container');

        const todoItemForm = document.createElement('form');
        todoItemForm.classList.add('modal-form');

        // Setup title
        const titleRow = document.createElement('div');
        titleRow.classList.add('form-row');
        const todoItemFormLabel = document.createElement('label');
        todoItemFormLabel.setAttribute('for', 'todo-title');
        todoItemFormLabel.textContent = 'Title:';
        titleRow.appendChild(todoItemFormLabel);
        const title = document.createElement('input');
        title.setAttribute('id', 'todo-title');
        title.setAttribute('name', 'todo-title');
        title.setAttribute('type', 'text');
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
        editorArea.setAttribute('toolbar', 'undo redo | | bold italic backcolor | strikethrough | bullist numlist | outdent indent | alignleft aligncenter alignright alignjustify | removeformat | help');
        editorArea.setAttribute('menubar', 'false');
        editorArea.setAttribute('height', '350');
        editorArea.setAttribute('placeholder', 'Describe item here.');
        todoItemForm.appendChild(editorArea);

        // Setup due by date
        const dueByRow = document.createElement('div');
        dueByRow.classList.add('form-row');
        const dueByLabel = document.createElement('label');
        dueByLabel.setAttribute('for', 'dueByDate');
        dueByLabel.textContent = 'Due By:';
        dueByRow.appendChild(dueByLabel);
        const dueByInput = document.createElement('input');
        dueByInput.setAttribute('id', 'dueByDate');
        dueByInput.setAttribute('name', 'dueByDate');
        dueByInput.setAttribute('type', 'date');
        dueByInput.setAttribute('required', '');
        dueByRow.appendChild(dueByInput);
        todoItemForm.appendChild(dueByRow);

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
        lowPriorityButton.setAttribute('value', 'set-low-priority');
        lowPriorityButtonContainer.appendChild(lowPriorityButton);
        const lowPriorityButtonLabel = document.createElement('label');
        lowPriorityButtonLabel.setAttribute('for', 'low-priority');
        lowPriorityButtonLabel.classList.add('priority-button-label');
        lowPriorityButtonLabel.textContent = 'Low';
        lowPriorityButtonContainer.appendChild(lowPriorityButtonLabel);
        priorityButtonsContainer.append(lowPriorityButtonContainer);

        const mediumPriorityButtonContainer = document.createElement('div');
        mediumPriorityButtonContainer.classList.add('priority-button');
        const mediumPriorityButton = document.createElement('input');
        mediumPriorityButton.setAttribute('id', 'medium-priority');
        mediumPriorityButton.setAttribute('name', 'set-priority');
        mediumPriorityButton.setAttribute('type', 'radio');
        mediumPriorityButton.setAttribute('value', 'set-medium-priority');
        mediumPriorityButtonContainer.appendChild(mediumPriorityButton);
        const mediumPriorityButtonLabel = document.createElement('label');
        mediumPriorityButtonLabel.setAttribute('for', 'medium-priority');
        mediumPriorityButtonLabel.classList.add('priority-button-label');
        mediumPriorityButtonLabel.textContent = 'Medium';
        mediumPriorityButtonContainer.appendChild(mediumPriorityButtonLabel);
        priorityButtonsContainer.appendChild(mediumPriorityButtonContainer);

        const highPriorityButtonContainer = document.createElement('div');
        highPriorityButtonContainer.classList.add('priority-button');
        const highPriorityButton = document.createElement('input');
        highPriorityButton.setAttribute('id', 'high-priority');
        highPriorityButton.setAttribute('name', 'set-priority');
        highPriorityButton.setAttribute('type', 'radio');
        highPriorityButton.setAttribute('value', 'set-high-priority');
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
        submitButton.classList.add('add-todo-button');
        submitButton.textContent = 'Add';
        submitButtonContainer.appendChild(submitButton);
        buttonsRow.appendChild(submitButtonContainer);

        todoItemForm.appendChild(buttonsRow);
        todoItemFormContainer.appendChild(todoItemForm);
        return todoItemFormContainer;
    }

}