import jsonata from "jsonata";

type AppJsonataFunction = (...args: any[]) => void;

export class AppJsonata<K, T> {
  private jsonataStr: string;
  private functions: AppJsonataFunction[] = [];
  private assignedVariables: Record<string, string> = {};

  constructor({
    jsonataStr,
    functions,
    assignedVariables,
  }: {
    jsonataStr?: string;
    functions?: AppJsonataFunction[];
    assignedVariables?: Record<string, string>;
  }) {
    this.jsonataStr = jsonataStr ?? "$";
    this.functions = functions ?? [];
    this.assignedVariables = assignedVariables ?? {};
  }

  updateAssignedVariables(variables: Record<string, string>) {
    this.assignedVariables = variables;
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
      Object.entries(this.assignedVariables).forEach(([key, value]) => {
        expression.assign(key, value);
      });
      return await expression.evaluate(data);
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
