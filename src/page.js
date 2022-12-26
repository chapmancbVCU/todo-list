/******************************************************************************
 *         Name: index.js
 *       Author: Chad Chapman
 * Date Created: December 26, 2022
 *  Description: This file contains the Page class whose responsibility is to 
 *               build the main components of the index.html page.
******************************************************************************/

/**
 * The Page class is responsible for the initial setup of the Todo List page's 
 * components.
 */
export class Page {

    constructor() {
        this.container = document.querySelector('#content');
        this.container.classList.add('content');
        const element = document.createElement('div');
        // Lodash, now imported by this script.
        element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    
        this.container.appendChild(element);
    }
}