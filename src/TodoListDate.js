
/**
 * @class A class whose purpose is to get dates in the correct format.  We 
 * needed to implement this class because the incorrect date information is 
 * returned when using the Date class.
 * @author Chad Chapman
 */
export class TodoListDate {
    /**
     * Default constructor
     */
    constructor() {
    }

    /**
     * This function returns today's date as a string in yyyy-mm-dd format.
     * @returns Today's date in yyyy-mm-dd format.
     */
    static getDate() {
        let date = new Date();
        let year = date.toLocaleString("default", { year: "numeric" });
        let month = date.toLocaleString("default", { month: "2-digit" });
        let day = date.toLocaleString("default", { day: "2-digit" });
        return `${year}-${month}-${day}`;
    }
}