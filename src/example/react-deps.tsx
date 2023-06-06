import { SandpackTypescript } from "../sandpack-components/SandpackTypescript";
export function SandpackReactDeps() {
  return (
    <>
      <h2>React + Dependency</h2>
      <SandpackTypescript
        template="react-ts"
        customSetup={{
          dependencies: {
            "@chakra-ui/react": "latest",
            "@emotion/react": "latest",
            "@emotion/styled": "latest",
            "framer-motion": "latest",
          },
          files: {
            "/App.tsx": {
              code: `import React from "react"
import { Flex } from '@chakra-ui/react'

export default function App(): JSX.Element {
  return (
    <Flex 
      w="100vw" 
      h="100vh" 
      justifyContent="center" 
      alignItems
    >
      <h2>Hello world!</h2>
    </Flex>
  )
}`,
            },
          },
        }}
      />
    </>
  );
}
