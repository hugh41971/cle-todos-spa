import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';

export default () => {
    // document.querySelector('.app').innerText = "Hello"
    header();
    footer();
    navHome();
}

const appDiv = document.querySelector('.app');

function header(){
    const headerElement = document.querySelector('.header');
    headerElement.innerHTML = Header();
}

function footer(){
    const footerElement = document.querySelector('.footer');
    footerElement.innerHTML = Footer();
}

function navHome(){
    const homeButton = document.querySelector('.nav__home');
    homeButton.addEventListener('click', function(){
        appDiv.innerHTML = Home();
    })
}