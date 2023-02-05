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
    constructor(itemType, title) {
        super();

        // Instance variables
        this.itemType = itemType;
        this.title = title;

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
     * Returns the type of item we are using.  The other types are project 
     * and notes.  
     * @returns String representation of the item type.
     */
    getItemType() {
        return this.itemType;
    }

    /**
     * Returns the title of this project.
     * @returns String that contains the title of this project.
     */
    getTitle() {
        return this.title;
    }
}