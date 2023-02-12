/**
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
     * This method accepts a todo list item, project, or note object as input 
     * ad stores it as a string in local storage.
     * @param {Object} item The todo list item, project, or note that we want 
     * to add to local storage.
     * @param {String} title The keyName for the how we will identify an item 
     * in local storage.
     * @returns void
     */
    setTodoItem(item, title) {
        let serializedObj = JSON.stringify(item);
        localStorage.setItem(title, serializedObj);
    }
}