const queryString = window.location.search
const urlParams = new URLSearchParams(queryString);
let id = urlParams.get("id");

console.log(window.innerWidth);
console.log(window.innerHeight);
console.log(window.devicePixelRatio);

async function fetchData() {
    const response = await fetch("noticia.json");
    const data = await response.json();
    const noticia = data.find(item => item.id == id);
    console.log(noticia);

    document.getElementById("categoria").innerText = noticia.categoria;
    document.getElementById("titulo").innerText = noticia.titulo;
    document.getElementById("informacoes").innerText = noticia.informacoes;
    document.getElementById("imagem").src = noticia.imagem;
    const container = document.getElementById("conteudo");

    container.innerHTML = "";

    noticia.conteudo.forEach(paragrafo => {
        const p = document.createElement("p");
        p.textContent = paragrafo;
        container.appendChild(p);
    });
}

if (id) {
    id = id.replace(".html", "");
    fetchData()
}

const searchInput = document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener("input", () => {

        const searchInputValue = searchInput.value.toLowerCase();
        const noticias = document.querySelectorAll(".flex-i");

        for (const noticia of noticias) {

            if (searchInputValue === "") {
                noticia.style.display = showAll ? "flex" : "none";
                continue;
            }

            if (noticia.innerText.toLowerCase().includes(searchInputValue)) {
                noticia.style.display = "flex";
            } else {
                noticia.style.display = "none";
            }
        }

    });
    searchInput.focus();
}

const searchButton = document.querySelector(".header-searchButton");

if (searchButton) {
    searchButton.addEventListener("click", () => {

        if (window.innerWidth <= 768) {
            window.location.href = "pesquisaMobile.html";
        }

    });
}