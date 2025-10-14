import React, { useState, useRef } from 'react';
import { View, Button, Image, StyleSheet, Alert } from 'react-native';
import Signature from 'react-native-signature-canvas';
import RNFS from 'react-native-fs';

const SignaturePadDemo = () => {
  const [signature, setSignature] = useState(null);
  // reference to Signature component so we can call methods
  const sigRef = useRef(null);

  const handleOK = (sig) => {
    // sig is base64 png: "data:image/png;base64,...."
    console.log("Signature OK:", sig);
    setSignature(sig);
  };

  const handleEmpty = () => {
    console.log("User did not sign");
    Alert.alert("Empty signature", "Please provide a signature first.");
  };

  const handleClear = () => {
    console.log("Cleared!");
    setSignature(null);
  };


  const handleEnd = () => {
    // optionally read signature when user ends drawing
    sigRef.current.readSignature();
  };

  const saveSignature = async () => {
    if (!signature) {
      Alert.alert("No signature to save");
      return;
    }
    // strip header
    const base64Data = signature.replace('data:image/png;base64,', '');
    const path = RNFS.DocumentDirectoryPath + '/signature.png';
    try {
      await RNFS.writeFile(path, base64Data, 'base64');
      Alert.alert("Saved", `Signature saved to ${path}`);
      console.log("saved to", path);
    } catch (err) {
      console.error("Error saving file", err);
      Alert.alert("Error", "Could not save file");
    }
  };

  // custom style to hide default buttons or style them
  const webStyle = `.m-signature-pad--footer
    .button {
      background-color: green; color: white;
    }
  `;

  return (
    <View style={styles.container}>
      <View style={styles.sigContainer}>
        <Signature
          ref={sigRef}
          onOK={handleOK}
          onEmpty={handleEmpty}
          onClear={handleClear}
          onEnd={handleEnd}
          descriptionText="Please sign"
          clearText="Reset"
          confirmText="Save"
          webStyle={webStyle}
          autoClear={false}
          imageType={"image/png"}
        />
      </View>

      {signature ? (
        <Image
          style={styles.preview}
          source={{ uri: signature }}
          resizeMode="contain"
        />
      ) : null}

      <View style={styles.buttonRow}>
        <Button title="Clear" onPress={() => sigRef.current.clearSignature()} />
        <Button title="Save to File" onPress={saveSignature} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
//   sigContainer: { flex: 1, borderColor: '#000', borderWidth: 1 },
  sigContainer: { height:200, borderColor: '#000', borderWidth: 1 },
  preview: { width: '100%', height: 200, marginTop: 10, borderColor: '#aaa', borderWidth:1 },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }
});

export default SignaturePadDemo;
