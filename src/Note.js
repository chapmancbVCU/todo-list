/******************************************************************************
 * IMPORTS
 *****************************************************************************/
import { DataHandler } from "./DataHandler";

/**
 * Functions that support implementation of the Note object.
 * @class The Note class is responsible for creating todo item objects.  It
 *  extends the DataHandler class which supports CRUD operations.
 * @extends DataHandler The class responsible for supporting CRUD operations.
 * @author Chad Chapman
 */
export class Note extends DataHandler {

    /**
     * Constructor for Note object.
     * @param {String} itemType 
     * @param {String} title 
     * @param {String} description 
     */
    constructor(itemType, title, description) {
        super();

        // Instance variables
        this.description = description;
        this.itemType = itemType;
        this.title = title;

        /**
         * Function inside constructor that reports information about this 
         * note.
         * @returns String containing information about this note.
         */
        this.info = function() {
            return `Title: ${this.title}; Description: ${this.description}`;
        }
    }

    /**
     * Returns the title for the note.
     * @returns String representation of the notes's description.
     */
    getDescription() {
        return this.description;
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
        if(itemType == 'NoteObj') {
            const title = deserializedObj.title;
            const description = deserializedObj.description;

            const note = new Note(itemType, title, description);
            return note;
        } 
    }

    /**
     * Returns the title of this note.
     * @returns String that contains the title of this note.
     */
    getTitle() {
        return this.title;
    }
}