import { StyleSheet, View, TouchableOpacity, Text, Dimensions, Pressable } from "react-native";
import React from 'react';
import { Icon } from "@rneui/themed";
import { useNavigation } from '@react-navigation/native';
import { normalize } from '../../fileTextsizing';


let w = Dimensions.get('window').width;
let m = 18;
let s = (w / 4) - (2 * m);

function buttonPressed(destination, guest, isGuest, nav) {

    if (isGuest && !guest) {
        // Button is disabled
        alert("You must log in to use this widget.")
    }
    else {
        nav.navigate(destination);
    }
}

function displayAddButton(widget, widgetList, addWidget) {
    let found = false;

    widgetList.map((currentWidget, i) => {
        // Returns true if you already have added this widget to your home screen
        if (currentWidget.name == widget.name && !found) {
            found = true;
        }
    })
    if (!found) {
        //setSavedWidgets(widgetList.push(widget))
        return (
            // Makes the "add widget" icon if you haven't already added it to your home screen
            <Pressable style={styles.addWidgetContainer} onPress={() => {addWidget(widget); alert("Added " + widget.name + " to Home Screen")}}>
                <Icon style={styles.widgetIcon} name={"add"} size={18} color={'white'}></Icon>
            </Pressable>
        )
    }
}

export default function WidgetDisplay(props) {

    let grayed = '#AAA'
    const navigation = useNavigation();

    let widget = props.widget;
    let guest = widget.guest;
    let name = widget.name;
    let icon = widget.icon;
    let destination = widget.url;
    let color = widget.color;
    let widgetList = props.widgetList;

    let isGuest = true;

    return (
        <View style={styles.resourceButtons}>
            <>
            <View style={{ width: s + 2 * m, height: s + 2.4 * m }}>
                <TouchableOpacity
                    onPress={() => buttonPressed(destination, guest, isGuest, navigation)}
                    style={[
                        styles.widgetButton,
                        {
                            width: s, height: s, backgroundColor: (!guest && isGuest) ? grayed : color,
                            opacity: (!guest && isGuest) ? 0.5 : 1
                        }]}
                        >
                    <Icon style={styles.widgetIcon} name={icon} size={30} type="ionicon" color={'white'}></Icon>
                </TouchableOpacity>
                <Text style={styles.buttonTextStyle}>{name}</Text>
            </View>
                {displayAddButton(widget, widgetList, props.addWidget)}
            </>
        </View>
    )
}

const styles = StyleSheet.create({
    resourceButtons: {
        flexDirection: 'row',
        flexWrap: "wrap",
        position: "relative",
    },
    widgetButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4349D6',
        margin: m,
        marginBottom: m / 3,
        borderRadius: 16,
        shadowColor: 'black',
        shadowOpacity: 0.4,
        shadowRadius: 8,
    },
    buttonTextStyle: {
        color: 'white',
        minWidth: "25%",
        maxWidth: "100%",
        textAlign: "center",
        fontSize: normalize(13),
        fontWeight: "400",
    },
    widgetIcon: {

    },
    addWidgetContainer: {
        position: 'absolute',
        width: 32,
        height: 32,
        backgroundColor: 'black',
        borderRadius: 20,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center'
    }
})


