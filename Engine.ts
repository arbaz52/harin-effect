import Particle, { Constraints } from "./Particle";
import Vector from "./Vector";

export type NoiseFunction = (x: number, y: number, z: number) => number;

export default class Engine {
  public ctx: CanvasRenderingContext2D;
  public particles: Particle[];
  public timeStep = 0.005;
  public time = 0;
  public shouldRenderCells = false;
  public shouldRenderCellsAngle = false;
  public backgroundColor = "#0000001a";
  public particleColor = "red";
  public particleSpeed = 3;
  public cellPullForce = 1;

  constructor(
    public canvas: HTMLCanvasElement,
    public noise: any,
    public cellWidth = 10,
    public resolution = 0.05
  ) {
    this.ctx = canvas.getContext("2d");
    console.log(noise.get(0, 0, 0));
  }

  renderCells() {
    const {
      canvas,
      cellWidth,
      ctx,
      shouldRenderCells,
      shouldRenderCellsAngle,
      noise,
    } = this;
    if (!shouldRenderCells && !shouldRenderCellsAngle) return;

    const cols = Math.floor(canvas.width / cellWidth);
    const rows = Math.floor(canvas.height / cellWidth);
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const x = j * cellWidth;
        const y = i * cellWidth;
        if (shouldRenderCells) {
          ctx.beginPath();
          ctx.strokeStyle = "#ffffff1a";
          ctx.rect(x, y, cellWidth, cellWidth);
          ctx.stroke();
          ctx.closePath();
        }
        if (shouldRenderCellsAngle) {
          const { resolution, time } = this;
          const xoff = j * resolution;
          const yoff = i * resolution;
          const angle = noise.get(xoff, yoff, time);
          const vector = new Vector(1, 0)
            .setMag(cellWidth)
            .setAngle(angle * Math.PI * 4);
          ctx.beginPath();
          ctx.fillStyle = "#ffffff2a";
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
          ctx.closePath();

          ctx.beginPath();
          ctx.strokeStyle = "#ffffff2a";
          ctx.moveTo(x, y);
          ctx.lineTo(x + vector.x, y + vector.y);
          ctx.stroke();
          ctx.closePath();
        }
      }
    }
  }

  draw() {
    requestAnimationFrame(this.draw.bind(this));

    this.fillBackground();

    this.renderCells();

    this.particles.forEach((particle) => {
      const { cellWidth, resolution, noise, time, cellPullForce } = this;
      //find the cell it's in, find force in the cell, apply that force to particle.
      const {
        position: { x, y },
      } = particle;
      const cellCol = x / cellWidth;
      const cellRow = y / cellWidth;

      const noiseX = cellCol * resolution;
      const noiseY = cellRow * resolution;
      const forceAngle = noise.get(noiseX, noiseY, time) * Math.PI;

      const force = new Vector(1, 1)
        .setMag(cellPullForce)
        .setAngle(forceAngle * 4);

      particle.applyForce(force, this.particleSpeed);
      particle.update();

      particle.draw(this.ctx, this.particleColor);
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

  fillBackground(fill: string = this.backgroundColor) {
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
