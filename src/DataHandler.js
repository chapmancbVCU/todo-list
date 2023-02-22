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
     * Returns the type of item we are using.  The available types are todo 
     * list item, project, and note.
     * @returns String representation of the item type.
     */
    getItemType() {
        return this.itemType;
    }

    /**
     * Returns the title of a todo list item, project, or note.
     * @returns String that contains the title of a todo list item, project, 
     * or note.
     */
    getTitle() {
        return this.title;
    }

    /**
     * Setter function for updating the title of a todo list item, project, or 
     * note.
     * @param {String} title The title of the todo list item, project, or note 
     * that we want to set. 
     */
    setTitle(title) {
        this.title = title;
    }

    /**
     * This method accepts a todo list item, project, or note object as input 
     * ad stores it as a string in local storage.
     * @param {Object} item The todo list item, project, or note that we want 
     * to add to local storage.
     * @param {String} key The keyName for the how we will identify an item 
     * in local storage.
     * @returns void
     */
    setTodoItem(item, key) {
        let serializedObj = JSON.stringify(item);
        localStorage.setItem(key, serializedObj);
    }
}