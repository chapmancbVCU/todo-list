/******************************************************************************
 *         Name: NotesForm.js
 *       Author: Chad Chapman
 * Date Created: January 15, 2023
 *  Description: Class for rendering and handling data entry for adding a new
 *               note.
******************************************************************************/

export class NotesForm {
    constructor() {

    }

    initializeComponents() {
        const notesForm = document.createElement('div');
        notesForm.setAttribute('id', 'modal-form');
        notesForm.textContent = 'Notes Form';
        return notesForm;
    }
}