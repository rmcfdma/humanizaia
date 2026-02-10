const fileInput = document.getElementById("file");
const preview = document.getElementById("preview");
const btn = document.getElementById("btn");
const results = document.getElementById("results");
const loader = document.getElementById("loader");
const spinner = document.getElementById("spinner");
const filename = document.getElementById("filename");
const size = document.getElementById("size");

fileInput.onchange = () => {

    const file = fileInput.files[0];
    if (!file) return;

    const imgPreview = document.createElement("img");
    imgPreview.src = URL.createObjectURL(file);

    preview.innerHTML = "";
    preview.appendChild(imgPreview);

    const img = new Image();

    img.onload = () => {

        const width = img.width;
        const height = img.height;

        const sizeKB = (file.size / 1024).toFixed(1);

        filename.textContent = `${file.name} — ${width}x${height}px`;
        size.textContent = `Tamanho: ${sizeKB} KB`;
    };

    img.src = URL.createObjectURL(file);
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

    spinner.style.display = "inline-block";
    loader.style.display = "block";
    results.innerHTML = "";

    const res = await fetch("https://reflectively-uninvestigable-rocco.ngrok-free.dev/humanizar", {
        method: "POST",
        body: form
    });

    const data = await res.json();

    spinner.style.display = "none";
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

