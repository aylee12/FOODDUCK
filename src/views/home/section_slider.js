const slides = document.querySelector('.slides');
const slideWrap = document.querySelector(section .gallery_wrap .galleryOn)
const slide = document.querySelectorAll('.slides li');
const slideCount = slide.length;
const slideWidth = 250;
const slideMargin = 15;
const sectionLeftBtn = document.querySelector('.section_left_btn');
const sectionRightBtn = document.querySelector('.section_right_btn');
var currentIdx = 0;

slides.style.width = slideCount * (slideWidth + slideMargin) - slideMargin + 'px';
slideWrap.style.width = (slideWidth + slideMargin) * 4 -slideMargin

function moveSlide (num) {
    slides.style.left = - num * (slideMargin+slideWidth) + 'px'
    currentIdx = num;
}
sectionLeftBtn.addEventListener('click', function (){
    if (currentIdx > 4){
        moveSlide(currentIdx - 1)
    }
    else {
        moveSlide(slideCount-4)
    }
})
sectionRightBtn.addEventListener('click', function (){
    if (currentIdx < slideCount- 4){
        moveSlide(currentIdx + 1)
    }
    else {
        moveSlide(0)
    }
})
