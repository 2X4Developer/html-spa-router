const routeLinks = document.querySelectorAll("a[data-route]");
routeLinks.forEach(er => {
    er.onclick = function(e) { 
        e.preventDefault();
        view(er.getAttribute("href"));
    }
});

let routeDrive = {

}

async function compileViews(){
    const readRoutes = await fetch("routes/routes.json");
    const routeJSON = await readRoutes.json();
    for(const routeOBJ of routeJSON.routes){
        routeDrive[routeOBJ.url] = routeOBJ;
    }
    if(window.location.href.split("#")[1])
    view(window.location.href.split("#")[1]);
    else
    view("/");
}

async function view(url){
    history.pushState(history.state, document.title, `${document.location.origin}#${url}`)
    const loadHTML = await fetch(`routes/${routeDrive[url].file}.html`);
    const respon = await loadHTML.text();
    document.querySelector("#contain").innerHTML = "";
    document.querySelector("#contain").insertAdjacentHTML("afterbegin", respon);
}

compileViews();