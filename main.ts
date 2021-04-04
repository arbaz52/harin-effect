import "./style.css";

import Engine from "./Engine";

//@ts-ignore
const noise = new perlinNoise3d();
const canvas = document.getElementById("canvas") as HTMLCanvasElement;

const engine = new Engine(canvas, noise);
engine.start(5000);
