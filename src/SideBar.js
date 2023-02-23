/******************************************************************************
 * IMPORTS
 *****************************************************************************/
import { Project } from "./Project";
import { TodoItem } from "./TodoItem";
import { TodoListDate } from './TodoListDate';


/**
 * This file contains the Page class whose responsibility is to build sidebar 
 * section of the webpage.
 * @class Class for rendering the components of the sidebar.
 * @author Chad Chapman
 */
export class SideBar {
    /**
     * Constructor for setting up the sidebar.
     * @param {HTMLDivElement} sideBarContainer The container for the sidebar. 
     */
    constructor(sideBarContainer) {
        /**
         * @property {HTMLDivElement} sideBarContainer The HTMLDivElement for 
         * the sidebar of this website.
         */
        this.sideBarContainer = sideBarContainer;
        this.sideBarContainer.appendChild(this.initializeSidebarComponents());
        this.sideBarContainer.appendChild(this.renderAddButton());
        this.sideBarContainer.appendChild(this.renderClearButton());
    }

    /**
     * We use this function to get the selected tab so that we can update 
     * the sidebar row labels.
     * @returns The string representation of the currently selected tab.
     */
    getSelectedTab() {
        let selectedTab = '';
        // Selected tab is used to mark which tab is selected in sidebar.
        for (let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i);
            if (key.includes('SelectedTab')) {
                selectedTab = sessionStorage.getItem(key);
            }
        }
        return selectedTab;
    }

    /**
     * Getter function for the sidebar container.
     * @returns HTMLDivElement The div that contains the sidebar container.
     */
    getSideBarContainer() {
        return this.sideBarContainer;
    }

    /**
     * Renders the sidebar section of the webpage.
     * @returns HTMLDivElement The div that contains the sidebar for the 
     * webpage.
     */
    initializeSidebarComponents() {
        // The setup
        const categories = document.createElement('ul');
        categories.setAttribute('id', 'categories');

        // Render components of sidebar
        categories.appendChild(this.renderHomeContainer());
        categories.appendChild(this.renderTodayTasksContainer());
        categories.appendChild(this.renderWeekTasksContainer());
        categories.appendChild(this.renderProjectsRow());
        categories.appendChild(this.renderNotesRow());
        return categories;
    }
    
    /**
     * Renders the the add item button.
     * @returns HTMLDivElement The div that contains the add item button.
     */
    renderAddButton() {
        const addButtonContainer = document.createElement('div');
        addButtonContainer.classList.add('add-button-container');
        
        const addItemButton = document.createElement('h3');
        addItemButton.setAttribute('id', 'add-item-button');
        addItemButton.classList.add('add-item-button');
        addItemButton.textContent = '+'
        addButtonContainer.appendChild(addItemButton);

        return addButtonContainer;
    }

    /**
     * Renders the the add item button.
     * @returns HTMLDivElement The div that contains the add item button.
     */
    renderClearButton() {
        const clearButtonContainer = document.createElement('div');
        clearButtonContainer.classList.add('add-button-container');
        
        const clearItemButton = document.createElement('h3');
        clearItemButton.setAttribute('id', 'clear-local-storage-button');
        clearItemButton.classList.add('clear-local-storage-button');
        clearItemButton.textContent = 'C'
        clearButtonContainer.appendChild(clearItemButton);

        return clearButtonContainer;
    }
    
    /**
     * Renders the the home tasks row.
     * @param { Integer} allProjects The integer value that represents the 
     * number of all projects.
     * @returns HTMLDivElement The div that contains the row for home category 
     * of the sidebar.
     */
    renderHomeContainer() {
        
        const homeContainer = document.createElement('li');
        homeContainer.setAttribute('id', 'home');
        homeContainer.classList.add('side-bar-row');

        const homeLabel = document.createElement('h2');
        homeLabel.classList.add('side-bar-label');

        /* Determine if home tab is selected.  If it's the case we print 
        some // before the word home.  We also test if others are selected.
        Finally, if selectedTab is not set we just print // Home since it is 
        the default tab. */
        if (this.getSelectedTab() === 'HOME') {
            homeLabel.textContent = '// Home';
        } else if (this.getSelectedTab() != '') {
            homeLabel.textContent = 'Home';
        } else {
            homeLabel.textContent = '// Home';
        }
        homeContainer.appendChild(homeLabel);
        
        const homeTaskCount = document.createElement('h3');
        homeTaskCount.classList.add('side-bar-task-count');

        /* Determine which items have not been completed and keep count so we 
        can set the value for homeTaskCount.textContent. */
        let incompleteTodoItemsCount = 0;
        for (let i  = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);

            if (key.includes('TodoItemObj_')) {
                let todoItem = new TodoItem();
                todoItem = todoItem.getItem(key);
                if (todoItem.getIsComplete() == false) {
                    incompleteTodoItemsCount++;
                }
            }
        }

        homeTaskCount.textContent = `${incompleteTodoItemsCount}`;
        homeContainer.appendChild(homeTaskCount);
        return homeContainer;
    }

    /**
     * Renders the sidebar label for Notes.
     * @returns HTMLDivElement The div that contains the label for the 
     * Notes section of the sidebar.
     */
    renderNotesRow() {
        const notesRow = document.createElement('li');
        notesRow.setAttribute('id', 'notes');
        notesRow.classList.add('side-bar-row');

        const notesLabel = document.createElement('h2');
        notesLabel.classList.add('side-bar-label');
        if (this.getSelectedTab() === 'NOTES') {
            notesLabel.textContent = '// Notes';
        } else {
            notesLabel.textContent = 'Notes';
        } 
        notesRow.appendChild(notesLabel);

        return notesRow;
    }

    /**
     * Renders the sidebar label for Projects.
     * @returns HTMLDivElement The div that contains the label for the 
     * Nrojects section of the sidebar.
     */
    renderProjectsRow() {
        const projectsRow = document.createElement('li');
        projectsRow.classList.add('side-bar-row');
        projectsRow.setAttribute('id', 'side-bar-projects-row');
        const projectsRowLabel = document.createElement('h2');
        projectsRowLabel.setAttribute('id', 'project-row-label');
        projectsRowLabel.classList.add('side-bar-label');
        if (this.getSelectedTab() === 'PROJECTS_TAB') {
            projectsRowLabel.textContent = '// Projects';
        }  else {
            projectsRowLabel.textContent = 'Projects';
        }
        
        projectsRow.appendChild(projectsRowLabel);

        const projectsContainer = document.createElement('div');
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);

            if (key.includes('ProjectObj_')) {
                let count = 0;
                const projectDiv = document.createElement('div');
                projectDiv.setAttribute('id', `${key}`);
                projectDiv.classList.add('project-row');
                let project = new Project();
                project = project.getItem(key);
                
                /* Setup label for particular project.  We also test if the 
                the tab for this project is selected.  If selected we print 
                // before the title. */
                const projectLabel = document.createElement('h2');
                if (this.getSelectedTab() === key) {
                    projectLabel.textContent = `// ${project.getTitle()}`;
                } else {
                    projectLabel.textContent = `${project.getTitle()}`;
                }
                projectLabel.classList.add('project-name');
                projectDiv.appendChild(projectLabel);

                /* The number in the circle reflects how many uncompleted tasks
                exists under a parent project. */
                const numberOfTasks = document.createElement('h3');
                numberOfTasks.classList.add('side-bar-task-count');

                for (let i = 0; i < localStorage.length; i++) {
                    const todoItemKey = localStorage.key(i);
                    if (todoItemKey.includes('TodoItemObj_')) {
                        let todoItem = new TodoItem();
                        todoItem = todoItem.getItem(todoItemKey);
                        if (project.getTitle() == 
                            todoItem.getParentProject()) {
                            if (todoItem.getIsComplete() == false) {
                                count++;
                            }
                        }
                    }
                }
                numberOfTasks.textContent = count;
                projectDiv.appendChild(numberOfTasks);
                projectsContainer.appendChild(projectDiv);
                projectDiv.addEventListener('click', () => {
                    let selectedTab = `${key}`;
                    sessionStorage.setItem('SelectedTab', selectedTab);
                    location.reload();
                })
            }
        }
        projectsRow.appendChild(projectsContainer);
        return projectsRow;
    }

    /**
     * Renders the the today tasks row.
     * @returns HTMLDivElement The div that contains the row for today 
     * category of the sidebar.
     */
    renderTodayTasksContainer() {
        const todayTasksContainer = document.createElement('li');
        todayTasksContainer.setAttribute('id', 'today');
        todayTasksContainer.classList.add('side-bar-row');

        const todayLabel = document.createElement('h2');
        todayLabel.classList.add('side-bar-label');
        if (this.getSelectedTab() === 'TODAY') {
            todayLabel.textContent = '// Today';
        } else {
            todayLabel.textContent = 'Today';
        } 
        todayTasksContainer.appendChild(todayLabel);
        
        const todayTaskCount = document.createElement('h3');
        todayTaskCount.classList.add('side-bar-task-count');

        /* Perform test to see if a todo item is due today.  If the item is
        due today then we increment the count variable. */
        let count = 0;
        for (let i  = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);

            if (key.includes('TodoItemObj_')) {
                let todoItem = new TodoItem();
                todoItem = todoItem.getItem(key);
                if (todoItem.getDueDate() == TodoListDate.getDate() && 
                    todoItem.getIsComplete() == false) {
                    count++;
                }
            }
        }

        todayTaskCount.textContent = count;
        todayTasksContainer.appendChild(todayTaskCount);
        return todayTasksContainer;
    }

    
    /**
     * Renders the the week tasks row.
     * @returns HTMLDivElement The div that contains the row for week category 
     * of the sidebar.
     */
    renderWeekTasksContainer() {
        /* Figure out which todo items are due this week and set the variable 
        count to the number of those tasks. */
        Date.prototype.getFirstDayOfWeek = function() {
            return (new Date(this.setDate(this.getDate() - this.getDay())).
                toISOString().split('T')[0]);
        }
        
        Date.prototype.getLastDayOfWeek = function() {
            return (new Date(this.setDate(this.getDate() - this.getDay() +6)).
                toISOString().split('T')[0]);
        }
        
        let today = new Date();

        /* Determine how many todo items are not complete and set that as the
        value shown inside the circle. */
        let count = 0;
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);

            if (key.includes('TodoItemObj_')) {
                let todoItem = new TodoItem();
                todoItem = todoItem.getItem(key)
                let dueDate = todoItem.getDueDate();
                if (dueDate >= today.getFirstDayOfWeek() && 
                    dueDate <= today.getLastDayOfWeek() &&
                    todoItem.getIsComplete() == false) {
                    count++;
                }
            }
        }

        // Begin setup of container.
        const weekTasksContainer = document.createElement('li');
        weekTasksContainer.setAttribute('id', 'week');
        weekTasksContainer.classList.add('side-bar-row');

        const weekLabel = document.createElement('h2');
        weekLabel.classList.add('side-bar-label');
        if (this.getSelectedTab() === 'WEEK') {
            weekLabel.textContent = '// Week';
        } else {
            weekLabel.textContent = 'Week';
        } 
        weekTasksContainer.appendChild(weekLabel);
        
        const weekTaskCount = document.createElement('h3');
        weekTaskCount.classList.add('side-bar-task-count');
        weekTaskCount.textContent = count;
        weekTasksContainer.appendChild(weekTaskCount);
        return weekTasksContainer;
    }
}

