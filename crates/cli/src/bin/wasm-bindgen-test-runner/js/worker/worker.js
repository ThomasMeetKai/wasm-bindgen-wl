var Module = {};
window = self;
importScripts("./comlink.js");
importScripts("./wonderland.min.js");
importScripts("./app_rs.bundle.js");

const app_rs = Module['app_rs'];
var sharedBuffer;
var Window = WorkerGlobalScope;
const mainApi = Comlink.wrap(self);

Comlink.transferHandlers.set("KEYBOARDEVENT", {
  canHandle: (obj) => typeof obj  == 'KeyboardEvent',
  serialize: (e) => {
    return [
      {
        keyCode: e.keyCode
      },
      [],
    ];
  },
  deserialize: (obj) => obj,
})

const obj = {
  async init(wasmMemory) {
    Module["wasmMemory"] = wasmMemory;
    importScripts("./WonderlandRuntime-loader-simd-threads.js");
    Module["buffer"] = wasmMemory.buffer;
    wasmInstance = (Module["wasmModule"] = await WebAssembly.compileStreaming(
        fetch("WonderlandRuntime-loader-simd-threads.wasm")
    ));

    await WebAssembly.instantiate(wasmInstance, {
      a: asmLibraryArg,
      wasmMemory,
      js: {
        mem: wasmMemory,
      },
      env: {
        memory: wasmMemory,
      },
    });

    // This is a hack until we can figure out how to get a callback when WL's wasm finishes instantiating
    await waitUntil(() => {
      if (Module.asm !== undefined) {
        if (Module.asm.ed !== undefined) {
          return true;
        }
      }
      return false;
    });

    console.log("Can now call WL JS API!");

    sharedBuffer = wasmMemory.buffer;

    Module["HEAP8"] = HEAP8 = new Int8Array(sharedBuffer);
    Module["HEAP16"] = HEAP16 = new Int16Array(sharedBuffer);
    Module["HEAP32"] = HEAP32 = new Int32Array(sharedBuffer);
    Module["HEAPU8"] = HEAPU8 = new Uint8Array(sharedBuffer);
    Module["HEAPU16"] = HEAPU16 = new Uint16Array(sharedBuffer);
    Module["HEAPU32"] = HEAPU32 = new Uint32Array(sharedBuffer);
    Module["HEAPF32"] = HEAPF32 = new Float32Array(sharedBuffer);
    Module["HEAPF64"] = HEAPF64 = new Float64Array(sharedBuffer);

    // init WL api
    WL.init();
    await app_rs.init("./app_rs_bg.wasm");
    app_rs.run("./BackendPOC.wlp");

    console.log("Worker says hello!");
    mainApi.greet();
  },
  ciao() {
    console.log("Worker says goodbye!");
  },
  async keydown(e) {
    app_rs.js_key_down(e.keyCode);
  },
  async keyup(e) {
    app_rs.js_key_up(e.keyCode);
  }
};

Comlink.expose(obj);

const waitUntil = function (condition_func) {
  return new Promise(resolve => {
    const interval = setInterval(() => {
      if (condition_func()) {
        resolve();
        clearInterval(interval);
      }
    }, 50);
  });
};