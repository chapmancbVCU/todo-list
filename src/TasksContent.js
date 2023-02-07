/******************************************************************************
 * IMPORTS
 *****************************************************************************/
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
        
        const left = document.createElement('div');
        left.classList.add('todo-item-left-side');
        const toggleChecked = document.createElement('input');
        toggleChecked.setAttribute('type', 'checkbox');
        left.appendChild(toggleChecked);

        const titleContent = document.createElement('p');
        titleContent.textContent = `${todoItem.getTitle()}`;
        titleContent.classList.add('todo-item-title')
        left.appendChild(titleContent);        

        todoItemContainer.appendChild(left);

        const right = document.createElement('div');
        right.classList.add('todo-item-right-side');
        const detailsButton = document.createElement('button');
        detailsButton.textContent = 'DETAILS';
        right.appendChild(detailsButton);

        todoItemContainer.appendChild(right);

        this.tasksContainer.appendChild(todoItemContainer);
    }
}