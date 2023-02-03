import { TodoItem } from "./TodoItem"; 

export class TasksContent {

    constructor() {
        this.tasksContainer = document.querySelector('#tasks-container');
    }

    renderTasks() {
        for(let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            
            const deserializedObj = JSON.parse(localStorage.getItem(key));

            const title = deserializedObj.title;
            const description = deserializedObj.description;
            const dueDate = deserializedObj.dueDate;
            const priority = deserializedObj.priority;
            
            const todoItemContainer = document.createElement('div');
            todoItemContainer.classList.add('todo-item');
            
            const titleContent = document.createElement('p');
            titleContent.textContent = `Title: ${title}`;
            todoItemContainer.appendChild(titleContent);

            const descriptionContent = document.createElement('p');
            descriptionContent.textContent = `Description: ${description}`;
            todoItemContainer.appendChild(descriptionContent);

            const dueDateContent = document.createElement('p');
            dueDateContent.textContent = `Due by: ${dueDate}`;
            todoItemContainer.appendChild(dueDateContent);

            const priorityContent = document.createElement('p');
            priorityContent.textContent = `Priority: ${priority}`;
            todoItemContainer.appendChild(priorityContent);

            this.tasksContainer.appendChild(todoItemContainer);
       }
    }
}