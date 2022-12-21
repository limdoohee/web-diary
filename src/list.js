const List = ({ clickeDate, list }) => {
  // console.log("list", list);
  return (
    <div className="list">
      <h1>{clickeDate}</h1>
      <div>
        <ul>
          {list.map((e) => {
            return <li key={e.title}>{e.title}</li>;
          })}
        </ul>
      </div>
      <div>일기부분</div>
    </div>
  );
};

export default List;
