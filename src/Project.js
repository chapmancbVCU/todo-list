/******************************************************************************
 * IMPORTS
 *****************************************************************************/
import { DataHandler } from "./DataHandler";


/**
 * Functions that support implementation of the Project class.
 * @class The Projects class is responsible for creating Project objects.  It
 *  extends the DataHandler class which supports CRUD operations.
 * @extends DataHandler The class responsible for supporting CRUD operations.
 * @author Chad Chapman
 */

export class Project extends DataHandler {
    /**
     * Default constructor.
     * @param {*} itemType Used to differentiate this object from notes and 
     * todo items when parsing string from local storage.
     * @param {*} title The title for the project.
     */
    constructor(itemType, title, subTasks) {
        super();

        // Instance variables
        this.itemType = itemType;
        this.title = title;
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
        if(itemType == 'ProjectObj') {
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
     * Returns the title of this project.
     * @returns String that contains the title of this project.
     */
    getTitle() {
        return this.title;
    }

    /**
     * Increments the this.subTasks instance variables when a new task is 
     * associated with a parent project.
     */
    incrementSubTasksCount() {
        this.subTasks++;
    }
}