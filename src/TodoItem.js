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
     * Constructor for TodoItem.
     * @param {String} itemType The type of item.  It can be a todo list item,
     * project, or note.
     * @param {String} parentProject The parent project for this particular 
     * tod list item.
     * @param {String} title The title for this todo list item.
     * @param {String} description Information that is particular to this todo 
     * list item.
     * @param {String} dueDate The date that this item must be completed.
     * @param {String} priority This value can be low-priority, 
     * medium-priority or high-priority.  This suggests the urgency for this 
     * particular todo list item.
     * @param {Boolean} isComplete;
     */
    constructor(itemType, parentProject, title, description, dueDate, priority, isComplete) {
        super();
        
        // Instance variables
        this.description = description;
        this.dueDate = dueDate;
        this.isComplete = isComplete;
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
     * Returns a Boolean value depending on if the todo item has been 
     * completed.
     * @returns Boolean The value is true if item is complete and false if
     * the item has not been completed.
     */
    getIsComplete() {
        return this.isComplete;
    }
    /**
     * This function retrieves todo list items that  are represented in local 
     * storage as a string.  The object returned will be a new todo list itemb
     * @param {String} key A string containing the name of the key you want 
     * to retrieve the value of.  In this case, the value is an object 
     * represented as a string.
     * @returns Todo list item, project, or a note.
     */
    getItem(key) {
        let deserializedObj = JSON.parse(localStorage.getItem(key));
        
        const itemType = deserializedObj.itemType;
        if(itemType == 'TodoItemObj') {
            const parentProject = deserializedObj.parentProject;
            const title = deserializedObj.title;
            const description = deserializedObj.description;
            const dueDate = deserializedObj.dueDate;
            const priority = deserializedObj.priority;
            const isItemCoomplete = deserializedObj.isComplete;
            const todoItem = new TodoItem(
                itemType, 
                parentProject, 
                title, 
                description, 
                dueDate, 
                priority, 
                isItemCoomplete);
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

    /**
     * This function updates the isComplete Boolean value when the user checks 
     * the checkbox in the tasks content section.  It is used to update the 
     * checkbox and strike through the title of the completed todo list item. 
     * @param {Boolean} isComplete A Boolean value that is set when an item is 
     * set as complete or not.
     */
    setIsComplete() {
        this.isComplete = !this.isComplete;
    }

    /**
     * Setter function for the parentProject instance variable.
     * @param {String} project The name of the project we want to set to the 
     * parentProject variable.
     */
    setParentProject(project) {
        this.parentProject = project;
    }
}