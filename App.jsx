import React, {useRef, useState} from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import * as d3 from 'd3-hierarchy';
import {Path, G, Circle, Rect, Text as SvgText, Svg} from 'react-native-svg';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  withDecay
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

const App = () => {
  // const pressed = useSharedValue(false);
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const scaleN = useSharedValue(1);



  const pan = Gesture.Pan().onChange(event => {
    x.value += event.changeX;
    y.value += event.changeY;
  });

  const pinch = Gesture.Pinch().onChange(event => {
    scaleN.value = event.scale;
  });

  const animatedStylesScale = useAnimatedStyle(() => ({
    transform: [{scale:scaleN.value}],
  }));

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{scale:scaleN.value}, {translateX: x.value}, {translateY: y.value}],
  }));

  const composed = Gesture.Simultaneous(pan, pinch);

  const data = [
    {name: 'Root', parent: '', spouses: ['Wife of Root'], children: 2},
    {
      name: 'Parent 1',
      parent: 'Root',
      spouses: ['Wife 1'],
      children: 2,
    },
    {name: 'Child n1', parent: 'Parent 1', spouses: ['Wife 2'], children: null},
    {name: '', parent: 'Parent 1'},
    {name: 'Child n2', parent: 'Parent 1', spouses: ['Wife 2'], children: null},
    {name: '', parent: 'Parent 1'},
    {name: 'Child nn', parent: 'Parent 1', spouses: ['Wife 2'], children: null},
    {name: 'Parent 2', parent: 'Root', spouses: ['Wife 2'], children: 2},
    {name: 'Child 3', parent: 'Parent 2'},
    {name: 'Child 4', parent: 'Parent 2', spouses: ['Wife 2'], children: 2},
    {name: '', parent: 'Parent 2'},
    {name: 'Child 5', parent: 'Child 4'},
    {name: 'Child 6', parent: 'Child 4'},
  ];

  // const data = [
  //   {name: 'Root', parent: '', spouses: ['Wife of Root'], children: 2},

  //   {name: 'Child n1', parent: 'Root',spouses: ['Wife'],children: 1},
  //   {name: 'Child n2', parent: 'Child n1' },
  //   {name: 'Child n3', parent: 'Child n1'},
  //   {name: 'Child n2', parent: 'Root'},

  // ];

  const treeData = d3
    .stratify()
    .id(d => d.name)
    .parentId(d => d.parent)(data);
  //card height
  const treeLayout = d3.tree().size([1700, 700]);
  const nodes = treeLayout(treeData);

  return (
    <View style={{flex: 1}}>
      <GestureHandlerRootView>
      {/* <GestureDetector gesture={pinch}> */}
        {/* <Animated.View style={[animatedStylesScale]}> */}
        <GestureDetector gesture={composed}>
          <Animated.View style={[animatedStyles]}>
            {/* card height */}
            <Svg width={1800} height={700} transform={{translateY: 30}}>
              {nodes.links().map((link, index) => (
                <>
                  {link.target.data.name && (
                    <Path
                      transform={{translateY: 30}}
                      key={index}
                      d={
                        'M' +
                        (link.source.x - 20) +
                        ',' +
                        link.source.y +
                        //card height
                        'h 60 v 80 H' +
                        (link.target.x + 40) +
                        'V' +
                        link.target.y
                      }
                      fill="none"
                      stroke="lightgrey"
                    />
                  )}
                </>
              ))}
              {nodes.descendants().map((node, index) => (
                //card height
                <G key={index} transform={{translateY: 0}}>
                  {node.data.name && (
                    <View
                      style={{
                        position: 'absolute',
                        zIndex: 10,
                        left: node?.data?.spouses?.length <= 0 || !node?.data?.spouses ? node.x - 5 : node.x - 70 ,
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
                        {node.data.name}
                      </Text>
                    </View>
                  )}

                  {/* below is spouse code */}
                  {Array.isArray(node.data.spouses) && (
                    <>
                      {/* spouse default connection when they have children */}
                      {node.data.children ? (
                        <Path
                          //card height
                          transform={{translateY: 45}}
                          key={index}
                          d={
                            'M' + (node.x + 40) + ',' + (node.y - 15) + 'h 30 ' 
                            }
                          fill="none"
                          stroke="blue"
                        />
                      ) : (
                        // spouse connection when they dont have children
                        <Path
                          //card height
                          transform={{translateY: 45}}
                          key={index}
                          d={
                            'M' + (node.x + 20) + ',' + (node.y - 15) + 'h 40 '
                          }
                          fill="none"
                          stroke="blue"
                        />
                      )}

                      {/* below is spouse boxes */}
                      <View
                        style={{
                          position: 'absolute',
                          left: node.x + 60,
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
                          // x={node.x + 65}
                          // y={node.y - 20}
                          fill="white"
                          width={90}
                          //card height
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
                          {node.data.spouses[0]}
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
                          left: node.x + 80,
                          top: node.y + 15,
                        }}
                      />
                    </>
                  )}
                </G>
              ))}
            </Svg>
          </Animated.View>
        </GestureDetector>
        {/* </Animated.View> */}
        {/* </GestureDetector> */}
        
      </GestureHandlerRootView>
    </View>
  );
};

export default App;
