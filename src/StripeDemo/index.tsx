// APi Url: https://api.stripe.com/v1/payment_intents
// amount: 1000, currency: usd
// Inside AUth add key
// In response will get client_secret

// import React, { useState } from 'react';
// import { View, Text, Button, ActivityIndicator, Alert } from 'react-native';
// import {
//   StripeProvider,
//   CardField,
//   useConfirmPayment,
// } from '@stripe/stripe-react-native';

// const PUBLISHABLE_KEY =
//   'pk_test_51S7uuS32aZu1pTaDaQMaLmA3tyqZtCIwg89D1MomoXjemESEVCojlDpTqYvAvRTAOYZtm8GWZopdg1yqTyfdeWzC00sde85M9N';

// export default function SocketScreen() {
//   const [loading, setLoading] = useState(false);
//   const { confirmPayment } = useConfirmPayment();

//   const API_URL = 'https://stripe-mobile-payment.glitch.me';

//   // const fetchPaymentIntentClientSecret = async () => {
//   //   const response = await fetch(`${API_URL}/create-payment-intent`, {
//   //     method: 'POST',
//   //     headers: { 'Content-Type': 'application/json' },
//   //     body: JSON.stringify({ currency: 'usd' }),
//   //   });
//   //   const { clientSecret } = await response.json();
//   //   return clientSecret;
//   // };

//   const handlePayPress = async () => {
//     setLoading(true);
//     try {
//       // const clientSecret = await fetchPaymentIntentClientSecret();
//       const clientSecret = 'pi_3S7wuV32aZu1pTaD0sgwcpDw_secret_p037xki7FryjP2nbsCmn3zx53'
//       console.log('clientSecretclientSecret', clientSecret);

//       const { error, paymentIntent } = await confirmPayment(clientSecret, {
//         paymentMethodType: 'Card',
//         // paymentMethodData: {
//         //   billingDetails: {
//         //     // name: 'Test User',
//         //     // email: 'test@example.com',
//         //     // phone: '9999999999',
//         //     // address: {
//         //     //   city: 'San Francisco',
//         //     //   country: 'US',
//         //     //   line1: '123 Main St',
//         //     //   postalCode: '94111',
//         //     //   state: 'CA',
//         //     // },
//         //   },
//         // },
//       });

//       if (error) {
//         // Alert.alert("Payment failed", error.message);
//         console.log('Payment failed', error.message);
//       } else if (paymentIntent) {
//         console.log('Payment successful', `Status: ${paymentIntent.status}`);
//         // Alert.alert("Payment successful", `Status: ${paymentIntent.status}`);
//       }
//     } catch (err) {
//       // Alert.alert("Error", err.message);
//       console.log('Error===', err);
//     }
//     setLoading(false);
//   };

//   return (
//     <StripeProvider publishableKey={PUBLISHABLE_KEY}>
//       <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
//         <Text style={{ fontSize: 20, marginBottom: 20 }}>
//           Stripe Test Payment
//         </Text>

//         <CardField
//           postalCodeEnabled={true}
//           placeholder={{ number: "4242 4242 4242 4242" }}
//           cardStyle={{
//             backgroundColor: '#FFFFFF',
//             textColor: '#000000',
//           }}
//           style={{ width: '100%', height: 50, marginVertical: 30 }}
//           onCardChange={cardDetails => {
//             console.log('Card details', cardDetails);
//           }}
//         />

//         {loading ? (
//           <ActivityIndicator size="large" />
//         ) : (
//           <Button onPress={handlePayPress} title="Pay Now" />
//         )}
//       </View>
//     </StripeProvider>
//   );
// }

// stripe payment react

import React, { useEffect } from 'react';
import { Button, Pressable, StyleSheet, Text, View } from 'react-native';
import {
  StripeProvider,
  initPaymentSheet,
  presentPaymentSheet,
} from '@stripe/stripe-react-native';
import axios from 'axios';
export default function StripeDemo() {
  const publishableKey =
    'pk_test_51S7uuS32aZu1pTaDaQMaLmA3tyqZtCIwg89D1MomoXjemESEVCojlDpTqYvAvRTAOYZtm8GWZopdg1yqTyfdeWzC00sde85M9N';
  const clientSecret =
    'pi_3S7xIR32aZu1pTaD1flHt0XR_secret_2J85OCKkB6vGJFE4f8kK0MamR'; // from Postman

  const details = {
    amount: '10000',
    currency: 'usd',
    'payment_method_types[]': 'card',
  };

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
      initializePaymentSheet(response.data.client_secret);
    } catch (error) {
      console.log('Error', error);
    }
  };
  useEffect(() => {
    fetchClientSecret();
    // initializePaymentSheet();
  }, []);

  const initializePaymentSheet = async (key: string) => {
    const { error } = await initPaymentSheet({
      merchantDisplayName: 'Demo Store',
      paymentIntentClientSecret: key,
      allowsDelayedPaymentMethods: true,
    });

    if (error) {
      console.log('Init error:', error.message);
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      console.log('Payment failed:', error.message);
    } else {
      console.log('Payment complete!');
    }
  };

  return (
    <StripeProvider publishableKey={publishableKey}>
      <View style={style.mainContainer}>
        <Text style={{ textAlign: 'center' }}>
          Pay bill of {details.amount} in {details.currency}
        </Text>
        <Pressable
          onPress={() => openPaymentSheet()}
          style={style.btn}
        >
          <Text style={style.btnText}>Pay with PaymentSheet</Text>
        </Pressable>
      </View>
    </StripeProvider>
  );
}

const style = StyleSheet.create({
  mainContainer:{
    flex:1,
    justifyContent:'center'
  },
  btn: {
    backgroundColor: 'gray',
    paddingVertical: 10,
    margin:10,
    borderRadius: 10
  },
  btnText:{
    textAlign:'center',
    color:'white'
  }
});
