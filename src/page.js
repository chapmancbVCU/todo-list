/******************************************************************************
 *         Name: index.js
 *       Author: Chad Chapman
 * Date Created: December 26, 2022
 *  Description: This file contains the Page class whose responsibility is to 
 *               build the main components of the index.html page.
******************************************************************************/

/******************************************************************************
 * IMPORTS
 *****************************************************************************/
import CheckListIcon from './images/format-list-checks.png';
import TextIcon from './images/text.png';

/**
 * The Page class is responsible for the initial setup of the Todo List page's 
 * components.
 */
export class Page {
    /**
     * Default constructor.
     */
    constructor() {
        this.container = document.querySelector('#content');
        this.container.classList.add('content');
        this.initializeComponents();
    }

    /**
     * 
     */
    get getContentContainer() {
        return this.container;
    }

    /**
     * 
     * @returns 
     */
    footerComponents() {
        const footerContainer = document.createElement('div');
        footerContainer.setAttribute('id', 'footer');
        footerContainer.classList.add('footer');
        
        const siteCurator = document.createElement('h4');
        siteCurator.textContent = 'Created by: Chad Chapman';
        siteCurator.classList.add('footer-text');
        footerContainer.appendChild(siteCurator);

        const linkedIn = document.createElement('p');
        linkedIn.classList.add('footer-text');
        const linkedInURL = document.createElement('a');
        linkedInURL.textContent = "LinkedIn";
        linkedInURL.href = 'https://www.linkedin.com/in/chadchapman2010/';
        linkedIn.appendChild(linkedInURL);
        footerContainer.appendChild(linkedIn);

        const gitHub = document.createElement('p');
        gitHub.classList.add('footer-text');
        const gitHubURL = document.createElement('a');
        gitHubURL.textContent = 'GitHub';
        gitHubURL.href = 'https://github.com/chapmancbVCU';
        gitHub.appendChild(gitHubURL);
        footerContainer.appendChild(gitHub);

        const docs = document.createElement('p');
        docs.classList.add('footer-text');
        const docsURL = document.createElement('a');
        docsURL.textContent = 'JSDOC For This Project';
        docsURL.href = 'https://chapmancbvcu.github.io/restaurant-page/out/index.html';
        docs.appendChild(docsURL);
        footerContainer.appendChild(docs);

        return footerContainer;
    }

    /**
     * 
     * @returns 
     */
    headerComponents() {
        const headerContainer = document.createElement('div');
        headerContainer.setAttribute('id', 'header');
        headerContainer.classList.add('header');

        headerContainer.appendChild(this.logoComponents());
        headerContainer.appendChild(this.titleContainerComponents());

        return headerContainer;
    }

    /**
     * 
     */
    initializeComponents() {
        this.container.appendChild(this.headerComponents());
        this.container.appendChild(this.mainComponents());
        this.container.appendChild(this.footerComponents());
    }

    /**
     * 
     * @returns 
     */
    logoComponents() {
        const logoContainer = document.createElement('div');
        logoContainer.setAttribute('id', 'logo-container');
        logoContainer.classList.add('logo-container');

        const checkListIcon = new Image();
        checkListIcon.classList.add('logo-icons');
        checkListIcon.src = CheckListIcon;
        logoContainer.appendChild(checkListIcon);

        const textImage = new Image();
        textImage.classList.add('logo-icons');
        textImage.src = TextIcon;
        logoContainer.appendChild(textImage);

        return logoContainer;
    }
 
    /**
     * 
     * @returns 
     */
    mainComponents() {
        const mainContainer = document.createElement('div');
        mainContainer.setAttribute('id', 'main');
        mainContainer.classList.add('main');

        mainContainer.appendChild(this.sideBarComponents());
        mainContainer.appendChild(this.tasksContainerComponents());

        return mainContainer;
    }

    /**
     * 
     * @returns 
     */
    sideBarComponents() {
        const sidebarContainer = document.createElement('div');
        sidebarContainer.setAttribute('id', 'side-bar');
        sidebarContainer.classList.add('side-bar');
        sidebarContainer.textContent = 'Sidebar';

        return sidebarContainer;
    }

    /**
     * 
     * @returns 
     */
    tasksContainerComponents() {
        const tasksContainer = document.createElement('div');
        tasksContainer.setAttribute('id', 'tasks-container');
        tasksContainer.textContent = "Tasks container";

        return tasksContainer;
    }

    /**
     * 
     * @returns 
     */
    titleContainerComponents() {
        const title = document.createElement('div');
        title.setAttribute('id', 'title');
        title.classList.add('title');
        const titleText = document.createElement('h1');
        titleText.textContent = "Online Todo List";
        title.appendChild(titleText);
        return title;
    }
}