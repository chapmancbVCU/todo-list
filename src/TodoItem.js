/******************************************************************************
 * IMPORTS
 *****************************************************************************/
import { DataHandler } from "./DataHandler";


/**
 * Functions that support implementation of Todo List item
 * @class The TodoItem class is responsible for creating todo item objects.  It
 *  extends the DataHandler class which supports CRUD operations.
 * @extends DataHandler The class responsible for supporting CRUD operations.
 * @author Chad Chapman
 */
export class TodoItem extends DataHandler {
    /**
     * Constructor for TodoItem
     * @param {String} itemType 
     * @param {String} parentProject 
     * @param {String} title 
     * @param {String} description 
     * @param {String} dueDate 
     * @param {String} priority 
     */
    constructor(itemType, parentProject, title, description, dueDate, priority) {
        super();
        
        // Instance variables
        this.description = description;
        this.dueDate = dueDate;
        this.itemType = itemType;
        this.parentProject = parentProject;
        this.priority = priority;
        this.title = title;

        /**
         * Function inside constructor that reports information about todo
         * item.
         * @returns String containing information about todo item.
         */
        this.info = function() {
            return `Title: ${this.title}; Description: ${this.description}; Due Date: ${this.dueDate}; Priority: ${this.priority}`;
        }
    }

    /**
     * Returns the title for the TodoItem.
     * @returns String representation of the item's description.
     */
    getDescription() {
        return this.description;
    }

    /**
     * Returns the due date of the TodoItem.
     * @returns String representation of the item's due date.
     */
    getDueDate() {
        return this.dueDate;
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
    getItem(key) {
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
     * Returns the type of item we are using.  The other types are project 
     * and notes.  
     * @returns String representation of the item type.
     */
    getItemType() {
        return this.itemType;
    }

    /**
     * Returns the name of the parent project.
     * @returns String representation of the name for the parent project.
     */
    getParentProject() {
        return this.parentProject;
    }

    /**
     * Returns the priority level of the todo item.
     * @returns String that contains the value of the priority level of the
     * todo item.
     */
    getPriority() {
        return this.priority;
    }
    
    /**
     * Returns the title of this todo item.
     * @returns String that contains the title of the todo item.
     */
    getTitle() {
        return this.title;
    }
}