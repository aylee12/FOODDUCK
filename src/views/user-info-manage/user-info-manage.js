const checkSlider = document.querySelectorAll('.slider');
const inputAble = document.querySelectorAll('.input_able');
const checkPwAble = document.querySelector('.check_pw_able');
const checkPostAble = document.querySelectorAll('.check_post_able');

for(let i = 0 ;i < checkSlider.length; i++){
  checkSlider[i].addEventListener("click" , () => {
    console.log(i);
    const checkAble = inputAble[i].disabled ? false : true;
    if(i === 1){
      checkPwAble.disabled = checkAble;
    }else if(i === 3){
      checkPostAble.forEach(items => items.disabled = checkAble);
    }
    // disabled true면 false , false면 true로 바꿈 
    inputAble[i].disabled = checkAble;
  });
}