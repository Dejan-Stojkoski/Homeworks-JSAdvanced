let display = $("#display");
let searchInput = $("#searchInput");
let searchBtn = $("#searchBtn");

function makeCall(url, callback){
    $.ajax({
        url: url,
        success: function(response){
            callback(response, searchInput.val().toLowerCase());
        },
        error: function(){
            console.log('Something went wrong! Reload and try again!');
        }
    });
}

function printResults(results){
    display.html("");
    display.append(`
    <tr>
    <th>Name</th>
    <th>Email</th>
    <th>Phone</th>
    </tr>`);
    results.forEach(user => {
        display.append(`
        <tr>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.phone}</td>
        </tr>`);
    });
    display.append(`<div> Total ID sum: ${calculateIDSum(results)}</div>`);
}

function printSearchResults(results, search){
    let result= [];
    results.forEach(user=>{
        if(user.name.toLowerCase() === search || user.email.toLowerCase() === search || user.phone.toLowerCase() === search){
            result.push(user);
        }
    })
    if(result.length === 0){
        display.html("No results found!");
    }else{
        printResults(result);
    }
}

function calculateIDSum(results){
    let IDSum = results
    .map(user=>user.id)
    .reduce((sum, id) => sum+=id, 0);
    return IDSum;
}

searchBtn.click(()=>{
    makeCall("https://jsonplaceholder.typicode.com/users", printSearchResults);
})

makeCall("https://jsonplaceholder.typicode.com/users", printResults);