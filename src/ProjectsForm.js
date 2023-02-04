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

        const projectsForm = document.createElement('form');
        projectsForm.classList.add('modal-form');
        projectsForm.setAttribute('method', 'get');
        projectsForm.setAttribute('action', '#');

        // Setup title
        const titleRow = document.createElement('div');
        titleRow.classList.add('form-row');
        const projectsFormLabel = document.createElement('label');
        projectsFormLabel.setAttribute('for', 'projects-title');
        projectsFormLabel.textContent = 'Title:';
        titleRow.appendChild(projectsFormLabel);
        const title = document.createElement('input');
        title.setAttribute('id', 'projects-title');
        title.setAttribute('name', 'projects-title');
        title.setAttribute('type', 'text');
        title.setAttribute('minlength', '5');
        title.setAttribute('maxlength', '50');
        title.setAttribute('required', '');
        title.setAttribute('placeholder', 'Ex: Workout checklist');
        titleRow.appendChild(title);
        projectsForm.appendChild(titleRow);

        // Setup submit button
        const buttonsRow = document.createElement('div');
        buttonsRow.classList.add('buttons-form-row');
        buttonsRow.classList.add('add-project-button-row');
        const submitButton = document.createElement('button');
        submitButton.setAttribute('id', 'add-project-button');
        submitButton.setAttribute('type', 'submit');
        submitButton.classList.add('add-project-button');
        submitButton.textContent = 'Add';
        buttonsRow.appendChild(submitButton);

        projectsForm.appendChild(buttonsRow);
        projectsFormContainer.appendChild(projectsForm);
        return projectsFormContainer;
    }
}