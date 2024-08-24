const templateName = document.body.getAttribute('data-template');

const lotsMapping = {
    '大吉': `images/${templateName}/daikichi.png`,
    '上上': `images/${templateName}/chukichi.png`,
    '上吉': `images/${templateName}/shokichi.png`,
    '吉': `images/${templateName}/kichi.png`,
    '中平': `images/${templateName}/suekichi.png`,
    '平': `images/${templateName}/heikichi.png`
};

const titleMapping = {
    'template_1': '《您的人際運勢是》',
    'template_2': '《您的事業/學業運勢是》',
    'template_3': '《您的生活運勢是》',
    'template_4': '《您的財運運勢是》',
    'template_5': '《您的健康運勢是》',
    'template_6': '《您的愛情運勢是》'
};

function drawLots() {
    const results = Object.keys(lotsMapping);
    const randomIndex = Math.floor(Math.random() * results.length);
    const selectedResult = results[randomIndex];
    const selectedImage = lotsMapping[selectedResult];
    
    return { result: selectedResult, image: selectedImage };
}

document.querySelectorAll('.msgbox-close').forEach(function(button) {
    button.addEventListener('click', function() {
        var overlay = document.getElementById('overlay');
        var msgbox = document.getElementById('msgbox');
        var result_msgbox = document.getElementById('result-msgbox');
        var contentImg = document.querySelector('.content_img');

        overlay.style.display = 'none';
        msgbox.style.display = 'none';
        result_msgbox.style.display = 'none';

        contentImg.classList.remove('hovered');
        contentImg.classList.remove('clicked');
    });
});

AOS.init({
    once: true
});

document.querySelector('.content_img').addEventListener('click', function() {
    var overlay = document.getElementById('overlay');
    var msgbox = document.getElementById('msgbox');
    var result_msgbox = document.getElementById('result-msgbox');

    const lotResult = drawLots();

    overlay.style.display = 'flex';
    msgbox.style.display = 'block';
    result_msgbox.style.display = 'none';

    setTimeout(function() {
        msgbox.style.display = 'none';
        result_msgbox.style.display = 'block';

        result_msgbox.innerHTML = `<h3>${titleMapping[templateName]}</h3>`;

        const resultImage = document.createElement('img');
        resultImage.src = lotResult.image;
        resultImage.alt = lotResult.result;
        resultImage.style.width = '95%';
        resultImage.style.padding = '5px';
        resultImage.style.marginLeft = '5vh';
        resultImage.setAttribute('data-aos', 'fade-down');
        result_msgbox.appendChild(resultImage);

        result_msgbox.innerHTML += '<button id="result-msgbox-close" class="msgbox-close">求取平安符</button>';

        document.getElementById('result-msgbox-close').addEventListener('click', function() {
            window.location.href = 'https://shelly9457.github.io/ShiDing/Talisman/index.html';
        });

        AOS.init();
    }, 3000);
});

document.querySelector('.content_img').addEventListener('mouseover', function() {
    this.classList.add('hovered');
});

document.querySelector('.content_img').addEventListener('mouseout', function() {
    this.classList.remove('hovered');
});

document.querySelector('.content_img').addEventListener('click', function() {
    this.classList.add('clicked');
});
