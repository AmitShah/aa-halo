/// <reference types="react-scripts" />
declare module "halo-chip"
declare global {
    interface Window {
      NDEFReader: any;
    }
  }
