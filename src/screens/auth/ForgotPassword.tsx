/* eslint-disable react-native/no-inline-styles */
import {Image, StyleSheet, TextInput} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {
  TextComponent,
  SpaceComponent,
  ButtonComponent,
  InputComponent,
  SectionComponent,
  ContainerComponent,
  RowComponent,
} from '../../components';
import {appColors} from '../../constants/appColors';
import {Sms} from 'iconsax-react-native';
import { Validate } from '../../utils/validate';
import { fontFamilies } from '../../constants/fontFamilies';

const ForgotPassword = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  // const [otp, setOtp] = useState('');
  // const [codeValues, setCodeValues] = useState<string[]>([]);
  const [otpValue, setOtpValue] = useState<string[]>([]);
  const [step, setStep] = useState(1); // 1: Input info, 2: Verify OTP
  const [isDisable, setIsDisable] = useState(true);

  useEffect(() => {
    const emailValidation = Validate.email(email);

    if (step === 1) {
      if (!email || !emailValidation) {
        setIsDisable(true);
      } else {
        setIsDisable(false);
      }
    } else if (step === 2) {
      if (!otpValue || otpValue.length !== 4) {
        setIsDisable(true);
      } else {
        setIsDisable(false);
      }
    }
  }, [email, otpValue, step]);

  const handleReset = async () => {
    if (step === 1) {
      try {
        // Call API to send OTP to email
        // await sendOTPToEmail(email);
        setStep(2);
      } catch (error) {
        console.error('Failed to send OTP:', error);
      }
    } else {
      try {
        // Call API to verify OTP and create account
        // await verifyOTPAndCreateAccount({
        //   email,
        //   password,
        //   fullName,
        //   otp
        // });
        navigation.navigate('LoginScreen');
      } catch (error) {
        console.error('Failed to verify OTP:', error);
      }
    }
  };

  const ref1 = useRef<TextInput>(null);
  const ref2 = useRef<TextInput>(null);
  const ref3 = useRef<TextInput>(null);
  const ref4 = useRef<TextInput>(null);

  useEffect(() => {
    ref1.current?.focus();
  }, []);

  const handleChangeCode = (val: string, index: number) => {
    const data = [...otpValue];
    data[index] = val;
    setOtpValue(data);
  };

  return (
    <ContainerComponent isImageBackground isScroll>
      <SectionComponent
        styles={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 75,
        }}>
        <Image
          source={require('../../assets/images/text-logo.png')}
          style={{
            width: 162,
            height: 114,
            marginBottom: 30,
          }}
        />
      </SectionComponent>
      <SectionComponent>
        <TextComponent size={24} title text={step === 1 ? 'Recovery password' : 'Verify OTP'} />
        <SpaceComponent height={21} />
        {step === 1 ? (
          <InputComponent
            value={email}
            placeholder="Email"
            onChange={val => setEmail(val)}
            allowClear
            affix={<Sms size={22} color={appColors.gray} />}
          />
        ) : (
          <>
            <TextComponent size={14} text={`Had send OTP to ${email}`} />
            <SpaceComponent height={21} />
            <RowComponent justify="space-around">
              <TextInput
                ref={ref1}
                value={otpValue[0]}
                keyboardType="number-pad"
                onChangeText={val => {
                  handleChangeCode(val, 0);
                  val.length > 0 && ref2.current?.focus();
                }}
                style={[styles.input]}
                maxLength={1}
                placeholder="-"
              />
              <TextInput
                ref={ref2}
                value={otpValue[1]}
                keyboardType="number-pad"
                onChangeText={val => {
                  handleChangeCode(val, 1);
                  val.length > 0 && ref3.current?.focus();
                }}
                style={[styles.input]}
                maxLength={1}
                placeholder="-"
              />
              <TextInput
                ref={ref3}
                value={otpValue[2]}
                keyboardType="number-pad"
                onChangeText={val => {
                  handleChangeCode(val, 2);
                  val.length > 0 && ref4.current?.focus();
                }}
                style={[styles.input]}
                maxLength={1}
                placeholder="-"
              />
              <TextInput
                ref={ref4}
                value={otpValue[3]}
                keyboardType="number-pad"
                onChangeText={val => {
                  handleChangeCode(val, 3);
                }}
                style={[styles.input]}
                maxLength={1}
                placeholder="-"
              />
            </RowComponent>
          </>
        )}
      </SectionComponent>
      <SpaceComponent height={16}/>
      <SectionComponent>
        <ButtonComponent
          disable={isDisable}
          onPress={handleReset}
          text={step === 1 ? 'RESET' : 'VERIFY OTP'}
          type="primary"
        />
      </SectionComponent>

    </ContainerComponent>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  input: {
    height: 55,
    width: 55,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: appColors.gray2,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 24,
    fontFamily: fontFamilies.bold,
    textAlign: 'center',
  },
});
