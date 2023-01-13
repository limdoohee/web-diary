import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { clickDateState } from "../recoil/atoms";

import {
  EditOutlined,
  DeleteOutlined,
  SaveOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { Space, Button, Select, DatePicker, TimePicker } from "antd";
import dayjs from "dayjs";
const { Option } = Select;

const UL = styled.ul`
  border-bottom: 1px solid #ddd;
  padding: 1em;

  .mgR5 {
    margin-right: 0.5em;
  }
`;

const List = styled.li`
  margin-bottom: 0.5em;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.input`
  font-size: 1.1em;
  color: rgba(0, 0, 0, 0.8);
  padding: 0.3em;
  border-radius: 0.2em;
  width: calc(100% - 100px);
  border : ${(props) =>
    props.edit === "editing" ? "1px solid #ddd" : "none"}};
  &:focus-visible {
    outline: none;
  }
`;

const Time = styled.p`
  font-size: 0.9em;
  color: rgba(0, 0, 0, 0.6);
`;

const TaskDetail = ({ data, saveHandler }) => {
  const [title, setTitle] = useState("");
  const clickDate = useRecoilValue(clickDateState);
  const taskRef = useRef();
  const [edit, setEdit] = useState(false);
  const [type, setType] = useState("time");
  const [time, setTime] = useState("");
  const [end, setEnd] = useState("");

  useEffect(() => {
    setTitle(data.title);
  }, [data]);

  const editHandler = (e) => {
    if (data.start.split("T")[1]) {
      setTime(dayjs(data.start.split("T")[1].substring(0, 5), "HH:mm"));
      setType("time");
    }

    if (data.end) {
      setEnd(dayjs(data.end, "YYYY-MM-DD"));
      setType("date");
    }

    setEdit(!edit);
    taskRef.current.focus();
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
      setType("");
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
          inputReadOnly="true"
        />
      );
    if (type === "date")
      return (
        <DatePicker
          value={end}
          onChange={endChangeHandler}
          disabledDate={disabledDate}
          readOnly="true"
          inputReadOnly="true"
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
        <Title
          type="text"
          value={title}
          ref={taskRef}
          readOnly={edit ? false : true}
          onChange={changeHandler}
          edit={edit ? "editing" : "not"}
        />
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
      <li>
        {edit ? (
          <Space>
            <Select value={type} onChange={setType}>
              <Option value="time">Time</Option>
              <Option value="date">End</Option>
            </Select>
            <PickerWithType type={type} />
          </Space>
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
      </li>
    </UL>
  );
};

export default TaskDetail;
