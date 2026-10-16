declare const Deno: {
  env: {
    get(key: string): string | undefined;
    set?(key: string, value: string): void;
    [key: string]: any;
  };
  test(name: string, fn: () => void | Promise<void>): void;
  [key: string]: any;
};

declare module "@oak/oak" {
  export interface Context {
    request: any;
    response: {
      body: any;
      status?: number;
      headers?: any;
    };
    params: Record<string, string>;
    state: Record<string, any>;
  }

  export class Application {
    use(middleware: (ctx: Context, next: () => Promise<unknown>) => Promise<unknown> | unknown): this;
    listen(options: { port: number }): Promise<void>;
  }

  export type Middleware = (ctx: Context, next: () => Promise<unknown>) => Promise<unknown> | unknown;

  export class Router {
    get(path: string, ...middlewares: Middleware[]): this;
    post(path: string, ...middlewares: Middleware[]): this;
    put(path: string, ...middlewares: Middleware[]): this;
    delete(path: string, ...middlewares: Middleware[]): this;
    patch(path: string, ...middlewares: Middleware[]): this;
    routes(): any;
    allowedMethods(): any;
  }
}

declare module "@std/assert" {
  export function assertEquals(actual: unknown, expected: unknown, msg?: string): void;
  export function assertExists(actual: unknown, msg?: string): void;
  export function assert(expr: unknown, msg?: string): void;
}

declare module "@std/dotenv" {
  export function load(options?: any): Promise<Record<string, string>>;
}

