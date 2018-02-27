# Factory

環境：

1. ubuntu16.04
2. mongodb v2.6.10 +
3. MQTT mosquitto

設定檔修改：

/ET7044/config.json

```js
{
"ET7044" : "ET7044_IP",
"MQTT" : "mosquitto_IP"
}
```

/PM3133/config.json

```js
{
"PM3133" : "/dev/ttyS0",
"MQTT" : "mosquitto_IP"
}
```

/mongoServer/config.json

```js
{
"MongoDB" : "MongoDB_IP",
"MQTT" : "mosquitto_IP"
}
```

/webServer/config/config.js

```js
var data = {
"socket_ip" : "socket_server_ip"
};
```

/webServer/config/config.json

```js
{
"MongoDB" : "MongoDB_IP",
"MQTT" : "mosquitto_IP"
}
```

開啟服務：

```
切換目錄
$ cd /factory

安裝套件
$ npm install

更改權限
$ sudo chmod 777 /dev/ttyS0

啟動服務
$ npm start
```
