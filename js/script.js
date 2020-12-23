// FEATURED Arrows
const slider = document.querySelector('.slider');
const sliderList = document.querySelector('.slider-list');
const sliderItems = document.querySelectorAll('.slider-item');
const sliderArrows = document.querySelectorAll('.slider-arrow');

let translate = 0;
function arrowSliderClick(dir){
    translate = (dir=="left") ? translate+1 : translate-1;
    console.log(translate, sliderList.offsetLeft);
    sliderList.setAttribute('style', 'transition: all 0.2s ease');
    sliderList.style.left = `${(translate*200)}px`;
}

sliderArrows.forEach((arrow) => {
    arrow.addEventListener('click', (e) => {
        e.preventDefault();
        arrowSliderClick(e.target.dataset.direction);
    })
})
// ####################################################

// FEATURED drag
let pressed = false;
let startX = 0;
let x = 0;

slider.addEventListener('mouseenter', () => {
    slider.style.cursor = 'grab';
});

slider.addEventListener('mouseup', () => {
    slider.style.cursor = 'grab';
});

window.addEventListener('mouseup', () => {
    pressed = false;
})

slider.addEventListener('mousedown', (e) => {
    pressed = true;
    slider.style.cursor = "grabbing";
    startX = e.offsetX - sliderList.offsetLeft;
})

slider.addEventListener('mousemove', (e) => {
    if(!pressed) return;
    
    sliderList.setAttribute('style', 'transition: all 0s ease;');
    e.preventDefault();
    x = e.offsetX;
    sliderList.style.left = `${x-startX}px`;
})
// ####################################################


// MENU TOGGLE
function allNextSiblings(element){
    let elem = element;
    let arr = [];
    
    while (true){      
        arr.push(elem.nextElementSibling);
        elem = elem.nextElementSibling;

        if (elem==null){
            break;
        }
    }
    return arr.filter(Boolean);
}

const menuToggles = document.querySelectorAll('.menu-category-toggle');
const menuContainer = document.getElementById('menu');

function toggleMenu(elem){
    const pickedCategory = elem.dataset.nav;
    const categoryItems = document.querySelector(`#${pickedCategory}`);
    const currentCategory = elem.parentElement;

    currentCategory.classList.toggle('gradient-bg');
    elem.previousElementSibling.classList.toggle('bright-text');
    elem.lastElementChild.classList.toggle('rotate-180');
    elem.firstElementChild.classList.toggle('inner-shadow');
    let containerHeight = menuContainer.offsetHeight;

    if (categoryItems.classList.contains('invisible')){
        menuContainer.setAttribute('style', `min-height: ${containerHeight+100}px`);
        allNextSiblings(currentCategory.parentElement).forEach((elem) => {
            let matValues = window.getComputedStyle(elem)['transform'].match(/matrix.*\((.+)\)/)[1].split(', ');
            const y = parseInt(matValues[5])+100;
            elem.setAttribute('style', `transform: translateY(${Math.ceil(y/100)*100}px);`);

        })} else{
            menuContainer.setAttribute('style', `min-height: ${containerHeight-100}px`);
            allNextSiblings(currentCategory.parentElement).forEach((elem) => {
                let matValues = window.getComputedStyle(elem)['transform'].match(/matrix.*\((.+)\)/)[1].split(', ');
                const y = parseInt(matValues[5])-100;
                elem.setAttribute('style', `transform: translateY(${Math.floor(y/100)*100}px)`);
        })}

    categoryItems.classList.toggle('invisible');
}

menuToggles.forEach((toggle) =>{
    toggle.addEventListener('click', (e) => {
    toggleMenu(e.target);
})});
// ####################################################

// STATS Count Up
const counters = document.querySelectorAll('.counter');
const stats = document.querySelector('#stats');
const speed = 200;

function countUp(counters){
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;

            const inc = target / speed;

            if (count < target) {
                counter.innerText = count + inc;
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target + '+';
            }
        };
        updateCount();
    });
}

const observer = new IntersectionObserver((entries, observer)=>{
    entries.forEach(entry => {
        if (entry.isIntersecting){
            countUp(counters);
        }
    })
});
observer.observe(stats);
// ####################################################

// NAV LINKS Scroll
function ease(t, b, c, d) {
    // Attributed to http://gizma.com/easing
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
}

function linkClick(e, duration) {
  e.preventDefault();
  let targetElm = document.querySelector(`#${e.target.dataset.scroll_target}`);
  console.log(`#${e.target.scroll_target}`);
  let startPosition = window.pageYOffset;
  let targetPosition = targetElm.getBoundingClientRect().top;    // distance from target to window top
  let startTime = null;

  function scrollAnimation(currentTime) {
    if (startTime === null) startTime = currentTime;
    let timeElapsed = currentTime - startTime;
    let scrollAmount = ease(
      timeElapsed,
      startPosition,
      targetPosition,
      duration
    );
    window.scrollTo(0, scrollAmount);

    if (timeElapsed < duration) requestAnimationFrame(scrollAnimation); // used for a smooth scroll animation
  }

  if (Math.abs(targetPosition) > 30) requestAnimationFrame(scrollAnimation); // only scroll after a threshold
}

let aLinks = document.querySelectorAll(".nav-link");
aLinks.forEach((a) => {
  a.addEventListener("click", function (e) {
    linkClick(e, 2000);
  });
});
// ####################################################
