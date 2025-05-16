
declare module 'eruda' {
  interface Eruda {
    init: (options?: any) => void;
    show: () => void;
    hide: () => void;
    _isShow: boolean;
    destroy: () => void;
    scale: (scale: number) => void;
    position: (position: { x: string, y: string }) => void;
    get: (name: string) => any;
    add: (tool: any) => void;
  }
  
  const eruda: Eruda;
  export default eruda;
}

interface Window {
  eruda: typeof import('eruda').default;
}
