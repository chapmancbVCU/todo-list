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

    sidebarComponents() {
        // The setup
        const categories = document.createElement('ul');
        categories.setAttribute('id', 'categories');

        // Render components of sidebar
        categories.appendChild(this.renderHomeContainer());
        categories.appendChild(this.renderTodayTasksContainer());

        return categories;
    }
}