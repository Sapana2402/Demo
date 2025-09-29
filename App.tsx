/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import {
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
// import SwipeUpFill from './SwipeUpCard';
import SwipeUpWave from './SwipeUpCard';
import Dashboard from './src/Dashboard';
import Authenticate from './src/Auth';
import { useEffect } from 'react';
// import SwipeUpCard from './SwipeUpCard';
import inAppMessaging from '@react-native-firebase/in-app-messaging';
import StripeDemo from './src/StripeDemo';
import GooglePayDemo from './src/StripeDemo/GooglePayDemo';
import PaymentMethods from './src/StripeDemo/PaymentMethods';
import { StripeProvider } from '@stripe/stripe-react-native';
// import QrCodeScannerDemo from './src/QrCodeScannerDemo';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import SkeletonScreen from './src/SkeletonScreen';
import BluetoothScreen from './src/Bluetooth';
// import WatermelonScreen from './src/WatermelonDBExample';
import { DatabaseProvider } from '@nozbe/watermelondb/DatabaseProvider';
import { database } from './src/WatermelonDBExample';
import WatermelonScreen from './src/WatermelonDBExample/WatermelonScreen';
import WebSocketDemo from './src/WebSocketDemo';
import RazorpayScreen from './src/Razorpay';
function App() {
  const isDarkMode = useColorScheme() === 'dark';
  useEffect(() => {
    const initInAppMessaging = async () => {
      // Allow Firebase to show messages
      await inAppMessaging().setMessagesDisplaySuppressed(false);

      // Enable automatic data collection (needed for campaigns)
      await inAppMessaging().setAutomaticDataCollectionEnabled(true);
    };

    initInAppMessaging();
  }, []);

  return (
    //  <GestureHandlerRootView style={styles.container}>
    //   {/* <SwipeUpCard /> */}
    //   {/* <SwipeUpFill /> */}
    //     {/* <SwipeUpWave /> */}
    //     <Authenticate />
    //  </GestureHandlerRootView>
    // <Text>Demo</Text>
    // <Dashboard />
    // <StripeDemo />
    // <GooglePayDemo />
    // <PaymentMethods />
    // <QrCodeScannerDemo />
    //  <SkeletonScreen />
    // <BluetoothScreen />
    // <DatabaseProvider database={database}>
    //   <WatermelonScreen />
    // </DatabaseProvider>

    // <WebSocketDemo />

    <RazorpayScreen />
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <NewAppScreen
        templateFileName="App.tsx"
        safeAreaInsets={safeAreaInsets}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
