const scrolController = {
    scrolPosition: 0,
    disabledScroll() {
        scrolController.scrolPosition = window.scrollY;
        document.body.style.cssText = `
            overflow: hidden;
            position: fixed;
            top: -${scrolController.scrolPosition}px;
            left: 0;
            height: 100vh;
            width: 100vw;
            padding-right: ${window.innerWidth - document.body.offsetWidth}px;
        `;
    },
    enabledScroll() {
        document.body.style.cssText = '';
        window.scroll({top: scrolController.scrolPosition})
    },
}

const buttonElems = document.querySelector('.education__link');
const modalElem = document.querySelector('.modal');
const modalCont = document.querySelector('.modal__main');

modalElem.style.cssText = `
    display: flex;
    visibility: hidden;
    opacity: 0;
    transition: all 0.8s ease;
`;
modalCont.style.cssText = `
    display: block;
    transition: all 0.8s ease;
    transform: translate(0px, -100%);
`;

function closeModal (event) {
    const target = event.target;

    if (target === modalElem || target.closest('.modal__close') || event.code === `Escape`) {
        modalElem.style.visibility = `hidden`;
        modalElem.style.opacity = 0;
        modalCont.style.transform = `translate(0px, -100%)`;
        
        window.removeEventListener("keydown", closeModal);
        setTimeout(() => {
            scrolController.enabledScroll();
        }, 800);
    }
}

function modalOpen() {
    modalElem.style.visibility = `visible`;
    modalElem.style.opacity = 1;
    modalCont.style.transform = `translate(0px, 0%)`;
    window.addEventListener("keydown", closeModal);
    scrolController.disabledScroll();
};

buttonElems.addEventListener("click", modalOpen);

modalElem.addEventListener("click", closeModal);



const clientElement = document.documentElement;
const clientElementWidth = clientElement.clientWidth;

if(clientElementWidth < 768) {
    const elemPhoto = document.querySelector('.resume__name-mob');
    const elemName = document.querySelector('.resume__name');

    elemPhoto.append(elemName);
}