const List = (props) => {
  return (
    <div className="list">
      <h1>{props.date}</h1>
      <div>
        <ul>
          <li>할 일 부분</li>
        </ul>
      </div>
      <div>일기부분</div>
    </div>
  );
};

export default List;
