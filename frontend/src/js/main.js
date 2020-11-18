import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Todos from './components/Todos';
import TodoEdit from './components/TodoEdit';
import Owners from './components/Owners';
import Owner from './components/Owner';

export default () => {
    // document.querySelector('.app').innerText = "Hello"
    header();
    footer();
    navHome();
    navTodos();
    navOwners();
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

function navOwners(){
    const ownersButton = document.querySelector('.nav__owners');
    ownersButton.addEventListener('click', function(){
        // fetch Owners from back end
        fetch("https://localhost:44393/api/owner")
        .then(response => response.json())
        .then(owners => {
            appDiv.innerHTML = Owners(owners);
            ownerNameButton();
        })
        .catch(error => console.log(error))
    })
}

function ownerNameButton(){
    const ownerNameElements = document.querySelectorAll('.owner__name');
    ownerNameElements.forEach(element => {
        element.addEventListener('click', function(){
            const ownerId = element.id;
            console.log(`clicked owner id: ${ownerId}`);
            fetch(`https://localhost:44393/api/owner/${ownerId}`)
            .then(response => response.json())
            .then(owner => {
                appDiv.innerHTML = Owner(owner);
                ownerAddTodo();
                ownerEditTodo()
                ownerDeleteTodo();
            })
            .catch(err => console.log(err))
        })
    })
}

function ownerAddTodo(){
    const ownerAddTodoButton = document.querySelector('.owner__add-todo__submit');
    ownerAddTodoButton.addEventListener('click', function(){
        const ownerId = ownerAddTodoButton.id;
        const todoName = event.target.parentElement.querySelector('.owner__add-todo__name').value;
        console.log(`owner id: ${ownerId}, todo name: ${todoName}`)

        const requestBody = {
            Name: todoName,
            OwnerId: ownerId
        }

        fetch(`https://localhost:44393/api/todo`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        })
        .then(response => response.json())
        .then(todos => {
            appDiv.innerHTML = Todos(todos)
        })
        .catch(err => console.log(err))
    })
}

function ownerDeleteTodo(){
    const ownerDeleteTodoButtons = document.querySelectorAll('.owner__delete-todo');
    ownerDeleteTodoButtons.forEach(button => {
        button.addEventListener('click', function(){
            const todoId = event.target.parentElement.querySelector('.owner__todo-id').value;
            console.log(todoId);
            fetch(`https://localhost:44393/api/todo/${todoId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response => response.json())
            .then(todos => {
                appDiv.innerHTML = Todos(todos)
            })
            .catch(err => console.log(err))
        })

    })
}

function ownerEditTodo(){
    const ownerEditTodoButtons = document.querySelectorAll('.owner__edit-todo');
    ownerEditTodoButtons.forEach(button => {
        button.addEventListener('click', function(){
            const todoId = event.target.parentElement.querySelector('.owner__todo-id').value;
            console.log(todoId);
            fetch(`https://localhost:44393/api/todo/${todoId}`)
            .then(response => response.json())
            .then(todo => {
                appDiv.innerHTML = TodoEdit(todo);
                editTodoSubmit();
            })
            .catch(err => console.log(err))
        })
    })
}

function editTodoSubmit(){
    const editTodoSubmitButton = document.querySelector('.edit-todo__submit');
    editTodoSubmitButton.addEventListener('click', function(){
        const todoId = editTodoSubmitButton.parentElement.querySelector('.edit-todo__id').value;
        const todoName = editTodoSubmitButton.parentElement.querySelector('.edit-todo__name').value;
        const todoOwnerId = editTodoSubmitButton.parentElement.querySelector('.edit-todo__owner-id').value;

        const todoData = {
            id: todoId,
            name: todoName,
            ownerId: todoOwnerId
        }

        console.log(todoData);

        fetch(`https://localhost:44393/api/todo/${todoId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(todoData)
        })
        .then(response => response.json())
        .then(todos => {
            appDiv.innerHTML = Todos(todos)
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