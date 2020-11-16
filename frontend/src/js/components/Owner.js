export default function Owner(owner){
    return `
    <h1>${owner.name}</h1> 
    <ol>
        ${owner.todos.map(todo =>{
            return `
            <li>${todo.name}</li>
            `
        }).join("")}
    </ol>
    `
}