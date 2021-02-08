import React, { useState} from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { Card, CardItem, Left, Body, Thumbnail } from "native-base";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView, FlatList } from "react-native";


const DATA = [
  {
    title: 'Jaguar car',
    location: 'Amman, Jordan',
    date: 'Jan 17th, 2021',
    price: '$20 000',
    description: 'Fuel Consumption. (Automatic City)2.0-liter 4-cylinder Turbocharged Gas 247 hp.180 hp @ 5500 rpm.8-speed electronic automatic transmission with Jaguar sequential shift.N / A. ',    
    poster:
      'https://scontent.famm7-1.fna.fbcdn.net/v/t1.0-9/144009362_4001230513273297_7000570002588224469_o.jpg?_nc_cat=111&ccb=2&_nc_sid=730e14&_nc_ohc=HpEPWkYivI4AX-WyF4l&_nc_ht=scontent.famm7-1.fna&oh=e39570e1873750fbda08f6b492441b95&oe=603F26C2',
  },
  {
    title: 'Washing Machine',
    location: 'Amman, Jordan',
    date: 'Jan 11th, 2021',
    price: '$800',
    description: 'Type is samsung size 8Kg year 2021 color white the weight 90Kg Despite a slimline design, its large 8kg capacity lets you quickly wash piles of laundry in a single load - up to 12 bath towels *. So it reduces how frequently you do washing, which saves you time.',
    poster:
      'https://scontent.famm7-1.fna.fbcdn.net/v/t1.0-9/142926461_5013982348643939_7461397503264811583_n.jpg?_nc_cat=100&ccb=2&_nc_sid=8bfeb9&_nc_ohc=mYoery9tlzAAX8NAgOr&_nc_ht=scontent.famm7-1.fna&oh=2b0caefa8dfb817e19dfd5eaa614f4ae&oe=603C298C',
  },
  {
     title: 'Home',
    location: 'Amman, Jordan',
    date: 'Jan 22th, 2021',
    price: '$200 000',
    description: ' Fully detached single family home on serene cul-de-sac, recently remodeled with new lower level addition completed in 2015. Features 2 spacious bedrooms, 2 bathrooms, living room with fireplace & wine bar, dining room, kitchen with Carrera marble & stainless steel appliances, landscaped back yard, deck, garage, large laundry room, and plenty of storage. This sophisticated house is flooded with light and has interesting architectural elements such as parquet hardwood floors, beautiful finishes.',   
    poster:
      'https://www.heritagebuildings.co.nz/uploads/images/2020/home-banner-slider-01.jpg',
  },
  {
    title: 'Refrigerator',
    location: 'Amman, Jordan',
    date: 'Nov 17th, 2020',
    price: '$20 000',
    description: 'Fuel Consumption. (Automatic City)2.0-liter 4-cylinder Turbocharged Gas 247 hp.180 hp @ 5500 rpm.8-speed electronic automatic transmission with Jaguar sequential shift.N / A. ',
    poster:
      'https://images-na.ssl-images-amazon.com/images/I/71O31clz6mL._SX679_.jpg',
  },
  {
     title: 'iphone',
    location: 'Amman, Jordan',
    date: 'Nov 17th, 2020',
    price: '$20 000',
    description: 'Fuel Consumption. (Automatic City)2.0-liter 4-cylinder Turbocharged Gas 247 hp.180 hp @ 5500 rpm.8-speed electronic automatic transmission with Jaguar sequential shift.N / A. ',
    poster:
      'https://scontent.famm10-1.fna.fbcdn.net/v/t1.0-9/145775401_1651139705085737_8952388970239258385_n.jpg?_nc_cat=108&ccb=2&_nc_sid=730e14&_nc_eui2=AeGOs7NxiMA9n01Lq8474Ss3tjbJXdFaAxm2Nsld0VoDGWsKP7cWCZttCAAG44BqIRECDHYltQMl5Wu35BcWxum4&_nc_ohc=iW-FWeH_gwQAX-dVbUb&_nc_ht=scontent.famm10-1.fna&oh=b5b13939f2593b362bc802ee5f460d80&oe=60469697',
  },
  {
    title: 'Fifa game CD for ps',
    location: 'Amman, Jordan',
    date: 'Nov 17th, 2020',
    price: '$20 000',
    description: 'Fuel Consumption. (Automatic City)2.0-liter 4-cylinder Turbocharged Gas 247 hp.180 hp @ 5500 rpm.8-speed electronic automatic transmission with Jaguar sequential shift.N / A.jhgfghjkjhgfghjkjhgfghjhgfghjhghjhghjhghjhghjhghjhgbnjhgbhjuygbhyg ',
    poster:
      'https://scontent.famm10-1.fna.fbcdn.net/v/t1.0-9/130742927_209431840813181_8997243266373772564_n.jpg?_nc_cat=111&ccb=2&_nc_sid=b9115d&_nc_eui2=AeES5o1LV6BOg-CFYhSgZB5FJ_0cgmE9m2wn_RyCYT2bbA08sxLKqPJnJ5QHbX9446lH3jRSdgXcmup1drv1bIuI&_nc_ohc=qf6OrP30a00AX8G7s2N&_nc_ht=scontent.famm10-1.fna&oh=5a7bded08e69cf809e237a1b1aa3d7f6&oe=6046EA12',
  },
  {
    title: 'macbook',
    location: 'Amman, Jordan',
    date: 'Nov 17th, 2020',
    price: '$20 000',
    description: 'Fuel Consumption. (Automatic City)2.0-liter 4-cylinder Turbocharged Gas 247 hp.180 hp @ 5500 rpm.8-speed electronic automatic transmission with Jaguar sequential shift.N / A. ',
    poster:
      'https://scontent.famm10-1.fna.fbcdn.net/v/t1.0-9/146436902_2557810567850382_3087934454602003108_n.jpg?_nc_cat=108&ccb=2&_nc_sid=730e14&_nc_eui2=AeEYSHLLHssaBeqWxD7Ni1pGnRbwEZUuyyCdFvARlS7LIHnN7Wb7aSLH6yJm0gGCQHPHL7gmab7CCNl1n_UpxFpX&_nc_ohc=JnqK4lF0ulsAX_epswo&_nc_ht=scontent.famm10-1.fna&oh=7b16ec4559301c7159f4991086985414&oe=6045CFC3',
  },
];


