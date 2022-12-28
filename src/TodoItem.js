/******************************************************************************
 *         Name: todoItem.js
 *       Author: Chad Chapman
 * Date Created: December 26, 2022
 *  Description: Functions that support implementation of Todo List item
******************************************************************************/

export class TodoItem {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}