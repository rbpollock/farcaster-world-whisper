
declare module 'eruda' {
  const eruda: {
    init: (options?: any) => void;
    show: () => void;
    hide: () => void;
    _isShow: boolean;
  };
  export default eruda;
}

interface Window {
  eruda: typeof import('eruda').default;
}
