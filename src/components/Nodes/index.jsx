/* eslint-disable react-native/no-inline-styles */
import {Text, View, Image} from 'react-native';
import {Rect} from 'react-native-svg';
import React from 'react';

export default function Nodes({node, index}) {
  return (
    <>
      {node?.data?._id && (
        <View
          key={index}
          style={{
            position: 'absolute',
            left:
              node?.data?.spouses?.length <= 0 || !node?.data?.spouses
                ? node.x - 70
                : node.x - 70,
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
            // x={node.x - 65}
            // y={node.y - 20}
            // fill="white"
            width={90}
            //card height
            // height={110}
            strokeWidth={1}
            stroke="silver"
            shadowColor="black"
            shadowOffset={{width: 0, height: 2}}
            shadowOpacity={0.5}
            shadowRadius={4}
            elevation={5}
          />
          <Image
            source={{
              uri: 'https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg',
            }}
            style={{
              borderRadius: 50,
              width: 60,
              height: 60,
              position: 'absolute',
              left: 14,
              top: 5,
            }}
          />
          <Text
            style={{
              left: -1,
              top: 80,
              fontSize: 10,
              textAlign: 'center',
              color: 'black',
            }}>
            {' '}
            {node.data.personalDetails.name}
          </Text>
        </View>
      )}
    </>
  );
}
