import { urlBase } from "../../core/constantes.js";

(() => {
    'use strict';


    //Fields validation
    const form = document.querySelector('#formRaffle');
    const gruopAthlete = document.querySelector("#gruopAthlete");

    const inputSeachAthlete = form.querySelector('#inputSeachAthlete');

    const inputEnrolmentAthlete = document.querySelector('#inputEnrolmentAthlete');
    const inputNameAthlete = document.querySelector('#inputNameAthlete');

    const buttonSubmit = document.querySelector('#buttonSeachAthlete');
    const buttonLoad = document.querySelector('#buttonLoadSeachAthlete');
    const buttonSeachAllAthlete = document.querySelector('#buttonSeachAllAthlete');
    const buttonLoadSeachAllAthlete = document.querySelector('#buttonLoadSeachAllAthlete');

    const tableValue = document.querySelector("#tableValue");
    const bodyList = document.querySelector("#bodyList");
    const lineLoading = document.querySelector("#lineLoading");

    const tableAthlete = document.querySelector("#tableAthlete");
    const bodyListAllAthlete = document.querySelector("#bodyListAllAthlete");
    const lineLoadingAllAthlete = document.querySelector("#lineLoadingAllAthlete");

    const checkForm = () => {
        return inputSeachAthlete.validity['valid']
    }

    form.addEventListener('submit', async event => {
        event.preventDefault();
        event.stopPropagation();
        if(checkForm()){
            try {
                checkButton();
                tableAthlete.classList.add('d-none');

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
                    clearTableRaffleAthlete();

                    if(response.name != null){
                        showToast(`Atleta ${response.name} encontrado`, 'success');

                        gruopAthlete.classList.remove('d-none');
                        tableValue.classList.remove('d-none');

                        inputEnrolmentAthlete.value = response.enrolment;
                        inputNameAthlete.value = response.name;

                        seachNumberAthlete(response.enrolment);
                    } else {
                        gruopAthlete.classList.add('d-none');
                        tableValue.classList.add('d-none');

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

    buttonSeachAllAthlete.addEventListener('click', async () => {
        const responsePromise = await fetch(`${urlBase}/raffleAthleteAll`, {
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

        if(response.length) {
            clearTableAllAthlete();

            gruopAthlete.classList.add('d-none');
            tableValue.classList.add('d-none');

            tableAthlete.classList.remove('d-none');
            response.forEach(value => {
                addLineTableNumberAthlete(value);
            });
            lineLoadingAllAthlete.classList.add('d-none');
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
            response.numberRaffle.forEach(value => {
                addLineTable(value);
            });
            lineLoading.classList.add('d-none');
        }
    }

    function addLineTable(value){
        const tr = bodyList.insertRow();

        const tdNumber = tr.insertCell();
        const tdPerson = tr.insertCell();
        const tdTypePayment = tr.insertCell();

        tdNumber.innerText = value.number;
        tdPerson.innerText = value.person ?? "--";
        tdTypePayment.innerText = value.typePayment ?? "--";
    }

    function addLineTableNumberAthlete(value){
        const tr = bodyListAllAthlete.insertRow();

        const tdEnrolment = tr.insertCell();
        const tdName = tr.insertCell();
        const tdCategory = tr.insertCell();
        const tdQtdRaflles = tr.insertCell();
        const tdQtdRaflleSolds = tr.insertCell();

        tdEnrolment.innerText = value.enrolment;
        tdName.innerText = value.name;
        tdCategory.innerText = value.category;
        tdQtdRaflles.innerText = value.qtdRaflles;
        tdQtdRaflleSolds.innerText = value.qtdRaflleSolds;
    }

    const checkButton = () => {
        if(buttonLoad.classList.contains('d-none') || buttonLoadSeachAllAthlete.classList.contains('d-none')){
            buttonSubmit.classList.add('d-none');
            buttonSeachAllAthlete.classList.add('d-none');
            
            buttonLoad.classList.remove('d-none');
            buttonLoadSeachAllAthlete.classList.remove('d-none');

        } else if(buttonSubmit.classList.contains('d-none') || buttonSeachAllAthlete.classList.contains('d-none')){
            buttonLoad.classList.add('d-none');
            buttonLoadSeachAllAthlete.classList.add('d-none');
            
            buttonSubmit.classList.remove('d-none');
            buttonSeachAllAthlete.classList.remove('d-none');
        }
    }

    const clearTableAllAthlete = () => {
        const lengthChildren = bodyListAllAthlete.children.length;

        for (let index = 0; index < lengthChildren; index++) {
            bodyListAllAthlete.children.item(0).remove();
        }
    }

    const clearTableRaffleAthlete = () => {
        const lengthChildren = bodyList.children.length;

        for (let index = 0; index < lengthChildren; index++) {
            bodyList.children.item(0).remove();
        }
    }
})();