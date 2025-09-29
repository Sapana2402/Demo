import { Button, Text, View } from 'react-native';
import {
  CustomerSheet,
  CustomerSheetError,
  StripeProvider,
} from '@stripe/stripe-react-native';
import { useEffect, useState } from 'react';

function PaymentMethods() {
  const publishableKey =
    'pk_test_51S7uuS32aZu1pTaDaQMaLmA3tyqZtCIwg89D1MomoXjemESEVCojlDpTqYvAvRTAOYZtm8GWZopdg1yqTyfdeWzC00sde85M9N';
//   useEffect(() => {
//     console.log('log 1');
//     const initPayment = async () => {
//       console.log('log 2');

//       const reuult = await CustomerSheet.initialize({
//         setupIntentClientSecret:
//           'seti_1S8FJv32aZu1pTaD6AB9ByMZ_secret_T4O6IBSJuADPu2mNRXxZ0PReeM9WyVw',
//         customerEphemeralKeySecret:
//           'ek_test_YWNjdF8xUzd1dVMzMmFadTFwVGFELG1teDBjRGhQazV3SVBsbkVjRERHNFZLTHgxVFVySlQ_00Aay7EJ7Y',
//         customerId: 'cus_T4NxKavyRxox5P',
//         headerTextForSelectionScreen: 'Manage your payment method',
//         returnURL: 'my-return-url://',
//       });
//       console.log('log 3result===', reuult);
//     };
//     initPayment();
//   }, []);

useEffect(() => {
  console.log('log 1');
  const initPayment = async () => {
    console.log('log 2');
    try {
      const result = await CustomerSheet.initialize({
        setupIntentClientSecret:
          'seti_1S8FJv32aZu1pTaD6AB9ByMZ_secret_T4O6IBSJuADPu2mNRXxZ0PReeM9WyVw',
        customerEphemeralKeySecret:
          'ek_test_YWNjdF8xUzd1dVMzMmFadTFwVGFELHdtUGhkN3JWQVlnSFpuUkk4T1laeGMxeFY2VW1SeDc_00Lis7KK7I',
        customerId: 'cus_T4NxKavyRxox5P',
        headerTextForSelectionScreen: 'Manage your payment method',
        returnURL: 'my-return-url://',
      });
      console.log('log 3 result ===', result);
    } catch (err) {
      console.log('initPayment failed:', err);
    }
  };
  initPayment();
}, []);


  const openSheet = async () => {
    console.log('inside opensheet log 4');

    const { error, paymentOption, paymentMethod } =
      await CustomerSheet.present();
    console.log('inside sheet log');

    if (error) {
      if (error.code === CustomerSheetError.Canceled) {
        console.log('user dismiised');

        // user dismissed
      } else {
        console.error('Error showing CustomerSheet:', error);
      }
      return;
    }

    if (paymentOption) {
      console.log('Selected payment option:', paymentOption);
    }
    if (paymentMethod) {
      console.log('Selected payment method details:', paymentMethod);
    }
  };
  return (
    <StripeProvider publishableKey={publishableKey}>
      <Button
        title="Manage payment methods"
        onPress={() => {
          openSheet();
        }}
      />
   </StripeProvider>
  );
}

export default PaymentMethods;
