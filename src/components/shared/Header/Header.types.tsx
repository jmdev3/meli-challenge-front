export interface IHeader {
  categories: string[];
  clearStore: () => void;
  value: string;
  setValue: (value: string) => void;
  navigate: (url: string) => void;
}

export interface IConnectedHeader {
  categories: string[];
  clearStore: () => void;
}
