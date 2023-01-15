/******************************************************************************
 *         Name: AddItem.js
 *       Author: Chad Chapman
 * Date Created: January 14, 2023
 *  Description: Class that contains functions for rendering form for adding 
 *               an item.  More specifically the modal div that presents a 
 *               web form.
******************************************************************************/

/**
 * Class that contains functions for rendering form for adding an item.  More 
 * specifically, the modal div that presents a web form.
 */
export class AddItem {
    /**
     * Default constructor.
     */
    constructor() {
        const addButtonContainer = document.createElement('div');
    }

    /**
     * Function that initializes the modal for adding items.
     * @returns HTMLDivElement The div that contains the modal.
     */
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

    /**
     * Closes the modal when you press the close button.
     */
    closeModal() {
        this.addItemContainer.style.display = 'none';
        this.addItemContainer.remove();
    }

    /**
     * Function that renders the modal's close button.
     * @returns HTMLDivElement The div that contains the close button.
     */
    renderCloseButton() {
        const closeButton = document.createElement('div');
        closeButton.classList.add('close');
        closeButton.textContent = '+';
        return closeButton;
    }
}