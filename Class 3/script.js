//JQUERY
let btn = $("#btn");
let display = $("#display");
let clearBtn = $("#clearBtn");


btn.click(function(){
    $.ajax ({
        url: "https://jsonplaceholder.typicode.com/users",
        success: function(data){
            printDataResults(display, data);
        },
        error: function(){
            alert('Error');
        }
    })
})

clearBtn.click(function(){
    display.html("");
})

function printDataResults(display, data){
    display.html(
    `
    <tr>
    <th>ID</th>
    <th>Name</th>
    <th>Username</th>
    <th>Email</th>
    <th>Phone</th>
    <th>Website</th>
    <th>Address</th>
    <th>Company</th>
    </tr>`);
    for(let user of data){
    display.append(`
    <tr>
    <td>${user.id}</td>
    <td>${user.name}</td>
    <td>${user.username}</td>
    <td>${user.email}</td>
    <td>${user.phone}</td>
    <td>${user.website}</td>
    <td><b>Street:</b> ${user.address.street}<br>
        <b>Suite:</b> ${user.address.suite}<br>
        <b>City:</b> ${user.address.city}<br>
        <b>Zipcode:</b> ${user.address.zipcode}<br>
        <b>Geo:</b> lat-${user.address.geo.lat}, lng-${user.address.geo.lng}</td>
    <td><b>Name:</b> ${user.company.name}<br>
        <b>Catch Phrase: ${user.company.catchPhrase}<br>
        <b>BS:</b> ${user.company.bs}</td>
    </tr>
    `);
    }
}

//FETCH
/*let btn = document.getElementById("btn");
let display = document.getElementById("display");
let clearBtn = document.getElementById("clearBtn");

btn.addEventListener('click', function(){
    fetch("https://jsonplaceholder.typicode.com/users")
    .then(function(data){
        return data.json();
    })
    .then(function(data){
        printDataResults(display,data)
    })
})

clearBtn.addEventListener('click', function(){
    display.innerHTML = "";
})

function printDataResults(display, data){
    display.innerHTML =
    `
    <tr>
    <th>ID</th>
    <th>Name</th>
    <th>Username</th>
    <th>Email</th>
    <th>Phone</th>
    <th>Website</th>
    <th>Address</th>
    <th>Company</th>
    </tr>
    `;
    for(let user of data){
    display.innerHTML+=
    `<tr>
    <td style="border: 1px solid black;">${user.id}</td>
    <td>${user.name}</td>
    <td>${user.username}</td>
    <td>${user.email}</td>
    <td>${user.phone}</td>
    <td>${user.website}</td>
    <td><b>Street:</b> ${user.address.street}<br>
        <b>Suite:</b> ${user.address.suite}<br>
        <b>City:</b> ${user.address.city}<br>
        <b>Zipcode:</b> ${user.address.zipcode}<br>
        <b>Geo:</b> lat-${user.address.geo.lat}, lng-${user.address.geo.lng}</td>
    <td><b>Name:</b> ${user.company.name}<br>
        <b>Catch Phrase: ${user.company.catchPhrase}<br>
        <b>BS:</b> ${user.company.bs}</td>
    </tr>
        `
    }
}*/