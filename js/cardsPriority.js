function addPriority(){
    let priorityBtn = document.getElementsByClassName("btn-importance");
    for(let i = 0; i < priorityBtn.length; i++){
        priorityBtn[i].addEventListener("click", function(){
            objStorage[i].importance++;
            if(objStorage[i].importance > 5){objStorage[i].importance = 0;}
            localStorage.removeItem("cards");
            localStorage.setItem("cards", JSON.stringify(objStorage));
            buildHTML(objStorage);
        });
    }
}