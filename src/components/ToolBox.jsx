import ToolLists from "./ToolLists";

const ToolBox = ({
  tool,
  setTool,
  ctx,
  canvas,
  restoreArray,
  setRestoreArray,
  redoArray,
  setRedoArray,
}) => {
  return (
    <div className="tools">
      {ToolLists.map((ToolList) => (
        <div
          className={tool === ToolList.name ? "tool toolSelected" : "tool"}
          onClick={() => {
            setTool(ToolList.name);
          }}
          key={ToolList.name}
        >
          <img src={`/img/${ToolList.name}.png`} alt="" />
        </div>
      ))}{" "}
      <div
        className="tool"
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
        <img src={`/img/undo.png`} alt="" />
      </div>
      <div
        className="tool"
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
        <img src={`/img/redo.png`} alt="" />
      </div>
      <div
        className="tool"
        onClick={() => {
          ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        }}
      >
        <img src={`/img/delete.png`} alt="" />
      </div>
    </div>
  );
};
export default ToolBox;
