import { Options as CloneOptions } from "html2canvas";
export declare type Options = CloneOptions & {
    type?: "dataURL";
};
export declare const xyHtml2canvas: (element: HTMLElement, options?: Partial<Options>) => Promise<string | HTMLCanvasElement>;
