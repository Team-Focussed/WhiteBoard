import React, { useEffect, useLayoutEffect, useState, useRef } from "react";
import ColorPalet from "./components/ColorPalet";
import ToolBox from "./components/ToolBox";
import Options from "./components/Options";
import "./App.css";
import "./grid.min.css";

function App() {
  const [lineWidth, setLineWidth] = useState(15);
  const [canvas, setCanvas] = useState(null);
  const [ctx, setCtx] = useState(null);
  const [drawing, setDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);
  const [tool, setTool] = useState("pen");
  useLayoutEffect(() => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    setCanvas(canvas);
    setCtx(ctx);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.strokeStyle = `${color}80`;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = lineWidth;
  }, []);
  function randomPointInRadius(radius) {
    for (;;) {
      var x = Math.random() * 2 - 1;
      var y = Math.random() * 2 - 1;
      // uses the Pythagorean theorem to test if a point is inside a circle
      if (x * x + y * y <= 1) return { x: x * radius, y: y * radius };
    }
  }
  function relativePos(event, element) {
    var rect = element.getBoundingClientRect();
    return {
      x: Math.floor(event.clientX - rect.left),
      y: Math.floor(event.clientY - rect.top),
    };
  }

  const handleMouseMove = (e) => {
    if (tool === "fill") {
      return;
    }
    if (!drawing) return;
    if (tool === "rectangle") {
      ctx.clearRect(lastX, lastY, e.clientX, e.clientX);
      ctx.strokeStyle = "transparent";
      ctx.stroke = "#000";
      ctx.fillRect(lastX, lastY, e.clientX, e.clientY);
      return;
    }
    if (tool === "spray") {
      var radius = ctx.lineWidth / 2;
      var area = radius * radius * Math.PI;
      var dotsPerTick = Math.ceil(area / 30);

      var currentPos = relativePos(e, ctx.canvas);
      for (var i = 0; i < dotsPerTick * 2; i++) {
        var offset = randomPointInRadius(radius);
        ctx.fillStyle = color;
        ctx.fillRect(currentPos.x + offset.x, currentPos.y + offset.y, 1, 1);
      }

      return;
    }

    if (tool === "eraser") {
      ctx.strokeStyle = "#fff";
    } else if (tool === "pen") {
      ctx.strokeStyle = color;
    }
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
    setLastX(e.clientX);
    setLastY(e.clientY);
  };
  const handleMouseDown = (e) => {
    if (tool === "fill") {
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    if (tool === "rectangle") {
      setLastX(e.clientX);
      setLastY(e.clientY);
    }
    setDrawing(true);
    setLastX(e.clientX);
    setLastY(e.clientY);
  };

  const handleMouseUp = (e) => {
    setDrawing(false);
  };
  const handleCursor = (e) => {
    console.log(e);
  };
  return (
    <div
      className="App"
      onMouseMove={(e) => {
        const cursor = document.querySelector(".cursor");
        cursor.style.top = e.clientY + "px";
        cursor.style.left = e.clientX + "px";
        cursor.style.height = lineWidth + "px";
        cursor.style.width = lineWidth + "px";
        cursor.style.border =
          tool === "eraser" ? "1px solid #000" : "1px solid" + color;
      }}
    >
      <div className="cursor"></div>
      <canvas
        id="canvas"
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      ></canvas>
      <Options
        lineWidth={lineWidth}
        setLineWidth={setLineWidth}
        ctx={ctx}
      ></Options>
      <ToolBox tool={tool} setTool={setTool} />
      <ColorPalet color={color} setColor={setColor} ctx={ctx} />
    </div>
  );
}

export default App;
