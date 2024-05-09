import { urlBase } from "../../core/constantes.js";

(() => {
    'use strict';


    //Fields validation
    const form = document.querySelector('#formRaffle');
    const gruopAthlete = document.querySelector("#gruopAthlete");
    const showNumber = document.querySelector("#showNumber");

    const inputSeachAthlete = form.querySelector('#inputSeachAthlete');
    const inputEnrolmentAthlete = form.querySelector('#inputEnrolmentAthlete');
    const inputNameAthlete = form.querySelector('#inputNameAthlete');

    
    const buttonSubmit = document.querySelector('#buttonSeachAthlete');
    const buttonLoad = document.querySelector('#buttonLoadSeachAthlete');

    const buttonSubmitNewNumber = document.querySelector('#buttonSubmitNewNumber');
    const buttonLoadNewNumber = document.querySelector('#buttonLoadNewNumber');

    const checkForm = () => {
        return inputSeachAthlete.validity['valid']
    }

    form.addEventListener('submit', async event => {
        event.preventDefault();
        event.stopPropagation();
        if(checkForm()){
            try {
                checkButton();
                removeNumber();

                const responsePromise = await fetch(`${urlBase}/athleteSeach/${inputSeachAthlete.value}`, {
                    method: "GET",
                    mode: "cors",
                    cache: "no-cache",
                    credentials: "same-origin",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    redirect: "follow",
                    referrerPolicy: "no-referrer"
                });
                const response = await responsePromise.json();

                if(responsePromise.status == 200){
                    if(response.name != null){
                        showToast(`Atleta ${response.name} encontrado`, 'success');

                        gruopAthlete.classList.remove('d-none');
                        inputEnrolmentAthlete.value = response.enrolment;
                        inputNameAthlete.value = response.name;

                        seachNumberAthlete(response.enrolment);
                    } else {
                        gruopAthlete.classList.add('d-none');
                        inputEnrolmentAthlete.value = null;
                        inputNameAthlete.value = null;
                        showToast(`Atleta não encontrado`, 'warning');
                    }
                }

                checkButton();
              } catch (error) {
                showToast(error.message, 'danger');
                checkButton();
              }
        }
    });

    buttonSubmitNewNumber.addEventListener('click', async () => {
        try {
            if(!inputEnrolmentAthlete.value){
                showToast(`Selecione um atleta para gerar os números`, 'warning');
            }

            checkButton();
            removeNumber();

            const value = {
                enrolment: inputEnrolmentAthlete.value
            };

            const responsePromise = await fetch(`${urlBase}/raffleAthlete`, {
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

            if(response.idAthlete){
                addNumberAthlete(response.numberRaffle);
            }

            checkButton();
        } catch (error) {
            removeNumber();
            showToast(error.message, 'danger');
            checkButton();
        }
    });

    const seachNumberAthlete = async (enrolment) => {
        const responsePromise = await fetch(`${urlBase}/raffleAthlete/${enrolment}`, {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow",
            referrerPolicy: "no-referrer"
        });
        const response = await responsePromise.json();

        if(response.numberRaffle){
            addNumberAthlete(response.numberRaffle);
        }
    }

    const addNumberAthlete = (listNumber) => {
        if(listNumber.length){
            listNumber.forEach(value => {
                const wrapper = document.createElement('div');
                wrapper.classList.add('col-3');
                wrapper.classList.add('col-lg-1');
                
                wrapper.innerHTML = [
                    `   <span class="badge text-bg-${value.person ? 'success': 'primary'}">${value.number}</span>`,
                ].join('')
                
                showNumber.append(wrapper);
            });
        }
    };

    const checkButton = () => {
        if(buttonLoad.classList.contains('d-none') || buttonLoadNewNumber.classList.contains('d-none')){
            buttonSubmit.classList.add('d-none');
            buttonSubmitNewNumber.classList.add('d-none');
            
            buttonLoad.classList.remove('d-none');
            buttonLoadNewNumber.classList.remove('d-none');

        } else if(buttonSubmit.classList.contains('d-none') || buttonSubmitNewNumber.classList.contains('d-none')){
            buttonLoad.classList.add('d-none');
            buttonLoadNewNumber.classList.add('d-none');
            
            buttonSubmit.classList.remove('d-none');
            buttonSubmitNewNumber.classList.remove('d-none');
        }
    }

    const removeNumber = () => {
        const lengthChildren = showNumber.children.length;

        for (let index = 0; index < lengthChildren; index++) {
            showNumber.children.item(0).remove();
        }
    }
})();