var nav_img = document.getElementById("nav-img");
nav_img.addEventListener("click",nav_img_click);


function nav_img_click()
{
    var nav = document.getElementById("nav");
    var nav_ul = document.getElementById("nav-ul");
    if(nav_ul.style.display == "none" || nav_ul.style.display=='')
    {
        nav_ul.setAttribute("style","display:block !important");
        nav.setAttribute("style","height:80vh !important;width:80vw")
    }
    else
    {
        nav_ul.setAttribute("style","display:none !important")
        nav.setAttribute("style","height:10vh !important")
    }
}
