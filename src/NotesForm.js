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

        const notesForm = document.createElement('form');
        notesForm.classList.add('modal-form');
        notesForm.classList.add('notes-form');
        notesForm.setAttribute('method', 'get');
        notesForm.setAttribute('action', '#');

        // Setup description textarea
        const editorArea = document.createElement('tinymce-editor');
        editorArea.setAttribute('id', 'notes-content');
        editorArea.setAttribute('selector', 'notes-content');
        editorArea.setAttribute('name', 'notes-content');
        editorArea.setAttribute('plugins', 'advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table code help wordcount');
        editorArea.setAttribute('toolbar', 'undo redo | | bold italic backcolor | strikethrough | bullist numlist | outdent indent | alignleft aligncenter alignright alignjustify | removeformat | help');
        editorArea.setAttribute('menubar', 'false');
        editorArea.setAttribute('height', '300');
        editorArea.setAttribute('placeholder', 'Describe item here.');
        notesForm.appendChild(editorArea);

        // Setup submit button
        const buttonsRow = document.createElement('div');
        buttonsRow.classList.add('buttons-form-row');
        buttonsRow.classList.add('add-note-button-row');
        const submitButton = document.createElement('button');
        submitButton.setAttribute('id', 'add-note-button');
        submitButton.setAttribute('type', 'submit');
        submitButton.classList.add('add-note-button');
        submitButton.textContent = 'Add';
        buttonsRow.appendChild(submitButton);
        notesForm.appendChild(buttonsRow);

        notesFormContainer.appendChild(notesForm);
        return notesFormContainer;
    }
}