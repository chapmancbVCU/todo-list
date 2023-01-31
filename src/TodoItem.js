/******************************************************************************
 *         Name: todoItem.js
 *       Author: Chad Chapman
 * Date Created: December 26, 2022
 *  Description: Functions that support implementation of Todo List item
******************************************************************************/

/**
 * 
 */
export class TodoItem {
    /**
     * 
     * @param {*} title 
     * @param {*} description 
     * @param {*} dueDate 
     * @param {*} priority 
     */
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;

        /**
         * Function inside constructor that reports information about todo
         * item.
         * @returns String containing information about todo item.
         */
        this.info = function() {
            return `Title: ${this.title}; Description: ${this.description}; Due Date: ${this.dueDate}; Priority: ${this.priority}`;
        }
    }

    getTodoItem() {
        let deserializedObj = JSON.parse(localStorage.getItem("todoTest"));
        //console.log(deserializedObj);
    }
    setTodoItem(todoItem) {
        let serializedObj = JSON.stringify(todoItem);
        localStorage.setItem("todoTest", serializedObj);
    }


}