import { Platform } from 'react-native';
import PushNotification, { Importance } from 'react-native-push-notification';

class NotificationSetUp {
  constructor() {
    console.log("inside condtructor========");
    PushNotification.configure({
      onRegister: function (token) {
        console.log('TOKEN:=====', token);
      },

      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: function (notification) {
        console.log('NOTIFICATION:=====', notification);

        // process the notification

        // (required) Called when a remote is received or opened, or local notification is opened
        // notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      popInitialNotification: true,
      // requestPermissions: true,
      requestPermissions: Platform.OS === 'ios',
    });

    PushNotification.createChannel(
      {
        channelId: 'Reminders',
        channelName: 'My channel',
        importance: Importance.HIGH,
      },
      created => console.log(`createChannel returned '${created}'`),
    );
  }

  scedualNotification(date: any) {
    console.log('Inside main function=======');
    // PushNotification.localNotification({
    //   channelId: 'Reminders',
    //   title: 'My Notification Title',
    //   message: 'My Notification Message',
    //   date
    // });

    PushNotification.localNotificationSchedule({
      channelId: 'Reminders',
      title: 'My Notification Title',
      message: 'My Notification Message',
      date,
      allowWhileIdle: true,
    });
  }
}

export default NotificationSetUp;
