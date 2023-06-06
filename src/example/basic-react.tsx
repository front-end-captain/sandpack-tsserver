import { SandpackTypescript } from "../sandpack-components/SandpackTypescript";
export function SandpackBasicReact() {
  return (
    <>
      <h2>Basic React</h2>
      <SandpackTypescript
        template="react-ts"
        customSetup={{
          files: {
            "/App.tsx": `import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState<number>("0");

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <button onClick={handleClick}>
      You pressed me {count} times
    </button>
  );
}`,
          },
        }}
      />
    </>
  );
}
