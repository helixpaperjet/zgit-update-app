请确保在运行此程序前您的运行环境已安装Node.js运行时；
本程序要求占用两个端口：
8088端口（服务端）
另一个自选端口，用来伺服网站HTML CSS JavaScript静态文件

// BEGIN 客户端说明

本程序目前已实现的需求：
+ 读取项目
+ 修改并提交项目
+ 项目密码认证（key.json）

本程序目前未实现的需求：
- 创建新项目（5月1日前实现）
- 回退X个版本（5月1日前实现）

本程序目前在GitHub上存放React Typescript源码，
地址：https://github.com/helixpaperjet/zgit-update-app

如果您需要调试本程序，请在此根目录（./）下输入npm start；
如果您需要build一个production版本，请在此根目录（./）下输入npm run build；

// END 客户端说明

// BEGIN 服务端说明

服务端javascript文件存放在 ./server/ 路径下；
请确保在使用Node.js Runtime运行server.js以启动服务端前，
将本目录内config.json中的 keyMasterFile, dataRoot, publicRoot 项中【...】/server/... 中的【...】更改为当前server文件夹的父目录路径，
e.g. server/ 当前在C:/zgit/apps/zsus/下，则dataRoot项应为"C:/zgit/apps/zsus/server/data/test"

本程序当前仍在测试阶段，因此任何测试用数据都将被保存在 ./server/data/test/ 中

// END 服务端说明