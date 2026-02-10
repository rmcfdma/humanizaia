const fileInput = document.getElementById("file");
const preview = document.getElementById("preview");
const btn = document.getElementById("btn");
const results = document.getElementById("results");
const loader = document.getElementById("loader");

fileInput.onchange = () => {
    const img = document.createElement("img");
    img.src = URL.createObjectURL(fileInput.files[0]);
    preview.innerHTML = "";
    preview.appendChild(img);
};

btn.onclick = send;

async function send() {

    const file = fileInput.files[0];
    const num = document.getElementById("num").value;

    if (!file) {
        alert("Selecione uma imagem");
        return;
    }

    const form = new FormData();
    form.append("file", file);
    form.append("num_images", num);

    loader.style.display = "block";
    results.innerHTML = "";

    const res = await fetch("https://reflectively-uninvestigable-rocco.ngrok-free.dev/humanizar", {
        method: "POST",
        body: form
    });

    const data = await res.json();

    loader.style.display = "none";

    data.images.forEach((img, i) => {
        const div = document.createElement("div");
        div.className = "result";

        div.innerHTML = `
<img src="${img}">
<a class="download" href="${img}" download="imagem_${i}.png">Download</a>
`;

        results.appendChild(div);
    });
}
