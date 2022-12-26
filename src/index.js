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

function component() {
    const element = document.createElement('div');
  
    // Lodash, now imported by this script.
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    
    return element;
  }
  
  document.body.appendChild(component());