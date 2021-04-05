import Vector from "./Vector";

export interface Constraints {
  x: [number, number];
  y: [number, number];
}

export default class Particle {
  public size: number;
  public position: Vector;
  public velocity: Vector;

  constructor(
    public x: number,
    public y: number,
    public constraints: Constraints = {
      x: [-Infinity, Infinity],
      y: [-Infinity, Infinity],
    }
  ) {
    this.position = new Vector(x, y);
    this.velocity = new Vector();
    this.size = 1;
  }

  applyForce(force: Vector, speed = 3) {
    this.velocity.add(force).setMag(speed);
  }

  update() {
    const { velocity, position } = this;
    position.add(velocity);

    const { x, y } = position;

    if (x <= this.constraints.x[0]) this.position.x = this.constraints.x[1];
    if (x >= this.constraints.x[1]) this.position.x = this.constraints.x[0];

    if (y <= this.constraints.y[0]) this.position.y = this.constraints.y[1];
    if (y >= this.constraints.y[1]) this.position.y = this.constraints.y[0];
  }

  draw(ctx: CanvasRenderingContext2D, fill = "red") {
    const {
      position: { x, y },
      size,
    } = this;

    ctx.beginPath();
    ctx.fillStyle = fill;
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
}
