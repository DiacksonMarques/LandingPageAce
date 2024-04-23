import { validation } from  '../../core/validation.js';

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

    const gruopInstagram = form.querySelector('#gruopInstagram');
    const inputInstagram = gruopInstagram.querySelector('#inputInstagram');
    const messageInstagram = gruopInstagram.querySelector('#messageInstagram');

    inputInstagram.addEventListener('input', () => {
        validation(form, gruopInstagram, inputInstagram, messageInstagram);
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

        return;
    })
})()