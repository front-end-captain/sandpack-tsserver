import { SandpackTypescript } from "../sandpack-components/SandpackTypescript";
export function SandpackG2() {
  return (
    <>
      <h2>Vanilla TypeScript for G2</h2>
      <SandpackTypescript
        template="vanilla-ts"
        customSetup={{
          dependencies: { "@antv/g2": "4.2.10" },
          files: {
            "/index.html": `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React + TS</title>
  </head>
  <body>
    <div id="container" style="width: 500px;height:300px;"></div>
  </body>
</html>`,
            "/src/index.ts": `import { Chart } from '@antv/g2';

const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];
            
// Step 1: 创建 Chart 对象
const chart = new Chart({
  container: 'container', // 指定图表容器 ID
  width: 600, // 指定图表宽度
  height: 300, // 指定图表高度
});
            
// Step 2: 载入数据源
chart.data(data);
            
// Step 3: 创建图形语法，绘制柱状图
chart.interval().position('genre*sold');
            
// Step 4: 渲染图表
chart.render();`,
          },
        }}
      />
    </>
  );
}
