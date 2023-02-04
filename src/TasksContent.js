/******************************************************************************
 *         Name: TaskContent.js
 *       Author: Chad Chapman
 * Date Created: February 2, 2023
 *  Description: Functions that support implementation of Todo List item
******************************************************************************/
import { DataHandler } from "./DataHandler";
import { TodoItem } from "./TodoItem"; 

export class TasksContent {

    constructor() {
        this.tasksContainer = document.querySelector('#tasks-container');
    }

    renderTasks() {
        for(let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            
            let todoItem = new TodoItem();
            todoItem = todoItem.getTodoItem(key);
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
}