declare namespace Interface {
  interface ConfigInterface {
    level: {
      easy: number;
      normal: number;
      hard: number;
    };
    color: {
      wall: string;
      path: string;
      entrance: string;
      exit: string;
    };
  }
  interface GameInterface {
    config: ConfigInterface | undefined;
  }
}
