import "./style.css";

import { transparentize } from "polished";

import Engine from "./Engine";

//@ts-ignore
const noise = new perlinNoise3d();
const canvas = document.getElementById("canvas") as HTMLCanvasElement;

const engine = new Engine(canvas, noise);
engine.start(5000);

const inputRenderCellsBoundaries: HTMLInputElement = document.querySelector(
  ".inputRenderCellsBoundaries"
);
const inputRenderCellsForces: HTMLInputElement = document.querySelector(
  ".inputRenderCellsForces"
);
const inputBackgroundColor: HTMLInputElement = document.querySelector(
  ".inputBackgroundColor"
);
const inputBackgroundTransparency: HTMLInputElement = document.querySelector(
  ".inputBackgroundTransparency"
);

const inputParticleColor: HTMLInputElement = document.querySelector(
  ".inputParticleColor"
);

const inputParticleSpeed: HTMLInputElement = document.querySelector(
  ".inputParticleSpeed"
);

const inputCellForce: HTMLInputElement = document.querySelector(
  ".inputCellForce"
);
const inputResolution: HTMLInputElement = document.querySelector(
  ".inputResolution"
);

const inputTimeSpeed: HTMLInputElement = document.querySelector(
  ".inputTimeSpeed"
);

const inputCellSize: HTMLInputElement = document.querySelector(
  ".inputCellSize"
);

inputCellSize.onchange = (ev) => {
  const input = ev.target as HTMLInputElement;

  engine.cellWidth = parseFloat(input.value);
};

inputTimeSpeed.onchange = (ev) => {
  const input = ev.target as HTMLInputElement;

  engine.timeStep = parseFloat(input.value);
};

inputResolution.onchange = (ev) => {
  const input = ev.target as HTMLInputElement;

  engine.resolution = parseFloat(input.value);
};

inputCellForce.onchange = (ev) => {
  const input = ev.target as HTMLInputElement;

  engine.cellPullForce = parseFloat(input.value);
};

inputParticleSpeed.onchange = (ev) => {
  const input = ev.target as HTMLInputElement;

  engine.particleSpeed = parseFloat(input.value);
};

inputParticleColor.onchange = (ev) => {
  const input = ev.target as HTMLInputElement;

  engine.particleColor = input.value;
};

inputBackgroundTransparency.onchange = (ev) => {
  const input = ev.target as HTMLInputElement;
  const color = transparentize(input.value, inputBackgroundColor.value);

  engine.backgroundColor = color;
};

inputBackgroundColor.onchange = (ev) => {
  const input = ev.target as HTMLInputElement;

  const color = transparentize(inputBackgroundTransparency.value, input.value);

  engine.backgroundColor = color;
};
inputRenderCellsBoundaries.onchange = (ev: Event) => {
  const checkbox = ev.target as HTMLInputElement;

  engine.shouldRenderCells = checkbox.checked;
};

inputRenderCellsForces.onchange = (ev: Event) => {
  const checkbox = ev.target as HTMLInputElement;

  engine.shouldRenderCellsAngle = checkbox.checked;
};
