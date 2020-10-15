export class Channel<T = string> {
  public name: string;
  private proxy?: BroadcastChannel;
  private map = new Set<{
    name: T;
    func: (e?: any) => void;
  }>();
  static connect(name: string) {
    return new Channel(name);
  }
  static fallback = !BroadcastChannel;
  constructor(name: string) {
    this.name = name;
    if (!Channel.fallback) {
      this.proxy = new BroadcastChannel(name);
      this.proxy.onmessage = ({ data }) => {
        this.map.forEach((el) => {
          if (el.name === data.name) {
            el.func(data.data);
          }
        });
      };
      this.proxy.onmessageerror = (e) => {
        console.error(e);
      };
    }
  }
  emit(name: T, data?: any) {
    if (!Channel.fallback) {
      this.proxy?.postMessage({
        name,
        data,
      });
    }
    this.map.forEach((el) => {
      if (el.name === name) {
        el.func(data);
      }
    });
  }
  on(name: T, func: (data?: any) => void) {
    const e = {
      name,
      func,
    };
    this.map.add(e);
    return {
      dispose: () => {
        this.map.delete(e);
      },
    };
  }
  dispose() {
    if (Channel.fallback) {
      this.map.clear();
    } else {
      this.proxy?.close();
    }
  }
}

export const mainBus = new Channel("__mainbus__");
