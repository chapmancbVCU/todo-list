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
        
        // Setup left side of todo item row.
        const left = document.createElement('div');
        left.classList.add('todo-item-left-side');

        // Setup toggle complete checkbox.
        const toggleChecked = document.createElement('input');
        toggleChecked.setAttribute('type', 'checkbox');
        left.appendChild(toggleChecked);

        // Title
        const titleContent = document.createElement('p');
        titleContent.textContent = `${todoItem.getTitle()}`;
        titleContent.classList.add('todo-item-title');
        left.appendChild(titleContent);        

        todoItemContainer.appendChild(left);

        // Setup right side of todo item row.
        const right = document.createElement('div');
        right.classList.add('todo-item-right-side');

        // Show details button.
        const detailsButton = document.createElement('button');
        detailsButton.textContent = 'DETAILS';
        right.appendChild(detailsButton);

        // Show due date.
        const dueDate = document.createElement('div');
        dueDate.textContent = `${todoItem.getDueDate()}`;
        right.appendChild(dueDate);

        // Show edit and delete icons.
        const editIcon = new Image();
        editIcon.src = EditIcon;
        right.appendChild(editIcon);
        const deleteIcon = new Image();
        deleteIcon.src = DeleteIcon;
        right.appendChild(deleteIcon);

        todoItemContainer.appendChild(right);
        this.tasksContainer.appendChild(todoItemContainer);
    }
}