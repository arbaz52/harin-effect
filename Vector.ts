export default class Vector {
  constructor(public x: number, public y: number) {}

  getMag() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }
  getAngle() {
    return Math.atan2(this.y, this.x);
  }

  setMag(mag: number) {
    const angle = this.getAngle();
    this.x = mag * Math.cos(angle);
    this.y = mag * Math.sin(angle);
    return this;
  }
  setAngle(angle: number) {
    const mag = this.getMag();
    this.x = mag * Math.cos(angle);
    this.y = mag * Math.sin(angle);
    return this;
  }

  add({ x, y }: Vector) {
    this.x += x;
    this.y += y;
  }
}
