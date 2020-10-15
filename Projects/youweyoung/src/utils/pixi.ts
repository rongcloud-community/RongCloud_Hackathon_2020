export const PIXI = (window as any).PIXI;

export const init = (view: HTMLCanvasElement) => {
  return new PIXI.Application({
    view,
  });
};
