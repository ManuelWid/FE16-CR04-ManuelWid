// advanced JSON

const targetDiv3 = document.getElementById("result2");
targetDiv3.innerHTML = "";

function fetchJSONFile(path, callback) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                var data = JSON.parse(httpRequest.responseText);
                if (callback) callback(data);
            }
        }
    };
    httpRequest.open('GET', path);
    httpRequest.send(); 
}

fetch("books.json")
.then(response => {
   return response.json();

})
.then(function(data){
    data.books.forEach(function(e){
        targetDiv3.innerHTML += `
        <p>${e.title}</p>
        <p">${e.author}</p>
        <img src="${e.image}" width="250">
    `;
    });
    // console.log(data.books);
});