const moreInfo = document.getElementById("btn-moreInfo");
const projectsList = document.getElementById("projects");
const btn_up = document.getElementById("btn-up")

moreInfo.addEventListener('click', mostrarInfo);

function mostrarInfo() {
    projectsList.classList.toggle('projectsVisible');
    moreInfo.textContent == 'Look at my works' ? moreInfo.textContent = 'close' : moreInfo.textContent = 'Look at my works';
}

btn_up.addEventListener('click', () => {
    window.scroll(0, 750)
    mostrarInfo();
})

window.onscroll = () => {
    add_btn_up();
}

const add_btn_up = () => {
    if(window.scrollY > 1300) {
        btn_up.classList.add("btn-up-on");
    } else {
        btn_up.classList.remove("btn-up-on");
    }
}

// API GitHub
let div_orden = document.querySelector("div #projects");

function creatCardRepos (titulo, descripcion, url_repos, url_demo, topics) {
    // Article
    let card_repos = document.createElement("article");
    card_repos.classList.add("card");

    // Imagen
    let div_img = document.createElement("div");
    div_img.classList.add("img_card");

    // function createImage() {
        for(let i = 0; topics.length > 3 ? i < 3 : i < topics.length ; i ++){
             let elem = document.createElement("img");
            elem.src = "img/" + topics[i] + ".png";
            elem.alt = topics[i];
            div_img.appendChild(elem);
        }

   // Cuerpo del titulo
   let body_title = document.createElement('div');
   body_title.classList.add("intern");

   let titulo_repos = document.createElement('h3');
   titulo_repos.textContent = titulo;
   let descripcion_repos = document.createElement('p');
   const LIMIT = 150;
   for (let p of descripcion){
    const aboveLimit = descripcion.length > LIMIT;
    const dotOrEmpty = aboveLimit ? ' [...]' : '';
    descripcion_repos.textContent = descripcion.substring(0, LIMIT) + dotOrEmpty
   }
//    descripcion_repos.textContent = p;
//    descripcion_repos.textContent = descripcion;

   body_title.appendChild(titulo_repos);
   body_title.appendChild(descripcion_repos);

   //botones
   let body_btn = document.createElement('div');
   body_btn.classList.add("btn-block");
   
   let img_demo = document.createElement('img');
   img_demo.src = "img/play.svg";
   img_demo.alt = "ver demo";

   let img_repo = document.createElement('img');
   img_repo.src = "img/github-mark.svg"
   img_repo.alt = "github"

   let btn_repos = document.createElement('a');
   btn_repos.href = url_repos;
   btn_repos.target = "_blank";
   btn_repos.title = "Ver repositorio";
   btn_repos.appendChild(img_repo);
   btn_repos.classList.add("btn");

   body_btn.appendChild(btn_repos);


   let btn_demo = document.createElement('a');
   if(url_demo!= null && url_demo!= "") {
       btn_demo.href = url_demo;
       btn_demo.target = "_blank";
       btn_demo.title = "Ver demo";
       btn_demo.appendChild(img_demo);
       btn_demo.classList.add("btn");
       body_btn.appendChild(btn_demo);
   }

   card_repos.appendChild(div_img);
   card_repos.appendChild(body_title);
   card_repos.appendChild(body_btn);

   return card_repos;
}

///API 
function getApiGitHub () {
    const resp = "https://api.github.com/users/nazarethgt/repos" ;
    fetch(resp)
    .then(async res =>  {
        if (!res.ok) {
            throw new Error(res.status);
        }

        var data = await res.json();
        div_orden.innerHTML = "";
        data.map(item => {
            div_orden.appendChild(creatCardRepos (item.name, item.description, item.html_url, item.homepage, item.topics));
            div_orden.appendChild(btn_up)
        })

    })
    .catch(e => console.log(e))
}

getApiGitHub();