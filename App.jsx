import React, {useRef, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import * as d3 from 'd3-hierarchy';
import {Path, G, Circle, Rect, Text as SvgText, Svg} from 'react-native-svg';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
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

  const pan = Gesture.Pan().onChange(event => {
    x.value += event.changeX;
    y.value += event.changeY;
  });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {translateX: x.value},
      {translateY: y.value},
    ],
  }));

  const data = [
    {name: 'Grandparent', parent: '', spouses: ['Wife 1'], children: 2},
    {
      name: 'Parent 1',
      parent: 'Grandparent',
      spouses: ['Wife 1'],
      children: 2,
    },
    {name: 'Child n1', parent: 'Parent 1', spouses: ['Wife 2'], children: null},
    {name: '', parent: 'Parent 1'},
    {name: 'Child n2', parent: 'Parent 1', spouses: ['Wife 2'], children: null},
    {name: '', parent: 'Parent 1'},
    {name: 'Child nn', parent: 'Parent 1', spouses: ['Wife 2'], children: null},
    {name: 'Parent 2', parent: 'Grandparent', spouses: ['Wife 2'], children: 2},
    {name: 'Child 3', parent: 'Parent 2'},
    {name: 'Child 4', parent: 'Parent 2', spouses: ['Wife 2'], children: 2},
    {name: '', parent: 'Parent 2'},
    {name: 'Child 5', parent: 'Child 4'},
    {name: 'Child 6', parent: 'Child 4'},
  ];

  const treeData = d3
    .stratify()
    .id(d => d.name)
    .parentId(d => d.parent)(data);
  //card height
  const treeLayout = d3.tree().size([1400, 600]);
  const nodes = treeLayout(treeData);

  return (
    <View style={{backgroundColor: '#4d4d4d', flex: 1}}>
      <GestureHandlerRootView>
        <GestureDetector gesture={pan}>
          <Animated.View style={[animatedStyles]}>
          {/* card height */}
            <Svg width={1400} height={900} transform={{translateY: 30}}>
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
                        'h 65 v 80 H' +
                        (link.target.x - 20) +
                        'V' +
                        link.target.y
                      }
                      fill="none"
                      stroke="orange"
                    />
                  )}
                </>
              ))}
              {nodes.descendants().map((node, index) => (
                //card height 
                <G key={index} transform={{translateY: 0}}>
                  {node.data.name && (
                    <Rect
                      x={node.x - 65}
                      y={node.y - 20}
                      fill="#4d4d4d"
                      width={90}
                        //card height
                      height={110}
                      strokeWidth={1}
                      stroke="silver"
                    />
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
                          stroke="orange"
                        />
                      ) : (
                        // spouse connection when they dont have children
                        <Path
                        //card height
                          transform={{translateY: 45}}
                          key={index}
                          d={
                            'M' + (node.x + 25) + ',' + (node.y - 15) + 'h 40 '
                          }
                          fill="none"
                          stroke="orange"
                        />
                      )}

                      {/* below is spouse boxes */}
                      <Rect
                        x={node.x + 65}
                        y={node.y - 20}
                        fill="#4d4d4d"
                        width={90}
                        //card height
                        height={110}
                        strokeWidth={1}
                        stroke="silver"
                      />
                    </>
                  )}
                </G>
              ))}
            </Svg>
          </Animated.View>
        </GestureDetector>
      </GestureHandlerRootView>
    </View>
  );
};

export default App;
