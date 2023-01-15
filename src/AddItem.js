/******************************************************************************
 *         Name: AddItem.js
 *       Author: Chad Chapman
 * Date Created: January 14, 2023
 *  Description: Class that contains functions for rendering form for adding 
 *               an item.  More specifically the modal div that presents a 
 *               web form.
******************************************************************************/
import { Page } from "./page";
export class AddItem {
    constructor() {
        
        //this.initializeComponents();
    }

    initializeComponents() {
        const addItemContainer = document.createElement('div')
        addItemContainer.classList.add('bg-modal');
        addItemContainer.textContent = 'foo';
        console.log('foo');
        addItemContainer.style.display = 'flex';
        return addItemContainer;
    }
}