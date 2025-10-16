import React, { useState, useEffect } from 'react';
import { View, Button, Text, PermissionsAndroid, Platform, Alert } from 'react-native';
import AudioRecord from 'react-native-audio-record';
import Sound from 'react-native-sound';

const requestAndroidPermissions = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      {
        title: 'Microphone Permission',
        message: 'App needs access to your microphone to record audio.',
        buttonPositive: 'OK',
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn(err);
    return false;
  }
};

const AudioRecorderPlayerDemo = () => {
  const [recording, setRecording] = useState(false);
  const [recordedFile, setRecordedFile] = useState('');
  const [sound, setSound] = useState(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const options = {
      sampleRate: 16000,
      channels: 1,
      bitsPerSample: 16,
      audioSource: 6, // VOICE_RECOGNITION on Android
      wavFile: 'test.wav',
    };
    AudioRecord.init(options);
  }, []);

  const startRecording = async () => {
    if (Platform.OS === 'android') {
      const hasPermission = await requestAndroidPermissions();
      if (!hasPermission) {
        Alert.alert('Permission required', 'Cannot record without microphone permission');
        return;
      }
    }
    setRecordedFile('');
    setRecording(true);
    AudioRecord.start();
  };

  const stopRecording = async () => {
    if (!recording) return;
    let audioFile = await AudioRecord.stop();
    setRecording(false);
    setRecordedFile(audioFile);
  };

  const playAudio = () => {
    if (!recordedFile) return;
    if (sound) {
      sound.release();
      setSound(null);
      setPlaying(false);
    }
    const newSound = new Sound(recordedFile, '', (error) => {
      if (error) {
        console.log('Failed to load the sound', error);
        return;
      }
      newSound.play((success) => {
        if (success) {
          setPlaying(false);
          newSound.release();
        } else {
          console.log('Playback failed due to audio decoding errors');
          setPlaying(false);
          newSound.release();
        }
      });
      setPlaying(true);
    });
    setSound(newSound);
  };

  const pauseAudio = () => {
    if (sound && playing) {
      sound.pause();
      setPlaying(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 20, textAlign: 'center' }}>
        Audio Recorder and Player Demo
      </Text>

      <Button
        title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={recording ? stopRecording : startRecording}
      />

      <View style={{ marginVertical: 20 }}>
        <Button
          title="Play Recorded Audio"
          onPress={playAudio}
          disabled={!recordedFile || recording}
        />
      </View>

      <Button title="Pause Audio" onPress={pauseAudio} disabled={!playing} />

      <View style={{ marginTop: 20 }}>
        <Text>Recorded file path:</Text>
        <Text style={{ fontSize: 12, color: 'gray' }}>{recordedFile || 'No recording yet'}</Text>
      </View>
    </View>
  );
};

export default AudioRecorderPlayerDemo;
