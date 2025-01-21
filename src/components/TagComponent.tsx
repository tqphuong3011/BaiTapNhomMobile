/* eslint-disable react-native/no-inline-styles */
import React, {ReactNode} from 'react';
import TextComponent from './TextComponent';
import RowComponent from './RowComponent';
import {appColors} from '../constants/appColors';

interface Props {
  icon?: ReactNode;
  title: string;
  isFill?: boolean;
  color?: string;
}

const TagComponent = (props: Props) => {
  const {icon, color, isFill, title} = props;

  return (
    <RowComponent
      styles={{
        backgroundColor: isFill ? color ?? appColors.primary : 'transparent',
        padding: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: color ?? appColors.primary,
      }}>
      {icon && icon}
      {title && (
        <TextComponent
          text={title}
          color={isFill ? appColors.white : color ?? appColors.primary}
          styles={{marginLeft: icon ? 8 : 0}}
        />
      )}
    </RowComponent>
  );
};

export default TagComponent;
