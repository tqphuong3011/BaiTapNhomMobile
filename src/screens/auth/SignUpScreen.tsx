/* eslint-disable react-native/no-inline-styles */
// import {Image, Switch} from 'react-native';
import {Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  TextComponent,
  SpaceComponent,
  ButtonComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  ContainerComponent,
} from '../../components';
import {appColors} from '../../constants/appColors';
import {Lock, Sms, User} from 'iconsax-react-native';
import { Validate } from '../../utils/validate';

const SignUpScreen = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(2); // 1: Input info, 2: Verify OTP
  const [isDisable, setIsDisable] = useState(true);

  useEffect(() => {
    const emailValidation = Validate.email(email);
    const passwordMatch = password === confirmPassword;

    if (step === 1) {
      if (!email || !password || !confirmPassword || !fullName || !emailValidation || !passwordMatch) {
        setIsDisable(true);
      } else {
        setIsDisable(false);
      }
    } else if (step === 2) {
      if (!otp || otp.length !== 6) {
        setIsDisable(true);
      } else {
        setIsDisable(false);
      }
    }
  }, [email, password, confirmPassword, fullName, otp, step]);

  const handleSignUp = async () => {
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
        <TextComponent size={24} title text={step === 1 ? 'Sign up' : 'Verify OTP'} />
        <SpaceComponent height={21} />
        {step === 1 ? (
          <>
               <InputComponent
               value={fullName}
               placeholder="Full Name"
               onChange={val => setFullName(val)}
               allowClear
               affix={<User size={22} color={appColors.gray} />}
               />
               <InputComponent
               value={email}
               placeholder="Email"
               onChange={val => setEmail(val)}
               allowClear
               affix={<Sms size={22} color={appColors.gray} />}
               />
               <InputComponent
               value={password}
               placeholder="Password"
               onChange={val => setPassword(val)}
               isPassword
               allowClear
               affix={<Lock size={22} color={appColors.gray} />}
               />
               <InputComponent
               value={confirmPassword}
               placeholder="Confirm Password"
               onChange={val => setConfirmPassword(val)}
               isPassword
               allowClear
               affix={<Lock size={22} color={appColors.gray} />}
               />
               <SectionComponent>
                    <RowComponent justify="center">
                         <TextComponent text="Already have an account? "/>
                         <ButtonComponent
                         type="link"
                         text="Sign in"
                         onPress={() => navigation.navigate('LoginScreen')}
                         />
                    </RowComponent>
               </SectionComponent>
          </>
        ) : (
          // keyboardType="numeric"
          //   maxLength={6}
          <>
               <TextComponent size={14} text={`Had send OTP to ${email}`} />
               <SpaceComponent height={21} />
               <InputComponent
                 value={otp}
                 type="numeric"
                 placeholder="Enter OTP sent to your email"
                 onChange={val => setOtp(val)}
               />
          </>
        )}
      </SectionComponent>
      <SpaceComponent height={16}/>
      <SectionComponent>
        <ButtonComponent
          disable={isDisable}
          onPress={handleSignUp}
          text={step === 1 ? 'SIGN UP' : 'VERIFY OTP'}
          type="primary"
        />
      </SectionComponent>

    </ContainerComponent>
  );
};

export default SignUpScreen;
