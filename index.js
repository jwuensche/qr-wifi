#!/usr/bin/env node

var QR = require("qrcode");
var prompt = require("prompt");
var colors = require("colors");

// WIFI:T:WPA;S:mynetwork;P:mypass;;

escape = (content) => {
    return content.replace("\", \\").replace(";", "\;").replace(",", "\,").replace(":", "\:").replace('"', '\"');
}

authCheck = (auth) => {
  return auth==""?"nopass":auth;
}

hiddenCheck = (hidden) => {
  return hidden=="y"?"true":"false"
}

generate = (auth, ssid, pass, hidden) => {
  authFilled = "T:" + auth + ";";
  ssidFilled = "S:" + ssid + ";";
  passFilled = "P:" + pass + ";";
  hiddenFilled = "H:" + hidden + ";";

  QR.toFile("./qr-wifi-code.png", "WIFI:"+ authFilled + ssidFilled + passFilled + ";");
}

prompt.start();
prompt.message = colors.blue("qr-wifi");
prompt.delimiter = ": ";

var schema = {
  properties: {
    ssid: {
      required: true,
      description: "SSID",
      before: escape,
    },
    password: {
      description: "Password",
      hidden: true,
      replace: "*",
      before: escape,
    },
    authentication: {
      description: "Authentication Type(WPA/WEP/nopass)",
      pattern: "^WPA$|^WEP$|^nopass$|^$",
      message: "Please enter WPA or WEP or omit for no password",
      before: authCheck,
    },
    hidden: {
      pattern: "^true$|^false$",
      description: "Hidden network(y/N)",
      message: "Please enter true or false.",
      before: hiddenCheck,
    },
  }
}
prompt.get(schema, (err, result) => {
  if (err) {
    return
  }
  generate(result.authentication, result.ssid, result.password, result.hidden);
  console.log(`Created qr-code for network ${result.ssid}`);
});
