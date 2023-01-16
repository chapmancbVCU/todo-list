/******************************************************************************
 *         Name: ProjectsForm.js
 *       Author: Chad Chapman
 * Date Created: January 15, 2023
 *  Description: Class for rendering and handling data entry for adding a new
 *               project.
******************************************************************************/

export class ProjectsForm {
    constructor() {

    }

    initializeComponents() {
        const projectsForm = document.createElement('div');
        projectsForm.textContent = 'Projects Form';
        return projectsForm;
    }
}