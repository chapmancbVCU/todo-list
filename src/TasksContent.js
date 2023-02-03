export class TasksContent {

    constructor() {
        this.tasksContainer = document.querySelector('#tasks-container');
    }

    renderTest() {
        for(let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
           const value = localStorage.getItem(key);
           const pElement = document.createElement('p');
           pElement.textContent = value;
           this.tasksContainer.appendChild(pElement);
       }
    }
}