/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { SplashScreen } from './src/screens';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './src/navigators/AuthNavigator';
import MainNavigator from './src/navigators/MainNavigator';
import { StatusBar } from 'react-native';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

const App = () => {
  //sử dụng useState để lưu thời gian 5 giây
  const [isShowSplash, setIsShowSplash] = useState(true);
  //muốn lưu liền thì dùng store redux toolkit
  const [accessToken, setAccessToken] = useState('');
  //Kiểm tra đăng nhập
  // const {getItem, setItem} = useAsyncStorage('assetToken');
  const {getItem, setItem} = useAsyncStorage('assetToken');

  // console.log(accessToken);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsShowSplash(false);
    }, 5000);
    return () => clearTimeout(timeout);
  }, []);

  //chạy 01 lần thì dùng useEffect không tham số []
  useEffect(() => {
    checkLogin();
  }, []);

  //Khu vực các hàm
  const checkLogin = async () => {
    const token = await getItem();
    // console.log('TOKEN LOG:', token);
    // check token
    // token && setAccessToken(token);
    if (token != null ){
      setAccessToken(token);
    }
    else{
      setAccessToken('');
    }
  };

  //dùng dấu ! để phủ định điều kiện
  //background nằm dưới thanh statusBar
  return <>
    <StatusBar
      barStyle={'dark-content'}
      translucent
      backgroundColor={'transparent'} />
    {
      isShowSplash ? (
        <SplashScreen />
    ) : (
        <NavigationContainer>
          {/* {Kiểm tra token nếu có thì trả về Main không thì trả về Auth} */}
          {accessToken ? <MainNavigator /> : <AuthNavigator/>}
        </NavigationContainer>
    )}
  </>;
};

export default App;
