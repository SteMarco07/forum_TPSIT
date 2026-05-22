'use client';
import React from 'react';
import { View, TextInput, StyleProp, ViewStyle, TextStyle } from 'react-native';

type BaseProps = React.ComponentProps<typeof TextInput> & {
  className?: string;
  style?: StyleProp<ViewStyle> | undefined;
};

const defaultInputStyle = { paddingVertical: 10, paddingHorizontal: 12, borderWidth: 1, borderColor: '#ddd', borderRadius: 8 } as TextStyle;

const Input = React.forwardRef<any, BaseProps>(function Input({ children, style, ...props }, ref) {
  // If a child element is provided (e.g. <InputField />), clone it and pass props (but not ref)
  if (React.isValidElement(children)) {
    return (
      <View style={[{ width: '100%' }, style as any]}>
        {React.cloneElement(children as React.ReactElement, { ...props })}
      </View>
    );
  }

  return (
    <View style={[{ width: '100%' }, style as any]}>
      <TextInput ref={ref} {...props} style={[defaultInputStyle, style as TextStyle]} />
    </View>
  );
});

const InputField = React.forwardRef<any, BaseProps>(function InputField(props, ref) {
  const combinedStyle = Array.isArray(props.style) ? [{ paddingVertical: 10, paddingHorizontal: 12, borderWidth: 1, borderColor: 'transparent', borderRadius: 8 }, ...props.style as any] : [{ paddingVertical: 10, paddingHorizontal: 12, borderWidth: 1, borderColor: 'transparent', borderRadius: 8 }, props.style as any];
  return <TextInput ref={ref} {...props} style={combinedStyle as any} />;
});

const InputIcon = (_props: any) => null;
const InputSlot = (_props: any) => null;

Input.displayName = 'Input';
InputField.displayName = 'InputField';
InputIcon.displayName = 'InputIcon';
InputSlot.displayName = 'InputSlot';

export { Input, InputField, InputIcon, InputSlot };
