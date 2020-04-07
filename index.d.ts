import * as React from 'react';

export = ReactImage;
export as namespace ReactImage;

declare namespace ReactImage {
  export interface ImageProps extends React.HTMLAttributes<HTMLImageElement> {
    src: string;
    fallback?: string;
    srcset?: Array<{src: string; condition?: string}>;
    sizes?: Array<{size: string; condition?: string}>;
    alt: string | number;
    width?: string | number;
    minWidth?: string | number;
    maxWidth?: string | number;
    height?: string | number;
    minHeight?: string | number;
    maxHeight?: string | number;
    backgroundColor?: string;
    hideOnError?: boolean;
  }

  export interface BackgroundImageProps
    extends React.HTMLAttributes<HTMLDivElement> {
    src: string;
    background?: {
      size?: string;
      color?: string;
      position?: string;
      attachment?: string;
      repeat?: string;
    };
    width?: string | number;
    minWidth?: string | number;
    maxWidth?: string | number;
    height?: string | number;
    minHeight?: string | number;
    maxHeight?: string | number;
    srcset?: Array<{src: string; maxWidth: string}>;
    children?: React.ReactNode;
  }

  export const Image: React.SFC<ReactImage.ImageProps>;
  export const BackgroundImage: React.SFC<ReactImage.BackgroundImageProps>;
}
