(async () => {
    'use strict';

    const urlBaseProd = 'https://apia.gesport.com.br/public';
    const urlBaseLocal = 'http://localhost/GEsports-back/public';

    //Fields
    const bodyList = document.querySelector("#bodyList");

    function addLineTable(value){
        const tr = bodyList.insertRow();

        const tdId = tr.insertCell();
        const tdName = tr.insertCell();
        const tdAcronym = tr.insertCell();
        const tdInstagram = tr.insertCell();
        const tdResponsible = tr.insertCell();
        const tdCity = tr.insertCell();

        tdId.innerText = value.enrollment;
        tdName.innerText = value.name;
        tdAcronym.innerText = value.acronym;
        tdInstagram.innerText = value.instagram;
        tdResponsible.innerText = `${value.responsible.name} - ${value.responsible.phone}`;
        tdCity.innerText = `${value.city.name} - ${value.city.uf}`;
    }

    const responsePromise = await fetch(`${urlBaseProd}/teams`, {
        method: "get",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
    });
    const response = await responsePromise.json();

    response.forEach(team => {
        addLineTable(team);
    });
})();