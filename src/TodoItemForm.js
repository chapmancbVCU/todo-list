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
        buttonsRow.classList.add('form-row');

        todoItemForm.appendChild(buttonsRow);

        todoItemFormContainer.appendChild(todoItemForm);
        return todoItemFormContainer;
    }

}