const Options = ({ lineWidth, setLineWidth, color, setColor, ctx }) => {
  return (
    <div className="options">
      <label htmlFor="lineWidth">Width :</label>
      <input
        type="range"
        value={lineWidth}
        onChange={(e) => {
          setLineWidth(e.target.value);
          ctx.lineWidth = lineWidth;
        }}
        id="lineWidth"
      />
      {/*  */}
      <label htmlFor="color">Color :</label>
      <input
        type="color"
        value={color}
        onChange={(e) => {
          setColor(e.target.value);
          ctx.color = color;
        }}
        id="color"
      />
    </div>
  );
};
export default Options;
