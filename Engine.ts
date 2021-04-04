import Particle from "./Particle";

export type NoiseFunction = (x: number, y: number, z: number) => number;

export default class Engine {
  public ctx: CanvasRenderingContext2D;
  public particles: Particle[];
  constructor(public canvas: HTMLCanvasElement, public noise: NoiseFunction) {
    this.ctx = canvas.getContext("2d");
  }

  draw() {
    requestAnimationFrame(this.draw.bind(this));

    this.fillBackground("#00000005");

    // draw all the particles
    this.particles.forEach((particle) => {
      particle.draw(this.ctx);
    });
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
    for (let i = 0; i < nParticles; i++) {
      const x = Math.random() * this.canvas.width;
      const y = Math.random() * this.canvas.height;

      this.particles.push(new Particle(x, y));
    }


    this.setup();
  }
}
