import Vector from "./Vector";

export default class Particle {
  public position: Vector;
  public velocity: Vector;

  constructor(public x: number, public y: number) {
    this.position = new Vector(x, y);
    this.velocity = new Vector();
  }

  applyForce(force: Vector) {
    this.velocity.add(force);
  }

  update() {
    const { velocity, position } = this;
    position.add(velocity);
  }

  draw() {
    const {
      position: { x, y },
    } = this;
  }
}
