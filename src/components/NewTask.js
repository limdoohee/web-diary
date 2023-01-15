import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { isAddTask, newTitleState, clickDateState } from "../recoil/atoms";
import { SaveOutlined, CloseOutlined } from "@ant-design/icons";
import { DatePicker, Select, Space, TimePicker, Button, message } from "antd";
import dayjs from "dayjs";
const { Option } = Select;

const Task = styled.ul`
  display: ${({ isAdd }) => (isAdd ? "block" : "none")}};
  border-bottom: 1px solid #eee;
  padding: 1em;
  .mgR5 {
    margin-right: 0.5em;
  }
`;

const InsertTitle = styled.li`
  margin-bottom: 0.5em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  input {
    outline: 1px solid #ddd;
    border-radius: 0.2em;
    padding: 0.3em;
    font-size: 1.1em;
    color: rgba(0, 0, 0, 0.8);
    width: calc(100% - 100px);
  }
`;

const InsertTime = styled.div``;

const NewTask = ({ saveHandler }) => {
  const [isAdd, setIsAdd] = useRecoilState(isAddTask);
  const [newTitle, setNewTitle] = useRecoilState(newTitleState);
  const clickDate = useRecoilValue(clickDateState);
  const newTaskRef = useRef();
  const [type, setType] = useState("time");
  const [time, setTime] = useState("");
  const [end, setEnd] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    newTaskRef.current.focus();
  }, [isAdd]);

  const changeHandler = (e) => {
    setNewTitle(e.target.value);
  };
  const clickHandler = () => {
    if (newTitle.trim() === "") {
      messageApi.open({
        type: "warning",
        content: "Please enter your task",
        duration: 2,
      });
      newTaskRef.current.focus();
    } else {
      saveHandler(
        {
          title: newTitle,
          ...(time && {
            start:
              clickDate + "T" + new Date(time).toTimeString().split(" ")[0],
          }),
          ...(end && { end: dayjs(end).format("YYYY-MM-DD") }),
        },
        "add"
      ).then(() => {
        setIsAdd(!isAdd);
        setNewTitle("");
        setType("");
        setTime("");
        setEnd("");
      });
    }
  };

  const timeChangeHandler = (time, timeString) => {
    setTime(time);
    setEnd("");
  };
  const endChangeHandler = (date, dateString) => {
    setEnd(date);
    setTime("");
  };

  const cancelHandler = () => {
    setNewTitle("");
    setIsAdd(false);
  };

  const disabledDate = (current) => {
    return current && current < dayjs(clickDate, "YYYY-MM-DD").add(1, "day");
  };

  const PickerWithType = ({ type }) => {
    if (type === "time")
      return (
        <TimePicker
          value={time}
          format={"HH:mm"}
          onChange={timeChangeHandler}
          readOnly="true"
          inputReadOnly={true}
        />
      );
    if (type === "date")
      return (
        <DatePicker
          value={end}
          onChange={endChangeHandler}
          disabledDate={disabledDate}
          readOnly="true"
          inputReadOnly={true}
        />
      );
    return (
      <DatePicker
        picker={type}
        onChange={(date, dateString) => setEnd(dateString)}
      />
    );
  };

  return (
    <Task isAdd={isAdd}>
      {contextHolder}
      <InsertTitle>
        <input
          type="text"
          value={newTitle}
          ref={newTaskRef}
          placeholder="Insert your task"
          required
          onChange={changeHandler}
        />
        <Space>
          <Button
            shape="circle"
            icon={<SaveOutlined />}
            onClick={clickHandler}
          />
          <Button
            shape="circle"
            icon={<CloseOutlined />}
            onClick={cancelHandler}
          />
        </Space>
      </InsertTitle>
      <InsertTime>
        <Space>
          <Select value={type} onChange={setType}>
            <Option value="time">Time</Option>
            <Option value="date">End</Option>
          </Select>
          <PickerWithType type={type} />
        </Space>
      </InsertTime>
    </Task>
  );
};

export default NewTask;
