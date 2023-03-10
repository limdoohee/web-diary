import { useState, useRef } from "react";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { newTitleState, clickDateState } from "../recoil/atoms";
import { SaveOutlined } from "@ant-design/icons";
import {
  DatePicker,
  Select,
  Space,
  TimePicker,
  Button,
  message,
  Input,
} from "antd";
import dayjs from "dayjs";
const { Option } = Select;

const Task = styled.ul`
  padding: 1em 0;
`;

const InsertTitle = styled.li`
  margin-bottom: 0.5em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  input {
    color: rgba(0, 0, 0, 0.8);
    width: calc(100% - 100px);
  }
`;

const InsertTime = styled.li``;

const NewTask = ({ saveHandler }) => {
  // const [isAdd, setIsAdd] = useRecoilState(isAddTask);
  const [newTitle, setNewTitle] = useRecoilState(newTitleState);
  const clickDate = useRecoilValue(clickDateState);
  const newTaskRef = useRef();
  const [type, setType] = useState("time");
  const [time, setTime] = useState("");
  const [end, setEnd] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

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
        setNewTitle("");
        setType("time");
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
    <Task>
      {contextHolder}
      <InsertTitle>
        <Input
          placeholder="Insert your task"
          onChange={changeHandler}
          value={newTitle}
        />
        <Space>
          <Button
            shape="circle"
            icon={<SaveOutlined />}
            onClick={clickHandler}
          />
        </Space>
      </InsertTitle>
      <InsertTime>
        <Input.Group compact style={{ width: "calc(100% - 100px)" }}>
          <Select value={type} onChange={setType} style={{ width: "100px" }}>
            <Option value="time">Time</Option>
            <Option value="date">End</Option>
          </Select>
          <PickerWithType type={type} />
        </Input.Group>
      </InsertTime>
    </Task>
  );
};

export default NewTask;
