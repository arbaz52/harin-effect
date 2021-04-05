import Particle, { Constraints } from "./Particle";
import Vector from "./Vector";

export type NoiseFunction = (x: number, y: number, z: number) => number;

export default class Engine {
  public ctx: CanvasRenderingContext2D;
  public particles: Particle[];
  public timeStep = 0.005;
  public time = 0;

  constructor(
    public canvas: HTMLCanvasElement,
    public noise: any,
    public cellWidth = 10,
    public resolution = 0.05
  ) {
    this.ctx = canvas.getContext("2d");
    console.log(noise.get(0, 0, 0))
  }

  draw() {
    requestAnimationFrame(this.draw.bind(this));

    this.fillBackground("#0000001a");

    this.particles.forEach((particle) => {
      const { cellWidth, resolution, noise, time } = this;
      //find the cell it's in, find force in the cell, apply that force to particle.
      const {
        position: { x, y },
      } = particle;
      const cellCol = x / cellWidth;
      const cellRow = y / cellWidth;

      const noiseX = cellCol * resolution;
      const noiseY = cellRow * resolution;
      const forceAngle = noise.get(noiseX, noiseY, time) * Math.PI;

      const force = new Vector(1, 1).setMag(1).setAngle(forceAngle*4);

      particle.applyForce(force);
      particle.update();

      particle.draw(this.ctx);
    });

    this.time += this.timeStep;
  }

  goFullScreen() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  handleWindowResize() {
    this.goFullScreen();
  }

  fillBackground(fill: string) {
    const {
      ctx,
      canvas: { width, height },
    } = this;

    ctx.beginPath();
    ctx.fillStyle = fill;
    ctx.rect(0, 0, width, height);
    ctx.fill();
    ctx.closePath();
  }

  setup() {
    this.fillBackground("black");
    this.draw();
  }

  start(nParticles: number) {
    window.onresize = this.handleWindowResize.bind(this);

    this.goFullScreen();

    this.particles = [];
    const constraints: Constraints = {
      x: [0, this.canvas.width],
      y: [0, this.canvas.height],
    };
    for (let i = 0; i < nParticles; i++) {
      const x = Math.random() * this.canvas.width;
      const y = Math.random() * this.canvas.height;

      this.particles.push(new Particle(x, y, constraints));
    }

    this.setup();
  }
}