const items = ({ navigation}) => {

  const [getScrollPosition, setScrollPosition] = useState(0);


  const ShowItem = ({ name, img, onImgTap, onNameTap }) => {
  return (
    <Card style={styles.cardStyle}>
      <CardItem style={styles.cardItemStyle}>
        <Left>
          <TouchableOpacity style={[styles.logoContainer]} onPress={onImgTap}>
            {img ? (
              <Thumbnail source={{ uri: img }} style={{width: 60, height: 60, borderRadius:10,  borderColor: '#2196F3', borderWidth: 1, }} />
            ) : (
              <Text style={styles.thumbnailName}>{name.charAt(0)}</Text>
            )}
          </TouchableOpacity>

          <Body>
            <Text style={styles.itemName} onPress={onNameTap}>
              {name}
            </Text>
          </Body>
          <Icon name="delete" color="red" size={25}
          onPress={()=> alert ('Item Home is deleted')}
          />
        </Left>
      </CardItem>
    </Card>
  );
};
  
  const nameTap = (title, poster, description ,location, price, date ) => {
    
      navigation.navigate("itemdetails", {
          title,
          poster,
          description ,
          location,
          price,
          date  
      });
  };
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>      
      <FlatList
        alwaysBounceVertical={false}
        data={DATA}
        keyExtractor={(_, index) => index.toString()}
        onScroll={(event) =>
          setScrollPosition(event.nativeEvent.contentOffset.y)
        }
       
        renderItem={({ item }) => (
          
          <ShowItem
            name={item.title}
            img={item.poster}
            onNameTap={() => nameTap(
                      item.title,
                      item.poster,
                      item.description,
                      item.location,
                      item.price,
                      item.date  )}
          />
        )}
      />
    </SafeAreaView>
  );
};


items.navigationOptions = () => {
  return {
     headerStyle: {
            backgroundColor: '#2196F3',
          },
           headerTintColor: '#fff',
           headerTitleStyle: {
            fontWeight: 'bold',
          },
    
  };
};

export default (items)


const styles = StyleSheet.create({
  cardStyle: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderRadius:20
  },
  cardItemStyle: {
    borderWidth: 2,
    borderColor:'#fff',
    backgroundColor: '#fff',
    borderRadius: 20
  },

  logoContainer: {
    height: 60,
    width: 60,
    borderColor: '#2196F3',
    borderWidth: 3,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#2196F3',
  },
  thumbnailName: { fontSize: 30, color: 'black', fontWeight: "bold" },
  itemName: { fontSize: 20, color: 'black', fontWeight: "bold" },
});
