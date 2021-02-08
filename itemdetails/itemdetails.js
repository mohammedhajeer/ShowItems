import React from 'react'
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export default function itemdetails({navigation}) {
    const title = navigation.getParam('title')
    const poster = navigation.getParam('poster')
    const location = navigation.getParam('location')
    const price = navigation.getParam('price')
    const date = navigation.getParam('date')
    const description = navigation.getParam('description')
   
    return (
        <View style={{flex: 1, backgroundColor:'red'}}>

           <Image
            source= {{uri: poster}}
            style={[StyleSheet.absoluteFillObject]}
            />

            <View
            style={[
                StyleSheet.absoluteFillObject,
                {backgroundColor: '#000', opacity: 0.3},
            ]}
            />

            <Icon
                    name='close'
                    size={25}
                    color='black'
                    style={{ marginRight: '20%' }}
                    onPress={()=> {navigation.goBack();
                    }}
                  />
 
           <View 
           style={[
               StyleSheet.absoluteFillObject,
               {
                   backgroundColor: '#fff',
                   marginTop: '100%',
                   padding: 20,
                   borderTopLeftRadius: 20,
                   borderTopRightRadius: 20,
               },
           ]}
           >
            <Text style={{ fontWeight: '900', fontSize: 21, color:'#2196F3', marginLeft: '80%',}}>Edit</Text>
           <ScrollView>
            <Text style={{fontWeight: '900', fontSize: 28}}>Title:  {title}</Text>
            <Text style={{fontWeight: '900', fontSize: 21}}>Location:  {location}</Text>
            <Text style={{fontWeight: '500', fontSize: 21}}>Date:  {date}</Text>
            <Text style={{fontWeight: '500', fontSize: 21}}>Price:  {price}</Text>
            <Text style={{fontWeight: '500', fontSize: 16}}>Description:  {description}</Text>
           </ScrollView>

          </View>

        </View>

    )
}


itemdetails.navigationOptions = () => {
  return {
    header: () => false,
  };
};

const styles = StyleSheet.create({

     tinyLogo: {
    flex:1
  },
})