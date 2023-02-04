/******************************************************************************
 * IMPORTS
 *****************************************************************************/
import { TodoItem } from "./TodoItem";

/**
 * This super class contains methods for managing local storage.
 * @class The DataHandler class contains CRUD operations for managing local 
 * storage.
 * @author Chad Chapman
 */
export class DataHandler {

    /**
     * Default constructor for the DataHandler super class.
     */
    constructor() {

    }

    /**
     * This function retrieves todo list items, projects, and notes that 
     * are represented in local storage as a string.  The object returned 
     * will be a new todo list item, a project, or notes object.
     * @param {String} key A string containing the name of the key you want 
     * to retrieve the value of.  In this case, the value is an object 
     * represented as a string.
     * @returns Todo list item, project, or a note.
     */
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
    
    /**
     * This method accepts a todo list item, project, or note object as input 
     * ad stores it as a string in local storage.
     * @param {Object} item The todo list item, project, or note that we want 
     * to add to local storage.
     * @param {String} title The keyName for the how we will identify an item 
     * in local storage.
     */
    setTodoItem(item, title) {
        let serializedObj = JSON.stringify(item);
        localStorage.setItem(title, serializedObj);
    }
}