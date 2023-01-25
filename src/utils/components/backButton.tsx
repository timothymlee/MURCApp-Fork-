import React from 'react'
import { StyleSheet, Text, Pressable } from 'react-native'
import { Icon } from "@rneui/themed";

import { normalize } from '../../fileTextsizing';

export default function BackButton(props) {
    return (
        <Pressable style={styles.backButtonContainer} onPress={() => props.props.navigation.goBack()}>
            <Icon name="chevron-back" type="ionicon" size={normalize(28)} color={props.iconColor}></Icon>
            <Text style={{ fontSize: normalize(18), fontWeight: '600', color: props.iconColor }}>Back</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    backButtonContainer: {
        flexDirection: 'row',
        padding: normalize(20),
        alignItems: 'center',
        position: 'absolute',
        top: 0
    },
})
