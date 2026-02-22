declare module 'dom-to-image' {
    export function toPng(node: Node, options?: any): Promise<string>;
    export function toSvg(node: Node, options?: any): Promise<string>;
  }
  