/* eslint-disable react-native/no-inline-styles */
import {Text, View, Image} from 'react-native';
import React from 'react';
import {Rect} from 'react-native-svg';
import PlusCards from '../PlusCards';

export default function Spouses({node, index, spouse, viewWidth, gap}) {
  return (
    <>
      {spouse.personalDetails.isPlus ? (
        <>
          <PlusCards
            node={node}
            index={index}
            spouse={spouse}
            viewWidth={viewWidth}
            gap={gap}
          />
        </>
      ) : (
        <>
          <View
            key={index}
            style={{
              position: 'absolute',
              left: index * (viewWidth + gap) + node.x + 60,
              top: node.y + 10,
              width: 90,
              height: 110,
              backgroundColor: 'white',
              borderRadius: 10,
              shadowColor: 'black',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.5,
              shadowRadius: 4,
              elevation: 5,
            }}>
            <Rect
              fill="none"
              width={90}
              height={110}
              strokeWidth={1}
              stroke="silver"
              rx={10}
              ry={10}
            />
            <Text
              style={{
                left: 0,
                top: 80,
                fontSize: 10,
                textAlign: 'center',
                color: 'black',
              }}>
              {' '}
              {spouse.personalDetails.name}
            </Text>
          </View>
          <Image
            source={{
              uri: 'https://www.getnews.info/uploads/bb4710262b9221a3406b68c63334e1b3.jpg',
            }}
            style={{
              borderRadius: 50,
              width: 60,
              height: 60,
              position: 'absolute',
              left: index * (viewWidth + gap) + node.x + 75,
              top: node.y + 15,
            }}
          />
        </>
      )}
    </>
  );
}
