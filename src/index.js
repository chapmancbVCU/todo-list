/******************************************************************************
 *         Name: index.js
 *       Author: Chad Chapman
 * Date Created: December 26, 2022
 *  Description: Functions that support implementation of Todo List website
******************************************************************************/

/******************************************************************************
 * IMPORTS
 *****************************************************************************/
import _ from 'lodash';
import './css/styles.css';
import { AddItem } from './AddItem';
import { Page } from './page';


/******************************************************************************
 * INITIAL PAGE SETUP
 *****************************************************************************/
const page = new Page();
const addItem = new AddItem();
const contentContainer = page.getContentContainer();
const addItemSelector = document.querySelector('#add-item-button');


/******************************************************************************
 * Event listeners
 *****************************************************************************/
// Event listener for creating add item modal.
addItemSelector.addEventListener('click', function(){
    contentContainer.appendChild(addItem.initializeComponents());
    const closeModal = document.querySelector('.close');
    
    // Inside this event listener we need another one for closing the modal.
    closeModal.addEventListener('click', function() {
        addItem.closeModal();
    });
});

