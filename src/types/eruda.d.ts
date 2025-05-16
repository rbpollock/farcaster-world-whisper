

declare module 'eruda' {
  interface Eruda {
    init: (options?: any) => void;
    show: () => void;
    hide: () => void;
    destroy: () => void;
    scale: (scale: number) => void;
    remove: (name: string) => void;
    position: (position: { x: string, y: string }) => void;
    get: (name: string) => any;
    add: (tool: any) => void;
    _isShow?: boolean; // Add the _isShow property as optional
  }
  
  const eruda: Eruda;
  export default eruda;
}

