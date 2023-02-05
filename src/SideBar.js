import { Project } from "./Project";

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
        //this.sideBarContainer.appendChild(this.renderAddButton());
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
        categories.appendChild(this.renderAddButton());
        return categories;
    }
    
    /**
     * Renders the the add item button.
     * @returns HTMLDivElement The div that contains the add item button.
     */
    renderAddButton() {
        const addButtonContainer = document.createElement('div');
        addButtonContainer.classList.add('add-button-container');
        
        const addItemButton = document.createElement('button');
        addItemButton.setAttribute('id', 'add-item-button');
        addItemButton.classList.add('add-item-button');
        addItemButton.textContent = '+'
        addButtonContainer.appendChild(addItemButton);

        return addButtonContainer;
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

        const homeLabel = document.createElement('h3');
        homeLabel.classList.add('side-bar-label');
        homeLabel.textContent = 'Home';
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
        const notesRow = document.createElement('div');
        notesRow.classList.add('side-bar-row');

        const notesLabel = document.createElement('h3');
        notesLabel.classList.add('side-bar-label');
        notesLabel.textContent = 'Notes';
        notesRow.appendChild(notesLabel);

        return notesRow;
    }

    /**
     * Renders the sidebar label for Projects.
     * @returns HTMLDivElement The div that contains the label for the 
     * Nrojects section of the sidebar.
     */
    renderProjectsRow() {
        const projectsRow = document.createElement('div');
        projectsRow.classList.add('side-bar-row');
        projectsRow.setAttribute('id', 'projects-row');
        const projectsLabel = document.createElement('h3');
        projectsLabel.classList.add('side-bar-label');
        projectsLabel.textContent = 'Projects';
        projectsRow.appendChild(projectsLabel);

        const projectsContainer = document.createElement('div');
        for(let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);

            if(key.includes('ProjectObj_')) {
                const projectDiv = document.createElement('div');
                let project = new Project();
                project = project.getItem(key);
                projectDiv.textContent = `${project.getTitle()}`;
                projectDiv.classList.add('project-name');
                projectsContainer.appendChild(projectDiv);
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

        const todayLabel = document.createElement('h3');
        todayLabel.classList.add('side-bar-label');
        todayLabel.textContent = 'Today';
        todayTasksContainer.appendChild(todayLabel);
        
        const todayTaskCount = document.createElement('h3');
        todayTaskCount.classList.add('side-bar-task-count');
        todayTaskCount.textContent = '10';

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

        const weekLabel = document.createElement('h3');
        weekLabel.classList.add('side-bar-label');
        weekLabel.textContent = 'Week';
        weekTasksContainer.appendChild(weekLabel);
        
        const weekTaskCount = document.createElement('h3');
        weekTaskCount.classList.add('side-bar-task-count');
        weekTaskCount.textContent = '10';

        weekTasksContainer.appendChild(weekTaskCount);

        return weekTasksContainer;
    }
}

