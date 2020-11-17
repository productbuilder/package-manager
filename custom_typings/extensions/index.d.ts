declare module '*.png' {
  const value: string;
  export = value;
}

declare module '*.jpg' {
  const value: string;
  export = value;
}

declare module '*.scss' {
  const value: Object<T>;
  export = value;
}
