import "./style.css";

import perlinNoise3d from "perlin-noise-3d";

import Engine from "./Engine"

const noise = new perlinNoise3d();
const canvas = document.getElementById("canvas") as HTMLCanvasElement;

const engine = new Engine(canvas, noise.get)
engine.start(1000)
