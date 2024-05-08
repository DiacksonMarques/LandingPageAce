import { validation } from  '../../core/validation.js';

(() => {
    'use strict';

    //Mask

    //Fields validation
    const form = document.querySelector('#formRaffle');

    const gruopSeachAthlete = form.querySelector('#gruopSeachAthlete');
    const inputSeachAthlete = gruopSeachAthlete.querySelector('#inputSeachAthlete');
    const messageSeachAthlete = gruopSeachAthlete.querySelector('#messageSeachAthlete');

    inputSeachAthlete.addEventListener('input', () => {
        validation(form, gruopSeachAthlete, inputSeachAthlete, messageSeachAthlete);
    });


    form.addEventListener('submit', event => {
        event.preventDefault();
        event.stopPropagation();

        form.classList.add('was-validated');
        gruopSeachAthlete.classList.remove('was-validated');

        return;
    })
})()