import React, {useState, useEffect, useCallback, useRef} from 'react';
import {
  StatusBar,
  Image,
  FlatList,
  Dimensions,
  Animated,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
const { width } = Dimensions.get('screen');
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  FlingGestureHandler,
  Directions,
  State,
} from 'react-native-gesture-handler';

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
    title: 'Jaguar car',
    location: 'Amman, Jordan',
    date: 'Nov 17th, 2020',
    price: '$20 000',
    description: 'Fuel Consumption. (Automatic City)2.0-liter 4-cylinder Turbocharged Gas 247 hp.180 hp @ 5500 rpm.8-speed electronic automatic transmission with Jaguar sequential shift.N / A. ',
    
    poster:
      'https://images-na.ssl-images-amazon.com/images/I/71O31clz6mL._SX679_.jpg',
  },
  {
     title: 'Refrigerator',
    location: 'Amman, Jordan',
    date: 'Nov 17th, 2020',
    price: '$20 000',
    description: 'Fuel Consumption. (Automatic City)2.0-liter 4-cylinder Turbocharged Gas 247 hp.180 hp @ 5500 rpm.8-speed electronic automatic transmission with Jaguar sequential shift.N / A. ',
    
    poster:
      'https://scontent.famm7-1.fna.fbcdn.net/v/t1.0-9/144009362_4001230513273297_7000570002588224469_o.jpg?_nc_cat=111&ccb=2&_nc_sid=730e14&_nc_ohc=HpEPWkYivI4AX-WyF4l&_nc_ht=scontent.famm7-1.fna&oh=e39570e1873750fbda08f6b492441b95&oe=603F26C2',
  },
  {
    title: 'Jaguar car',
    location: 'Amman, Jordan',
    date: 'Nov 17th, 2020',
    price: '$20 000',
    description: 'Fuel Consumption. (Automatic City)2.0-liter 4-cylinder Turbocharged Gas 247 hp.180 hp @ 5500 rpm.8-speed electronic automatic transmission with Jaguar sequential shift.N / A. ',
    
    poster:
      'https://scontent.famm7-1.fna.fbcdn.net/v/t1.0-9/144009362_4001230513273297_7000570002588224469_o.jpg?_nc_cat=111&ccb=2&_nc_sid=730e14&_nc_ohc=HpEPWkYivI4AX-WyF4l&_nc_ht=scontent.famm7-1.fna&oh=e39570e1873750fbda08f6b492441b95&oe=603F26C2',
  },
  {
    title: 'Jaguar car',
    location: 'Amman, Jordan',
    date: 'Nov 17th, 2020',
    price: '$20 000',
    description: 'Fuel Consumption. (Automatic City)2.0-liter 4-cylinder Turbocharged Gas 247 hp.180 hp @ 5500 rpm.8-speed electronic automatic transmission with Jaguar sequential shift.N / A. ',
    
    poster:
      'https://scontent.famm7-1.fna.fbcdn.net/v/t1.0-9/144009362_4001230513273297_7000570002588224469_o.jpg?_nc_cat=111&ccb=2&_nc_sid=730e14&_nc_ohc=HpEPWkYivI4AX-WyF4l&_nc_ht=scontent.famm7-1.fna&oh=e39570e1873750fbda08f6b492441b95&oe=603F26C2',
  },
];

const OVERFLOW_HEIGHT = 70;
const SPACING = 10;
const ITEM_WIDTH = width * 0.76;
const ITEM_HEIGHT = ITEM_WIDTH * 1.7;
const VISIBLE_ITEMS = 3;

