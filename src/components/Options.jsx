const Options = ({ lineWidth, setLineWidth, ctx }) => {
  return (
    <div className="options">
      <div className="size">
        <label htmlFor="lineWidth" className="width_label">
          Width
        </label>
        <input
          type="range"
          value={lineWidth}
          onChange={(e) => {
            setLineWidth(e.target.value);
            ctx.lineWidth = lineWidth;
          }}
          id="lineWidth"
        />
      </div>
      <button
        onClick={() => {
          ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        }}
        className="clearbtn"
      >
        clear
      </button>
    </div>
  );
};
export default Options;
