import { SandpackTypescript } from "../sandpack-components/SandpackTypescript";
export function SandpackTs() {
  return (
    <>
      <h2>Vanilla TypeScript</h2>
      <SandpackTypescript
        template="vanilla-ts"
        customSetup={{
          files: {
            "/src/index.ts": `import "./styles.css";
            
type List<R extends string> = R[]
            
const data: List<number> = [123, "foo"]
const selector = document.getElementById("app")

selector.innerHTML = \`
<h1>Hello Vanilla!</h1>
<p>\${data}</p>
\`;`,
          },
        }}
      />
    </>
  );
}
