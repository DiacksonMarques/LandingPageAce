import { validation, validationSelect } from  '../../core/validation.js';

(() => {
    'use strict';

    //Mask
    $('#inputResponsiblePhone').mask('(00) 0 0000-0000');

    //Fields validation
    const form = document.querySelector('#formPreRegistration');

    const gruopName = form.querySelector('#gruopName');
    const inputName = gruopName.querySelector('#inputName');
    const messageName = gruopName.querySelector('#messageName');

    inputName.addEventListener('input', () => {
        validation(form, gruopName, inputName, messageName);
    });

    const gruopAcronym = form.querySelector('#gruopAcronym');
    const inputAcronym = gruopAcronym.querySelector('#inputAcronym');
    const messageAcronym = gruopAcronym.querySelector('#messageAcronym');

    inputAcronym.addEventListener('input', () => {
        validation(form, gruopAcronym, inputAcronym, messageAcronym);
    });

    const gruopNaipe = form.querySelector('#gruopNaipe');
    const selectNaipe = gruopNaipe.querySelector('#selectNaipe');
    const messageNaipe = gruopNaipe.querySelector('#messageNaipe');

    selectNaipe.addEventListener('input', () => {
        validationSelect(form, gruopNaipe, selectNaipe, messageNaipe);
    });

    const gruopCategory = form.querySelector('#gruopCategory');
    const selectCategory = gruopCategory.querySelector('#selectCategory');
    const messageCategory = gruopCategory.querySelector('#messageCategory');

    selectCategory.addEventListener('input', () => {
        validationSelect(form, gruopCategory, selectCategory, messageCategory);
    });

    const gruopCity = form.querySelector('#gruopCity');
    const inputCity = gruopCity.querySelector('#inputCity');
    const messageCity = gruopCity.querySelector('#messageCity');

    inputCity.addEventListener('input', () => {
        validation(form, gruopCity, inputCity, messageCity);
    });

    const gruopState = form.querySelector('#gruopState');
    const inputState = gruopState.querySelector('#inputState');
    const messageState = gruopState.querySelector('#messageState');

    inputState.addEventListener('input', () => {
        validation(form, gruopState, inputState, messageState);
    });

    const gruopResponsibleName = form.querySelector('#gruopResponsibleName');
    const inputResponsibleName = gruopResponsibleName.querySelector('#inputResponsibleName');
    const messageResponsibleName = gruopResponsibleName.querySelector('#messageResponsibleName');

    inputResponsibleName.addEventListener('input', () => {
        validation(form, gruopResponsibleName, inputResponsibleName, messageResponsibleName);
    });

    const gruopResponsiblePhone = form.querySelector('#gruopResponsiblePhone');
    const inputResponsiblePhone = gruopResponsiblePhone.querySelector('#inputResponsiblePhone');
    const messageResponsiblePhone = gruopResponsiblePhone.querySelector('#messageResponsiblePhone');

    inputResponsiblePhone.addEventListener('input', () => {
        validation(form, gruopResponsiblePhone, inputResponsiblePhone, messageResponsiblePhone);
    });


    form.addEventListener('submit', event => {
        event.preventDefault();
        event.stopPropagation();

        form.classList.add('was-validated');
        gruopName.classList.remove('was-validated');
        gruopAcronym.classList.remove('was-validated');
        gruopNaipe.classList.remove('was-validated');
        gruopCategory.classList.remove('was-validated');
        gruopCity.classList.remove('was-validated');
        gruopState.classList.remove('was-validated');
        gruopResponsibleName.classList.remove('was-validated');
        gruopResponsiblePhone.classList.remove('was-validated');

        if(validationSelect(form, gruopNaipe, selectNaipe, messageNaipe)){
            validationSelect(form, gruopCategory, selectCategory, messageCategory)
            return false;
        }
        if(validationSelect(form, gruopCategory, selectCategory, messageCategory)){
            validationSelect(form, gruopNaipe, selectNaipe, messageNaipe)
            return false;
        }

        return;
    })
})()