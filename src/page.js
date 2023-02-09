/******************************************************************************
 * IMPORTS
 *****************************************************************************/
import CheckListIcon from './images/format-list-checks.png';
import ClipboardList from './images/clipboard-list.png';
import { SideBar } from './SideBar.js';
import TextIcon from './images/text.png';

/**
 * This file contains the Page class whose responsibility is to build the main 
 * components of the index.html page.
 * @class The Page class is responsible for the initial setup of the Todo List 
 * page's 
 * components.
 * @author Chad Chapman
 */
export class Page {
    /**
     * Default constructor.
     */
    constructor() {
        this.container = document.querySelector('#content');
        this.container.classList.add('content');
        
        this.container.appendChild(this.headerComponents());
        
        const mainContainer = document.createElement('div');
        mainContainer.setAttribute('id', 'main');
        mainContainer.classList.add('main');

        /* This may look awkward.  The parent div is created in this class
        and the SideBar class is responsible for setting up the content
        inside this div. */
        this.sideBar = new SideBar(this.sideBarComponents());
        mainContainer.appendChild(this.sideBar.getSideBarContainer());
        mainContainer.appendChild(this.tasksContainerComponents());

        this.container.appendChild(mainContainer);
        this.container.appendChild(this.footerComponents());
    }

    /**
     * Renders the footer.
     * @returns HTMLDivElement The div that contains the footer.
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
        linkedInURL.classList.add('footer-link');
        linkedInURL.textContent = "LinkedIn";
        linkedInURL.href = 'https://www.linkedin.com/in/chadchapman2010/';
        linkedIn.appendChild(linkedInURL);
        footerContainer.appendChild(linkedIn);

        const gitHub = document.createElement('p');
        gitHub.classList.add('footer-text');
        const gitHubURL = document.createElement('a');
        gitHubURL.classList.add('footer-link');
        gitHubURL.textContent = 'GitHub';
        gitHubURL.href = 'https://github.com/chapmancbVCU';
        gitHub.appendChild(gitHubURL);
        footerContainer.appendChild(gitHub);

        const docs = document.createElement('p');
        docs.classList.add('footer-text');
        const docsURL = document.createElement('a');
        docsURL.classList.add('footer-link');
        docsURL.textContent = 'JSDOC For This Project';
        docsURL.href = 'https://chapmancbvcu.github.io/todo-list/out/index.html';
        docs.appendChild(docsURL);
        footerContainer.appendChild(docs);

        return footerContainer;
    }

    /**
     * Getter function that returns the container for the page's content.
     * @returns HTMLDivElement The container for the page content.
     */
    getContentContainer() {
        return this.container;
    }

    /**
     * Renders the header section of the webpage.
     * @returns HTMLDivElement The div that contains the header section of the 
     * webpage.
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
     * Renders the logo section of the webpage.
     * @returns HTMLDivElement The div that contains logo section of the 
     * webpage.
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

        const clipboardListIcon = new Image();
        clipboardListIcon.classList.add('logo-icons');
        clipboardListIcon.src = ClipboardList;
        logoContainer.appendChild(clipboardListIcon);

        return logoContainer;
    }
 
    /**
     * This function initialized the main components of the webpage.
     * @returns HTMLDivElement The div that contains the main section of the 
     * webpage.
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
     * Renders the sidebar components.
     * @returns HTMLDivElement The div that contains the sidebar components of 
     * the webpage.
     */
    sideBarComponents() {
        const sidebarContainer = document.createElement('div');
        sidebarContainer.setAttribute('id', 'side-bar');
        sidebarContainer.classList.add('side-bar');

        return sidebarContainer;
    }

    /**
     * Renders the tasks section of the webpage.
     * @returns HTMLDivElement The div that contains the tasks for the todo 
     * list.
     */
    tasksContainerComponents() {
        const tasksContainer = document.createElement('div');
        tasksContainer.setAttribute('id', 'tasks-container');
        tasksContainer.classList.add('tasks-container');
        
        return tasksContainer;
    }

    /**
     * Renders the title of the webpage.
     * @returns HTMLDivElement The div that contains the title of the webpage.
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