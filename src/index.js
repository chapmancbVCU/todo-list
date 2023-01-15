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

const page = new Page();
const contentContainer = page.getContentContainer();
const addItemSelector = document.querySelector('#add-item-button');

addItemSelector.addEventListener('click', function(){
    const addItem = new AddItem();
    contentContainer.appendChild(addItem.initializeComponents());
});