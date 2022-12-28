import Item from "./Item";

const List = ({ data, deleteData }) => {
  return (
    <>
      {data.map((e) => {
        return <Item data={e} deleteData={deleteData} />;
      })}
    </>
  );
};

export default List;
