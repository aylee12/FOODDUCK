let slides = document.querySelector('.slides');
let slide = document.querySelector('.slides li');
let slideWrap = document.querySelector('.section .gallery_wrap .galleryOn');
let slideCount = slides.length;
const slideWidth = 258;
const slideMargin = 15;
const sectionLeftBtn = document.querySelectorAll('.section_left_btn');
const sectionRightBtn = document.querySelectorAll('.section_right_btn');
var currentIdx = 0;

slides.style.width = slideCount * (slideWidth + slideMargin) - slideMargin + 'px';
slideWrap.style.width = (slideWidth + slideMargin) * 4 - slideMargin + 'px';

function moveSlide(num) {
  slides.style.left = -num * (slideMargin + slideWidth) + 'px';
  currentIdx = num;
}

for (let i = 0; i < sectionLeftBtn.length; i++) {
  sectionLeftBtn[i].addEventListener('click', function () {
    slides = document.querySelectorAll('.slides')[i];
    slideCount = slides.childElementCount;
    console.log(slideCount);
    if (currentIdx > 0) {
      moveSlide(currentIdx - 1);
    } else {
      moveSlide(slideCount - 4);
    }
  });
}

for (let j = 0; j < sectionLeftBtn.length; j++) {
  sectionRightBtn[j].addEventListener('click', function () {
    slides = document.querySelectorAll('.slides')[j];
    slideCount = slides.childElementCount;
    if (currentIdx < slideCount - 4) {
      moveSlide(currentIdx + 1);
    } else {
      moveSlide(0);
    }
  });
}
