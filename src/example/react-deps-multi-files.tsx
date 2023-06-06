import { SandpackTypescript } from "../sandpack-components/SandpackTypescript";
export function SandpackReactDepsMultiFiles() {
  return (
    <>
      <h2>React + Dependency + Multiple files</h2>
      <SandpackTypescript
        template="react-ts"
        customSetup={{
          dependencies: {
            "styled-components": "latest",
          },
          files: {
            "/Button.ts": `import styled, { css } from "styled-components";
          
export const Button = styled.a<{ primary?: boolean }>\`
  /* This renders the buttons above... Edit me! */
  background: transparent;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 1em;
  padding: 0.25em 1em;

  \${props => props.primary && css\`
    background: palevioletred;
    color: white;
  \`};
\``,
            "/App.tsx": `import React from "react"
import { Button } from "./Button"

export default function App(): JSX.Element {
  return (
    <div>
      <Button>Hello world!</Button>
      <Button active>Primary button!</Button>
    </div>
  )
}`,
          },
        }}
      />
    </>
  );
}
