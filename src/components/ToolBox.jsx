import ToolLists from "./ToolLists";

const AddText = ({ setShowAddText, ctx, lastX, lastY }) => {
  return (
    <div className="card">
      <div className="title">Add Text</div>
      <div
        style={{
          margin: "10px 0px",
        }}
      >
        <label htmlFor="x">X :</label>{" "}
        <input type="text" id="x" placeholder="X" defaultValue="500" />
      </div>
      <div
        style={{
          margin: "10px 0px",
        }}
      >
        <label htmlFor="y">Y :</label>{" "}
        <input type="text" id="y" placeholder="Y" defaultValue="100" />
      </div>
      <label htmlFor="text"></label>
      <input type="text" id="text" placeholder="Text" />
      <div
        className="btn add"
        onClick={() => {
          if (!document.querySelector("#text").value) {
            return;
          }
          ctx.font = "30px Arial";
          ctx.fillText(
            document.querySelector("#text").value,
            document.querySelector("#x").value,
            document.querySelector("#y").value
          );
          setShowAddText(false);
        }}
      >
        Add
      </div>
      <div
        className="btn close"
        onClick={() => {
          setShowAddText(false);
        }}
      >
        close
      </div>
    </div>
  );
};

const ToolBox = ({
  tool,
  setTool,
  ctx,
  canvas,
  restoreArray,
  setRestoreArray,
  redoArray,
  setRedoArray,
  setShowAddText,
}) => {
  return (
    <div className="tools">
      {ToolLists.map((ToolList) => (
        <div
          className={
            tool === ToolList.name
              ? "tool toolSelected tooltip"
              : "tool tooltip"
          }
          onClick={() => {
            setTool(ToolList.name);
          }}
          key={ToolList.name}
        >
          <span className="tooltiptext">{ToolList.name}</span>
          <img src={`/img/${ToolList.name}.png`} alt="" />
        </div>
      ))}{" "}
      <div
        className="tool tooltip"
        onClick={() => {
          setShowAddText(true);
        }}
      >
        <span className="tooltiptext">add text</span>
        <img src={`/img/text.png`} alt="" />
      </div>
      <div
        className="tool tooltip"
        onClick={() => {
          let newArray = [...restoreArray];
          const popped = newArray.pop();
          if (!popped) {
            return;
          }
          console.log(newArray);
          setRedoArray([...redoArray, popped]);
          setRestoreArray(newArray);
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          newArray.forEach((element) => {
            if (element) {
              ctx.putImageData(element, 0, 0);
            }
          });

          // ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        }}
      >
        <span className="tooltiptext">undo</span>
        <img src={`/img/undo.png`} alt="" />
      </div>
      <div
        className="tool tooltip"
        onClick={() => {
          const popped = redoArray.pop();
          if (!popped) {
            return;
          }
          let newArray = [...restoreArray];
          newArray.push(popped);
          // console.log(newArray);
          // newArray.pop();
          setRestoreArray(newArray);
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          newArray.forEach((element) => {
            console.log(element);
            if (element) {
              ctx.putImageData(element, 0, 0);
            }
          });

          // ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        }}
      >
        {" "}
        <span className="tooltiptext">redo</span>
        <img src={`/img/redo.png`} alt="" />
      </div>
      <div
        className="tool tooltip"
        onClick={() => {
          setRestoreArray([]);
          ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        }}
      >
        <span className="tooltiptext">delete</span>
        <img src={`/img/delete.png`} alt="" />
      </div>
    </div>
  );
};
export default ToolBox;
export { AddText };
