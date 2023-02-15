/******************************************************************************
 * IMPORTS
 *****************************************************************************/
import { Editor } from "@tinymce/tinymce-webcomponent";
import tinymce from 'tinymce';
import { DataHandler } from './DataHandler';
import EditIcon from './icons/note-edit.png';
import DeleteIcon from './icons/trash-can.png';
import { Note } from './Note';
import { Project } from './Project';
import { TodoItem } from "./TodoItem"; 


/** 
 * @class The TasksContent class is responsible for managing what is rendered 
 * in the main section of the page that lists what items are in local storage. 
 * Other features include functions for viewing details of available content 
 * and updating such content with forms.
 * @author Chad Chapman
 */
export class TasksContent {
    /**
     * Default constructor.
     */
    constructor() {
        /**
         * @property {Element} tasksContainer The parent container for the 
         * contents of the tasks container.  Its id is #tasks-container.
         */
        this.tasksContainer = document.querySelector('#tasks-container');
    }

    /**
     * This function performs the close operation of a modal that is 
     * implemented by this class.  It is usually called when the user presses 
     * the close button in the title bar or a cancel button.
     * @param {HTMLDivElement} parentContainer The modal whose close button is 
     * associated with that we want to close.
     * @returns void
     */
    closeModals(parentContainer) {
        parentContainer.style.display = 'none';
        parentContainer.remove();
    }
    
    /**
     * This function is called by the event listener in the 
     * renderConfirmDeleteModal function.  It performs the delete operation 
     * and updates the parent project so that its subtask count variable is 
     * decremented if the object we are removing is a todo list item.
     * @param {String} key The string that identifies a particular todo list 
     * item, project, or note object in local storage. 
     * @param {DataHandler} item A todo list item, project, or note object. 
     * All three of these object extends the DataHandler class.
     * @returns void
     */
    deleteTodoItemButton(key, item) {
        /* Test if this item is a todo item object.  Since the todo item may 
        have a parent project we perform this test so we can decrement the
        number of subtasks associated with the project. */
        if(key.includes('TodoItemObj_')) {
            const parentProject = item.getParentProject();
            
            for(let i = 0; i < localStorage.length; i++) {
                let projectKey = localStorage.key(i);
                if(projectKey.includes('ProjectObj_')) {
                    let project = new Project();
                    project = project.getItem(projectKey);
                    const projectTitle = project.getTitle();
                    if(projectTitle === parentProject) {
                        project.decrementSubTasksCount();
                        project.setTodoItem(project, projectKey);
                    }
                }
            }
        }

        /* Finally we delete the todo item, project, or note object and 
        reload the page so updates appear. */
        localStorage.removeItem(key);
        location.reload();
    }

    /**
     * Renders the confirm delete todo item modal.  This modal prompts the 
     * user if they are sure they want to delete this item.
     * @param {String} key The string that identifies a particular todo list 
     * item in local storage. 
     * @param {TodoItem} todoItem The todo list item we may want to delete.
     * @returns void
     */
    renderConfirmDeleteModal(key, todoItem) {
        const contentContainer = document.querySelector('#content');

        const confirmDeleteModal = document.createElement('div');
        confirmDeleteModal.classList.add('todo-item-details-bg-modal');
        confirmDeleteModal.style.display = 'flex';

        const confirmDeleteModalContent = document.createElement('div');
        confirmDeleteModalContent.classList.add(
            'todo-item-delete-modal-content');
        
        // Setup title and close button.
        const confirmDeleteModalTitleContainer = document.createElement('div');
        confirmDeleteModalTitleContainer.classList.add(
            'todo-item-confirm-delete-title-container');

        const deleteItemTitle = document.createElement('div');
        deleteItemTitle.textContent = 'Delete Todo List Item';
        deleteItemTitle.classList.add('modal-title');
        confirmDeleteModalTitleContainer.appendChild(deleteItemTitle);

        const closeButton = document.createElement('div');
        closeButton.classList.add('close');
        closeButton.textContent = '+';
        confirmDeleteModalTitleContainer.appendChild(closeButton);
        closeButton.addEventListener('click', () => {
            this.closeModals(confirmDeleteModal);
        });
        confirmDeleteModalContent.appendChild(
            confirmDeleteModalTitleContainer);

        // Setup main content for delete todo item modal.
        const deleteItemModalMain = document.createElement('div');
        const deleteMessage = document.createElement('div');
        deleteMessage.classList.add('todo-item-delete-message');
        deleteMessage.textContent = 
            `Confirm you want to delete: ${todoItem.getTitle()}`;

        deleteItemModalMain.appendChild(deleteMessage);

        // Setup ok and cancel buttons.
        const deleteModalButtonsContainer = document.createElement('div');
        deleteModalButtonsContainer.classList.add(
            'todo-item-cancel-delete-buttons-container');
        const okButton = document.createElement('button');
        okButton.classList.add('todo-item-cancel-delete-button');
        okButton.textContent = 'OK';
        okButton.addEventListener('click', () => {
            this.deleteTodoItemButton(key, todoItem);
        });
        deleteModalButtonsContainer.appendChild(okButton);

        const cancelButton = document.createElement('button');
        cancelButton.classList.add('todo-item-cancel-delete-button');
        cancelButton.textContent = "Cancel";
        cancelButton.addEventListener('click', () => {
            this.closeModals(confirmDeleteModal);
        });
        deleteModalButtonsContainer.appendChild(cancelButton);

        deleteItemModalMain.appendChild(deleteModalButtonsContainer);
        
        confirmDeleteModalContent.appendChild(deleteItemModalMain);
        confirmDeleteModal.appendChild(confirmDeleteModalContent);
        contentContainer.appendChild(confirmDeleteModal); 
    }

