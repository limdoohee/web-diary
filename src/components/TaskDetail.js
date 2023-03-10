import { useState, useEffect } from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { clickDateState } from "../recoil/atoms";
import {
  EditOutlined,
  DeleteOutlined,
  SaveOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { Space, Button, Select, DatePicker, TimePicker, Input } from "antd";
import dayjs from "dayjs";
const { Option } = Select;

const UL = styled.ul`
  border-bottom: 1px solid #eee;
  padding: 1em 0;

  .mgR5 {
    margin-right: 0.5em;
  }
`;

const List = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  input {
    color: rgba(0, 0, 0, 0.8);
    width: calc(100% - 100px);
  }
`;

const Title = styled.input`
  font-size: 1.1em;
  color: rgba(0, 0, 0, 0.8);
  padding: 0.3em 0;
  border-radius: 0.2em;
  width: calc(100% - 100px);
  &:focus-visible {
    outline: none;
  }
`;

const Time = styled.p`
  font-size: 0.9em;
  color: rgba(0, 0, 0, 0.6);
`;

const InsertTime = styled.li``;

const TaskDetail = ({ data, saveHandler }) => {
  const [title, setTitle] = useState("");
  const clickDate = useRecoilValue(clickDateState);
  const [edit, setEdit] = useState(false);
  const [type, setType] = useState("time");
  const [time, setTime] = useState("");
  const [end, setEnd] = useState("");

  useEffect(() => {
    setTitle(data.title);
  }, [data]);

  const editHandler = (e) => {
    setTitle(data.title);
    if (data.start.split("T")[1]) {
      setTime(dayjs(data.start.split("T")[1].substring(0, 5), "HH:mm"));
      setType("time");
    }

    if (data.end) {
      setEnd(dayjs(data.end, "YYYY-MM-DD"));
      setType("date");
    }

    setEdit(!edit);
  };

  const changeHandler = (e) => {
    setTitle(e.target.value);
  };

  const updateHandler = () => {
    saveHandler(
      {
        id: data.id,
        title: title,
        ...(time && {
          start: clickDate + "T" + new Date(time).toTimeString().split(" ")[0],
        }),
        ...(end && {
          end: dayjs(end).format("YYYY-MM-DD"),
        }),
      },
      "update"
    ).then(() => {
      setEdit(!edit);
      setType("time");
      setTime("");
      setEnd("");
    });
  };

  const deleteHandler = () => {
    saveHandler({ id: data.id }, "delete");
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
          value={time !== "" && time}
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
    <UL>
      <List>
        {edit ? (
          <Input
            placeholder="Insert your task"
            onChange={changeHandler}
            value={title}
          />
        ) : (
          <Title type="text" value={title} readOnly={true} />
        )}
        <Space>
          {edit ? (
            <>
              <Button
                shape="circle"
                icon={<SaveOutlined />}
                onClick={updateHandler}
              />
              <Button
                shape="circle"
                icon={<CloseOutlined />}
                onClick={editHandler}
              />
            </>
          ) : (
            <>
              <Button
                shape="circle"
                icon={<EditOutlined />}
                onClick={editHandler}
              />
              <Button
                shape="circle"
                icon={<DeleteOutlined />}
                onClick={deleteHandler}
              />
            </>
          )}
        </Space>
      </List>
      {edit ? (
        <InsertTime style={{ marginTop: "0.5em" }}>
          <Input.Group compact style={{ width: "calc(100% - 100px)" }}>
            <Select value={type} onChange={setType} style={{ width: "100px" }}>
              <Option value="time">Time</Option>
              <Option value="date">End</Option>
            </Select>
            <PickerWithType type={type} />
          </Input.Group>
        </InsertTime>
      ) : data.start.split("T")[1] ? (
        <Time>
          {data.start.split("T")[1].substring(0, 5)}
          {data.end &&
            data.end.split("T")[1] &&
            " - " + data.end.split("T")[1].substring(0, 5)}
        </Time>
      ) : (
        data.end && <Time>~&nbsp;{data.end}</Time>
      )}
    </UL>
  );
};

export default TaskDetail;
