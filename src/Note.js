/******************************************************************************
 * IMPORTS
 *****************************************************************************/
import { DataHandler } from "./DataHandler";


/**
 * @class The Note class is responsible for creating todo item objects.  It
 *  extends the DataHandler class which supports CRUD operations.
 * @extends DataHandler The class responsible for supporting CRUD operations.
 * @author Chad Chapman
 */
export class Note extends DataHandler {
    /**
     * Constructor for Note object.
     * @param {String} itemType The type of item.  It can be a todo list item,
     * project, or note.
     * @param {String} title The title for this note.
     * @param {String} description The content for this particular note.
     */
    constructor(itemType, title, description) {
        super();

        /**
         * @property {String} description The description for a note.  This is 
         * the main content of the note itself
         */
        this.description = description;

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
        if (itemType == 'NoteItemObj') {
            const title = deserializedObj.title;
            const description = deserializedObj.description;

            const note = new Note(itemType, title, description);
            return note;
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
     * Setter function for updating the description of a note.
     * @param {String} description The description of the note we want to 
     * update. 
     */
    setDescription(description) {
        this.description = description;
    }
}