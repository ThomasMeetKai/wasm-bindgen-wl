import * as Comlink from "https://unpkg.com/comlink/dist/esm/comlink.mjs";

Comlink.transferHandlers.set("KEYBOARDEVENT", {
    canHandle: (obj) => obj instanceof KeyboardEvent,
    serialize: (e) => {
        return [
            {
                keyCode: e.keyCode
            },
            [],
        ];
    },
    deserialize: (obj) => obj,
});

export async function load_app() {

    const wasmMemory = Module['wasmMemory'];
    const worker = new Worker("./worker.js");
    const workerApi = Comlink.wrap(worker);
    window.addEventListener("keydown", workerApi.keydown.bind(workerApi));
    window.addEventListener("keyup", workerApi.keyup.bind(workerApi));

    let mainApi = {
        greet() {
            console.log("Main says hello!");
            console.log("Main says goodbye!");
            workerApi.ciao();
        }
    };
    Comlink.expose(mainApi, worker);

    await workerApi.init(wasmMemory);
}