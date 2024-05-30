import {getStore,createStore, updateStore} from '../../core/section.js';
import { urlBase } from "../../core/constantes.js";

(() => {
    'use strict';

    if (getStore("keyNaipe")==null) {
        createStore("keyNaipe", "FEM");
    }
    
    
    const tabs = document.querySelectorAll('.tab-btn');
    const btnFem = document.querySelector('#btnFem');
    const btnMas = document.querySelector('#btnMas');
    const containerGroup = document.querySelector('#container-gruop')

    //evento botão tab//
    
    tabs.forEach(tab => tab.addEventListener('click', () => tabCliked(tab)));

    const tabCliked =(tab) => {
        const contents = document.querySelectorAll('.content');

        contents.forEach(content => content.classList.remove('show'));

        const contentId = tab.getAttribute('content-Id');
        const content = document.getElementById(contentId);
        
        content.classList.add('show');

    }

    //evento botão masculino e feminino//
    
    btnFem.addEventListener('click', () => {
        if (getStore("keyNaipe")!="FEM") {
            updateStore("keyNaipe", "FEM");
            btnFem.classList.add('active');
            btnMas.classList.remove('active');
        } 
    });

    btnMas.addEventListener('click', () => {
        if (getStore("keyNaipe")!="MAS") {
            updateStore("keyNaipe", "MAS");
            btnMas.classList.add('active');
            btnFem.classList.remove('active');
        }  
    });

    const pesquisaGrupos = async () => {
        const responsePromise = await fetch(`${urlBase}/gruops/${getStore("keyNaipe")}`, {
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
        console.log(response)
        criarGrupos(response)
    }


    const criarGrupos = (gruops) => {
        gruops.forEach((guop) => {
            const divContainer = document.createElement('div');
            divContainer.classList.add('col-lg-4', 'col-md-6', 'col-xl-3');

           
            divContainer.innerHTML = [
                `<div class="container-gruop">`,
                
                `<div class="d-flex justify-content-center"> `,
                        `<button class="button">${guop.name}</button>`,
                    `</div>`,
                `</div>`
            ].join('')
            containerGroup.append(divContainer);
            

        }); 
    }



    pesquisaGrupos();
})();