    /**
     * Renders the modal that displays details for a particular todo item when 
     * you click on the details button.
     * @param {TodoItem} todoItem The todo item whose information we want to 
     * show to the user.
     * @returns void
     */
    renderDetailsModal(todoItem) {
        const contentContainer = document.querySelector('#content');

        const detailsContainer = document.createElement('div');
        detailsContainer.classList.add('todo-item-details-bg-modal');
        detailsContainer.style.display = 'flex';

        const detailsModalContent = document.createElement('div');
        detailsModalContent.classList.add('todo-item-details-modal-content');
        
        // Setup title and close button.
        const detailsModalTitleContainer = document.createElement('div');
        detailsModalTitleContainer.classList.add(
            'todo-item-details-modal-title-container');
        
        const detailsTitle = document.createElement('div');
        detailsTitle.textContent = `${todoItem.getTitle()}`;
        detailsTitle.classList.add('modal-title');
        detailsModalTitleContainer.appendChild(detailsTitle);

        const closeButton = document.createElement('div');
        closeButton.classList.add('close');
        closeButton.textContent = '+';
        detailsModalTitleContainer.appendChild(closeButton);
        closeButton.addEventListener('click', () => {
            this.closeModals(detailsContainer);
        });
        detailsModalContent.appendChild(detailsModalTitleContainer);

        // Setup main content for details modal.
        const detailsModalMain = document.createElement('div');

        const parentProject = document.createElement('div');
        parentProject.classList.add('todo-item-details-content');
        parentProject.textContent = `Project: ${todoItem.getParentProject()}`;
        detailsModalMain.appendChild(parentProject);

        const dueByDate = document.createElement('div');
        dueByDate.classList.add('todo-item-details-content');
        dueByDate.textContent = `Due by: ${todoItem.getDueDate()}`;
        detailsModalMain.appendChild(dueByDate);

        const priority = document.createElement('div');
        priority.classList.add('todo-item-details-content');
        priority.textContent = 
            `Priority: ${this.setPriorityString(todoItem.getPriority())}`;
        detailsModalMain.appendChild(priority);

        const description = document.createElement('div');
        description.classList.add('todo-item-details-content');
        description.setAttribute('id', 'todo-item-details');
        description.setAttribute('style', 'overflow-y:scroll;');
        description.classList.add('todo-item-description');
        detailsModalMain.appendChild(description);

        detailsModalContent.appendChild(detailsModalMain);
        detailsContainer.appendChild(detailsModalContent);
        contentContainer.appendChild(detailsContainer);
        document.getElementById('todo-item-details').innerHTML = 
            todoItem.getDescription();
    }

