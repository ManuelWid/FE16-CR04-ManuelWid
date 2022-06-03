const sortBtn = document.getElementById("main-btn-sort");
let sortDir = null;

if(localStorage.getItem("sortDir")){
    sortDir = localStorage.getItem("sortDir");
    sortBtn.innerHTML = localStorage.getItem("sortIcon");
}

sortBtn.addEventListener("click", function(){sortCards(objStorage);});

function sortCards(obj){
    if(sortDir == null){sortDir = "descending";}
    else if(sortDir == "descending"){sortDir = "ascending";}
    else{sortDir = "descending";}

    if(sortDir != null){
        if(sortDir == "descending"){
            obj.sort((a, b) => b.importance - a.importance);
            buildHTML(objStorage);
            sortBtn.innerHTML = '<i class="fa-solid fa-arrow-up-wide-short"></i>';
            localStorage.clear();
            localStorage.setItem("cards", JSON.stringify(objStorage));
            localStorage.setItem("sortDir", sortDir);
            localStorage.setItem("sortIcon", '<i class="fa-solid fa-arrow-up-wide-short"></i>');
            console.log("descending");
        }else{
            obj.sort((a, b) => a.importance - b.importance);
            buildHTML(objStorage);
            sortBtn.innerHTML = '<i class="fa-solid fa-arrow-down-wide-short"></i>';
            localStorage.clear();
            localStorage.setItem("cards", JSON.stringify(objStorage));
            localStorage.setItem("sortDir", sortDir);
            localStorage.setItem("sortIcon", '<i class="fa-solid fa-arrow-down-wide-short"></i>');
            console.log("ascending");
        }
    }
}