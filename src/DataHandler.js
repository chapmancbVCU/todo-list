export class DataHandler {

    getTodoItem() {
        let deserializedObj = JSON.parse(localStorage.getItem("todoTest"));
        console.log(deserializedObj);
    }
    setTodoItem(todoItem) {
        let serializedObj = JSON.stringify(todoItem);
        localStorage.setItem("todoTest", serializedObj);
    }
}