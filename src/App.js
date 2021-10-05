import React, { useLayoutEffect, useState } from "react";
import { AddText } from "./components/ToolBox";
import ToolBox from "./components/ToolBox";
import Options from "./components/Options";
import "./App.css";
import "./grid.min.css";

function App() {
	const [lineWidth, setLineWidth] = useState(5);
	const [canvas, setCanvas] = useState(null);
	const [ctx, setCtx] = useState(null);
	const [drawing, setDrawing] = useState(false);
	const [color, setColor] = useState("#000000");
	const [lastX, setLastX] = useState(0);
	const [lastY, setLastY] = useState(0);
	const [tool, setTool] = useState("pen");
	const [restoreArray, setRestoreArray] = useState([]);
	const [redoArray, setRedoArray] = useState([]);
	const [showAddText, setShowAddText] = useState(false);
	useLayoutEffect(() => {
		const canvas = document.getElementById("canvas");
		const ctx = canvas.getContext("2d");
		setCanvas(canvas);
		setCtx(ctx);
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		ctx.strokeStyle = `#00000080`;
		ctx.lineJoin = "round";
		ctx.lineCap = "round";
		ctx.lineWidth = 5;
	}, []);
	function randomPointInRadius(radius) {
		for (;;) {
			var x = Math.random() * 2 - 1;
			var y = Math.random() * 2 - 1;
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
		if (!drawing) return;
		if (tool === "fill") {
			return;
		}
		if (tool === "line") {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.strokeStyle = color;
			restoreArray.forEach((element) => {
				ctx.putImageData(element, 0, 0);
			});
			ctx.beginPath();
			ctx.moveTo(lastX, lastY);
			ctx.lineTo(e.clientX, e.clientY);
			ctx.stroke();
			return;
		}
		if (tool === "move") {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			let mouseX = parseInt(e.clientX - canvas.offsetLeft);
			let mouseY = parseInt(e.clientY - canvas.offsetTop);
			let width = mouseX - lastX;
			let height = mouseY - lastY;
			restoreArray.forEach((element) => {
				if (element) {
					ctx.putImageData(element, width, height);
				}
			});
			return;
		}
		if (tool === "rectangle") {
			let mouseX = parseInt(e.clientX - canvas.offsetLeft);
			let mouseY = parseInt(e.clientY - canvas.offsetTop);
			let width = mouseX - lastX;
			let height = mouseY - lastY;
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.strokeStyle = color;
			restoreArray.forEach((element) => {
				ctx.putImageData(element, 0, 0);
			});
			ctx.strokeRect(lastX, lastY, width, height);

			return;
		}
		if (tool === "circle") {
			let mouseX = parseInt(e.clientX - canvas.offsetLeft);
			let mouseY = parseInt(e.clientY - canvas.offsetTop);
			let radius = Math.sqrt(Math.pow(mouseX - lastX, 2) + Math.pow(mouseY - lastY, 2));
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.strokeStyle = color;
			restoreArray.forEach((element) => {
				ctx.putImageData(element, 0, 0);
			});
			ctx.beginPath();
			ctx.arc(lastX, lastY, radius, 0, 2 * Math.PI);
			ctx.stroke();
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
		const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
		setRestoreArray([...restoreArray, img]);
		setDrawing(false);
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
				cursor.style.border = tool === "eraser" ? "1px solid #000" : "1px solid" + color;
			}}
		>
			{showAddText ? (
				<AddText
					setShowAddText={setShowAddText}
					ctx={ctx}
					restoreArray={restoreArray}
					setRestoreArray={setRestoreArray}
					canvas={canvas}
				/>
			) : (
				""
			)}
			<div className="cursor"></div>
			<canvas
				id="canvas"
				onMouseMove={handleMouseMove}
				onMouseDown={handleMouseDown}
				onMouseUp={handleMouseUp}
			></canvas>
			<Options
				lineWidth={lineWidth}
				setLineWidth={setLineWidth}
				color={color}
				setColor={setColor}
				ctx={ctx}
			></Options>
			<ToolBox
				tool={tool}
				setTool={setTool}
				ctx={ctx}
				canvas={canvas}
				restoreArray={restoreArray}
				setRestoreArray={setRestoreArray}
				redoArray={redoArray}
				setRedoArray={setRedoArray}
				setShowAddText={setShowAddText}
			/>
		</div>
	);
}

export default App;
