/******************************************************************************
 *         Name: DataHandler.js
 *       Author: Chad Chapman
 * Date Created: February 2, 2023
 *  Description: Functions that support implementation of Todo List item
******************************************************************************/
import { TodoItem } from "./TodoItem";

export class DataHandler {

    /**
     * Default constructor for the DataHandler super class.
     */
    constructor() {

    }

    getTodoItem(key) {
        let deserializedObj = JSON.parse(localStorage.getItem(key));
        
        const itemType = deserializedObj.itemType;
        if(itemType == 'TodoItem') {
            const parentProject = deserializedObj.parentProject;
            const title = deserializedObj.title;
            const description = deserializedObj.description;
            const dueDate = deserializedObj.dueDate;
            const priority = deserializedObj.priority;

            const todoItem = new TodoItem(itemType, parentProject, title, description, dueDate, priority);
            return todoItem;
        }
    }
    
    setTodoItem(item, title) {
        let serializedObj = JSON.stringify(item);
        localStorage.setItem(title, serializedObj);
    }
}