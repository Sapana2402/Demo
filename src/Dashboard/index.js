import {
  Alert,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import notifee, {
  AndroidCategory,
  AndroidImportance,
  AndroidVisibility,
} from '@notifee/react-native';
import NotificationSetUp from '../Utilities/NotificationSetUp';
import { PermissionsAndroid } from 'react-native';
import { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';

//Notifiee demo of local notification
const notificationService = new NotificationSetUp();

const handleOnDisplayNotification = async (title, body) => {
  const permission = await notifee.requestPermission();
  console.log('permisson===', permission);

  if (permission) {
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
      visibility: AndroidVisibility.PUBLIC,
    });

    await notifee.displayNotification({
      title: title,
      body: body,

      android: {
        channelId: channelId,
        category: AndroidCategory.CALL,
        importance: AndroidImportance.HIGH,
        // asForegroundService: true,
        pressAction: {
          id: 'default',
        },
      },
      ios: {
        sound: true,
      },
    });
  }
};

const handleLocalNotification = () => {
  const date = new Date(Date.now() + 5 * 1000);
  console.log('const date = new Date(Date.now() + 5 * 1000);', date);

  notificationService.scedualNotification(date);
};

const handleRemotNotification = () => {};

const FloatingButton = ({ text, onPress }) => {
  return (
    <Pressable style={style.btnContainer} onPress={onPress}>
      <Text style={style.textStyle}>{text}</Text>
    </Pressable>
  );
};
// const requestPermission = async () => {
//   try {
//     let permission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
//     console.log("permission",permission,PermissionsAndroid.RESULTS.GRANTED);

//     if(permission === PermissionsAndroid.RESULTS.GRANTED){
//       Alert.alert('granted')
//     }else{
//       Alert.alert('Not Ganted')
//     }
//   } catch (error) {
//     console.log("Error====",error);

//   }
// }

const requestPermission = async () => {
  try {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      const permission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );

      console.log('Notification permission result:', permission);

      if (permission === PermissionsAndroid.RESULTS.GRANTED) {
        getToken();
        Alert.alert('Permission Granted');
      } else if (permission === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        Alert.alert(
          'Permission Blocked',
          'You have disabled notification permission. Please enable it from Settings.',
        );
      } else {
        Alert.alert('Permission Not Granted');
      }
    } else {
      getToken();

      console.log('No runtime notification permission needed');
    }
  } catch (error) {
    console.log('Error====', error);
  }
};

const getToken = async () => {
  await messaging().registerDeviceForRemoteMessages();
  const token = await messaging().getToken();
  console.log('token', token);
};
function Dashboard() {
  useEffect(() => {
    requestPermission();
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('📩 Foreground message:', remoteMessage);

      Alert.alert('New FCM Message!', JSON.stringify(remoteMessage));

      // Optional: show notification manually
      // await notifee.displayNotification({
      //   title: remoteMessage?.notification?.title || 'New Message',
      //   body: remoteMessage?.notification?.body || 'You got a new message!',
      //   android: {
      //     channelId: 'default',
      //     importance: AndroidImportance.HIGH,
      //     visibility: AndroidVisibility.PUBLIC,
      //   },
      // });
      console.log("remoteMessage",remoteMessage);
      
      if (remoteMessage) {
        handleOnDisplayNotification(
          remoteMessage?.notification?.title || 'New Message',
          remoteMessage?.notification?.body || 'You got a new message!',
        );
      }
    });

    return unsubscribe;
  }, []);

  return (
    <View style={style.mainContainer}>
      <FloatingButton
        text="Type 1"
        onPress={handleOnDisplayNotification(
          'New Message',
          'You got a new message!',
        )}
      />
      <FloatingButton text="Type 2" onPress={handleLocalNotification} />
      <FloatingButton text="Type 3" onPress={handleRemotNotification} />
    </View>
  );
}

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  btnContainer: {
    backgroundColor: '#7ec8e3',
    paddingVertical: 10,
    marginHorizontal: 16,
    marginVertical: 10,
    borderRadius: 10,
  },
  textStyle: {
    textAlign: 'center',
  },
});
export default Dashboard;
