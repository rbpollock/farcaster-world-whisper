
import eruda from 'eruda';

declare global {
  interface Window {
    eruda: typeof eruda & {
      _isShow?: boolean;
    };
  }
}
