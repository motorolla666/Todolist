import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed"

function App() {

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
    ])

    const [filter, setFilter] = useState<FilterValuesType>("all")

    function changeFilter(filterValue: FilterValuesType) {
        setFilter(filterValue)
    }

    function removeTask(taskID: string) {
        const filteredTasks = tasks.filter(task => task.id !== taskID)
        setTasks(filteredTasks)
    }

    function addTask(title:string) {
        const newTask : TaskType = {
            id:v1(),
            title: title,
            isDone:false
        }
        setTasks([newTask,...tasks])
    }

    let taskForTodolist = tasks
    if (filter === "active") {
        taskForTodolist = tasks.filter(task => task.isDone === false)
    }
    if (filter === "completed") {
        taskForTodolist = tasks.filter(task => task.isDone === true)
    }


    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={taskForTodolist}
                addTask={addTask}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
