declare module "page-flip" {
  export class PageFlip {
    constructor(element: HTMLElement, options: Record<string, any>);
    loadFromHTML(elements: NodeListOf<Element>): void;
    flip(pageIndex: number): void;
    flipNext(): void;
    flipPrev(): void;
    getCurrentPageIndex(): number;
    getPageCount(): number;
    on(event: string, callback: (e: any) => void): void;
    destroy(): void;
  }
}
