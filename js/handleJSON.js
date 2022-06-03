const targetDiv = document.getElementById("main-content");
const clearLS = document.getElementById("clearLS");
clearLS.addEventListener("click", () => {
    localStorage.clear();
    location.reload();
});

const form = document.getElementById("form");
form.addEventListener("click", () => event.preventDefault())

let objStorage;

// ====================
// Solution 1 with AJAX
// ====================

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

// if(!localStorage.getItem("cards")){
//     fetchJSONFile('js/tasks.json', function(data){
//         // console.log(data.tasks);
//         localStorage.setItem("cards", JSON.stringify(data.tasks));
//         location.reload();
//     });
// }else{
//     objStorage = JSON.parse(localStorage.getItem("cards"));
//     buildHTML(objStorage);
//     console.log("built with localStorage");
// }

// =========================
// END SOLUTION 1
// =========================


// =========================
// Solution 2 with fetch API
// =========================

if(!localStorage.getItem("cards")){
    fetch("js/tasks.json")
    .then(response => {
    return response.json();
    })
    .then(function(data){
        localStorage.setItem("cards", JSON.stringify(data.tasks));
        location.reload();
        // console.log(data);
    });
}else{
    objStorage = JSON.parse(localStorage.getItem("cards"));
    buildHTML(objStorage);
    console.log("built with localStorage");
}

// =========================
// END SOLUTION 2
// =========================

function buildHTML(arr){
    targetDiv.innerHTML = "";
    arr.forEach(function(e){
        let color = "success";
        if(e.importance > 3){color = "danger";}
        else if(e.importance > 1){color = "warning";}
        targetDiv.innerHTML += `
        <div class="col col-sort">
            <div class="card card-body card-deco">
                <div class="card-text pb-2 d-flex justify-content-between">
                    <span class="badge bg-info">Task</span>
                    <div class="card-bookmark">
                        <a href="#" class="deco-none"><i class="fa-regular fa-bookmark"></i></a>
                        <a href="#" class="deco-none"><i class="fa-solid fa-ellipsis-vertical ms-3"></i></a>
                    </div>
                </div>
                <img src="${e.image}" alt="" class="card-img img-thumbnail">
                <div class="text-center py-2">
                    <h5 class="card-title">${e.taskName}</h5>
                    <p class="card-text card-description">${e.description}</p>
                </div>
                <div class="card-text border-top border-bottom py-3">
                    <i class="fa-solid fa-triangle-exclamation"></i>
                    <span>Priority level:</span>
                    <button class="btn btn-${color} btn-sm btn-importance">${e.importance}</button>
                    <br>
                    <i class="fa-regular fa-calendar-days"></i>
                    <span>Deadline:</span>
                    <span>${e.deadline}</span>
                </div>
                <div class="d-flex justify-content-end gap-2 mt-3">
                    <button class="btn btn-danger"><i class="fa-solid fa-trash-can"></i> Delete</button>
                    <button class="btn btn-success"><i class="fa-regular fa-circle-check"></i> Done</button>
                </div>
            </div>
        </div>
    `;
    });
    addPriority();
}