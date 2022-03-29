import { UpdateData } from "./classes";
const serverURL = "http://127.0.0.1:8088";
export async function getUpdate(name: string): Promise<any> {
  return await (await fetch(`${serverURL}/data/test/${name}`, {mode: "cors", method: "GET"})).json();
}
export async function getKey(name: string): Promise<string> {
  return await (await fetch(`${serverURL}/key/${name}`, {mode: "cors", method: "GET"})).text();
}
export function createUpdate(inputs: Array<any>, previous: UpdateData): UpdateData | boolean {
  if (inputs.length === 7) {
    var updateData = [inputs[0], inputs[1], inputs[2], inputs[3], inputs[4], { type: inputs[5], data: inputs[6] }];
    console.log(updateData);
    const originalLatest = previous.latest;
    // check if new build number is wrong
    if (!(inputs[0] <= originalLatest)) {
        previous.latest = inputs[0] as number;
        if (inputs[0] > originalLatest + 1) {
            var i = originalLatest + 1;
            // add placeholder element for each skipped version
            while (i < inputs[0]) {
                var placeholder = [i, "", "", "", "", { type: "", data: "" }];
                console.log(placeholder);
                previous.data.data.push(placeholder);
                i++;
            }
        }
        previous.data.data.push(updateData);
        console.log("Created new update data");
        console.log(previous);
        return previous;
    }
    return false;
  }
  return false;
}
export function getPastUpdates(data: UpdateData) {
  let buffer: Array<JSX.Element> = [];
  let updates: Array<any> = data.data.data;
  let i = 0;
  updates.forEach((child) => {
    buffer.push(
    <ul key={i}>
      <li>更新构建号: {child[0]}</li>
      <li>版本名: {child[1]}</li>
      <li>版本号: {child[2]}</li>
      <li>状态: {child[3]}</li>
      <li>说明: {child[4]}</li>
      <li>下载数据: <code>{JSON.stringify(child[5])}</code></li>
    </ul>
    )
    i++;
  });
  return buffer;
}
export function revertUpdates(number: number) {
  // TODO implement reverting updates
  return false;
}