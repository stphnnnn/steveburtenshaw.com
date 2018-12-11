import canvas, { clear } from './canvas';
import Circle from './Circle';

const points = [];
let startX, startY;

const getMouseCoords = ({ clientX, clientY }) => ({
  x: parseInt(clientX),
  y: parseInt(clientY)
});

function handleMouseDown(e) {
  const mouseCoords = getMouseCoords(e);
  points.forEach(circle => {
    if (circle.isPointWithin(mouseCoords)) {
      circle.isDragging = true;
      startX = mouseCoords.x;
      startY = mouseCoords.y;
    }
  });
}

function handleMouseUp() {
  points.forEach(circle => {
    circle.isDragging = false;
  });
}

function handleMouseMove(e) {
  const { x, y } = getMouseCoords(e);
  const dx = x - startX;
  const dy = y - startY;
  points.forEach(circle => {
    if (circle.isDragging) {
      circle.x += dx;
      circle.y += dy;
      circle.update();
      startX = x;
      startY = y;
    }
  });
}

function init() {
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;

  canvas.onmousedown = handleMouseDown;
  canvas.onmouseup = handleMouseUp;
  canvas.onmousemove = handleMouseMove;

  points.push(
    new Circle({
      x: 200,
      y: 200
    })
  );

  draw();
}

function draw() {
  clear();
  points.forEach(x => {
    x.update();
    x.display();
  });
  requestAnimationFrame(draw);
}

export default init;
