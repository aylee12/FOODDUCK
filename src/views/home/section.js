
import * as Api from '/api.js';
import { addCommas } from '/useful-functions.js';

const shopping_cart_icon_url = "https://s3.ap-northeast-2.amazonaws.com/res.kurly.com/kurly/ico/2021/cart_white_45_45.svg";
const subsection = document.querySelectorAll('.subsection');
const meat = document.querySelector('.gallery_wrap .meat')
const vegetable = document.querySelector('.gallery_wrap .vegetable')
const fruit = document.querySelector('.gallery_wrap .fruit')
const fish = document.querySelector('.gallery_wrap .fish')
const slides = document.querySelector('.slides')
displaySection()
async function displaySection() {
    const url = '/api/productListAll'
    const data = await Api.get(url)
    data.forEach(element => {
        console.log(element)
        const category = element.category.name;
        const name = element.name;
        const img = element.img;
        const price = addCommas(element.price);
        const company = element.company;
        const id = element.productId;

        if(category === 'meat'){
            meat.innerHTML += `
            <li>
                <div class="section_items">
                <div class="cart_btn">
                    <img src="${shopping_cart_icon_url}" alt="">
                </div>
                <div class="section_img_wrap">
                    <img onclick="location.href = '/product/detail/${id}'" src="${img}" alt="">
                </div>
                <div onclick="location.href = '/product/detail/${id}'" class="description">
                    <h3>[${company}] ${name}</h3>
                    <div class="price">
                    ${price}
                    <span>원</span>
                </div>
                </div>
            </li>
            `
        }
        else if(category === 'vegetable'){
            vegetable.innerHTML += `
            <li>
                <div class="section_items">
                <div class="cart_btn">
                    <img src="${shopping_cart_icon_url}" alt="">
                </div>
                <div class="section_img_wrap">
                    <img onclick="location.href = '/product/detail/${id}'" src="${img}" alt="">
                </div>
                <div onclick="location.href = '/product/detail/${id}'" class="description">
                    <h3>[${company}] ${name}</h3>
                    <div class="price">
                    ${price}
                    <span>원</span>
                </div>
                </div>
            </li>
            `
        }
        else if(category === 'fruit'){
            fruit.innerHTML += `
            <li>
                <div class="section_items">
                <div class="cart_btn">
                    <img src="${shopping_cart_icon_url}" alt="">
                </div>
                <div class="section_img_wrap">
                    <img onclick="location.href = '/product/detail/${id}'" src="${img}" alt="">
                </div>
                <div onclick="location.href = '/product/detail/${id}'" class="description">
                    <h3>[${company}] ${name}</h3>
                    <div class="price">
                    ${price}
                    <span>원</span>
                </div>
                </div>
            </li>
            `
        }
        else if(category === 'fish'){
            fish.innerHTML += `
            <li>
                <div class="section_items">
                <div class="cart_btn">
                    <img src="${shopping_cart_icon_url}" alt="">
                </div>
                <div class="section_img_wrap">
                    <img onclick="location.href = '/product/detail/${id}'" src="${img}" alt="">
                </div>
                <div onclick="location.href = '/product/detail/${id}'" class="description">
                    <h3>[${company}] ${name}</h3>
                    <div class="price">
                    ${price}
                    <span>원</span>
                </div>
                </div>
            </li>
            `
        }
    });
}


