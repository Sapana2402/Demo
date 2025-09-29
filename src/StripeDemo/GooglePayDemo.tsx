import { Alert, Text, View } from 'react-native';
import {
  confirmPlatformPayPayment,
  PlatformPay,
  PlatformPayButton,
  StripeProvider,
  usePlatformPay,
} from '@stripe/stripe-react-native';
import { useEffect } from 'react';
import axios from 'axios';

function GooglePayDemo() {
  const { isPlatformPaySupported } = usePlatformPay();
  const publishableKey =
    'pk_test_51S7uuS32aZu1pTaDaQMaLmA3tyqZtCIwg89D1MomoXjemESEVCojlDpTqYvAvRTAOYZtm8GWZopdg1yqTyfdeWzC00sde85M9N';
  const details = {
    amount: '10000',
    currency: 'usd',
    'payment_method_types[]': 'card',
  };
  useEffect(() => {
    console.log('Called useeffect');
    const isPlatformSupportPay = async () => {
      console.log('Called function');

      if (!(await isPlatformPaySupported({ googlePay: { testEnv: true } }))) {
        Alert.alert('Google Pay is not supported.');
        return;
      } else {
        console.log('Suppoted');
      }
    };
    isPlatformSupportPay();
  }, []);

  const fetchClientSecret = async () => {
    try {
      const response = await axios.post(
        'https://api.stripe.com/v1/payment_intents',
        details,
        {
          auth: {
            username:
              '',
            password: '',
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );
      //   initializePaymentSheet(response.data.client_secret);
      console.log("response.data.client_secret;",response.data.client_secret);
      
      return response.data.client_secret;
    } catch (error) {
      console.log('Error', error);
    }
  };

  const pay = async () => {
    const clientSecret = await fetchClientSecret();
    console.log('clientSecret', clientSecret);

    const { error, paymentIntent } = await confirmPlatformPayPayment(
      clientSecret,
      {
        googlePay: {
          testEnv: true,
          merchantName: 'My merchant name',
          merchantCountryCode: 'US',
          currencyCode: 'USD',
          billingAddressConfig: {
            format: PlatformPay.BillingAddressFormat.Full,
            isPhoneNumberRequired: true,
            isRequired: true,
          },
        },
      },
    );

    if (error) {
      Alert.alert(error.code, error.message);
      return;
    }
    Alert.alert('Success', 'The payment was confirmed successfully.');
    console.log(JSON.stringify(paymentIntent, null, 2));
  };
  return (
    <StripeProvider publishableKey={publishableKey}>
      <PlatformPayButton
        type={PlatformPay.ButtonType.Pay}
        onPress={pay}
        style={{
          width: '100%',
          height: 50,
        }}
      />
    </StripeProvider>
  );
}

export default GooglePayDemo;
