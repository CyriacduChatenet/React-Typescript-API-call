import "./App.css";
import axios, { AxiosResponse } from "axios"
import { useEffect, useState } from "react";

interface ITodo {
  id: number
  title: string
  completed : boolean
  userId : number
}

interface TodoProps {
  todo: ITodo
}

type ApiDataType = {
  message: string
  status: string
  todos: ITodo[]
  todo?: ITodo
}

function App() {

  const [allTodos, setAllTodos] = useState<ITodo[] | any>([])
  const [displayData, setDisplayData] = useState(false)

  const getTodos = async (): Promise<AxiosResponse<ApiDataType>> => {
    try {
      const todos: AxiosResponse<ApiDataType> = await axios.get('https://jsonplaceholder.typicode.com/todos')
      setAllTodos(todos.data)
      return todos
    } catch (error) {
      throw new Error()
    }
  }

  useEffect(() => {
    console.log(getTodos());
    setTimeout(() => {
      setDisplayData(true)
      console.log(allTodos)
    },100)
  }, [])

  return (
    <div className="App">
      <h1>Todos</h1>
      <p>todos:</p>
      <div>{displayData ?  allTodos.map((todo : ITodo) => <p key={todo.id}>{todo.title}</p>) : <p>Loading ...</p>}</div>
    </div>
  );
}

export default App;
