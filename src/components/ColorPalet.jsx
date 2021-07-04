import ColorPaletColors from "./ColorPaletColors";

const ColorPalet = ({ color, setColor, ctx }) => {
  return (
    <div className="colors">
      <div className="selectedColor">
        <div
          className="color"
          style={{
            backgroundColor: color,
          }}
        ></div>
      </div>
      <div className="colorList">
        {ColorPaletColors.map((ColorPaletColor) => (
          <div
            key={ColorPaletColor}
            className={ColorPaletColor === color ? "color selected" : "color"}
            style={{
              backgroundColor: ColorPaletColor,
            }}
            onClick={() => {
              setColor(ColorPaletColor);
              ctx.strokeStyle = ColorPaletColor;
            }}
          ></div>
        ))}
        <br />
      </div>
    </div>
  );
};
export default ColorPalet;
