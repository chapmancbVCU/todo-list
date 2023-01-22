/******************************************************************************
 *         Name: TodoItemForm.js
 *       Author: Chad Chapman
 * Date Created: January 15, 2023
 *  Description: Class for rendering and handling data entry for adding a new
 *               todo list.
******************************************************************************/
import { Editor } from "@tinymce/tinymce-webcomponent";
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
        todoItemForm.appendChild(editorArea);
        //const todoTextArea = document.createElement('textarea');
        
        //todoItemForm.appendChild(todoTextArea);


        todoItemFormContainer.appendChild(todoItemForm);
        return todoItemFormContainer;
    }

}