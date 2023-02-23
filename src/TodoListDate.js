

export class TodoListDate {
    constructor() {
        let date = new Date();
        let year = date.toLocaleString("default", { year: "numeric" });
        let month = date.toLocaleString("default", { month: "2-digit" });
        let day = date.toLocaleString("default", { day: "2-digit" });

        this.todaysDate = `${year}-${month}-${day}`;
    }

    static getDate() {
        let date = new Date();
        let year = date.toLocaleString("default", { year: "numeric" });
        let month = date.toLocaleString("default", { month: "2-digit" });
        let day = date.toLocaleString("default", { day: "2-digit" });
        return `${year}-${month}-${day}`;
    }
}