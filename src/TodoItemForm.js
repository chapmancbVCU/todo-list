/******************************************************************************
 *         Name: TodoItemForm.js
 *       Author: Chad Chapman
 * Date Created: January 15, 2023
 *  Description: Class for rendering and handling data entry for adding a new
 *               todo list.
******************************************************************************/

export class TodoItemForm {
    constructor() {

    }

    initializeComponents() {
        const toDoItemForm = document.createElement('div');
        toDoItemForm.textContent = 'Todo Item Form';
        return toDoItemForm;
    }
}