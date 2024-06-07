import React, { Component } from "react";
import "./main.css";
import Form from "./Form/index";
import Tasks from "./Tasks";

export default class Main extends Component {
  state = {
    newTask: "",
    tasks: [],
    index: -1,
  };

  componentDidMount() {
    const tasks = JSON.parse(localStorage.getItem("tasks"));

    if (!tasks) return;

    this.setState({
      tasks: tasks,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { tasks } = this.state;

    if (tasks === prevState.tasks) return;

    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  handleChange = (e) => {
    this.setState({
      newTask: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { tasks } = this.state;
    let { newTask } = this.state;
    newTask = newTask.trim();

    if (tasks.indexOf(newTask) !== -1)
      return alert(`A tarefa já existe na lista`);

    if (this.state.index === -1) {
      const newTasks = [...tasks];
      this.setState({
        tasks: [...newTasks, newTask],
      });
      return;
    }

    const index = this.state.index;

    const newTasks = [...tasks];
    newTasks[index] = newTask;

    this.setState({
      tasks: [...newTasks],
      index: -1,
    });
  };

  handleDelete = (e, index) => {
    this.setState(this.state.tasks.splice(index, 1));
  };

  handleEdit = (e, index) => {
    const oldTask = this.state.tasks[index];
    this.setState({ newTask: oldTask });
    this.setState({ index: index });
  };

  render() {
    const { tasks, newTask } = this.state;
    return (
      <div>
        <div className="main">
          <h1>To-do List</h1>
          <Form
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            newTask={newTask}
          />
          <Tasks
            tasks={tasks}
            handleDelete={this.handleDelete}
            handleEdit={this.handleEdit}
          />
        </div>
      </div>
    );
  }
}
