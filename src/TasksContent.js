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
            
            if(key.includes('TodoItem_')) {
                this.renderTodoItem(key);
            }
       }
    }

    renderTodoItem(key) {
        let todoItem = new TodoItem();
        todoItem = todoItem.getItem(key);
        const todoItemContainer = document.createElement('div');
        todoItemContainer.classList.add('todo-item');
        
        const titleContent = document.createElement('p');
        titleContent.textContent = `Title: ${todoItem.getTitle()}`;
        todoItemContainer.appendChild(titleContent);

        const descriptionContent = document.createElement('p');
        descriptionContent.textContent = `Description: ${todoItem.getDescription()}`;
        todoItemContainer.appendChild(descriptionContent);

        const dueDateContent = document.createElement('p');
        dueDateContent.textContent = `Due by: ${todoItem.getDueDate()}`;
        todoItemContainer.appendChild(dueDateContent);

        const priorityContent = document.createElement('p');
        priorityContent.textContent = `Priority: ${todoItem.getPriority()}`;
        todoItemContainer.appendChild(priorityContent);

        const itemTypeContent = document.createElement('p');
        itemTypeContent.textContent = `Item type: ${todoItem.getItemType()}`;
        todoItemContainer.appendChild(itemTypeContent);

        const parentProjectContent = document.createElement('p');
        parentProjectContent.textContent = `Parent Project: ${todoItem.getParentProject()}`;
        todoItemContainer.appendChild(parentProjectContent);

        this.tasksContainer.appendChild(todoItemContainer);
    }
}