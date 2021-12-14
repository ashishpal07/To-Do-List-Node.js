// selecting seletor
const list = document.getElementsByClassName("list")[0];



let toggle = true;

// clicking event for check and uncheck tasks
list.addEventListener('click', function(event){
    let item = event.target;
    
    // go to items grand parent which is li tag(list item)
    let parent = item.parentElement.parentElement;
    
    if(item.classList[1] == "fa-check-square"){
        // if toggle is true then check
        if(toggle){
            parent.classList.add('lineThrough');
            toggle = false;
        }else{  // else uncheck
            parent.classList.remove('lineThrough');
            toggle = true;
        }
    }
})