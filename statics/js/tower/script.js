document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("sidebarToggle").addEventListener("click", function(e) {
        e.preventDefault();
        document.getElementById("wrapper").classList.toggle("toggled");
    });
});
