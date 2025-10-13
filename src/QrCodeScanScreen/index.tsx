import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Alert,
} from 'react-native';
import { Camera } from 'react-native-camera-kit';

const QrCodeScanScreen = () => {
  const [qrCode, setQrCode] = useState(null);
  const [cameraPermission, setCameraPermission] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'android') {
      requestCameraPermission();
    } else {
      setCameraPermission(true);
    }
  }, []);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'We need camera access to scan QR codes',
          buttonPositive: 'OK',
        },
      );
      setCameraPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
    } catch (err) {
      console.warn(err);
    }
  };

  if (!cameraPermission) {
    return (
      <View style={styles.center}>
        <Text>No access to camera</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera
        scanBarcode={true}
        style={{ flex: 1 }}
        onReadCode={event => {
          const qrValue = event.nativeEvent.codeStringValue;
          Alert.alert('QR Code Found', qrValue);
        }}
        showFrame={true} // (default false) optional, show frame with transparent layer (qr code or barcode will be read on this area ONLY), start animation for scanner, that stops when a code has been found. Frame always at center of the screen
        laserColor="red" // (default red) optional, color of laser in scanner frame
        frameColor="white" // (default white) optional, color of border of scanner frame
      />
      {qrCode && (
        <View style={styles.result}>
          <Text>Scanned QR Code: {qrCode}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  result: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
  },
});

export default QrCodeScanScreen;
