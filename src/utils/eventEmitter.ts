/* eslint-disable @typescript-eslint/no-explicit-any */
type EventOn = (name: string, fn: (args?: any) => void) => void;

type EventEmit = (name: string, data?: any) => void;

type EventNamespace = Record<string, Array<(args?: any) => void>>;

type EventEmitter = {
  namespace: EventNamespace;
  on: EventOn;
  emit: EventEmit;
};

function createEventEmitter(): EventEmitter {
  return {
    namespace: {},
    on(name, fn) {
      this.namespace[name] = this.namespace[name] || [];
      this.namespace[name].push(fn);
    },
    emit(name, data) {
      if (this.namespace[name]) {
        this.namespace[name].forEach((fn) => fn(data));
      }
    },
  };
}

export const eventEmitter = createEventEmitter();
