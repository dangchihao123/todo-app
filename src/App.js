import React, { Component } from "react";
import Control from "./components/Control";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: [],
      isCloseOpenForm: false,
      updateTask: null,
      filter: {
        filterName: "",
        filterStatus: -1,
      },
      keyword: "",
      sortBy: "name",
      sortValue: 1,
    };
  }

  componentWillMount() {
    if (localStorage && localStorage.getItem("task")) {
      let task = JSON.parse(localStorage.getItem("task"));
      this.setState({ task: task });
    }
  }

  onGenerateData = () => {
    let task = [
      { id: this.generateId(), name: "Học lập trình Reactjs", status: true },
      { id: this.generateId(), name: "HTML, CSS", status: false },
      { id: this.generateId(), name: "Nodejs", status: true },
    ];

    this.setState({
      task: task,
    });
    localStorage.setItem("task", JSON.stringify(task));
  };

  sh4() {
    return Math.floor(Math.random() * 100000);
  }

  generateId() {
    return this.sh4() + "-" + this.sh4() + "-" + this.sh4() + "-" + this.sh4();
  }

  onToggle = () => {
    if (this.state.isCloseOpenForm && this.state.updateTask !== null) {
      this.setState({
        isCloseOpenForm: true,
        updateTask: null,
      });
    } else {
      this.setState({
        isCloseOpenForm: !this.state.isCloseOpenForm,
      });
    }
  };

  onCloseForm = () => {
    this.setState({
      isCloseOpenForm: false,
    });
  };

  onShowForm = () => {
    this.setState({
      isCloseOpenForm: true,
    });
  };

  onSubmitAdd = (data) => {
    let { task } = this.state;
    let taskCopy = this.state.task;
    if (data.id === "") {
      data.id = this.generateId();
      taskCopy.push(data);
    } else {
      // update
      let index = this.findIndex(data.id);
      task[index] = data;
    }

    this.setState({
      task: taskCopy,
      updateTask: null,
    });
    localStorage.setItem("task", JSON.stringify(task));

    this.setState({
      isCloseOpenForm: false,
    });
  };

  handleStatus = (id) => {
    // tìm vị trí của task trong mảng để cập nhật status
    let { task } = this.state;
    let index = this.findIndex(id);
    if (index !== -1) {
      task[index].status = !task[index].status;
      this.setState({
        task: task,
      });
    }
    localStorage.setItem("task", JSON.stringify(task));
  };

  onDelete = (id) => {
    let { task } = this.state;
    let index = this.findIndex(id);
    if (index !== -1) {
      task.splice(index, 1);
      this.setState({
        task: task,
      });
    }
    localStorage.setItem("task", JSON.stringify(task));
    this.onCloseForm();
  };

  onUpdate = (id) => {
    let { task, updateTask } = this.state;
    let index = this.findIndex(id);
    updateTask = task[index];
    this.setState({
      updateTask: updateTask,
    });
    this.onShowForm();
  };

  findIndex = (id) => {
    let { task } = this.state;
    let result = -1;
    task.forEach((item, index) => {
      if (item.id === id) {
        result = index;
      }
    });
    return result;
  };

  onFilter = (filterName, filterStatus) => {
    filterStatus = parseInt(filterStatus, 10);
    this.setState({
      filter: {
        filterName: filterName.toLowerCase(),
        filterStatus: filterStatus,
      },
    });
  };

  keyword = (keyword) => {
    this.setState({
      keyword: keyword,
    });
  };

  onSort = (sortBy, sortValue) => {
    this.setState({
      sortBy: sortBy,
      sortValue: sortValue,
    });
  };
  render() {
    let {
      task,
      isCloseOpenForm,
      updateTask,
      filter,
      keyword,
      sortBy,
      sortValue,
    } = this.state;

    if (filter) {
      if (filter.filterName) {
        task = task.filter(
          (item) => item.name.toLowerCase().indexOf(filter.filterName) !== -1
        ); //The indexOf() method returns the position of the first occurrence of a specified value in a string.
      }
      task = task.filter((item) => {
        if (filter.filterStatus === -1) {
          return item;
        } else {
          return item.status === (filter.filterStatus === 1 ? true : false);
        }
      });
    }

    if (keyword) {
      task = task.filter(
        (item) => item.name.toLowerCase().indexOf(keyword) !== -1
      );
    }

    let elmCloseOpenForm = isCloseOpenForm ? (
      <TaskForm
        onCloseForm={this.onCloseForm}
        onSubmitAdd={this.onSubmitAdd}
        task={updateTask}
      />
    ) : (
      ""
    );

    if (sortBy === "name") {
      task = task.sort((a, b) => {
        if (a.name > b.name) return sortValue;
        else if (a.name < b.name) return -sortValue;
      });
    } else {
      task = task.sort((a, b) => {
        if (a.status > b.status) return sortValue;
        else if (a.status < b.status) return -sortValue;
        else return 0;
      });
    }
    return (
      <div className="container">
        <div className="text-center">
          <h1>Quản Lý Công Việc</h1>
          <hr />
        </div>
        <div className="row">
          <div
            className={
              isCloseOpenForm === true
                ? "col-xs-4 col-sm-4 col-md-4 col-lg-4"
                : ""
            }
          >
            {/*TASKFORM */}
            {elmCloseOpenForm}
            {/* END TASKFORM */}
          </div>
          <div
            className={
              isCloseOpenForm === true
                ? "col-xs-8 col-sm-8 col-md-8 col-lg-8"
                : "col-xs-12 col-sm-12 col-md-12 col-lg-12"
            }
          >
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => this.onToggle()}
            >
              <span className="fa fa-plus mr-5" />
              Thêm Công Việc
            </button>
            <button
              type="button"
              className="btn btn-success ml-5"
              onClick={() => this.onGenerateData()}
            >
              <span className="fa fa-plus mr-5" />
              Generate data
            </button>
            <div className="row mt-15 ">
              {/* CONTROL */}
              <Control
                keyword={this.keyword}
                sortBy={sortBy}
                sortValue={sortValue}
                onSort={this.onSort}
              />
              {/* END CONTROL */}
            </div>
            <div className="row mt-15">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                {/* TASK LIST */}
                <TaskList
                  task={task}
                  handleStatus={this.handleStatus}
                  onDelete={this.onDelete}
                  onUpdate={this.onUpdate}
                  onFilter={this.onFilter}
                />
                {/* END TASK LIST */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
