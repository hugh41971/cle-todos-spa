using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using todos.Models;
using todos.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace todos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private IRepository<Todo> todoRepo;

        public TodoController(IRepository<Todo> todoRepo)
        {
            this.todoRepo = todoRepo;
        }

        // GET: api/<TodoController>
        [HttpGet]
        public IEnumerable<Todo> Get()
        {
            return todoRepo.GetAll();
        }

        // GET api/<TodoController>/5
        [HttpGet("{id}")]
        public Todo Get(int id)
        {
            return todoRepo.GetById(id);
        }

        // POST api/<TodoController>
        [HttpPost]
        public IEnumerable<Todo> Post([FromBody] Todo todo)
        {
            todoRepo.Create(todo);
            return todoRepo.GetAll();
        }

        // PUT api/<TodoController>/5
        [HttpPut("{id}")]
        public IEnumerable<Todo> Put(int id, [FromBody] Todo todo)
        {
            todoRepo.Update(todo);
            return todoRepo.GetAll();
        }

        // DELETE api/<TodoController>/5
        [HttpDelete("{id}")]
        public IEnumerable<Todo> Delete(int id)
        {
            var todo = todoRepo.GetById(id);
            todoRepo.Delete(todo);
            return todoRepo.GetAll();
        }
    }
}
