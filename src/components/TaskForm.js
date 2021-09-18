import React, { Component } from "react";

class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      status: false,
    };
  }
  componentWillMount() {
    if (this.props.task) {
      this.setState({
        id: this.props.task.id,
        name: this.props.task.name,
        status: this.props.task.status,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.task) {
      this.setState({
        id: nextProps.task.id,
        name: nextProps.task.name,
        status: nextProps.task.status,
      });
    } else {
      if (!nextProps.task) {
        this.setState({
          id: "",
          name: "",
          status: false,
        });
      }
    }
  }

  onCloseForm = () => {
    this.props.onCloseForm();
  };

  onChangeName = (e) => {
    console.log(e.target.value);
    this.setState({
      name: e.target.value,
    });
  };

  onChangeStatus = (e) => {
    console.log(e.target.value);
    let status = e.target.value === "true" ? true : false;
    this.setState({
      status: status,
    });
  };

  handleAdd = (e) => {
    e.preventDefault();

    if (!this.state.name) {
      alert("Missing");
      return;
    }
    // let data = {
    //   id: Math.floor(Math.random() * 100000),
    //   name: this.state.name,
    //   status: this.state.status,
    // };
    this.props.onSubmitAdd(this.state);

    this.setState({
      name: "",
      status: false,
    });
  };
  render() {
    let { name, status, id } = this.state;
    return (
      <div className="panel panel-warning">
        <div className="panel-heading">
          <h3 className="panel-title">
            {id !== "" ? "Cập nhật Công Việc" : "Thêm Công Việc"}
          </h3>
          <i class="fas fa-window-close" onClick={() => this.onCloseForm()}></i>
        </div>
        <div className="panel-body">
          <form>
            <div className="form-group">
              <label>Tên :</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => this.onChangeName(e)}
              />
            </div>
            <label>Trạng Thái :</label>
            <select
              className="form-control"
              required="required"
              value={status}
              onChange={(e) => this.onChangeStatus(e)}
            >
              <option value={true}>Kích Hoạt</option>
              <option value={false}>Ẩn</option>
            </select>
            <br />
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-warning"
                onClick={(e) => this.handleAdd(e)}
              >
                {id === "" ? "Thêm" : "Cập nhật"}
              </button>
              &nbsp;
              <button type="submit" className="btn btn-danger">
                Hủy Bỏ
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default TaskForm;
