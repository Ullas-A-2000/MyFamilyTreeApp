/* eslint-disable react-native/no-inline-styles */
import {Text, View, Image} from 'react-native';
import React from 'react';
import {Rect} from 'react-native-svg';
export default function PlusCards({node, index, spouse, viewWidth, gap}) {
  return (
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
          borderStyle: 'dashed',
          borderWidth: 1,
          borderColor: 'grey',
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
            fontSize: 9,
            fontWeight: '400',
            textAlign: 'center',
            color: 'black',
          }}>
          Add Spouse
        </Text>
      </View>
      <Image
        source={{
          uri: 'https://res.cloudinary.com/dskk1dcoe/image/upload/v1711000027/ycycaiwkjru0zpqfx13w.png',
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
  );
}
