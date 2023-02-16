/**
 * @class The NotesForm class is responsible for rendering the form for 
 * creating a new note.
 * @author Chad Chapman
 */
export class NotesForm {
    /**
     * Default constructor.
     */
    constructor() {

    }

    /**
     * Renders the form for getting input about a new note.
     * @returns HTMLDivElement The form responsible for getting information 
     * about a note. 
     */
    initializeComponents() {
        const notesFormContainer = document.createElement('div');
        notesFormContainer.setAttribute('id', 'modal-form-container');

        const notesForm = document.createElement('form');
        notesForm.classList.add('modal-form');
        notesForm.classList.add('notes-form');
        notesForm.setAttribute('method', 'get');
        notesForm.setAttribute('action', '#');

        // Setup title
        const titleRow = document.createElement('div');
        titleRow.classList.add('form-row');
        const noteFormLabel = document.createElement('label');
        noteFormLabel.setAttribute('for', 'note-title');
        noteFormLabel.textContent = 'New note:';
        titleRow.appendChild(noteFormLabel);
        const title = document.createElement('input');
        title.setAttribute('id', 'note-title');
        title.setAttribute('name', 'note-title');
        title.setAttribute('type', 'text');
        title.setAttribute('maxlength', '30');
        title.setAttribute('required', '');
        title.setAttribute('placeholder', 'Ex: Get groceries');
        titleRow.appendChild(title);
        notesForm.appendChild(titleRow);

        // Setup description textarea
        const editorArea = document.createElement('tinymce-editor');
        editorArea.setAttribute('id', 'notes-content');
        editorArea.setAttribute('selector', 'notes-content');
        editorArea.setAttribute('name', 'notes-content');
        editorArea.setAttribute('plugins', 'advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table code help wordcount');
        editorArea.setAttribute('toolbar', 'undo redo | bold italic backcolor | strikethrough | outdent indent | alignleft aligncenter alignright alignjustify | removeformat | help');
        editorArea.setAttribute('menubar', 'false');
        editorArea.setAttribute('height', '300');
        editorArea.setAttribute('required', '');
        editorArea.setAttribute('minlength', '5');
        editorArea.setAttribute('placeholder', 'This note is about ...');
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