const OverflowItems = ({ data, scrollXAnimated }) => {
  const inputRange = [-1, 0, 1];
  const translateY = scrollXAnimated.interpolate({
    inputRange,
    outputRange: [OVERFLOW_HEIGHT, 0, -OVERFLOW_HEIGHT],
  });
  return (
    <View style={styles.overflowContainer}>
      <Animated.View style={{ transform: [{ translateY }] }}>
        {data.map((item, index) => {
          return (
            <View key={index} style={styles.itemContainer}>
  
              <Text style={[styles.title]} numberOfLines={1}>
                {item.title}
              </Text>
            </View>
          );
        })}
      </Animated.View>
    </View>
  );
};

 const items = ({navigation}) => {

  const [data, setData] = useState(DATA);
  const scrollXIndex = useRef(new Animated.Value(0)).current;
  const scrollXAnimated = useRef(new Animated.Value(0)).current;
  const [index, setIndex] = useState(0);
  const setActiveIndex = useCallback((activeIndex) => {
    scrollXIndex.setValue(activeIndex);
    setIndex(activeIndex);
  });

  useEffect(() => {
    if (index === data.length - VISIBLE_ITEMS - 1) {
      const newData = [...data, ...data];
      setData(newData);
    }
  });

  useEffect(() => {
    Animated.spring(scrollXAnimated, {
      toValue: scrollXIndex,
      useNativeDriver: true,
    }).start();
  });

  return (
    <FlingGestureHandler
      key='left'
      direction={Directions.LEFT}
      onHandlerStateChange={(ev) => {
        if (ev.nativeEvent.state === State.END) {
          if (index === data.length - 1) {
            return;
          }
          setActiveIndex(index + 1);
        }
      }}
    >
      <FlingGestureHandler
        key='right'
        direction={Directions.RIGHT}
        onHandlerStateChange={(ev) => {
          if (ev.nativeEvent.state === State.END) {
            if (index === 0) {
              return;
            }
            setActiveIndex(index - 1);
          }
        }}
      >
        <SafeAreaView style={styles.container}>
        <OverflowItems data={data} scrollXAnimated={scrollXAnimated} />
          <FlatList
            data={data}
            keyExtractor={(_, index) => String(index)}
            horizontal
            inverted
            contentContainerStyle={{
              flex: 1,
              justifyContent: 'center',
              padding: SPACING * 2,
             
            }}
            scrollEnabled={false}
            removeClippedSubviews={false}
            CellRendererComponent={({
              item,
              index,
              children,
              style,
              ...props
            }) => {
              const newStyle = [style, { zIndex: data.length - index }];
              return (
                <View style={newStyle} index={index} {...props}>
                  {children}
                </View>
              );
            }}
            renderItem={({ item, index: i }) => {
              const inputRange = [i - 1, i, i + 1];
              const translateX = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [50, 0, -100],
              });
              const scale = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [0.8, 1, 1.3],
              });
              const opacity = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [1 - 1 / VISIBLE_ITEMS, 1, 0],
              });

              return (
              
                <Animated.View
                  style={{
                    position: 'absolute',
                    left: -ITEM_WIDTH / 2,
                    opacity,
                    transform: [
                      {
                        translateX,
                      },
                      { scale },
                    ],
                  }}
                >
                  <Image
                    source={{ uri: item.poster }}
                    style={{
                      width: ITEM_WIDTH,
                      height: ITEM_HEIGHT,
                      borderRadius: 14,
                    }}
                  />
                </Animated.View>
              );
            }}
          />
         <View style={styles.infoBoxWrapper}>

          <View style={styles.infoBox}>
               <TouchableOpacity
        style={{    alignItems: "center",
    padding: 10,
    borderRadius:30,
    width: '60%',
    backgroundColor: '#2196F3'}}
        onPress={()=> {
                   navigation.navigate('itemdetails',{
                      title: DATA[index].title,
                      poster: DATA[index].poster,
                      location: DATA[index].location,
                      price: DATA[index].price,
                      date: DATA[index].date,
                      description: DATA[index].description,

                   })
                 }}
      >
        <Text style={styles.button}>Show details</Text>
      </TouchableOpacity>
          </View>

          <View style={styles.infoBox}>
                             <TouchableOpacity
          style={{    alignItems: "center",
    padding: 10,
    borderRadius:30,
    width: '60%',
    backgroundColor: 'red'}}
        onPress={()=> {
                   navigation.navigate('eventlistdetails',{
                     item: DATA[index]
                   })
                 }}
      >
        <Text style={styles.button}>Delete</Text>
      </TouchableOpacity>
          </View>

      </View>
        </SafeAreaView>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
}


export default items

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: -1,

  },
  location: {
    fontSize: 16,
  },
  date: {
    fontSize: 12,
  },
  itemContainer: {
    height: OVERFLOW_HEIGHT,
    padding: SPACING * 2,
  },
  itemContainerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  overflowContainer: {
    height: OVERFLOW_HEIGHT,
    overflow: 'hidden',
  },
    infoBoxWrapper: {
    backgroundColor: '#fff',    
    flexDirection: 'row',
    height: '12%',
  },
  infoBox: {
    marginTop: 14,
    backgroundColor: '#fff',
    width: '50%',
    alignItems: 'center',
  },
  button:{
    color:'#fff',
    textAlign:'center',
    borderRadius: 40,
    
},
});