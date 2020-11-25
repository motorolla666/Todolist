import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    addTask: (title: string) => void
    removeTask: (taskID: string) => void
    changeFilter: (filterValue: FilterValuesType) => void
}

export function Todolist(props: PropsType) {

    const [title, setTitle]             = useState<string>("")

    const tasks = props.tasks.map(taskObj => {

        const removeTask = () => {
            props.removeTask(taskObj.id)
        }

        return (
            <li key={taskObj.id}>
                <input type="checkbox" checked={taskObj.isDone}/>
                <span>{taskObj.title}</span>
                <button onClick={removeTask}>x
                </button>
            </li>
        )
    })

    const addTask = () => {
        props.addTask(title)
        setTitle("")
    }

    const onChangerHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") addTask()
    }

    const onAllClickHandler = () => {
        props.changeFilter("all")
    }
    const onActiveClickHandler = () => {
        props.changeFilter("active")
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("completed")
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input
                value={title}
                onChange={onChangerHandler}
                onKeyPress={onKeyPressEnter}
            />
            <button onClick={addTask}>+</button>
        </div>

        <ul>
            {tasks}
        </ul>
        <div>
            <button onClick={onAllClickHandler}>All</button>
            <button onClick={onActiveClickHandler}>Active</button>
            <button onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>
}
