/******************************************************************************
 * IMPORTS
 *****************************************************************************/
import { TasksContent } from "./TasksContent";

/**
 * @class The NotesForm class is responsible for rendering the form for 
 * creating a new note.
 * @author Chad Chapman
 */
export class NotesForm extends TasksContent {
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
        editorArea.setAttribute('toolbar', 'undo redo | | bold italic backcolor | strikethrough | outdent indent | alignleft aligncenter alignright alignjustify | removeformat | help');
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

    /**
     * Renders the form for updating the details for a note.  This function 
     * also performs form validation and submit operations.
     * @param {String} key The string that identifies a particular note  
     * in local storage. 
     * @param {Note} note The note whose informatin we want to edit.
     * @returns void
     */ 
    static renderEditNoteModal(key, note) {
        const contentContainer = document.querySelector('#content');

        // Before re proceed we need original title and note content.
        const originalTitle = note.getTitle();
        const originalDescription = note.getDescription();

        //Begin setup of modal.
        const editNoteModal = document.createElement('div');
        editNoteModal.classList.add('bg-modal');
        editNoteModal.style.display = 'flex';

        const editNoteModalContent = document.createElement('div');
        editNoteModalContent.classList.add('note-modal-content');

        // Setup title and close button.
        const editNoteTitleContainer = document.createElement('div');
        editNoteTitleContainer.classList.add('modal-title-container');

        const editNoteTitle = document.createElement('div');
        editNoteTitle.textContent = 'Edit Note';
        editNoteTitle.classList.add('modal-title');
        editNoteTitleContainer.appendChild(editNoteTitle);

        const closeButton = document.createElement('div');
        closeButton.classList.add('close');
        closeButton.textContent = '+';
        editNoteTitleContainer.appendChild(closeButton);
        closeButton.addEventListener('click', () => {
            this.closeModals(editNoteModal);
        });
        editNoteModalContent.appendChild(editNoteTitleContainer);

        // Setup main content for edit project name modal.
        const editNoteModalMain = document.createElement('div');
        const notesForm = document.createElement('form');
        notesForm.classList.add('modal-form');
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
        title.setAttribute('value', `${originalTitle}`);
        title.setAttribute('placeholder', 'Ex: Get groceries');
        titleRow.appendChild(title);
        notesForm.appendChild(titleRow);

        // Setup description textarea
        const editorArea = document.createElement('tinymce-editor');
        editorArea.setAttribute('id', 'edit-notes-content');
        editorArea.setAttribute('selector', 'edit-notes-content');
        editorArea.setAttribute('name', 'edit-notes-content');
        editorArea.setAttribute('plugins', 'advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table code help wordcount');
        editorArea.setAttribute('toolbar', 'undo redo | | bold italic backcolor | strikethrough | outdent indent | alignleft aligncenter alignright alignjustify | removeformat | help');
        editorArea.setAttribute('menubar', 'false');
        editorArea.setAttribute('height', '300');
        editorArea.setAttribute('required', '');
        editorArea.setAttribute('minlength', '5');
        editorArea.setAttribute('placeholder', 'This note is about ...');
        notesForm.appendChild(editorArea);
        
        // Setup submit button
        const buttonsRow = document.createElement('div');
        buttonsRow.classList.add(
            'project-edit-cancel-delete-buttons-container');
        const submitButton = document.createElement('button');
        submitButton.setAttribute('id', 'edit-project-button');
        submitButton.setAttribute('type', 'submit');
        submitButton.classList.add('project-edit-cancel-delete-button');
        submitButton.textContent = 'Submit';
        submitButton.addEventListener('click', (event) => {
            let newTitle = document.getElementById('note-title').value;
            let newDescription = document.getElementById(
                'edit-notes-content').value;
            event.preventDefault();

            // Perform form validation.
            if(newTitle == "") {
                alert("Title is a required field");
            } else if (newDescription == "") {
                alert("Please enter note content");
            } else {
                note.setDescription(newDescription);
                note.setTitle(newTitle);
                note.setTodoItem(note, key);
                location.reload();
            }
        });
        buttonsRow.appendChild(submitButton);

        const cancelButton = document.createElement('button');
        cancelButton.classList.add('todo-item-cancel-delete-button');
        cancelButton.textContent = "Cancel";
        cancelButton.addEventListener('click', () => {
            this.closeModals(editProjectModal);
        });
        buttonsRow.appendChild(cancelButton);
        notesForm.appendChild(buttonsRow);


        editNoteModalMain.appendChild(notesForm)
        editNoteModalContent.appendChild(editNoteModalMain);
        editNoteModal.appendChild(editNoteModalContent);
        contentContainer.appendChild(editNoteModal);
    }

}