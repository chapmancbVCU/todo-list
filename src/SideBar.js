import { Project } from "./Project";
import { TasksContent } from "./TasksContent";
import { TodoItem } from "./TodoItem";

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
        this.sideBarContainer = sideBarContainer;
        this.sideBarContainer.appendChild(this.initializeSidebarComponents());
        this.sideBarContainer.appendChild(this.renderAddButton());
        this.sideBarContainer.appendChild(this.renderClearButton());
    }

    getSelectedTab() {
        let selectedTab = '';
        // Selected tab is used to mark which tab is selected in sidebar.
        for(let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i);
            if(key.includes('SelectedTab')) {
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
        //categories.appendChild(this.renderAddButton());
        //categories.appendChild(this.renderClearButton());
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
        clearItemButton.setAttribute('id', 'clear-item-button');
        clearItemButton.classList.add('add-item-button');
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
        if(this.getSelectedTab() === 'HOME') {
            homeLabel.textContent = '// Home';
        } else if(this.getSelectedTab() != '') {
            homeLabel.textContent = 'Home';
        } else {
            homeLabel.textContent = '// Home';
        }
        homeContainer.appendChild(homeLabel);
        
        const homeTaskCount = document.createElement('h3');
        homeTaskCount.classList.add('side-bar-task-count');

        /* Get number of available todo items in storage so that we can set
        the number of items in the home row. */
        let allTodoItemsCount = 0;
        for(let i  = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);

            if(key.includes('TodoItemObj_')) {
                allTodoItemsCount++;
            }
        }

        homeTaskCount.textContent = `${allTodoItemsCount}`;
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
        if(this.getSelectedTab() === 'NOTES') {
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
        projectsRowLabel.textContent = 'Projects';
        projectsRow.appendChild(projectsRowLabel);

        const projectsContainer = document.createElement('div');
        for(let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);

            if(key.includes('ProjectObj_')) {
                const projectDiv = document.createElement('div');
                projectDiv.setAttribute('id', `${key}`);
                projectDiv.classList.add('project-row');
                let project = new Project();
                project = project.getItem(key);
                
                /* Setup label for particular project.  We also test if the 
                the tab for this project is selected.  If selected we print 
                // before the title. */
                const projectLabel = document.createElement('h2');
                if(this.getSelectedTab() === key) {
                    projectLabel.textContent = `// ${project.getTitle()}`;
                } else {
                    projectLabel.textContent = `${project.getTitle()}`;
                }
                projectLabel.classList.add('project-name');
                projectDiv.appendChild(projectLabel);

                // Show to user how many items are associated with a project.
                const numberOfTasks = document.createElement('h3');
                numberOfTasks.classList.add('side-bar-task-count');
                numberOfTasks.textContent = `${project.getSubTasks()}`;
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
        if(this.getSelectedTab() === 'TODAY') {
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
        for(let i  = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);

            if(key.includes('TodoItemObj_')) {
                let todoItem = new TodoItem();
                todoItem = todoItem.getItem(key);
                let todaysDate = (new Date()).toISOString().split('T')[0];

                if(todoItem.getDueDate() == todaysDate) {
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
        const weekTasksContainer = document.createElement('li');
        weekTasksContainer.setAttribute('id', 'week');
        weekTasksContainer.classList.add('side-bar-row');

        const weekLabel = document.createElement('h2');
        weekLabel.classList.add('side-bar-label');
        if(this.getSelectedTab() === 'WEEK') {
            weekLabel.textContent = '// Week';
        } else {
            weekLabel.textContent = 'Week';
        } 
        weekTasksContainer.appendChild(weekLabel);
        
        const weekTaskCount = document.createElement('h3');
        weekTaskCount.classList.add('side-bar-task-count');
        weekTaskCount.textContent = '10';
        weekTasksContainer.appendChild(weekTaskCount);
        return weekTasksContainer;
    }
}

