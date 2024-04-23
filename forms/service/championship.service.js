(() => {
    'use strict';

    //Fields validation
    const form = document.querySelector('#formPreRegistration');

    const inputName = form.querySelector('#inputName');

    const inputAcronym = form.querySelector('#inputAcronym');

    const inputInstagram = form.querySelector('#inputInstagram');

    const inputCity = form.querySelector('#inputCity');

    const inputState = form.querySelector('#inputState');

    const inputResponsibleName = form.querySelector('#inputResponsibleName');

    const inputResponsiblePhone = form.querySelector('#inputResponsiblePhone');

    
    const buttonSubmit = document.querySelector('#buttonSubmit');
    const buttonLoad = document.querySelector('#buttonLoad');

    const checkForm = () => {
        return inputName.validity['valid'] && inputAcronym.validity['valid'] && inputInstagram.validity['valid'] && 
        inputCity.validity['valid'] && inputState.validity['valid'] && inputResponsibleName.validity['valid'] && inputResponsiblePhone.validity['valid'];
    }

    form.addEventListener('submit', async event => {
        event.preventDefault();
        event.stopPropagation();
        if(checkForm()){
            try {
                checkButton();
                const value = {
                    name: inputName.value,
                    acronym: inputAcronym.value,
                    responsible: {
                        name: inputResponsibleName.value,
                        phone: inputResponsiblePhone.value
                    },
                    city: {
                        name: inputCity.value,
                        uf: inputState.value
                    },
                    instagram: inputInstagram.value
                }
                const responsePromise = await fetch('http://localhost/GEsports-back/public/team', {
                    method: "POST",
                    mode: "cors",
                    cache: "no-cache",
                    credentials: "same-origin",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    redirect: "follow",
                    referrerPolicy: "no-referrer",
                    body: JSON.stringify(value)
                });
                const response = await responsePromise.json();

                if(responsePromise.status == 200){
                    showToast(`Pré-Inscrição feita com sucesso sua Pré-Inscrição é a ${response.enrollment}`, 'success');
                    showAlert(`Pré-Inscrição feita com sucesso sua Pré-Inscrição é a ${response.enrollment}`, 'success');
                    checkButton();
                }
              } catch (error) {
                showToast(error.message, 'danger');
                showAlert(error.message, 'danger');
                checkButton();
              }
        }
    });

    const checkButton = () => {
        if(buttonLoad.classList.contains('d-none')){
            buttonSubmit.classList.add('d-none');
            buttonLoad.classList.remove('d-none');
        }

        if(buttonSubmit.classList.contains('d-none')){
            buttonLoad.classList.add('d-none');
            buttonSubmit.classList.remove('d-none');
        }
    }
})();