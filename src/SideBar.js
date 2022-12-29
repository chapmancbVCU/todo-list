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

    sidebarComponents() {
        const categories = document.createElement('ul');
        categories.setAttribute('id', 'categories');
        
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

        categories.appendChild(homeContainer);


        return categories;
    }
}