import axios from 'axios';
import { useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';

function RazorpayScreen() {
  const orderIdAPI = 'https://api.razorpay.com/v1/orders';
  const keyID = 'rzp_test_RNIVjdDe1rHuk8';
  const keySecret = '4EI8Triq5R95pTcJ4haHbmvI';
  const [orderId, setOrderID] = useState();

  const generateOrderID = async () => {
    console.log('presses');
    const response = await axios.post(
      orderIdAPI,
      {
        amount: 50000,
        currency: 'INR',
        receipt: 'receipt#123',
        payment_capture: 0,
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        auth: {
          username: keyID,
          password: keySecret,
        },
      },
    );

    if (response.data.id) {
      setOrderID(response.data.id);
      console.log('generated');
    } else {
      Alert.alert('Isse while generating order ID');
    }
  };
  return (
    <View>
      <Text>Razorpay</Text>
      <TouchableOpacity
        onPress={() => generateOrderID()}
        style={{
          backgroundColor: '#2196F3',
          padding: 10,
          borderRadius: 5,
          margin: 20,
        }}
      >
        <Text style={{ textAlign: 'center' }}>Generate Order Id</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: '#2196F3',
          padding: 10,
          borderRadius: 5,
          margin: 10,
        }}
        onPress={() => {
          var options = {
            description: 'Credits towards consultation',
            image: 'https://i.imgur.com/3g7nmJC.jpg',
            currency: 'INR',
            key: keyID,
            amount: '10000',
            name: 'Acme Corp',
            order_id: orderId,
            prefill: {
              email: 'test@yopmail.com',
              contact: '123456789',
              name: 'Test user',
            },
            theme: { color: '#4e70b7ff' },
          };
          RazorpayCheckout.open(options)
            .then((data: any) => {
              Alert.alert(`Success: ${data.razorpay_payment_id}`);
            })
            .catch((error: any) => {
              Alert.alert(`Error: ${error.code} | ${error.description}`);
            });
          RazorpayCheckout.onExternalWalletSelection()
            .then((data:any) => {
              console.log('Called externa;',data);
            })
            .catch((error:any) => {
              console.log('Called externa; with error',error);
            });
        }}
      >
        <Text style={{ textAlign: 'center' }}>Pay</Text>
      </TouchableOpacity>
    </View>
  );
}

export default RazorpayScreen;
