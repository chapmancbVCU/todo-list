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
        const projectsFormContainer = document.createElement('div');
        projectsFormContainer.setAttribute('id', 'modal-form-container');
        projectsFormContainer.textContent = 'Projects Form';
        return projectsFormContainer;
    }
}