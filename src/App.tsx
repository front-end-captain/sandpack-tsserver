import {
  SandpackCodeEditor,
  SandpackConsumer,
  SandpackProvider,
  SandpackThemeProvider,
  useSandpack,
} from "@codesandbox/sandpack-react";
import "@codesandbox/sandpack-react/dist/index.css";

import { EventEmitter } from "@okikio/emitter";
import codemirrorExtensions from "./codemirror-extensions";
import { memo, useEffect, useState } from "react";

const tsServer = new Worker(
  new URL("/workers/tsserver.js", window.location.origin),
  { name: "ts-server" }
);

const emitter = new EventEmitter();
const createExtensions = codemirrorExtensions(tsServer, emitter);

const TypeScriptIntegration = () => {
  const { sandpack } = useSandpack();

  useEffect(function listener() {
    const serverMessageCallback = ({
      data: { event, details },
    }: MessageEvent<{ event: string; details: any }>) => {
      emitter.emit(event, details);
    };

    tsServer.addEventListener("message", serverMessageCallback);

    return () => {
      tsServer.removeEventListener("message", serverMessageCallback);
    };
  }, []);

  useEffect(function init() {
    emitter.on("ready", () => {
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

      tsServer.postMessage({
        event: "create-system",
        details: {
          files: sandpack.files,
          entry: sandpack.activePath,
          fsMapCached: getTypescriptCache(),
        },
      });
    });

    emitter.on(
      "cache-typescript-fsmap",
      ({ version, fsMap }: { version: string; fsMap: Map<string, string> }) => {
        fsMap.forEach((file, lib) => {
          const cacheKey = "ts-lib-" + version + "-" + lib;
          localStorage.setItem(cacheKey, file);
        });
      }
    );
  }, []);

  return null;
};

const CodeEditor: React.FC<{ activePath?: string }> = memo(({ activePath }) => {
  const extensions = createExtensions(activePath);

  return <SandpackCodeEditor showTabs extensions={extensions} />;
});

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(function init() {
    emitter.on("ready", () => {
      setLoading(false);
    });
  }, []);

  return (
    <>
      <SandpackProvider
        template="react-ts"
        customSetup={{
          dependencies: {
            "styled-components": "latest",
            "@codesandbox/sandpack-react": "latest",
          },
          files: {
            "/Button.tsx": `interface Props {
  variant: "success" | "error";
}
const Button: React.FC<Props> = ({ children }) => {
  return children;
};

export { Button };`,

            "/App.tsx": `import React, { useState } from "react"
import { Button } from "./Button"
import styled from "styled-components"
import { Sandpack } from "@codesandbox/sandpack-react"

export default function App(): JSX.Element {
  const [state, setState] = useState()
  
  return (
    <div>
      <h1>Hello World</h1>
      <Sandpack />
      <Button />
    </div>
  )
}`,
          },
        }}
      >
        <SandpackThemeProvider>
          <TypeScriptIntegration />
          <SandpackConsumer>
            {(state) => <CodeEditor activePath={state?.activePath} />}
          </SandpackConsumer>
        </SandpackThemeProvider>
      </SandpackProvider>

      {loading && <p>Loading...</p>}
    </>
  );
}
