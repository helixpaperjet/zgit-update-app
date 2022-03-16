import React from 'react';
import './App.css';
import { UpdateData } from './classes';
let key_: string = "HG4DJA55CLML4DNH";
const getInput = (elementID: string) => {
  return (document.getElementById(elementID) as HTMLInputElement).value;
}
const fetchData = async(url: string) => {
  return await fetch(url, {mode: "cors", method: "GET"});
}
const postData = async(url: string, data: object) => {
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

class App extends React.Component<{},{data: UpdateData}> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: templateData
    };
  }
  componentDidMount() {
    document.title = "至远光辉软件更新系统";
    document.getElementById("input-btn")?.addEventListener("click", () => {
      let value = getInput("get")
      if (typeof value === 'string') {
        fetchData(`http://127.0.0.1:8088/data/test/${value}`)
        .then(response => response.json())
        .then(response => this.setState({data: response}));
        this.render();
      }
    })
    document.getElementById("push-update")?.addEventListener("click", () => {
      let key = getInput("key");
      let projKey;
      fetchData(`http://127.0.0.1:8088/key/${getInput("get")}`)
      .then(res => res.text())
      .then(text => {
        if (key === text) {
          console.log("ok");
          if (true) {
              var obj = this.state.data;
              var originalLatest = obj.latest;
              var bn = Number.parseInt(getInput("build-number"));
              var un = getInput("name");
              var num = getInput("number");
              var stat = getInput("status");
              var ud = getInput("description");
              var dt = getInput("download-type");
              var dd = getInput("download-data");
              // new obj.data.data
              // check if every input box is filled
              if (bn && un && num && stat && ud && dt && dd) {
                  var updateData = [bn, un, num, stat, ud, { type: dt, data: dd }];
                  console.log(updateData);
                  // check if new build number is wrong
                  if (!(bn <= originalLatest)) {
                      obj.latest = bn;
                      if (bn > originalLatest + 1) {
                          var i = originalLatest + 1;
                          // add placeholder element for each skipped version
                          while (i < bn) {
                              var placeholder = [i, "", "", "", "", { type: "", data: "" }];
                              console.log(placeholder);
                              obj.data.data.push(placeholder);
                              i++;
                          }
                      }
                      obj.data.data.push(updateData);
                      console.log("Pushed update data");
                      (document.getElementById("json-export") as HTMLParagraphElement).innerText = JSON.stringify(obj);
                      postData(`http://127.0.0.1:8088/data/test/${getInput("get")}`, obj)
                      .then(response => console.log(response))
                  }
                }
                else {
                  alert("Must fill all boxes")
                }
              }
            }
      });
        }
      )
    }
  render(): React.ReactNode {
    const thisState = this.state;
    const element = thisState.data.data.data[thisState.data.latest];
    return (
      <div className="App">
      <h1>至远光辉软件更新系统 | ZGIT Software Update System Z-SUS</h1>
      <div id="updateInfo">
        <input id="get"></input>
        <button id="input-btn" className='float-left'>获取更新数据（JSON）</button>
        <fieldset className='original-data-div float-left'>
          <legend><b>原始数据</b></legend>
          <code>{JSON.stringify(thisState.data)}</code>
          <ul>
            <li>最新build (构建 {thisState.data.latest}):</li>
            <ul>
              <li>更新构建号: {element[0]}</li>
              <li>版本名: {element[1]}</li>
              <li>版本号: {element[2]}</li>
              <li>状态: {element[3]}</li>
              <li>说明: {element[4]}</li>
              <li>下载数据: <code>{JSON.stringify(element[5])}</code></li>
            </ul>
          </ul>
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
            <input id='key'></input><button id='push-update'>Push New Update</button>
          </div>
          <p id='json-export'></p>
        </fieldset>
      </div>
    </div>
    );
  }
}
export default App;
