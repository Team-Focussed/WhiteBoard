import ToolLists from "./ToolLists";

const ToolBox = ({ tool, setTool }) => {
  return (
    <div className="tools">
      {ToolLists.map((ToolList) => (
        <div
          className={tool === ToolList.name ? "tool toolSelected" : "tool"}
          onClick={() => {
            setTool(ToolList.name);
          }}
        >
          <img src={`/img/${ToolList.name}.png`} alt="" />
        </div>
      ))}
    </div>
  );
};
export default ToolBox;
