/******************************************************************************
 * IMPORTS
 *****************************************************************************/
import EditIcon from './icons/note-edit.png';
import DeleteIcon from './icons/trash-can.png';
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

    renderTodoItem(key) {
        let todoItem = new TodoItem();
        todoItem = todoItem.getItem(key);
        const todoItemContainer = document.createElement('div');
        todoItemContainer.classList.add('todo-item');
        this.setTodoItemRowColor(todoItemContainer, todoItem);
        // Setup left side of todo item row.
        const left = document.createElement('div');
        left.classList.add('todo-item-left-side');

        // Setup toggle complete checkbox.
        /*const toggleChecked = document.createElement('input');
        toggleChecked.setAttribute('type', 'checkbox');
        toggleChecked.classList.add('todo-item-checkbox');
        left.appendChild(toggleChecked);

        // Title
        const titleContent = document.createElement('p');
        titleContent.textContent = `${todoItem.getTitle()}`;
        titleContent.classList.add('todo-item-title');
        titleContent.classList.add('todo-item-text');
        left.appendChild(titleContent);*/      

        const titleLabel = document.createElement('label')
        titleLabel.classList.add('todo-item-title');
        titleLabel.setAttribute('for', `${todoItem.getTitle()}-is-complete`);
        const toggleChecked = document.createElement('input');
        toggleChecked.setAttribute('type', 'checkbox');
        toggleChecked.setAttribute('id', `${todoItem.getTitle()}-is-complete`);
        toggleChecked.setAttribute('value', 'is-complete');
        titleLabel.appendChild(toggleChecked);
        const titleContent = document.createElement('span');
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
    }

    setTodoItemRowColor(todoItemRow, todoItem) {
        if(todoItem.getPriority() === 'low-priority') {
            todoItemRow.classList.add('todo-item-low-priority');
        } else if (todoItem.getPriority() === 'medium-priority') {
            todoItemRow.classList.add('todo-item-medium-priority');
        } else if (todoItem.getPriority() == 'high-priority') {
            todoItemRow.classList.add('todo-item-high-priority');
        }
    }
}