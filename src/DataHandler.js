/******************************************************************************
 *         Name: DataHandler.js
 *       Author: Chad Chapman
 * Date Created: February 2, 2023
 *  Description: Functions that support implementation of Todo List item
******************************************************************************/


export class DataHandler {

   /*getTodoItem() {
        let deserializedObj = JSON.parse(localStorage.getItem("todoTest"));
        console.log(deserializedObj);
    }*/
    
    setTodoItem(item, title) {
        let serializedObj = JSON.stringify(item);
        localStorage.setItem(title, serializedObj);
    }
}