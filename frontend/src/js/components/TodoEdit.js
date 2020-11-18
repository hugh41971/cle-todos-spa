export default function TodoEdit(todo){
    return `
        <h3>${todo.name}</h3>
        <input class="edit-todo__name" type="text" value="${todo.name}"></input>
        <input class="edit-todo__owner-id" type="hidden" value="${todo.ownerId}"></input>
        <input class="edit-todo__id" type="hidden" value="${todo.id}"></input>
        <button class="edit-todo__submit">Save Changes</button>
    `
}