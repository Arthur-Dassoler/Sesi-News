const queryString = window.location.search
const urlParams = new URLSearchParams(queryString);
let id = urlParams.get("id");
id = id.replace(".html", "");

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

fetchData()