import React,{createRef, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  Dimensions,
  SafeAreaView
} from 'react-native';
import AnySizeDragSortableView from './AnySizeDragSortableView'
import * as WebBrowser from 'expo-web-browser';

var chaple = 9;
var balance = "$623.71"
var Menu = "Grilled Chicken Caesar Wrap        Italian Lasagna"
var active = false;
const {width} = Dimensions.get('window')
const headerViewHeight = 160
const bottomViewHeight = 40

const getW = (index, isWidth) => isWidth ? index % 3 === 0 ? (width - 40) : (width - 60) / 2 : 80;
// const getW = (index, isWidth) => 120 + Math.floor((Math.random() - 0.5) * 100);
// const getW = (index, isWidth) => 150;
 const iconsize = ((width * .75912488759)/4)
 const widgetsizeS =((width * .4270072992))
 const widgetsizeM = ((width * .669))
 const widgetsizeL = ((width * .9002))

 const currDate= Date.now()
 const dt = new Date(currDate)
 var day = ["Monday","Tuesday", "Weunsday", "Thursday", "Friday", "Saterday", "Sunday"]
 var month = ["January","February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
function trigger(){
    active = false;
    return null;
}
function triggerOff(){
  active = false;
  return null;
}
export default class Widget extends React.Component {
  constructor(props) {
    super(props);
    const items =  [
    {"color":"#5eaef9","type":"app","key": "1", "height": iconsize, icon: require('../assets/img/phone.png'), "text": " ", "width": iconsize,"title":"Resource", "link":" ","page":" "},
    {"color":"#5eaef9","type":"app","key": "2","height": iconsize, icon: require('../assets/img/laptop.png'), "text": " ", "width": iconsize,"title":"Resource", "link":" ","page":" "},
    {"color":"#5eaef9","type":"app","key": "3","height": iconsize, icon: require('../assets/img/gavel.png'), "text": " ", "width": iconsize,"title":"Resource", "link":" ","page":" "},
    {"color":"#5eaef9","type":"app","key": "4","height": iconsize, icon: require('../assets/img/dollar.png'), "text": " ", "width": iconsize,"title":"Resource", "link":" ","page":" "}, 
    {"color":"#D8D02F","type":"widget1","key": "5","height": widgetsizeS,"width": widgetsizeS,"title":"ID Card Balance", "link":"", "link":" ","page":" "}, 
    {"color":"#4552C9","type":"widget2","key": "6","height": widgetsizeS,"width": widgetsizeS,"title":"Chapel Attendance", "link":"", "link":" ","page":" "},
    {"color":"#53AE4B","type":"widget3","key": "7","height":widgetsizeS,"width": widgetsizeL ,"title":"Lottie Menu", "link":" ","page":" "},
    {"color":"#5eaef9","type":"app","key": "8","height": iconsize, icon: require('../assets/img/book.png'), "text": " ", "width": iconsize,"title":"Resource", "link":" ","page":" "},
    {"color":"#5eaef9","type":"app","key": "9","height": iconsize, icon: require('../assets/img/target.png'), "text": " ", "width": iconsize,"title":"Resource", "link":" ","page":" "},
    {"color":"#5eaef9","type":"app","key": "10","height": iconsize, icon: require('../assets/img/health.png'), "text": " ", "width": iconsize,"title":"Resource", "link":" ","page":" "},
    {"color":"#5eaef9","type":"app","key": "11","height": iconsize, icon: require('../assets/img/calander.png'), "text": " ", "width": iconsize,"title":"Resource", "link":" ","page":" "},
    {"color":"#5eaef9","type":"app","key": "12","height": iconsize, icon: require('../assets/img/people.png'), "text": " ", "width": iconsize,"title":"Resource", "link":" ","page":" "},
    {"color":"#5eaef9","type":"app","key": "13","height": iconsize, icon: require('../assets/img/food.png'), "text": " ", "width": iconsize,"title":"Union Cafe", "link":"https://union.messiah.edu/menu/","page":" "},
    {"color":"#5eaef9","type":"app","key": "14","height": iconsize, icon: require('../assets/img/food.png'), "text": " ", "width": iconsize,"title":"The Falcon", "link":"http://falcon.messiah.edu/","page":" "},
    {"color":"none","type":"null","key": "15","height": iconsize, "text": " ", "width": widgetsizeL,"title":" ", "link":" ","page":" "}];

    this.state = { 
        items,
        movedKey: null
    };

    this.sortableViewRef = createRef()
  }

 onDeleteItem = (item, index) => {
    const items = [...this.state.items]
    items.splice(index, 1)
    this.setState({ items })
  }

  _renderItem = (item, index, isMoved) => {

    const {movedKey} = this.state
    return (
      <TouchableOpacity
        onPress={() => {
           
          if(item.link != " "){
            WebBrowser.openBrowserAsync(item.link);
          }
          }}
        onLongPress={() => {
            trigger();
            this.setState({movedKey: item.key})
            this.sortableViewRef.current.startTouch(item, index)
        }}
        onPressOut = {() => this.sortableViewRef.current.onPressOut()}
      >
       
      {(() => {
        
        // each if statement can be used for a widget
        if (active == true){
            return(
              
              <View style={styles.item_clear_wrap}>
              <TouchableOpacity onPress={() => this.onDeleteItem(item, index)}>
                  <Image source={require('../assets/img/clear.png')} style={styles.item_clear}/>
              </TouchableOpacity>
              </View>
              
            )  
        }
        if (active == false){
          return(
          
            <View style={styles.item_none_wrap}>
            </View>
          
          )
        }
      })()}   
        <View style={[styles.item_wrap, {opacity: (movedKey === item.key && !isMoved) ? 1 : 1}]}>
            
            <View style={[styles.item, {width: item.width, height: item.height, backgroundColor: isMoved ? 'red' : item.color}]}>
            <View style={styles.item_icon}>
                  <Image source={item.icon} style={styles.item_icon}/>     
            </View>
              <Text style={styles.item_title}>{item.title}</Text>
            <View>
            </View>
            {(() => {
              // each if statement can be used for a widget
              if (item.type == "widget1"){
                  return (
                    <View>
                      <View>
                        <Text style={{color:'white',textAlign: 'center',width: widgetsizeS * .90, height: widgetsizeS, resizeMode: 'contain'}}>
                          <Text>{"Chapel Attendance"}{"\n"}</Text> 
                          <Text style={{fontSize:100,fontWeight:'bold'}}>{chaple}{"\n"}</Text>
                          <Text>{"/14"}</Text>
                        </Text>  
                      </View>
                    </View>  
                  )
              }
              if (item.type == "widget2"){
                  return (
                      <View>
                      <Text style={{color:'white',textAlign: 'center',width: widgetsizeS * .90, height: widgetsizeS, resizeMode: 'contain'}}>
                          <Text>{"ID Card Balance"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}</Text>
                          
                          <Text style={{fontSize:40,fontWeight:'bold'}}>{balance}</Text>
                        </Text>  
                      </View>
                  )
              }
              if (item.type == "widget3"){
                
                return (
                  <View>
                    <View>
                      <Text style={{color:'white',width: widgetsizeL-60, height: widgetsizeS-10, resizeMode: 'contain'}}>
                        <Text>{"Lotties Menu"}{"\n"}{"\n"}{"\n"}</Text> 
                        <Text style={{fontSize:20,fontWeight:'bold'}}>{Menu}{"\n"}{"\n"}</Text>
                        <Text>{"Lunch"}</Text>
                      </Text>  
                    </View>
                  </View>  
                )
              }
              return null;
            })()} 
            
            
                
            </View>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    const { items } = this.state;
    return (
      <SafeAreaView style={{flex:1 }}>
        <AnySizeDragSortableView
            ref={this.sortableViewRef}
            dataSource={items}
            keyExtractor={(item) => item.key}
            renderItem={this._renderItem}
            onDataChange={(data, callback)=> {
                this.setState({items: data},()=>{
                    callback()
                })
            }}
           
            headerViewHeight={headerViewHeight}
            bottomViewHeight={bottomViewHeight}
            movedWrapStyle={styles.item_moved}
            onDragEnd={()=>{
                this.setState({
                    movedKey: null
                })
            }}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  item_wrap: {
    position: 'relative',
    paddingLeft: 20,
    paddingTop: 20
  },
  item: {
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f39c12',
    borderRadius: 16,
  },
  item_title:{
    position: 'absolute',
    color:'white',
    bottom: -18,
    fontWeight:'bold',
    zIndex: 999
  },
  item_clear_wrap: {
    position: 'absolute',
    left: 10,
    top: 10,
    width: 20,
    height: 20,
    zIndex: 999
  },
  item_none_wrap: {
    position: 'absolute',
    left: 10,
    top: 10,
    width: 20,
    height: 20,
    zIndex: 999
  },
  item_clear: {
    width: 20,
    height: 20
  },
  item_moved: {
    opacity: 0.95,
    borderRadius: 4,
  },
  item_icon_swipe: {
      width: 50,
      height: 50,
      backgroundColor: '#fff',
      borderRadius: 50 * 0.5,
      justifyContent: 'center',
      alignItems: 'center',
  },
  item_icon: {
    width: 30,
    height: 30,
    bottom:-6,
    resizeMode: 'contain',
  },
  
  item_text_swipe: {
      backgroundColor: '#00FF00',
      width: 56,
      height: 30,
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
  },
  item_text: {
      color: '#444',
      fontSize: 20,
      fontWeight: 'bold',
  },
  header: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#2ecc71',
    borderBottomWidth: 2,
},
header_title: {
    color: '#333',
    fontSize: 24,
    fontWeight: 'bold'
},
  aheader: {
    height: 65,
    flexDirection: 'row',
    paddingTop:15,
    
    borderBottomColor: '#2ecc71',
    borderBottomWidth: 2,
    zIndex: 100,
    backgroundColor: '#fff'
},
aheader_img: {
    width: headerViewHeight * 0.2,
    height: headerViewHeight * 0.2,
    resizeMode: 'cover',
    marginHorizontal: 40,
    marginTop: 10,
},
aheader_logo: {
  width: headerViewHeight * 0.8,
  height: headerViewHeight * 0.2,
  resizeMode: 'cover',
  marginHorizontal: 33,
  marginTop: 10,
},

aheader_context: {
    marginLeft: 8,
    height: headerViewHeight * 0.4,
    marginTop: 10
},
aheader_title: {
    color: '#333',
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold'
},
aheader_desc: {
    color: '#444',
    fontSize: 16,
    width: width - headerViewHeight * 0.6 - 32
},
abottom: {
    justifyContent: 'center',
    alignItems: 'center',
    height: bottomViewHeight,
    backgroundColor: '#fff',
    zIndex: 100,
    borderTopColor: '#2ecc71',
    borderTopWidth: 2,
},
abottom_desc: {
    color: '#333',
    fontSize: 20,
    fontWeight: 'bold'
}
});
