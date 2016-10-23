var container = document.getElementById("fluiddrag-wrapper");
var children = container.children;
var pad = 10, cols = 4, newleft, newtop;
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function setBackground(){
    for (var i = 0; i < children.length; i++) {
        children[i].style.background = getRandomColor();
    }
}
function renderGrid() {
    for (var i = 1; i < children.length; i++) {
        if (i % cols === 0) {
            newtop = (children[i - cols].offsetTop + children[i - cols].offsetHeight) + pad;
            children[i].style.left = "0px";
            children[i].style.top = newtop + "px";
        }
        else {
            if (children[i - cols]) {
                newtop = (children[i - cols].offsetTop + children[i - cols].offsetHeight) + pad;
                children[i].style.top = newtop + "px";
            } else {
                children[i].style.top = "0px";
            }
            newleft = (children[i - 1].offsetLeft + children[i - 1].offsetWidth) + pad;
            children[i].style.left = newleft + "px";
        }                
    }
}
function reset(){
    for (var i = 1; i < children.length; i++) {
        children[i - 1].style.top = "";
        children[i - 1].style.left = "";
    }
}
$(function() {
    $( "#fluiddrag-wrapper" ).sortable({
        placeholder: 'ui-state-highlight',
        tolerance: "pointer",
        update: function( event, ui ) {
            reset();
            renderGrid();
        }
    }).disableSelection();
});
renderGrid();
setBackground();