    /**
     * Renders the form for updating the details for a note.  This function 
     * also performs form validation and submit operations.
     * @param {String} key The string that identifies a particular note  
     * in local storage. 
     * @param {Note} note The note whose informatin we want to edit.
     * @returns void
     */ 
    renderEditNoteModal(key, note) {
        const contentContainer = document.querySelector('#content');

        // Before re proceed we need original title and note content.
        const originalTitle = note.getTitle();
        //const originalDescription = note.getDescription();

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

        // Setup main content for edit note modal.
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
            event.preventDefault();

            // Get the following information from the form.
            let newTitle = document.getElementById('note-title').value;
            let newDescription = document.getElementById(
                'edit-notes-content').value;

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
            this.closeModals(editNoteModal);
        });
        buttonsRow.appendChild(cancelButton);
        notesForm.appendChild(buttonsRow);

        editNoteModalMain.appendChild(notesForm)
        editNoteModalContent.appendChild(editNoteModalMain);
        editNoteModal.appendChild(editNoteModalContent);
        contentContainer.appendChild(editNoteModal);
    }

    /**
     * Renders the form for updating the details for a project.  This function 
     * also performs form validation and submit operations.
     * @param {String} key The string that identifies a particular project  
     * in local storage. 
     * @param {Project} project The project whose title we want to edit.
     * @returns void
     */ 
    renderEditProjectModal(key, project) {
        const contentContainer = document.querySelector('#content');

        // Before we proceed we need to get original title.
        const originalTitle = project.getTitle();

        // Begin setup of modal.
        const editProjectModal = document.createElement('div');
        editProjectModal.classList.add('project-details-bg-modal');
        editProjectModal.style.display = 'flex';

        const editProjectModalContent = document.createElement('div')
        editProjectModalContent.classList.add('project-details-modal-content');

        // Setup title and close button.
        const editProjectTitleContainer = document.createElement('div');
        editProjectTitleContainer.classList.add(
            'edit-project-title-container');
        
        const editProjectTitle = document.createElement('div');
        editProjectTitle.textContent = 'Edit Project Title';
        editProjectTitle.classList.add('modal-title');
        editProjectTitleContainer.appendChild(editProjectTitle);

        const closeButton = document.createElement('div');
        closeButton.classList.add('close');
        closeButton.textContent = '+';
        editProjectTitleContainer.appendChild(closeButton);
        closeButton.addEventListener('click', () => {
            this.closeModals(editProjectModal);
        });
        editProjectModalContent.appendChild(editProjectTitleContainer);

        // Setup main content for edit project name modal.
        const editProjectTitleModalMain = document.createElement('div');
        const projectsForm = document.createElement('form');
        projectsForm.classList.add('modal-form');
        projectsForm.setAttribute('method', 'get');
        projectsForm.setAttribute('action', '#');

        // Setup title
        const titleRow = document.createElement('div');
        titleRow.classList.add('form-row');
        const projectsFormLabel = document.createElement('label');
        projectsFormLabel.setAttribute('for', 'projects-title');
        projectsFormLabel.textContent = 'Project Title:';
        titleRow.appendChild(projectsFormLabel);
        const title = document.createElement('input');
        title.setAttribute('id', 'projects-title');
        title.setAttribute('name', 'projects-title');
        title.setAttribute('type', 'text');
        title.setAttribute('maxlength', '20');
        title.setAttribute('required', '');
        title.setAttribute('value', `${originalTitle}`);
        titleRow.appendChild(title);
        projectsForm.appendChild(titleRow);

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
            event.preventDefault();

            // Get the following information from the form.
            let newTitle = document.getElementById('projects-title').value;
            
            // Perform form validation.
            if(newTitle == "") {
                alert("Title is a required field");
            } else {
                // Update the project.
                project.setTitle(newTitle);
                project.setTodoItem(project, key);

                /* Update the parent project for child todo items.  To do this 
                we must got through each todo item in storage and compare.  If 
                there is a match we perform the update. */
                for(let i = 0; i < localStorage.length; i++) {
                    const todoItemKey = localStorage.key(i);
                    if(todoItemKey.includes('TodoItemObj_')) {
                        let todoItem = new TodoItem();
                        todoItem = todoItem.getItem(todoItemKey);
                        if(todoItem.getParentProject() === originalTitle) {
                            todoItem.setParentProject(newTitle);
                            todoItem.setTodoItem(todoItem, todoItemKey);
                        }
                    }
                }
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
        projectsForm.appendChild(buttonsRow);

        editProjectTitleModalMain.appendChild(projectsForm);

        editProjectModalContent.appendChild(editProjectTitleModalMain);
        editProjectModal.appendChild(editProjectModalContent);
        contentContainer.appendChild(editProjectModal);
    }

    /**
     * Renders a form so that the user can update details for a particular 
     * todo list item.
     * @param {String} key The string that identifies a particular todo list 
     * item in local storage. 
     * @param {TodoItem} todoItem The todo list item we want to edit.
     * @returns void
     */
    renderEditTodoListDetailsModal(key, todoItem) {
        const contentContainer = document.querySelector('#content');

        /* Get original information about todo list item so we can 
        pre-populate the form for editing. */
        const originalDueDate = todoItem.getDueDate();
        const originalParentProject = todoItem.getParentProject();
        const originalPriority = todoItem.getPriority();
        const originalTitle = todoItem.getTitle();

        //Begin setup of modal.
        const editTodoItemModal = document.createElement('div');
        editTodoItemModal.classList.add('bg-modal');
        editTodoItemModal.style.display = 'flex';

        const editTodoItemModalContent = document.createElement('div');
        editTodoItemModalContent.classList.add('todo-item-modal-content');

        // Setup title and close button.
        const editTodoItemTitleContainer = document.createElement('div');
        editTodoItemTitleContainer.classList.add('modal-title-container');

        const editTodoItemTitle = document.createElement('div');
        editTodoItemTitle.textContent = 'Edit Todo List Item';
        editTodoItemTitle.classList.add('modal-title');
        editTodoItemTitleContainer.appendChild(editTodoItemTitle);
        const closeButton = document.createElement('div');
        closeButton.classList.add('close');
        closeButton.textContent = '+';
        editTodoItemTitleContainer.appendChild(closeButton);
        closeButton.addEventListener('click', () => {
            this.closeModals(editTodoItemModal);
        });
        editTodoItemModalContent.appendChild(editTodoItemTitleContainer);

        // Setup main content for edit todo list item modal.
        const editTodoListItemModalMain = document.createElement('div');
        const todoItemForm = document.createElement('form');
        todoItemForm.classList.add('modal-form');
        todoItemForm.setAttribute('method', 'get');
        todoItemForm.setAttribute('action', '#');

        // Setup title
        const titleRow = document.createElement('div');
        titleRow.classList.add('form-row');
        const todoItemFormLabel = document.createElement('label');
        todoItemFormLabel.setAttribute('for', 'todo-title');
        todoItemFormLabel.textContent = 'Todo List Item:';
        titleRow.appendChild(todoItemFormLabel);
        const title = document.createElement('input');
        title.setAttribute('id', 'todo-title');
        title.setAttribute('name', 'todo-title');
        title.setAttribute('type', 'text');
        title.setAttribute('maxlength', '35');
        title.setAttribute('required', '');
        title.setAttribute('value', `${originalTitle}`);
        title.setAttribute('placeholder', 'Ex: Get groceries');
        titleRow.appendChild(title);
        todoItemForm.appendChild(titleRow);

        // Setup description textarea
        const editorArea = document.createElement('tinymce-editor');
        editorArea.setAttribute('id', 'todo-description');
        editorArea.setAttribute('selector', 'todo-description');
        editorArea.setAttribute('name', 'todo-description');
        editorArea.setAttribute('plugins', 'advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table code help wordcount');
        editorArea.setAttribute('toolbar', 'undo redo | | bold italic backcolor | strikethrough | outdent indent | alignleft aligncenter alignright alignjustify | removeformat | help');
        editorArea.setAttribute('menubar', 'false');
        editorArea.setAttribute('height', '300');
        editorArea.setAttribute('placeholder', 'Describe item here.');
        todoItemForm.appendChild(editorArea);

        // Setup due by date
        const dueByRow = document.createElement('div');
        dueByRow.classList.add('form-row');
        const dueByLabel = document.createElement('label');
        dueByLabel.setAttribute('for', 'due-by-date');
        dueByLabel.textContent = 'Due By:';
        dueByRow.appendChild(dueByLabel);
        const dueByInput = document.createElement('input');
        dueByInput.setAttribute('id', 'due-by-date');
        dueByInput.setAttribute('name', 'due-by-date');
        dueByInput.setAttribute('type', 'date');
        dueByInput.setAttribute('value', `${originalDueDate}`);
        dueByInput.setAttribute('required', '');
        dueByRow.appendChild(dueByInput);
        todoItemForm.appendChild(dueByRow);
        
        // Setup projects dropdown menu.
        const projectsInputRow = document.createElement('div');
        projectsInputRow.classList.add('form-row');

        const projectsLabel = document.createElement('label');
        projectsLabel.setAttribute('for', 'parent-project');
        projectsLabel.textContent = 'Project:';
        projectsInputRow.appendChild(projectsLabel);

        const projectsMenu = document.createElement('select');
        projectsMenu.setAttribute('id', 'parent-project');
        projectsMenu.setAttribute('name', 'parent-project');
        const defaultOption = document.createElement('option');
        defaultOption.setAttribute('value', 'None');
        defaultOption.text = 'None';
        projectsMenu.appendChild(defaultOption);

        // Search local storage for projects.
        for(let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);

            if(key.includes('ProjectObj_')) {
                let project = new Project();
                project = project.getItem(key);
                const projectTitle = project.getTitle();
                const projectOption = document.createElement('option');
                projectOption.setAttribute('value', `${projectTitle}`);
                projectOption.textContent = `${projectTitle}`;
                projectsMenu.appendChild(projectOption);
            }
        }
        
        projectsInputRow.appendChild(projectsMenu);
        
        todoItemForm.appendChild(projectsInputRow);
        
        // Setup buttons
        const buttonsRow = document.createElement('div');
        buttonsRow.classList.add('buttons-form-row');

        // Priority buttons container
        const priorityButtonsContainer = document.createElement('fieldset');
        priorityButtonsContainer.classList.add('priority-buttons-container');
        const priorityButtonsLegend = document.createElement('legend');
        priorityButtonsLegend.textContent = 'Priority:';
        priorityButtonsContainer.append(priorityButtonsLegend);

        const lowPriorityButtonContainer = document.createElement('div');
        lowPriorityButtonContainer.classList.add('priority-button');
        lowPriorityButtonContainer.classList.add('low-priority-button-container');
        const lowPriorityButton = document.createElement('input');
        lowPriorityButton.setAttribute('id', 'low-priority');
        lowPriorityButton.setAttribute('name', 'set-priority');
        lowPriorityButton.setAttribute('type', 'radio');
        lowPriorityButton.setAttribute('value', 'low-priority');
        //lowPriorityButton.setAttribute('checked', '');
        lowPriorityButtonContainer.appendChild(lowPriorityButton);
        const lowPriorityButtonLabel = document.createElement('label');
        lowPriorityButtonLabel.setAttribute('for', 'low-priority');
        lowPriorityButtonLabel.classList.add('priority-button-label');
        lowPriorityButtonLabel.textContent = 'Low';
        lowPriorityButtonContainer.appendChild(lowPriorityButtonLabel);
        priorityButtonsContainer.append(lowPriorityButtonContainer);

        const mediumPriorityButtonContainer = document.createElement('div');
        mediumPriorityButtonContainer.classList.add('priority-button');
        mediumPriorityButtonContainer.classList.add('medium-priority-button-container');
        const mediumPriorityButton = document.createElement('input');
        mediumPriorityButton.setAttribute('id', 'medium-priority');
        mediumPriorityButton.setAttribute('name', 'set-priority');
        mediumPriorityButton.setAttribute('type', 'radio');
        mediumPriorityButton.setAttribute('value', 'medium-priority');
        mediumPriorityButtonContainer.appendChild(mediumPriorityButton);
        const mediumPriorityButtonLabel = document.createElement('label');
        mediumPriorityButtonLabel.setAttribute('for', 'medium-priority');
        mediumPriorityButtonLabel.classList.add('priority-button-label');
        mediumPriorityButtonLabel.textContent = 'Medium';
        mediumPriorityButtonContainer.appendChild(mediumPriorityButtonLabel);
        priorityButtonsContainer.appendChild(mediumPriorityButtonContainer);

        const highPriorityButtonContainer = document.createElement('div');
        highPriorityButtonContainer.classList.add('priority-button');
        highPriorityButtonContainer.classList.add('high-priority-button-container');
        const highPriorityButton = document.createElement('input');
        highPriorityButton.setAttribute('id', 'high-priority');
        highPriorityButton.setAttribute('name', 'set-priority');
        highPriorityButton.setAttribute('type', 'radio');
        highPriorityButton.setAttribute('value', 'high-priority');
        highPriorityButtonContainer.appendChild(highPriorityButton);
        const highPriorityButtonLabel = document.createElement('label');
        highPriorityButtonLabel.setAttribute('for', 'high-priority');
        highPriorityButtonLabel.classList.add('priority-button-label');
        highPriorityButtonLabel.textContent = 'High';
        highPriorityButtonContainer.appendChild(highPriorityButtonLabel);
        priorityButtonsContainer.appendChild(highPriorityButtonContainer);

        buttonsRow.appendChild(priorityButtonsContainer);
        todoItemForm.appendChild(buttonsRow);

        // Setup submit button
        const updateButtonsRow = document.createElement('div');
        updateButtonsRow.classList.add(
            'project-edit-cancel-delete-buttons-container');
        const submitButton = document.createElement('button');
        submitButton.setAttribute('id', 'edit-project-button');
        submitButton.setAttribute('type', 'submit');
        submitButton.classList.add('project-edit-cancel-delete-button');
        submitButton.textContent = 'Submit';
        submitButton.addEventListener('click', (event) => {
            event.preventDefault();
            
            // Get the following information from the form.
            let newTitle = document.getElementById('todo-title').value;
            let newDescription = document.getElementById(
                'todo-description').value;
            let newDueByDate = document.getElementById('due-by-date').value;
            let newSelectedProject = document.getElementById(
                'parent-project').value;
            
            // Perform form validation.
            if(newTitle == "") {
                alert("Title is a required field");
            } else {
                let newPriority;
                document.getElementsByName('set-priority').forEach(radio => {
                    if (radio.checked) {
                        newPriority = radio.value;
                    }
                });

                // Update instance variables and local storage.
                todoItem.setDescription(newDescription);
                todoItem.setDueDate(newDueByDate);
                todoItem.setParentProject(newSelectedProject);
                todoItem.setPriority(newPriority);
                todoItem.setTitle(newTitle);
                todoItem.setTodoItem(todoItem, key);

                /* If parent project has changed we increment task count for
                new parent project and decrement task count for original
                parent project. */
                if(newSelectedProject != originalParentProject) {
                    for(let i = 0; i < localStorage.length; i++) {
                        let key = localStorage.key(i);
                        if(key.includes('ProjectObj_')) {
                            let project = new Project();
                            project = project.getItem(key);
                            const projectTitle = project.getTitle();
                            if(projectTitle === newSelectedProject) {
                                project.incrementSubTasksCount();
                                project.setTodoItem(project, key);
                            }
                            if(projectTitle === originalParentProject) {
                                project.decrementSubTasksCount();
                                project.setTodoItem(project, key);
                            }
                        }
                    }
                }

                location.reload();
            }
        });
        updateButtonsRow.appendChild(submitButton);

        const cancelButton = document.createElement('button');
        cancelButton.classList.add('todo-item-cancel-delete-button');
        cancelButton.textContent = "Cancel";
        cancelButton.addEventListener('click', () => {
            this.closeModals(editTodoItemModal);
        });
        updateButtonsRow.appendChild(cancelButton);
        todoItemForm.appendChild(updateButtonsRow);
        
        editTodoListItemModalMain.appendChild(todoItemForm);
        editTodoItemModalContent.appendChild(editTodoListItemModalMain);
        editTodoItemModal.appendChild(editTodoItemModalContent);
        contentContainer.appendChild(editTodoItemModal);

        /* Set value of original project and priority level after form has been 
        created and appended to parent container. */
        document.getElementById('parent-project').value = 
            originalParentProject;
        document.getElementsByName('set-priority').forEach(radio => {
            if(radio.value == originalPriority) {
                radio.checked = true;
            }
        });
    }

    /**
     * Renders a note inside the tasks content container.
     * @param {String} key The string that identifies a particular note in 
     * local storage. 
     * @returns void
     */
    renderNote(key) {
        let note = new Note();
        note = note.getItem(key);

        // Setup card for this note.
        const noteCard = document.createElement('div');
        noteCard.classList.add('note-card');
        
        // Setup title.
        const noteTitleRow = document.createElement('div');
        noteTitleRow.classList.add('note-title-row');
        const noteTitle = document.createElement('div');
        noteTitle.classList.add('note-title');
        noteTitle.textContent = `${note.getTitle()}`;
        noteTitle.addEventListener('click', () => {
            this.renderEditNoteModal(key, note);
        });
        noteTitleRow.appendChild(noteTitle);

        // Setup edit icon for this note.
        const iconsContainer = document.createElement('div');
        iconsContainer.classList.add('project-list-item-icons-container');
        const editIcon = new Image();
        editIcon.classList.add('project-list-item-icon');
        editIcon.src = EditIcon;
        iconsContainer.appendChild(editIcon);
        // Event listener for edit button.
        editIcon.addEventListener('click', () => {
            this.renderEditNoteModal(key, note);
        });

        // Setup edit icon for this note.
        const deleteIcon = new Image();
        deleteIcon.classList.add('project-list-item-icon');
        deleteIcon.src = DeleteIcon;
        iconsContainer.appendChild(deleteIcon);
        // Event listener for delete button.
        deleteIcon.addEventListener('click', () => {
            this.deleteTodoItemButton(key, note);
        });

        noteTitleRow.appendChild(iconsContainer);
        noteCard.appendChild(noteTitleRow);

        // Setup content.
        const noteContent = document.createElement('div');
        noteContent.classList.add('note-content');
        noteContent.setAttribute('id', `note-content-${key}`);
        noteContent.setAttribute('style', 'overflow-y:scroll;');
        noteCard.appendChild(noteContent);
        this.tasksContainer.appendChild(noteCard);

        /* Now that we have appended note to parent we can access the id 
        for setting content of this note. */
        document.getElementById(
            `note-content-${key}`).innerHTML = note.getDescription();
    }

    /**
     * Renders a row that contains information about a project.  This row 
     * contains the project name and icons for editing the name and deleting 
     * the project from local storage.
     * @param {String} key The string that identifies a particular project 
     * that is contained in local storage.
     * @returns void
     */
    renderProject(key) {
        let project = new Project();
        project = project.getItem(key);
        const projectsContainer = document.createElement('div');
        projectsContainer.classList.add('project-list-item');

        // Setup title.
        const projectTitle = document.createElement('div');
        projectTitle.classList.add('project-list-item-title');
        projectTitle.textContent = `${project.getTitle()}`;
        projectsContainer.appendChild(projectTitle);

        // Setup edit button icon.
        const iconsContainer = document.createElement('div');
        iconsContainer.classList.add('project-list-item-icons-container');
        const editIcon = new Image();
        editIcon.classList.add('project-list-item-icon');
        editIcon.src = EditIcon;
        iconsContainer.appendChild(editIcon);
        // Event listener for edit button.
        editIcon.addEventListener('click', () => {
            this.renderEditProjectModal(key, project);
        });

        /* Setup delete button icon.  This feature is only available when 
        the project has zero subtasks. */
        if(project.getSubTasks() < 1) {
            const deleteIcon = new Image();
            deleteIcon.classList.add('project-list-item-icon');
            deleteIcon.src = DeleteIcon;
            iconsContainer.appendChild(deleteIcon);
            // Event listener for delete button.
            deleteIcon.addEventListener('click', () => {
                this.deleteTodoItemButton(key, project);
            });
        }
        projectsContainer.appendChild(iconsContainer);
        this.tasksContainer.appendChild(projectsContainer);
    }

    /**
     * Renders a row on the tasks content area for a particular todo list item.
     * @param {String} key The key for a particular todo list item in local 
     * storage.
     * @returns void
     */
    renderTodoItem(key, todoItem) {
        const todoItemContainer = document.createElement('div');
        todoItemContainer.classList.add('todo-item');
        this.setTodoItemRowColor(todoItemContainer, todoItem);
        // Setup left side of todo item row.
        const left = document.createElement('div');
        left.classList.add('todo-item-left-side');    

        // Setup checkbox and title.
        const titleLabel = document.createElement('label')
        titleLabel.classList.add('todo-item-title');
        titleLabel.setAttribute('for', `${todoItem.getTitle()}-is-complete`);
        const toggleChecked = document.createElement('input');
        toggleChecked.setAttribute('type', 'checkbox');
        toggleChecked.setAttribute('id', `${todoItem.getTitle()}-is-complete`);


        toggleChecked.setAttribute('value', 'is-complete');
        titleLabel.appendChild(toggleChecked);
        const titleContent = document.createElement('span');
        titleContent.classList.add('todo-item-text');
        titleContent.textContent = `${todoItem.getTitle()}`;
        titleLabel.appendChild(titleContent);
        left.appendChild(titleLabel);
        todoItemContainer.appendChild(left);

        // Setup right side of todo item row.
        const right = document.createElement('div');
        right.classList.add('todo-item-right-side');

        // Show details button.
        const detailsButton = document.createElement('button');
        detailsButton.classList.add('todo-item-details-button');
        detailsButton.textContent = 'DETAILS';
        right.appendChild(detailsButton);

        // Show due date.
        const dueDate = document.createElement('div');
        dueDate.textContent = `${todoItem.getDueDate()}`;
        dueDate.classList.add('todo-item-date');
        dueDate.classList.add('todo-item-text');
        right.appendChild(dueDate);

        // Show edit and delete icons.
        const editIcon = new Image();
        editIcon.classList.add('todo-item-icon');
        editIcon.src = EditIcon;
        right.appendChild(editIcon);
        const deleteIcon = new Image();
        deleteIcon.classList.add('todo-item-icon');
        deleteIcon.src = DeleteIcon;
        right.appendChild(deleteIcon);

        todoItemContainer.appendChild(right);
        this.tasksContainer.appendChild(todoItemContainer);

        // Event listener for delete button.
        deleteIcon.addEventListener('click', () => {
            this.renderConfirmDeleteModal(key, todoItem);
        });

        // Event listener for details button.
        detailsButton.addEventListener('click', () => {
            this.renderDetailsModal(todoItem);
        });

        // Event listener for edit button.
        editIcon.addEventListener('click', () => {
            this.renderEditTodoListDetailsModal(key, todoItem);
        })

        // Check if item is completed and set value of checkbox.
        if(todoItem.getIsComplete() === true) {
            document.getElementById(
                `${todoItem.getTitle()}-is-complete`).checked = true;
        } else if (todoItem.getIsComplete() === false) {
            document.getElementById(
                `${todoItem.getTitle()}-is-complete`).checked = false;
        }

        // Event handler for checkbox.
        toggleChecked.addEventListener('click', () => {
            todoItem.setIsComplete();
            todoItem.setTodoItem(todoItem, key);
            location.reload();
        });
    }

    /**
     * This function is responsible for rendering list of items in the tasks
     * content section of the page.  Possible lists includes todo items, notes 
     * and projects.
     * @returns void
     */
    renderTasks() {
        /* Before we do anything we need to know which tab is selected
            in order to know what to render. */
        const selectedTab = sessionStorage.getItem('SelectedTab');
        for(let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            
            if(key.includes('TodoItemObj_')) {
                let todoItem = new TodoItem();
                todoItem = todoItem.getItem(key);

                /* Render todo items depending on which tab is clicked in the 
                sidebar. */
                if(selectedTab == null || selectedTab.includes('HOME')) {
                    this.renderTodoItem(key, todoItem);
                } else if (selectedTab.includes('TODAY')) {
                    let todaysDate = (new Date()).toISOString().split('T')[0];
                    if(todoItem.getDueDate() == todaysDate) {
                        this.renderTodoItem(key, todoItem);
                    }
                } else if (selectedTab.includes('WEEK')) {
                   // alert('week');
                } else if (selectedTab.includes('ProjectObj_')) {
                    /* Detect the parent project and populate the tasks 
                    content container with only those todo items. */
                    let project = new Project();
                    project = project.getItem(selectedTab);
                    if(todoItem.getParentProject() == project.getTitle()) {
                        this.renderTodoItem(key, todoItem);
                    }

                }
            } else if(key.includes('NoteItemObj_')) {
                if(selectedTab.includes('NOTES')) {
                    this.tasksContainer.classList.remove('tasks-container');
                    this.tasksContainer.classList.add('notes-content-grid');
                    this.renderNote(key);
                }
            } else if(selectedTab.includes('PROJECTS_TAB')) {
                if(key.includes('ProjectObj_')) {
                    this.renderProject(key);
                }
            }
       }
    }

    /**
     * This function uses the priority level of a particular todo item
     * too set a class for the todo list item row depending on its priority.
     * @param {HTMLDivElement} todoItemRow The DIV element that contains 
     * information about a particular todo list item.
     * @param {TodoItem} todoItem The todo item object whose priority level 
     * we want to test.
     * @returns void
     */
    setTodoItemRowColor(todoItemRow, todoItem) {
        if(todoItem.getPriority() === 'low-priority') {
            todoItemRow.classList.add('todo-item-low-priority');
        } else if (todoItem.getPriority() === 'medium-priority') {
            todoItemRow.classList.add('todo-item-medium-priority');
        } else if (todoItem.getPriority() == 'high-priority') {
            todoItemRow.classList.add('todo-item-high-priority');
        }
    }

    /**
     * This function returns the string that represent the priority level of 
     * a particular todo item in the details modal.
     * @param {String} priority The string whose value we are testing so we 
     * can set the text for the priority level.
     * @returns Returns either the strings "Low", "Medium", or "High" 
     * depending on the value of the priority paramenter.
     * @returns void
     */
    setPriorityString(priority) {
        return (priority === 'low-priority') ? 'Low' 
            : (priority === 'medium-priority') ? 'Medium'
            : 'High';
    }
}