// const res = require("express/lib/response");

const inner_list_products = document.getElementById('inner_list_products');
const list_products = document.getElementById('list_products');
const shopping_cart_icon_url = "https://s3.ap-northeast-2.amazonaws.com/res.kurly.com/kurly/ico/2021/cart_white_45_45.svg";

window.onload = function() {
    fetch('http://localhost:3000/product/list')
        .then(res => res.json())
        .then(data => {
            // numberOfItems = data.length
            data.forEach(element => {
                const category = element.category;
                const productId = element.productId;
                const productName = element.productName;
                const img = element.img;
                const price = element.price;
                const company = element.company;

                

                const newItem = document.createElement('div');
                newItem.classList.add('item')

                const newThumbnail = document.createElement('div');
                newThumbnail.classList.add('thumbnail')

                const newA = document.createElement('a');

                const newImage = document.createElement('img');
                newImage.src = img;

                const newShoppingCart = document.createElement('div');
                newShoppingCart.classList.add('shopping_cart')

                const newButton = document.createElement('button');
                newButton.classList.add('shopping_cart_icon')

                const shoppingCartImage = document.createElement('img')
                shoppingCartImage.src = shopping_cart_icon_url;
                
                const newDescription = document.createElement('div');
                newDescription.classList.add('description')

                const newH3 = document.createElement('h3');
                
                newH3.classList.add('description_text')

                const newAToDetail = document.createElement('a');
                newAToDetail.href = "";
                const atext = document.createTextNode(`[${company}] ${productName}`)
                newAToDetail.appendChild(atext)

                const newPrice = document.createElement('div');
                newPrice.classList.add('price')
                const priceValue = document.createTextNode(`${price} 원`) 
                newPrice.appendChild(priceValue)

                // console.log("inner_list_products ",inner_list_products)
                // console.log('newItem',newItem)
                // console.log('newThumbnail', newThumbnail)
                // console.log('newA', newA)
                // console.log('newImage', newImage)
                
                // inner_list_products.appendChild(newItem);
                newItem.appendChild(newThumbnail);
                newThumbnail.appendChild(newA);
                newA.appendChild(newImage);
                newItem.appendChild(newShoppingCart);
                newShoppingCart.appendChild(newButton)
                newButton.appendChild(shoppingCartImage)
                newItem.appendChild(newDescription)
                newDescription.appendChild(newH3)
                newH3.appendChild(newAToDetail)
                newDescription.appendChild(newPrice)
                
                console.log("list_products ",list_products)
                console.log("inner_list_products ",inner_list_products)
                console.log(newItem)
            });
            
        })
    
   
}

