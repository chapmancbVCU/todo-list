/******************************************************************************
 *         Name: todoItem.js
 *       Author: Chad Chapman
 * Date Created: December 26, 2022
 *  Description: Functions that support implementation of Todo List item
******************************************************************************/
import { DataHandler } from "./DataHandler";
/**
 * 
 */
export class TodoItem extends DataHandler {
    /**
     * 
     * @param {*} title 
     * @param {*} description 
     * @param {*} dueDate 
     * @param {*} priority 
     */
    constructor(title, description, dueDate, priority) {
        super();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;

        /**
         * Function inside constructor that reports information about todo
         * item.
         * @returns String containing information about todo item.
         */
        this.info = function() {
            return `Title: ${this.title}; Description: ${this.description}; Due Date: ${this.dueDate}; Priority: ${this.priority}`;
        }
    }

    getTitle() {
        return this.title;
    }


    
    


}