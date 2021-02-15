let taks1Table = document.getElementById("taks1Table");
let task1Btn = document.getElementById("task1Btn");
let next = document.getElementById("task1Btn2");
let previous = document.getElementById("task1Btn3");
let url = 1;
window.addEventListener('load', () =>{
    next.style.display = "none";
    previous.style.display = "none";
})
task1Btn.addEventListener('click', () =>{
    makeAjaxCall(url);
    next.style.display = "block";
    previous.style.display = "block";
    task1Btn.style.display = "none";
})

next.addEventListener('click', () =>{
    url++;
    makeAjaxCall(url);
})

previous.addEventListener('click', () =>{
    url--;
    makeAjaxCall(url);
})

let makeAjaxCall = (url) => {
    if(url<1 || url>6){
        taks1Table.innerHTML =`<th>No more info at the moment!</th>`;
    }else{
        fetch("https://swapi.dev/api/planets/?page=" + url)
        .then((response) =>{
            return response.json();
        })
        .then((data) => {
            let planets = data.results;
            printTableWithResult(taks1Table, planets);
        })
    }
}

let printTableWithResult = (table, data) => {
    table.innerHTML = "";
    table.innerHTML +=
    `<tr><th>Planet Name</th>
    <th>Population</th>
    <th>Climate</th>
    <th>Gravity</th></tr>
    `;
    for(const planet of data){
        table.innerHTML +=
        `<tr>
        <td>${planet.name}</td>
        <td>${planet.population}</td>
        <td>${planet.climate}</td>
        <td>${planet.gravity}</td>
        </tr>`
    }
}