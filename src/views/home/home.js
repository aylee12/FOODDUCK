import * as Api from '/api.js';
import { addCommas } from '/useful-functions.js';

const category_toggle = document.querySelector('.category_toggle');
const category_wrap = document.querySelector('.category_wrap');
const toggle = document.querySelector('.toggle');
function mouseOver(){
    category_wrap.style.display = "block";
}
function mouseLeave(){
    category_wrap.style.display = "none";
}

category_toggle.addEventListener('mouseover', mouseOver)
category_toggle.addEventListener('mouseleave', mouseLeave)  