import React, { useEffect, useState } from 'react';
import CreateTask from '../modals/CreateTask';
import Card from './Card';

interface Task {
    Name: string;
    Description: string;
}

const TodoList: React.FC = () => {
    const [modal, setModal] = useState<boolean>(false);
    const [taskList, setTaskList] = useState<Task[]>([]);

    useEffect(() => {
        const arr = localStorage.getItem("taskList");

        if (arr) {
            const obj = JSON.parse(arr) as Task[];
            setTaskList(obj);
        }
    }, []);

    const deleteTask = (index: number): void => {
        const tempList = [...taskList];
        tempList.splice(index, 1);
        localStorage.setItem("taskList", JSON.stringify(tempList));
        setTaskList(tempList);
        window.location.reload();
    };

    const updateListArray = (obj: Task, index: number): void => {
        const tempList = [...taskList];
        tempList[index] = obj;
        localStorage.setItem("taskList", JSON.stringify(tempList));
        setTaskList(tempList);
        window.location.reload();
    };

    const toggle = (): void => {
        setModal(!modal);
    };

    const saveTask = (taskObj: Task): void => {
        const tempList = [...taskList];
        tempList.push(taskObj);
        localStorage.setItem("taskList", JSON.stringify(tempList));
        setTaskList(tempList);
        setModal(false);
    };

    return (
        <>
            <div className="header text-center">
                <h3>Todo List</h3>
                <button className="btn btn-primary mt-2" onClick={() => setModal(true)}>Create Task</button>
            </div>
            <div className="task-container">
                {taskList.map((obj, index) => (
                    <Card key={index} taskObj={obj} index={index} deleteTask={deleteTask} updateListArray={updateListArray} />
                ))}
            </div>
            <CreateTask toggle={toggle} modal={modal} save={saveTask} />
        </>
    );
};

export default TodoList;
