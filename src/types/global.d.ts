import { LoDashStatic } from 'lodash';
import { VueSocket } from 'vue-native-websocket';
import * as lodash from 'lodash';

declare global {
  interface Window {
    _: LoDashStatic;
  }

  interface HttpResponse<T = any> {
    code: HttpCode;
    message: string;
    data?: T;
  }

  type RestParameters<T extends (...args: any) => any> = T extends (arg1: any, ...args: infer P) => any ? P : never;

  interface StoreAction<F extends (...args: any) => any> {
    (...args: RestParameters<F>): ReturnType<F>;
  }
}

declare module 'vue/types/vue' {
  interface VueConstructor {
    options: {
      name: string;
      [index: string]: any;
    };
    aopUse: (plugin: any) => void;
  }
  interface Vue {
    $socket: VueSocket;
  }
}

export {};
