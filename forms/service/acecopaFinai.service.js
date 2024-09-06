import {getStore,createStore, updateStore} from '../../core/section.js';
import { urlBase } from "../../core/constantes.js";

(() => {
    'use strict';
    
    const btnFem = document.querySelector('#btnFem');
    const btnMas = document.querySelector('#btnMas');
    const containerSemi = document.querySelector('#containerSemi');
    const containerFina = document.querySelector('#containerFina');
    

    if (!getStore("keyNaipe")) {
        createStore("keyNaipe", "FEM");
    } else if(getStore("keyNaipe") == 'FEM'){
        btnFem.classList.add('active');
        btnMas.classList.remove('active');
    }else if(getStore("keyNaipe") == 'MAS'){
        btnMas.classList.add('active');
        btnFem.classList.remove('active');
    }

    //evento botão masculino e feminino//
    
    btnFem.addEventListener('click', () => {
        if (getStore("keyNaipe")!="FEM") {
            updateStore("keyNaipe", "FEM");
            btnFem.classList.add('active');
            btnMas.classList.remove('active');

            clearPage();
            pesquisaFinais();
        } 
    });

    btnMas.addEventListener('click', () => {
        if (getStore("keyNaipe")!="MAS") {
            updateStore("keyNaipe", "MAS");
            btnMas.classList.add('active');
            btnFem.classList.remove('active');

            clearPage();
            pesquisaFinais();
        }  
    });

    const pesquisaFinais = async () => {
        const responseFinailsPromise = await fetch(`${urlBase}/finails/${getStore("keyNaipe")}`, {
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
        const responseFinails = await responseFinailsPromise.json();

        if(!responseFinails.length) return;

        containerSemi.append(criarMoldeDados(responseFinails[0]));
        containerSemi.append(criarMoldeDados(responseFinails[1]));
        containerFina.append(criarMoldeDados(responseFinails[2]));
    };

    const criarMoldeDados = (finail) => {
        const divContainer = document.createElement('div');
        divContainer.classList.add('col-lg-4', 'col-md-6', 'col-xl-3');

        let arrayFinal = 
            `<div class="container-semi">
                <div class="d-flex justify-content-center align-items-center">
                    <button class="button">${finail.title}</button>
                </div>
                <div class="title justify-content-center align-items-center">
                    <span class="title d-flex justify-content-center align-items-center">
                        <img src="${finail.logoTeamHome}" class="container-img"> ${finail.teamHome}
                        <div class="title d-flex justify-content-center">
                            <div class="container-pontos">${finail.setHome}</div>
                            <div>X</div>
                            <div class="container-pontos">${finail.setAway}</div>
                        </div>
                        ${finail.teamAway} <img src="${finail.logoTeamAway}" class="container-img">
                    </span>
                </div>
                <h3 class="title">Sets</h3>
                <table class="tab-fasef sub-title">
                    <thead>
                        <tr>
                            <th scope="col">Times</th>
                            <th scope="col">1° Set</th>
                            <th scope="col">2° Set</th>
                            <th scope="col">3° Set</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th class="time-semi">
                                <span>
                                    <img src="${finail.logoTeamHome}" class="container-img"> ${finail.teamHome}
                                </span>
                            <th>${finail.setsPlayed[0].teamOne}</th>
                            <th>${finail.setsPlayed[1].teamOne}</th>
                            <th>${finail.setsPlayed[2].teamOne}</th>
                        </tr>
                        <tr>
                            <th class="time-semi">
                                <span>
                                    <img src="${finail.logoTeamAway}" class="container-img"> ${finail.teamAway}
                                </span>
                            <th>${finail.setsPlayed[0].teamTwo}</th>
                            <th>${finail.setsPlayed[1].teamTwo}</th>
                            <th>${finail.setsPlayed[2].teamTwo}</th>
                        </tr>
                    </tbody>
                </table>
            </div>`

        divContainer.innerHTML = arrayFinal;

        return divContainer;
    }

    const clearPage = () => {
        containerSemi.children.item(0).remove();
        containerSemi.children.item(0).remove();
        containerFina.children.item(0).remove();
    };

    pesquisaFinais();
})();