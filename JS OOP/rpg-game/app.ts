import * as PIXI from "pixi.js"

const Application = PIXI.Application;

const app = new Application({ width: 640, height: 360 });

document.body.appendChild(app.view as HTMLCanvasElement);