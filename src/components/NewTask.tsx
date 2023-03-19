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
import type { Dayjs } from "dayjs";
import type { RangePickerProps } from "antd/es/date-picker";
import { NewDataType } from "@/types";

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

const NewTask: React.FC<{
  addHandler: (newData: NewDataType) => Promise<void>;
}> = ({ addHandler }) => {
  const [newTitle, setNewTitle] = useRecoilState(newTitleState);
  const clickDate = useRecoilValue(clickDateState);
  const [type, setType] = useState<string>("time");
  const [time, setTime] = useState<Dayjs | null>(null);
  const [end, setEnd] = useState<Dayjs | null>(null);
  const [messageApi, contextHolder] = message.useMessage();

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  const clickHandler = () => {
    if (newTitle.trim() === "") {
      messageApi.open({
        type: "warning",
        content: "Please enter your task",
        duration: 2,
      });
    } else {
      addHandler({
        title: newTitle,
        ...(time && {
          start: clickDate + "T" + dayjs(time).format("HH:mm:ss"),
        }),
        ...(end && { end: dayjs(end).format("YYYY-MM-DD") }),
      }).then(() => {
        setNewTitle("");
        setType("time");
        setTime(null);
        setEnd(null);
      });
    }
  };

  const timeChangeHandler = (time: Dayjs | null) => {
    setTime(time);
    setEnd(null);
  };
  const endChangeHandler = (date: Dayjs | null) => {
    setEnd(date);
    setTime(null);
  };

  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    return current && current < dayjs(clickDate, "YYYY-MM-DD").add(1, "day");
  };

  const PickerWithType = ({ type }: { type: string }) => {
    return type === "time" ? (
      <TimePicker
        value={time}
        format={"HH:mm"}
        onChange={timeChangeHandler}
        inputReadOnly={true}
      />
    ) : (
      <DatePicker
        value={end}
        onChange={endChangeHandler}
        disabledDate={disabledDate}
        inputReadOnly={true}
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
