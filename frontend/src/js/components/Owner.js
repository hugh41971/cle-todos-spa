export default function Owner(owner){
    return `
    <h1>${owner.name}</h1> 
    <ol>
        ${owner.todos.map(todo =>{
            return `
            <li>
                <h4>${todo.name}</h4>
                <button class="owner__edit-todo">Edit</button>
                <button class="owner__delete-todo">Delete</button>
                <input class="owner__todo-id" type="hidden" value="${todo.id}">
            </li>

            `
        }).join("")}
    </ol>

    <section class="owner__add-todo">
        <input class="owner__add-todo__name" type="text" placeholder="Add a new to do here"></input>
        <button class="owner__add-todo__submit" id="${owner.id}">Add a Todo for ${owner.name}</button>
    </section>
    `
}