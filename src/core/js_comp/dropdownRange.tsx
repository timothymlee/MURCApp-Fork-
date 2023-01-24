import React, { useState } from 'react';
  import { StyleSheet, Text, View } from 'react-native';
  import { Dropdown } from 'react-native-element-dropdown';
  import AntDesign from 'react-native-vector-icons/AntDesign';

  const rangeData = [
    { label: 'Past 6', value: '2' },
    { label: 'Past 6 Months', value: '3' },
    { label: 'Past Month', value: '4' },
    { label: 'Past Week', value: '5' },
    { label: 'Today', value: '6' },
  ];
  const accountData = [
    { label: '02182621', value: '2' },
  ];
  const id_num = '02051278'

  const Range = () => {
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(true);

    const renderLabel = () => {
      if (value || isFocus) {
        return (
          <Text style={[styles.label, isFocus && { color: 'blue' }]}>
            RANGE
          </Text>
        );
      }
      return null;
    };

    return (
      <View style={styles.container}>
        {renderLabel()}
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          data={rangeData}
          
          backgroundColor={'rgba(52, 52, 52, 0.8)'}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Past Month' : 'Past Month'}
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={isFocus ? 'blue' : 'black'}
              name="Safety"
              size={20}
            />
          )}
        />
      </View>
    );
  };
  const Account = () => {
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(true);

    const renderLabel = () => {
      if (value || isFocus) {
        return (
          <Text style={[styles.label, isFocus && { color: 'blue' }]}>
            ACCOUNT
          </Text>
        );
      }
      return null;
    };

    return (
      <View style={styles.container}>
        {renderLabel()}
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          data={accountData}
          
          maxHeight={300}
          backgroundColor={'rgba(52, 52, 52, 0.8)'}

          labelField="label"
          valueField="value"
          placeholder={!isFocus ? '02182621' : '02182621'}
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={isFocus ? 'blue' : 'black'}
              name="Safety"
              size={20}
            />
          )}
        />
      </View>
    );
  };

  export {Range, Account};
  

  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      padding: 16,
      width:'49%'
    },
    dropdown: {
      height: 50,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 8,
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });