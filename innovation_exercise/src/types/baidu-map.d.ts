interface BMapGLPoint {}
interface BMapGLMap {}
interface BMapGLLocalSearch {}
interface BMapGLNavigationControl {}

declare namespace BMapGL {
  class Point {
    constructor(lng: number, lat: number);
  }
  class Map {
    constructor(container: HTMLElement);
    centerAndZoom(point: BMapGLPoint, zoom: number): void;
    addControl(control: BMapGLNavigationControl): void;
    enableScrollWheelZoom(enable: boolean): void;
    panTo(point: BMapGLPoint): void;
  }
  class LocalSearch {
    constructor(map: BMapGLMap, options: {
      renderOptions: { map: BMapGLMap };
      onSearchComplete: (results: any) => void;
    });
    search(keyword: string): void;
    getStatus(): number;
  }
  class NavigationControl {
    constructor();
  }
  const BMAP_STATUS_SUCCESS: number;
}

declare global {
  interface Window {
    BMapGL: typeof BMapGL;
  }
}