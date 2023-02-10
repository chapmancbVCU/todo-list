/******************************************************************************
 * IMPORTS
 *****************************************************************************/
import EditIcon from './icons/note-edit.png';
import DeleteIcon from './icons/trash-can.png';
import { Project } from './Project';
import { TodoItem } from "./TodoItem"; 


/**
 * Contains the TasksContent class which is responsible for rendering contents 
 * of local storage as a list.
 * @class The TasksContent class is responsible for managing what is rendered 
 * in the main section of the page that lists what items are in local storage.
 * @author Chad Chapman
 */
export class TasksContent {
    /**
     * Default constructor.
     */
    constructor() {
        this.tasksContainer = document.querySelector('#tasks-container');
    }

    closeModals(parentContainer) {
        parentContainer.style.display = 'none';
        parentContainer.remove();
    }
    
    deleteTodoItemButton(key, todoItem) {
        const parentProject = todoItem.getParentProject();

        for(let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            if(key.includes('ProjectObj_')) {
                let project = new Project();
                project = project.getItem(key);
                const projectTitle = project.getTitle();
                if(projectTitle === parentProject) {
                    project.decrementSubTasksCount();
                    project.setTodoItem(project, key);
                }
            }
        }

        localStorage.removeItem(key);
        location.reload();
    }

    /**
     * This function is responsible for rendering the list of todo items and 
     * buttons the user can use to view and update each item.
     */
    renderTasks() {
        for(let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            
            if(key.includes('TodoItemObj_')) {
                this.renderTodoItem(key);
            }
       }
    }

    /**
     * 
     * @param {*} key 
     * @param {*} todoItem 
     */
    renderConfirmDeleteModal(key, todoItem) {
        const contentContainer = document.querySelector('#content');

        const confirmDeleteModal = document.createElement('div');
        confirmDeleteModal.classList.add('todo-item-details-bg-modal');
        confirmDeleteModal.style.display = 'flex';

        const confirmDeleteModalContent = document.createElement('div');
        confirmDeleteModalContent.classList.add('todo-item-delete-modal-content');
        
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
        deleteModalButtonsContainer.classList.add('todo-item-cancel-delete-buttons-container');
        const okButton = document.createElement('button');
        okButton.classList.add('todo-item-cancel-delete-button');
        okButton.textContent = 'OK';
        okButton.addEventListener('click', () => {
            this.deleteTodoItemButton(key, todoItem);
            this.closeModals(confirmDeleteModal);
            location.reload();
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
        description.setAttribute('id', 'foo');
        detailsModalMain.appendChild(description);

        detailsModalContent.appendChild(detailsModalMain);
        detailsContainer.appendChild(detailsModalContent);
        contentContainer.appendChild(detailsContainer);
        document.getElementById('foo').innerHTML = todoItem.getDescription();
    }

    /**
     * 
     * @param {String} key 
     * @param {TodoItem} todoItem 
     */
    renderEditDetailsModal(key, todoItem) {
        alert('Edit details link');
    }

    /**
     * Renders a row on the tasks content area for a particular todo list item.
     * @param {String} key The key for a particular todo list item in local 
     * storage.
     */
    renderTodoItem(key) {
        let todoItem = new TodoItem();
        todoItem = todoItem.getItem(key);
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

        // Event listener for edit button.
        editIcon.addEventListener('click', () => {
            this.renderEditDetailsModal(key, todoItem);
        })

        // Event listener for details button.
        detailsButton.addEventListener('click', () => {
            this.renderDetailsModal(todoItem);
        });

    }

    /**
     * This function uses the priority level of a particular todo item
     * too set a class for the todo list item row depending on its priority.
     * @param {HTMLDivElement} todoItemRow The DIV element that contains 
     * information about a particular todo list item.
     * @param {TodoItem} todoItem The todo item object whose priority level 
     * we want to test.
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
     */
    setPriorityString(priority) {
        return (priority === 'low-priority') ? 'Low' 
            : (priority === 'medium-priority') ? 'Medium'
            : 'High';
    }
}