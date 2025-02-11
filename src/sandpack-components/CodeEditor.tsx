import { SandpackCodeEditor, useSandpack } from "@codesandbox/sandpack-react";

import { EventEmitter } from "@okikio/emitter";
import { codemirrorTypescriptExtensions } from "./codemirror-extensions";
import { memo, useEffect, useRef } from "react";

export const CodeEditor: React.FC<{ activePath?: string }> = memo(
  ({ activePath }) => {
    const tsServer = useRef(
      new Worker(new URL("/workers/tsserver.js", window.location.origin), {
        name: "ts-server",
      })
    );
    const emitter = useRef(new EventEmitter());
    const { sandpack } = useSandpack();
    // console.log(sandpack)

    useEffect(function listener() {
      const serverMessageCallback = ({
        data: { event, details },
      }: MessageEvent<{ event: string; details: any }>) => {
        console.log('emit', event, details)
        emitter.current.emit(event, details);
      };

      tsServer.current.addEventListener("message", serverMessageCallback);

      return () => {
        tsServer.current.removeEventListener("message", serverMessageCallback);
      };
    }, []);

    useEffect(function init() {
      emitter.current.on("ready", () => {
        const getTypescriptCache = () => {
          const cache = new Map();
          const keys = Object.keys(localStorage);

          keys.forEach((key) => {
            if (key.startsWith("ts-lib-")) {
              cache.set(key, localStorage.getItem(key));
            }
          });

          return cache;
        };

        const details = {
          files: sandpack.files,
          entry: sandpack.activePath,
          fsMapCached: getTypescriptCache(),
        };
        console.log("details", details);
        tsServer.current.postMessage({
          event: "create-system",
          details,
        });
      });

      emitter.current.on(
        "cache-typescript-fsmap",
        ({
          version,
          fsMap,
        }: {
          version: string;
          fsMap: Map<string, string>;
        }) => {
          fsMap.forEach((file, lib) => {
            const cacheKey = "ts-lib-" + version + "-" + lib;
            localStorage.setItem(cacheKey, file);
          });
        }
      );
    }, []);

    const extensions = codemirrorTypescriptExtensions(
      tsServer.current,
      emitter.current,
      activePath
    );

    return <SandpackCodeEditor showTabs extensions={extensions} />;
  }
);
