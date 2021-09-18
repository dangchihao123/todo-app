import React, { Component } from "react";
import TaskItem from "./TaskItem";

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterName: "",
      filterStatus: -1, // -1 all, 1 kich hoat, 0 an
    };
  }

  onChange = (e) => {
    let target = e.target;
    let name = target.name;
    let value = target.value;
    this.props.onFilter(
      name === "filterName" ? value : this.state.filterName,
      name === "filterStatus" ? value : this.state.filterStatus
    );
    this.setState({
      [name]: value,
    });
  };
  render() {
    let { task } = this.props;
    let { filterName, filterStatus } = this.state;
    let taskItem = task.map((item, index) => {
      return (
        <TaskItem
          task={item}
          key={item.id}
          index={index}
          handleStatus={this.props.handleStatus}
          onDelete={this.props.onDelete}
          onUpdate={this.props.onUpdate}
        />
      );
    });
    return (
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th className="text-center">STT</th>
            <th className="text-center">Tên</th>
            <th className="text-center">Trạng Thái</th>
            <th className="text-center">Hành Động</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td />
            <td>
              <input
                type="text"
                className="form-control"
                name="filterName"
                value={filterName}
                onChange={(e) => this.onChange(e)}
              />
            </td>
            <td>
              <select
                className="form-control"
                name="filterStatus"
                value={filterStatus}
                onChange={(e) => this.onChange(e)}
              >
                <option value={-1}>Tất Cả</option>
                <option value={0}>Ẩn</option>
                <option value={1}>Kích Hoạt</option>
              </select>
            </td>
            <td />
          </tr>
          {/*  */}
          {taskItem}
        </tbody>
      </table>
    );
  }
}

export default TaskList;
