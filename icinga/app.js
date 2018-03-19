const koa = require('koa');
const Router = require('koa-router');
const mqtt = require('mqtt');
const mqttConfig = require('./config.json');

const app = koa();
const router = new Router();
const mqttClient = mqtt.connect(mqttConfig.MQTT);

var DL303_co2="",DL303_humi="",DL303_temp="",DL303_dewp="";
var ET7044_status="";
var PM3133_A_Json="",PM3133_B_Json="",PM3133_C_Json="";

mqttClient.on('connect', function () {
    console.log('mqtt connect');
    mqttClient.subscribe('DL303/#')
    mqttClient.subscribe('ET7044/#')
    mqttClient.subscribe('PM3133/#')
});

mqttClient.on('message', function (topic, message) {
    //console.log(topic);
    switch (topic) {
        case 'DL303/CO2':
            DL303_co2 = message.toString();
            break;
        //溼度測量
        case 'DL303/RH':
            DL303_humi = message.toString();
            break;
        //溫度測量
        case 'DL303/TC':
            DL303_temp = message.toString();
            break;
        //露點溫度
        case 'DL303/DC':
            DL303_dewp = message.toString();
            break;
        case 'ET7044/write':
            ET7044_status = message.toString();
            break;
        case 'PM3133/A':
            // {"V_a": new Number(ans[0]/100).toFixed(3),
            //  "I_a": new Number(ans[1]).toFixed(3),
            //  "kW_a": new Number(ans[2]).toFixed(3),
            //  "kvar_a": new Number(ans[3]).toFixed(3),
            //  "kVA_a": new Number(ans[4]).toFixed(3)}
            PM3133_A_Json = message.toString();
            break;
        case 'PM3133/B':
            PM3133_B_Json = message.toString();
            break;
        case 'PM3133/C':
            PM3133_C_Json = message.toString();
            break;

    }
    topic = ""; //目前topic歸零
})

router.get('/',function * (){
  this.body = {
    "DL303_co2":DL303_co2,
    "DL303_humi":DL303_humi,
    "DL303_temp":DL303_temp,
    "DL303_dewp":DL303_dewp,
    "ET7044_status":ET7044_status,
    "PM3133_A_Json":PM3133_A_Json,
    "PM3133_B_Json"PM3133_B_Json,
    "PM3133_C_Json":PM3133_C_Json
  }
});

app.listen(3001,function(){
  console.log('listening port on 3001');
});
