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

        const titleRow = document.createElement('div');
        titleRow.classList.add('form-row');
        const todoItemFormLabel = document.createElement('label');
        todoItemFormLabel.textContent = 'Title';
        titleRow.appendChild(todoItemFormLabel);
        
        const title = document.createElement('input');
        titleRow.appendChild(title);
        
        todoItemForm.appendChild(titleRow);


        const editorArea = document.createElement('tinymce-editor');
        editorArea.setAttribute('selector', 'appeditor');
        editorArea.setAttribute('plugins', 'advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table code help wordcount');
        editorArea.setAttribute('toolbar', 'undo redo | strikethrough bullist numlist outdent indent | removeformat | help');
        editorArea.setAttribute('menubar', 'false');
        editorArea.setAttribute('height', '400');
        todoItemForm.appendChild(editorArea);

        todoItemFormContainer.appendChild(todoItemForm);
        return todoItemFormContainer;
    }

}