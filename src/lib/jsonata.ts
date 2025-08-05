import jsonata from "jsonata";

type AppJsonataFunction = (...args: any[]) => void;

export class AppJsonata<K, T> {
  private jsonataStr: string;
  private functions: AppJsonataFunction[] = [];

  constructor({
    jsonataStr,
    functions,
  }: {
    jsonataStr?: string;
    functions?: AppJsonataFunction[];
  }) {
    this.jsonataStr = jsonataStr ?? "$";
    this.functions = functions ?? [];
  }

  updateJsonataStr(jsonataStr: string) {
    this.jsonataStr = jsonataStr;
  }

  addFunctions(func: AppJsonataFunction | AppJsonataFunction[]) {
    if (Array.isArray(func)) {
      this.functions.push(...func);
    } else {
      this.functions.push(func);
    }
  }

  updateFunctions(funcs: AppJsonataFunction[]) {
    this.functions = funcs;
  }

  async evaluate(data: K): Promise<T | null> {
    try {
      const expression = jsonata(this.jsonataStr);
      this.functions.forEach((func) => {
        expression.registerFunction(func.name, func);
      });
      return await expression.evaluate(data);
    } catch (error) {
      console.error(error);
      throw null;
    }
  }
}
