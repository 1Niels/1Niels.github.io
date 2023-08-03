window.addEventListener('load', () => {
    const ctx = document.getElementById("canvas").getContext("2d");
    const canvas = document.getElementById('canvas');
    const height = canvas.height;
    const width = canvas.width;
    const img = new Image();
    img.onload = () => {
        ctx.drawImage(img, 0, 0, width, height);
    };
    img.src = "trace.jpg";

    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;

    console.log(data);
})