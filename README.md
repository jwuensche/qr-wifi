# qr-wifi

This package offers a quick cli to create WiFi network configuration QR codes. Required arguments are the SSID, password, security type and if the SSID is hidden.

## Usage

Available as npx executable package
```
$ npx qr-wifi
```

or just clone

```
$ git clone
$ node index.js
```

## Message Format

Content of the encoded message described in: https://github.com/zxing/zxing/wiki/Barcode-Contents#wi-fi-network-config-android-ios-11
