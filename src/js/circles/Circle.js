import { context } from './canvas';

class Circle {
  constructor({ x, y }) {
    this.radius = 120;
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0;
    this.isDragging = false;
    this.color = '#aab5c5';
  }
  getBounds() {
    return {
      left: this.x - this.radius,
      right: this.x + this.radius,
      top: this.y - this.radius,
      bottom: this.y + this.radius
    };
  }
  isPointWithin({ x, y }) {
    const { left, right, top, bottom } = this.getBounds();
    return x > left && x < right && y > top && y < bottom;
  }
  update() {
    // Add acceleration to velocity
    this.vx = this.vx + this.ax;
    this.vy = this.vy + this.ay;
    // Add velocity to position
    this.x = this.x + this.vx;
    this.y = this.y + this.vy;
  }
  display() {
    context.fillStyle = this.color;
    context.fill();
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
  }
}

export default Circle;
