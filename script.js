const dialog = document.querySelector('dialog');
const test = document.querySelector('img');

// test.addEventListener('click', () => {
//     dialog.showModal();
// })

dialog.addEventListener('click', () => {
    dialog.close();
})

const buttons = document.querySelectorAll('.button');

buttons[0].classList.add('firstOne')
buttons[1].classList.add('secondOne')

const main = document.getElementById('main');
const news = document.getElementById('news');
const body = document.body;

function resize() {
    main.style.maxHeight = String(window.innerHeight * 0.7) + 'px';
    news.style.maxHeight = String(window.innerHeight * 0.7) + 'px';

    news.querySelector('div').style.maxHeight = String(window.innerHeight * 0.55) + 'px';
    if(window.innerWidth < 1000) {
        news.querySelector('div').style.maxHeight = String(window.innerHeight * 0.35) + 'px';
    }
}

resize();

window.onresize = resize;

if(body.style.width < 450) {
    buttons[0].addEventListener('click', () => {
        buttons[1].classList.remove('opaque');
        buttons[1].classList.remove('right');
        buttons[0].classList.add('opaque');
        buttons[0].classList.add('left');
        main.setAttribute('data-active', 'true');
        news.setAttribute('data-active', 'false');
    })
    
    buttons[1].addEventListener('click', () => {
        buttons[1].classList.add('opaque');
        buttons[1].classList.add('right');
        buttons[0].classList.remove('opaque');
        buttons[0].classList.remove('left');
        main.setAttribute('data-active', 'false');
        news.setAttribute('data-active', 'true');
    })
}

if(main.getAttribute('data-active') == 'true' && body.style.width < 450) {
    buttons[1].classList.remove('right');
}else if(news.getAttribute('data-active') == 'true' && body.style.width < 450) {
    buttons[0].classList.remove('left')
}

let myData = []
fetch("./data.json")
        .then(response => {
            // console.log(response, response.json(), response.data);
            return response.json();
        }).then(function(parsedResponse){
            console.log(parsedResponse);
            myData.push(parsedResponse);
            myData = myData[0];
            createProducts();
        })

function createProducts() {
    const products = document.querySelector(".products");
    const images = products.querySelector(".images");
    const productsData = myData.products;
    
    productsData.forEach(product => {
        const productCard = document.createElement('div');
        const name = document.createElement('h4');    
        const mainImage = document.createElement('img');

        mainImage.src = "./img/" + product.mainPhoto;
        mainImage.setAttribute('data-image', 'main')
        name.innerText = product.name;

        productCard.appendChild(mainImage);
        productCard.appendChild(name);
        productCard.id = "productCard";

        images.appendChild(productCard);
    });

    onImageClickAction(productsData);
}

function onImageClickAction(productsData) {
    const productCards = document.querySelectorAll('#productCard')
    
    productCards.forEach(card => {
        const productName = card.querySelector('h4').innerText;
        const image = card.querySelector('img');

        productsData.forEach(product => {
            if(product.name == productName) {
                card.addEventListener('click', () => {
                    dialog.children[0].replaceChildren();
                    for(let i = 0; i < product.gallery.length; i++) {
                        const galleryImagesrc = "./img/" + product.gallery[i]
                        const newGalleryImage = document.createElement('img');
                        newGalleryImage.src = galleryImagesrc;
                        dialog.children[0].append(newGalleryImage);
                    }
                    dialog.showModal();
                })
            }
        })

    })

}