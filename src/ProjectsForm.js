/**
 * @class Class for rendering and handling data entry for adding a new project.
 * @author Chad Chapman
 */
export class ProjectsForm {
    /**
     * Default constructor.
     */
    constructor() {

    }

    /**
     * Renders the form for getting input about a new project.
     * @returns HTMLDivElement The form responsible for getting information 
     * about a project. 
     */
    initializeComponents() {
        const projectsFormContainer = document.createElement('div');
        projectsFormContainer.setAttribute('id', 'modal-form-container');

        const projectsForm = document.createElement('form');
        projectsForm.classList.add('modal-form');
        projectsForm.setAttribute('method', 'GET');
        projectsForm.setAttribute('action', '#');
        projectsForm.setAttribute('id', 'add-project-form');

        // Setup title
        const titleRow = document.createElement('div');
        titleRow.classList.add('form-row');
        const projectsFormLabel = document.createElement('label');
        projectsFormLabel.setAttribute('for', 'projects-title');
        projectsFormLabel.textContent = 'Project Title:';
        titleRow.appendChild(projectsFormLabel);
        const title = document.createElement('input');
        title.setAttribute('id', 'projects-title');
        title.setAttribute('name', 'projects-title');
        title.setAttribute('type', 'text');
        title.setAttribute('maxlength', '20');
        title.setAttribute('required', '');
        title.setAttribute('placeholder', 'Project title less than 20 characters');
        titleRow.appendChild(title);
        projectsForm.appendChild(titleRow);

        // Setup submit button
        const buttonsRow = document.createElement('div');
        buttonsRow.classList.add('buttons-form-row');
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