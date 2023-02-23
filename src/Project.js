/******************************************************************************
 * IMPORTS
 *****************************************************************************/
import { DataHandler } from "./DataHandler";


/**
 * @class The Projects class is responsible for creating Project objects.  It
 *  extends the DataHandler class which supports CRUD operations.
 * @extends DataHandler The class responsible for supporting CRUD operations.
 * @author Chad Chapman
 */

export class Project extends DataHandler {
    /**
     * Default constructor.
     * @param {String} itemType The type of item.  It can be a todo list item,
     * project, or note.
     * @param {String} title The title for the project.
     * @param {Number} The number of subtasks associated with a project.
     */
    constructor(itemType, title, subTasks) {
        super();

        /**
         * @property {String} itemType The type of object we are working with 
         * so that we can identify it when parsing this object's information 
         * from local storage.
         */
        this.itemType = itemType;

        /**
         * @property {String} title The title for this note.
         */
        this.title = title;

        /**
         * @property {Number} subTasks The number of subtasks that are 
         * associated with this project.
         */
        this.subTasks = subTasks;

        /**
         * Functing inside constructor that reports information about this 
         * project object.
         * @returns String containing information about this project.
         */
        this.info = function() {
            return `Title: ${this.title}`;
        }
    }

    /**
     * This function decrements by 1, the number of subTasks.
     * @returns void
     */
    decrementSubTasksCount() {
        this.subTasks--;
    }
    
    /**
     * This function retrieves projects that are represented in local storage 
     * as a string.  The object returned will be a project object.
     * @param {String} key A string containing the name of the key you want 
     * to retrieve the value of.  In this case, the value is an object 
     * represented as a string.
     * @returns Todo list item, project, or a note.
     */
    getItem(key) {
        let deserializedObj = JSON.parse(localStorage.getItem(key));
        
        const itemType = deserializedObj.itemType;
        if (itemType == 'ProjectObj') {
            const parentProject = deserializedObj.parentProject;
            const title = deserializedObj.title;
            const subTasks = deserializedObj.subTasks;
            const project = new Project(itemType, title, subTasks);
            return project;
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
     * Returns the number of subtasks that are associated with a project.
     * @returns Integer The number of subtasks.
     */
    getSubTasks() {
        return this.subTasks;
    }

    /**
     * Increments the this.subTasks instance variables when a new task is 
     * associated with a parent project.
     * @returns void
     */
    incrementSubTasksCount() {
        this.subTasks++;
    }
}