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
        const notesFormContainer = document.createElement('div');
        notesFormContainer.setAttribute('id', 'modal-form-container');
        notesFormContainer.textContent = 'Notes Form';
        return notesFormContainer;
    }
}