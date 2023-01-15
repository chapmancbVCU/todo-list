/******************************************************************************
 *         Name: AddItem.js
 *       Author: Chad Chapman
 * Date Created: January 14, 2023
 *  Description: Class that contains functions for rendering form for adding 
 *               an item.  More specifically the modal div that presents a 
 *               web form.
******************************************************************************/

export class AddItem {
    constructor() {
        const addButtonContainer = document.createElement('div');
    }

    initializeComponents() {
        this.addItemContainer = document.createElement('div')
        this.addItemContainer.classList.add('bg-modal');
        this.addItemContainer.style.display = 'flex';

        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');
        modalContent.appendChild(this.renderCloseButton());
        
        this.addItemContainer.appendChild(modalContent);
        return this.addItemContainer;
    }

    closeModal() {
        this.addItemContainer.style.display = 'none';
    }
    
    renderCloseButton() {
        const closeButton = document.createElement('div');
        closeButton.classList.add('close');
        closeButton.textContent = '+';
        return closeButton;
    }
}