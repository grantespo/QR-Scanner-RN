# QR-Scanner-RN

This app was created using expo. Expo has a great `BarCodeScanner` component which was used for scanning QR codes.
Conveniantly, Expo also has a great SQLite library `expo-sqlite` which was used for storing qr codes. A `FlatList` component was used for rendering the list of QR Codes.

# Flow

When the user first opens the app, they will see a label that shows when the table is empty.

<img src="https://github.com/grantespo/QR-Scanner-RN/blob/master/flow1.PNG" align="middle" height="500" width="281">

The user can navigate to the `Scanner` tab to scan QR Codes. 
When a QR Code is scanned successfully, a button will appear asking the user if they'd like to scan another one. The scan will fail if there isn't a valid URL associated with the code.


<img src="https://github.com/grantespo/QR-Scanner-RN/blob/master/flow2.PNG" align="middle" height="500" width="281">

After the user successfully scans a few QR Codes, they will be able to see them in the `Home` tab. The table shows the `id` and the `url` of the particular QR Code.

<img src="https://github.com/grantespo/QR-Scanner-RN/blob/master/flow3.PNG" align="middle" height="500" width="281">

Upon clicking an item in the table, the user is navigated to a new screen where a webview opens the url associated with that QR code.

<img src="https://github.com/grantespo/QR-Scanner-RN/blob/master/flow4.PNG" align="middle" height="500" width="281">

Upon clicking the trash can icon, the respective item will be deleted from the table.

<img src="https://github.com/grantespo/QR-Scanner-RN/blob/master/flow5.PNG" align="middle" height="500" width="281">
