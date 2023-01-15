/******************************************************************************
 *         Name: SideBar.js
 *       Author: Chad Chapman
 * Date Created: December 26, 2022
 *  Description: This file contains the Page class whose responsibility is to 
 *               build sidebar section of the webpage.
******************************************************************************/

/******************************************************************************
 * IMPORTS
 *****************************************************************************/

export class SideBar {
    constructor(sideBarContainer) {
        this.sideBarContainer = sideBarContainer;

        

        this.sideBarContainer.appendChild(this.sidebarComponents());
    }

    getSideBarContainer() {
        return this.sideBarContainer;
    }

    /**
     * Renders the the home tasks row.
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
        homeTaskCount.textContent = '10';

        homeContainer.appendChild(homeTaskCount);

        return homeContainer;
    }

    renderProjectsRow() {
        const projectsRow = document.createElement('div');
        projectsRow.classList.add('side-bar-row');

        const projectsLabel = document.createElement('h3');
        projectsLabel.classList.add('side-bar-label');
        projectsLabel.textContent = 'Projects';
        projectsRow.appendChild(projectsLabel);

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

    /**
     * Renders the sidebar section of the webpage.
     * @returns HTMLDivElement The div that contains the sidebare for the 
     * webpage.
     */
    sidebarComponents() {
        // The setup
        const categories = document.createElement('ul');
        categories.setAttribute('id', 'categories');

        // Render components of sidebar
        categories.appendChild(this.renderHomeContainer());
        categories.appendChild(this.renderTodayTasksContainer());
        categories.appendChild(this.renderWeekTasksContainer());
        categories.appendChild(this.renderProjectsRow());
        return categories;
    }
}