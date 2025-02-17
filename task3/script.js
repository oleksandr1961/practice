document.addEventListener('DOMContentLoaded', () => {
    const paletteContainer = document.getElementById('paletteContainer');
    const colorContainer = document.getElementById('colorContainer');
    const copySound = document.getElementById('copySound');

    fetch('palette/palette.json')
        .then(response => response.json())
        .then(data => {
            data.slice(0, 9).forEach(palette => {
                const div = document.createElement('div');
                div.className = 'box';
                div.style.backgroundColor = palette.colors[0].color;
                div.title = palette.paletteName;
                div.addEventListener('click', () => showColors(palette.colors));
                paletteContainer.appendChild(div);
            });
        });

    function showColors(colors) {
        paletteContainer.classList.add('hidden');
        colorContainer.classList.remove('hidden');
        colorContainer.innerHTML = '';
        colors.forEach(color => {
            const div = document.createElement('div');
            div.className = 'box';
            div.style.backgroundColor = color.color;
            div.title = color.color;
            div.addEventListener('click', () => copyColor(color.color));
            colorContainer.appendChild(div);
        });
    }

    function copyColor(color) {
        navigator.clipboard.writeText(color).then(() => {
            copySound.play();
            const fullscreenDiv = document.createElement('div');
            fullscreenDiv.className = 'fullscreen';
            fullscreenDiv.style.backgroundColor = color;
            fullscreenDiv.innerText = color;
            document.body.appendChild(fullscreenDiv);
            setTimeout(() => {
                fullscreenDiv.remove();
            }, 1000);
        });
    }
});
