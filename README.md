# 至远光辉软件更新系统
aka. <b>ZGIT Software Update System (Z-SUS)</b>
## 简介
长久以来，至远光辉信息技术都缺少一个自研的版本更新系统，  
<b>NOT ANYMORE!</b>  
至远光辉软件更新系统（简称 “至新”）开发组的成员

## 如何使用
至新（Z-SUS）将每一个工程版本记录在每个工程专属的`.json`文件内，格式如下（示例）：
```jsonc
{
  "latest": 1, // 最新构建号，每次上传时自动更新
  "data": {
    "downloadBase": "https://www.example.com", 
    // URL，下载站点域名
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
```