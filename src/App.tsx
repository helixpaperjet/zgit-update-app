// TODO 
// implement create project feature
import React from 'react';
import './App.css';
import { UpdateData } from './classes';
import { getKey } from './tools';
import { getUpdate } from './tools';
import { createUpdate } from './tools';
import { getPastUpdates } from './tools';
const getInput = (elementID: string) => {
  return (document.getElementById(elementID) as HTMLInputElement).value;
}
const postData = async(url: string, data: object): Promise<Response> => {
  return await fetch(url, {
    mode: "cors", 
    method: "POST", 
    body: JSON.stringify(data), 
    headers: 
    {
      'Content-Type': 'application/json'
    }
  })
}
const templateData: UpdateData = 
{
  "latest": 1,
  "data": {
    "downloadBase": "https://www.example.com",
    "fields": [
      "buildNumber",
      "name",
      "number",
      "status",
      "description",
      "download"
    ],
    "data": [
      [0],
      [
        1,
        "<empty>",
        "<empty>",
        "<empty>",
        "<empty>",
        {
          "type": "<empty>",
          "data": "<empty>"
        }
      ]
    ]
  }
}
const keyValidOutput = document.getElementById('keyValid') as HTMLParagraphElement;
export default class App extends React.Component<{}, {data: UpdateData}> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: templateData
    };
  }
  componentDidMount() {
    document.title = "至远光辉软件更新系统";
    document.getElementById("input-btn")?.addEventListener("click", () => {
      const value = getInput("get");
      if (typeof value === 'string') {
        getUpdate(value)
        .then(response => this.setState({data: response}))
        this.render();
      }
    })
    document.getElementById("push-update")?.addEventListener("click", () => {
      getKey(getInput("get"))
      .then(text => {
        if (getInput("key") === text) {
          console.log("ok");
          if (true) {
            var obj = this.state.data;
            const bn = Number.parseInt(getInput("build-number"));
            const un = getInput("name");
            const num = getInput("number");
            const stat = getInput("status");
            const ud = getInput("description");
            const dt = getInput("download-type");
            const dd = getInput("download-data");
            const inputs = [bn, un, num, stat, ud, dt, dd];
            // new obj.data.data
            // check if every input box is filled
            // if (bn && un && num && stat && ud && dt && dd) {
            //     var updateData = [bn, un, num, stat, ud, { type: dt, data: dd }];
            //     console.log(updateData);
            //     // check if new build number is wrong
            //     if (!(bn <= originalLatest)) {
            //         obj.latest = bn;
            //         if (bn > originalLatest + 1) {
            //             var i = originalLatest + 1;
            //             // add placeholder element for each skipped version
            //             while (i < bn) {
            //                 var placeholder = [i, "", "", "", "", { type: "", data: "" }];
            //                 console.log(placeholder);
            //                 obj.data.data.push(placeholder);
            //                 i++;
            //             }
            //         }
            let updateData = createUpdate(inputs, obj);
            if (updateData) {
              (document.getElementById("json-export") as HTMLParagraphElement).innerText = JSON.stringify(obj);
              postData(`http://127.0.0.1:8088/data/test/${getInput("get")}`, obj)
              .then(response => console.log(response));
            }
          }
        }
        else {
          keyValidOutput.style.color = "#FF0000";
          keyValidOutput.textContent = "Error: Invalid Key"
        }
      });
    })
  }
  render(): React.ReactNode {
    const thisState = this.state;
    return (
      <div className="App">
      <h1>至远光辉软件更新系统 | ZGIT Software Update System Z-SUS</h1>
      <div id="updateInfo">
        
        <fieldset className='original-data-div float-left'>
          <legend><b>原始数据</b></legend>
          <input id="get"></input>
          <button id="input-btn" className='float-left'>获取更新数据（JSON）</button>
          <code>{JSON.stringify(thisState.data)}</code>
          <div>
          {getPastUpdates(thisState.data)}
          </div>
        </fieldset>
        <fieldset className='new-update-div'>
          <legend><b>输入新数据</b></legend>
          <div className='float-left' id='new-data-input'>
            <label>构建号：</label><br></br><input id='build-number'></input><br></br>
            <label>版本名：</label><br></br><input id='name'></input><br></br>
            <label>版本号：</label><br></br><input id='number'></input><br></br>
            <label>状态：</label><br></br><input id='status'></input><br></br>
            <label>说明：</label><br></br><input id='description'></input><br></br>
            <label>下载类型：</label><br></br><input id='download-type'></input><br></br>
            <label>下载地址：</label><br></br><input id='download-data'></input><br></br>
            <p id='keyValid'></p>
            <label>密钥：</label><br></br><input id='key' type={"password"}></input><br></br>
            <button id='push-update'>推送新更新</button>
          </div>
          <code id='json-export'></code>
        </fieldset>
      </div>
    </div>
    );
  }
}
