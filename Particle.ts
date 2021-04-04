import Vector from "./Vector";

export default class Particle {
  public size: number;
  public position: Vector;
  public velocity: Vector;

  constructor(public x: number, public y: number) {
    this.position = new Vector(x, y);
    this.velocity = new Vector();
    this.size = 2;
  }

  applyForce(force: Vector) {
    this.velocity.add(force);
  }

  update() {
    const { velocity, position } = this;
    position.add(velocity);
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
