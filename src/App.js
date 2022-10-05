import './App.css';

import {useState, useEffect} from 'react';
import { BsTrash, BsBookmark, BsBookmarkCheck, BsBookmarkCheckFill } from 'react-icons/bs';

// local web

const API = "http://localhost:5000"

function App() {

  // inputs

  const [title, setTitle] = useState ("");
  const [time, setTime] = useState ("");
  const [endtime, setEndTime] = useState ("");
  const [timerevi, setTimeRevi] = useState ("");
  const [todos, setTodos] = useState ([]);
  const [loading, setLoading] = useState (false);



  const handleSubmit = async (e) => {
    e.preventDefault();

  
    const todo = {
      id: Math.random(),
      title,
      time,
      endtime,
      timerevi,
      done: false,

    };

    // Envio para API

    await fetch(API + "/todos", {
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setTodos((prevState) => [...prevState, todo]);

    setTitle("");
    setTime("");
    setEndTime("");
    setTimeRevi("");

  };

  // Deletar

  const handleDelete = async (id) => {
    await fetch(API + "/todos/" + id, {
      method: "DELETE",
    });

    setTodos((prevState) => prevState.filter((todo) => todo.id !== id));
  };

  // Alterar

  const handleEdit = async(todo) => {

    todo.done = !todo.done;

    const data = await fetch(API + "/todos/" + todo.id, {
      method: "PUT",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setTodos((prevState) => prevState.map((t) => (t.id === data.id ? (t = data) : t)));

  };

  if (loading) {
    return <p>Carregando...</p>;
  }


  return (
    <div class="lines">
  <div class="line"></div>
  <div class="line"></div>
  <div class="line"></div>
    <div className="App">
     <div className="header-to-do">
      <div className="list-t"></div>
        <h1>To do List</h1>
     </div>
     <div className="form-to-do">
        <h2>Insira uma nova tarefa:</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="title">O que você vai fazer:</label>
            <input className="input" type="text" name="title" placeholder="Nome da tarefa" 
            onChange={(e) => setTitle(e.target.value)}
            value={title || ""}
            required
            />
          </div>
          <div className="form-control">
            <label htmlFor="time">Tempo de Planejamento:</label>
            <input className="input" type="text" name="time" placeholder="Tempo estimado (em horas)" 
            onChange={(e) => setTime(e.target.value)}
            value={time || ""}
            required
            />
          </div>
          <div className="form-control">
            <label htmlFor="endtime">Tempo de Desenvolvimento:</label>
            <input className="input" type="text" name="endtime" placeholder="Tempo estimado (em horas)" 
            onChange={(e) => setEndTime(e.target.value)}
            value={endtime || ""}
            required
            />
          </div>
          <div className="form-control">
            <label htmlFor="timerevi">Tempo de revisão:</label>
            <input className="input" type="text" name="timerevi" placeholder="Tempo de revisão (em horas)" 
            onChange={(e) => setTimeRevi(e.target.value)}
            value={timerevi || ""}
            required
            />
          </div>
          <input type="submit" value="Criar tarefa" />

          
        </form>
     </div>
     <div className="list-to-do">
        <h2>Lista de tarefas:</h2>
        {todos.length === 0 && <p>Não há tarefas!</p>}
        {todos.map((todo) => (
          <div className="todo" key={todo.id}>

            <h3 className={todo.done ? "todo-done" : ""}>{todo.title}</h3>
            <p>Planejamento: {todo.time}h</p>
            <p>Desenvolvimento: {todo.endtime}h</p>
            <p>Revisão: {todo.timerevi}h</p>


            <div className="actions">
              <span onClick={() => handleEdit(todo)}>
                {!todo.done ? <BsBookmarkCheck /> : <BsBookmarkCheckFill />}
              </span>
              <BsTrash onClick={() => handleDelete(todo.id)} />
            </div>
          </div>
        ))}
     </div>
    </div>
    </div>

  );
}

export default App;
