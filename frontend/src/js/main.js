import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Todos from './components/Todos';

export default () => {
    // document.querySelector('.app').innerText = "Hello"
    header();
    footer();
    navHome();
    navTodos();
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

function navTodos(){
    const todosButton = document.querySelector('.nav__todos');
    todosButton.addEventListener('click', function(){
        fetch("https://localhost:44393/api/todo")
            .then(response => response.json())
            .then(todos => {
                appDiv.innerHTML = Todos(todos);
                todosInspire();
            })
            .catch(err => console.log(err))
    })
}

function todosInspire(){
    const inspireButton = document.querySelector('.todos__inspire');
    inspireButton.addEventListener('click', function(){
        console.log("clicked the inspire button")
        fetch("https://ron-swanson-quotes.herokuapp.com/v2/quotes")
            .then(response => response.json())
            .then(quote => {
                inspireButton.remove();
                const quoteElement = document.createElement('h3');
                quoteElement.innerText = `${quote}`;
                appDiv.appendChild(quoteElement);
            })
            .catch(err => console.log(err))
    })
}