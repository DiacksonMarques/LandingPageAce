import {getStore, updateStore} from '../../core/section.js';
import { urlBase } from "../../core/constantes.js";

(() => {
    'use strict';
    
    const tabs = document.querySelectorAll('.tab-btn');;
    const containerGroup = document.querySelector('#container-gruop');
    const tableListGames = document.querySelector("#tableListGames");
    const tableListClassification = document.querySelector("#tableListClassification");
    const tableListGruopOne = document.querySelector("#tableListGruopOne");
    const tableListGruopTwo = document.querySelector("#tableListGruopTwo");
    const tableListGruopThree = document.querySelector("#tableListGruopThree");

    //evento botão tab//
    
    tabs.forEach(tab => tab.addEventListener('click', () => tabCliked(tab)));

    const tabCliked = (tab) => {
        const contents = document.querySelectorAll('.content');

        contents.forEach(content => content.classList.remove('show'));
        tabs.forEach(btn => btn.classList.remove('active'));

        const contentId = tab.getAttribute('content-Id');
        const content = document.getElementById(contentId);
        
        content.classList.add('show');
        tab.classList.add('active');
    }

    const pesquisaGrupos = async () => {
        const responseGruopPromise = await fetch(`${urlBase}/gruops/AMB`, {
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
        const responseGruop = await responseGruopPromise.json();
        criarGrupos(responseGruop);

        const responseGamesPromise = await fetch(`${urlBase}/games/AMB`, {
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
        const responseGames = await responseGamesPromise.json();
        responseGames.forEach(game => {
            criarTabelaJogos(game);
        });

        /* const responseCalssificationPromise = await fetch(`${urlBase}/calssification/${getStore("keyNaipe")}`, {
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
        const responseCalssification= await responseCalssificationPromise.json();
        responseCalssification.forEach(calssification => {
            criarClassificao(calssification, tableListClassification.children.item(1));
        });

        let valueGruops = {one: 0, two: 1, thee: 2};

        if(getStore("keyNaipe") == 'MAS'){
            valueGruops = {one: 3, two: 4, thee: 5 };
        };

        const responseGruopDetailsOnePromise = await fetch(`${urlBase}/gruopDetails/${valueGruops.one}`, {
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
        const responseGruopDetailsOne = await responseGruopDetailsOnePromise.json();
        responseGruopDetailsOne.forEach(calssification => {
            criarClassificao(calssification, tableListGruopOne.children.item(1));
        }); */

        const responseGruopDetailTwoPromise = await fetch(`${urlBase}/gruopDetails/0`, {
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
        const responseGruopDetailTwo = await responseGruopDetailTwoPromise.json();
        responseGruopDetailTwo.forEach(calssification => {
            criarClassificao(calssification, tableListGruopTwo.children.item(1));
        });

        const responseGruopDetailTheePromise = await fetch(`${urlBase}/gruopDetails/1`, {
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
        const responseGruopDetailThee = await responseGruopDetailTheePromise.json();
        responseGruopDetailThee.forEach(calssification => {
            criarClassificao(calssification, tableListGruopThree.children.item(1));
        });
    }


    const criarGrupos = (gruops) => {
        gruops.forEach((gruop) => {
            const divContainer = document.createElement('div');
            divContainer.classList.add('col-lg-4', 'col-md-6', 'col-xl-3');

            let arrayGruops = [
                `<div class="container-gruop">`,
                    `<div class="d-flex justify-content-center"> `,
                        `<button class="button">${gruop.name}</button>`,
                    `</div>`,
                    `<div class="row justify-content-center">`,
                        `<div class="col-2 d-flex justify-content-center">`,
                            `<span class="title">P.</span>`,
                        `</div>`,
                        `<div class="col-7 d-flex justify-content-center">`,
                            `<span class="title">TIME</span>`,
                        `</div>`,
                        `<div class="col-3 d-flex justify-content-center">`,
                             `<span class="title">PON</span>`,
                        `</div>`,
                    `</div>`
            ];

            gruop.teams.forEach(team => {
                const teamArray = [
                        `<div class="row justify-content-center">`,
                            `<div class="col-2 d-flex justify-content-center">`,
                                `<span class="sub-title">${team.position}</span>`,
                            `</div>`,
                            `<div class="col-7 d-flex justify-content-center">`,
                                `<span class="sub-title">`,
                                    `<img src="${team.logo}"  alt="">${team.name}`,
                                `</span>`,
                            `</div>`,
                            `<div class="col-3 d-flex justify-content-center">`,
                                `<span class="sub-title">${team.points}</span>`,
                            `</div>`,
                        `</div>`
                ];

                arrayGruops = [...arrayGruops, ...teamArray];
            });
           
            divContainer.innerHTML = arrayGruops.join('')
            containerGroup.append(divContainer);
        }); 
    }

    const criarTabelaJogos = (game) => {
        const tr = tableListGames.children.item(1).insertRow();

        const tdOrder = tr.insertCell();
        const tdGruop = tr.insertCell();
        const tdGame = tr.insertCell();
        const tdSetOne = tr.insertCell();
        const tdSetTwo = tr.insertCell();
        const tdSetThree = tr.insertCell();

        tdOrder.innerText = game.order;
        tdGruop.innerText = game.gruop;
        tdGame.innerHTML = 
            `<span class="title d-flex justify-content-center justify-content-center">
                <img src="${game.logoTeamHome}" class="container-img"> 
                <span class="limit-text">${game.teamHome}</span>
                <div class="title d-flex justify-content-center">
                    <div class="container-pontos">${game.setHome}</div> 
                    <div>X</div> 
                    <div class="container-pontos">${game.setAway}</div> 
                </div>
                <img src="${game.logoTeamAway}" class="container-img">
                <span class="limit-text">${game.teamAway}</span>
            </span>`;
        game.setsPlayed.forEach((set, index) => {
            switch (index) {
                case 0:
                    tdSetOne.innerHTML = `
                        <div class="title d-flex justify-content-center">
                            <div class="container-pontos">${set.teamOne}</div> 
                            <div>X</div> 
                            <div class="container-pontos">${set.teamTwo}</div>
                        </div>
                    `;
                    break;
                
                case 1:
                    tdSetTwo.innerHTML = `
                        <div class="title d-flex justify-content-center">
                            <div class="container-pontos">${set.teamOne}</div> 
                            <div>X</div> 
                            <div class="container-pontos">${set.teamTwo}</div>
                        </div>
                    `;
                    break;

                case 2:
                    tdSetThree.innerHTML = `
                        <div class="title d-flex justify-content-center">
                            <div class="container-pontos">${set.teamOne}</div> 
                            <div>X</div> 
                            <div class="container-pontos">${set.teamTwo}</div>
                        </div>
                    `;
                    break;
            
                default:
                    break;
            }
        });
    }

    const criarClassificao = (calssification, table) => {
        const tr = table.insertRow();

        const tdOrder = tr.insertCell();
        const tdPoint = tr.insertCell();
        const tdTeam = tr.insertCell();
        const tdSetsWin = tr.insertCell();
        const tdPointBalance = tr.insertCell();
        
        tdOrder.innerText = calssification.position;
        tdPoint.innerText = calssification.points;
        tdTeam.innerHTML = `
            <span class="title d-flex justify-content-center justify-content-center">
                <img src="${calssification.logoTeam}" class="container-img"> ${calssification.name}
            </span>
        `;
        tdSetsWin.innerText = calssification.setsWon;
        tdPointBalance.innerText = calssification.pointBalance;
    }

    const clearPage = () => {
        for (let index = 0; index < 3; index++) {
            containerGroup.children.item(0).remove();
        }

        tableListGames.children.item(1).remove();
        criarNovoBodyTable(tableListGames, 'bodyListGames');

        tableListClassification.children.item(1).remove();
        criarNovoBodyTable(tableListClassification, 'bodyListClassification');

        tableListGruopOne.children.item(1).remove();
        criarNovoBodyTable(tableListGruopOne, 'bodyListGruopOne');

        tableListGruopTwo.children.item(1).remove();
        criarNovoBodyTable(tableListGruopTwo, 'bodyListGruopTwo');

        tableListGruopThree.children.item(1).remove();
        criarNovoBodyTable(tableListGruopThree, 'bodyListGruopThree');
    };

    const criarNovoBodyTable = (table, id) => {
        const newTable = document.createElement('tbody');
        newTable.id = id
        table.append(newTable);
    }

    
    pesquisaGrupos();
})();