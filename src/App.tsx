import { SandpackTypescript } from "./sandpack-components/SandpackTypescript";
import { SandpackBasicReact } from "./example/basic-react";
import { SandpackReactDeps } from "./example/react-deps";
import { SandpackReactDepsMultiFiles } from "./example/react-deps-multi-files";
import { SandpackTs } from "./example/vanilla-ts";
import { SandpackEcharts } from "./example/vanilla-ts-echarts";
import { SandpackG2 } from "./example/vanilla-ts-g2";
import "./index.css";

export default function App() {
  return (
    <div className="content">
      <h1>Sandpack + TypeScript LSP</h1>
      <p>
        It implements an interface between Sandpack, which uses CodeMirror under
        the hood, and TypeScript Virtual File System to consume all the benefits
        a language server protocol can provide, but inside a browser.
      </p>

      <ul>
        <li>IntelliSense;</li>
        <li>Tooltip error;</li>
        <li>Multiple files;</li>
        <li>Support tsconfig.json;</li>
        <li>Automatically dependency-types fetching (CodeSandbox CDN);</li>
        <li>In-browser dependency cache;</li>
      </ul>

      <br />

      {/* <SandpackTs /> */}

      {/* <SandpackEcharts /> */}

      <SandpackG2 />
    </div>
  );
}
