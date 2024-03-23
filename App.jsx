/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View} from 'react-native';
import * as d3 from 'd3-hierarchy';
import {G, Svg} from 'react-native-svg';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import {Alert} from 'react-native';
import Nodes from './src/components/Nodes';
import Spouses from './src/components/Spouses';
import NodePath from './src/components/NodePath';
import SpousePath from './src/components/SpousePath';
import filterTree from './src/components/Functions/filterTree'

const App = () => {
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const scaleN = useSharedValue(1);
  const viewWidth = 90;
  const gap = 20;
  const [treeX, setTreeX] = useState([1500]);
  const [treeY, setTreeY] = useState([400]);

  const pan = Gesture.Pan().onChange(event => {
    x.value += event.changeX;
    y.value += event.changeY;
  });

  const pinch = Gesture.Pinch().onChange(event => {
    scaleN.value = event.scale;
  });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {scale: scaleN.value},
      {translateX: x.value},
      {translateY: y.value},
    ],
  }));

  const composed = Gesture.Simultaneous(pan, pinch);
  const plusBox = {
    _id: '',
    personalDetails: {
      gender: '',
      relationStatus: '',
      profilepic: null,
      livingStatus: '',
      name: '',
      middlename: '',
      lastname: '',
      isPlus: true,
    },
    parents: [''],
    wifes: [],
    wifeChildrens: null,
    husbandChildrens: null,
    userChildren: [],
    husbands: [],
    spouses: [],
  };

  const [descendants, setDescendants] = useState([
    {
      _id: '65fa7c35ca198a00e18c76c5',
      personalDetails: {
        gender: 'male',
        relationStatus: 'married',
        profilepic: null,
        livingStatus: 'yes',
        name: 'Faheer',
        middlename: '',
        lastname: 'Fah',
      },
      husbands: [],
      wifes: [
        {
          _id: '65fc320fde1b7305770deff6',
          personalDetails: {
            gender: 'female',
            relationStatus: 'single',
            profilepic: null,
            livingStatus: 'yes',
            name: 'Wife1',
            middlename: '',
            lastname: 'Demo',
          },
          children: [
            '65fa7545d5a2a2001268b4f8',
            '65fbcd83e9f33103f5005d24',
            '65fbd71fe9f33103f5008914',
          ],
        },
        {
          _id: '65fc320fde1b7305770deff6',
          personalDetails: {
            gender: 'female',
            relationStatus: 'single',
            profilepic: null,
            livingStatus: 'yes',
            name: 'Wife2',
            middlename: '',
            lastname: 'Demo',
          },
          children: [
            '65fa7545d5a2a2001268b4f8',
            '65fbcd83e9f33103f5005d24',
            '65fbd71fe9f33103f5008914',
          ],
        },
        {
          _id: '65fc320fde1b7305770deff6',
          personalDetails: {
            gender: 'female',
            relationStatus: 'single',
            profilepic: null,
            livingStatus: 'yes',
            name: 'Wife3',
            middlename: '',
            lastname: 'Demo',
          },
          children: [
            '65fa7545d5a2a2001268b4f8',
            '65fbcd83e9f33103f5005d24',
            '65fbd71fe9f33103f5008914',
          ],
        },
        {
          _id: '65fc320fde1b7305770deff6',
          personalDetails: {
            gender: 'female',
            relationStatus: 'single',
            profilepic: null,
            livingStatus: 'yes',
            name: 'Wife4',
            middlename: '',
            lastname: 'Demo',
          },
          children: [
            '65fa7545d5a2a2001268b4f8',
            '65fbcd83e9f33103f5005d24',
            '65fbd71fe9f33103f5008914',
          ],
        },
        {
          _id: '65fc320fde1b7305770deff6',
          personalDetails: {
            gender: 'female',
            relationStatus: 'single',
            profilepic: null,
            livingStatus: 'yes',
            name: 'Wife5',
            middlename: '',
            lastname: 'Demo',
          },
          children: [
            '65fa7545d5a2a2001268b4f8',
            '65fbcd83e9f33103f5005d24',
            '65fbd71fe9f33103f5008914',
          ],
        },
      ],
      spouses: [],
      wifeChildrens: [
        '65fa7545d5a2a2001268b4f8',
        '65fbcd83e9f33103f5005d24',
        '65fbd71fe9f33103f5008914',
      ],
      husbandChildrens: null,
      userChildren: [
        '65fa7545d5a2a2001268b4f8',
        '65fbcd83e9f33103f5005d24',
        '65fbd71fe9f33103f5008914',
      ],
    },
    {
      _id: '65fbcda2e9f33103f5005e14',
      personalDetails: {
        gender: 'female',
        relationStatus: 'single',
        profilepic: null,
        livingStatus: 'yes',
        name: 'Dau',
        middlename: '',
        lastname: 'Fah',
      },
      parents: ['65fbcd83e9f33103f5005d24'],
      wifes: [],
      wifeChildrens: null,
      husbandChildrens: null,
      userChildren: [],
      husbands: [],
      spouses: [],
    },
    {
      _id: '65fbcd92e9f33103f5005d98',
      personalDetails: {
        gender: 'male',
        relationStatus: 'single',
        profilepic: null,
        livingStatus: 'yes',
        name: 'Son',
        middlename: '',
        lastname: 'Fah',
      },
      parents: ['65fbcd83e9f33103f5005d24'],
      wifes: [],
      wifeChildrens: null,
      husbandChildrens: null,
      userChildren: [],
      husbands: [],
      spouses: [],
    },
    {
      _id: '65fbd72fe9f33103f5008984',
      personalDetails: {
        gender: 'male',
        relationStatus: 'single',
        profilepic: null,
        livingStatus: 'yes',
        name: 'Son of',
        middlename: '',
        lastname: 'Fah',
      },
      parents: ['65fbd71fe9f33103f5008914'],
      wifes: [],
      wifeChildrens: null,
      husbandChildrens: null,
      userChildren: [],
      husbands: [],
      spouses: [],
    },
    {
      _id: '65fd2969de1b73057711f592',
      personalDetails: {
        gender: 'male',
        relationStatus: 'single',
        profilepic: null,
        livingStatus: 'yes',
        name: 'Second son',
        middlename: '',
        lastname: 'Acc',
      },
      parents: ['65fa7545d5a2a2001268b4f8'],
      wifes: [],
      wifeChildrens: null,
      husbandChildrens: null,
      userChildren: [],
      husbands: [],
      spouses: [],
    },
    {
      _id: '65fa7545d5a2a2001268b4f8',
      personalDetails: {
        gender: 'male',
        relationStatus: 'married',
        profilepic: null,
        livingStatus: 'yes',
        lastname: 'Acc',
        name: 'New',
      },
      parents: ['65fa7c35ca198a00e18c76c5'],
      wifes: [
        {
          _id: '65fa7b6cca198a00e18c7493',
          personalDetails: {
            gender: 'female',
            relationStatus: 'married',
            profilepic: null,
            livingStatus: 'yes',
            name: 'Second wife',
            middlename: '',
            lastname: 'Acc',
          },
          children: ['65fd2969de1b73057711f592'],
        },
        {
          _id: '65fa79c1ca198a00e18c6806',
          personalDetails: {
            gender: 'female',
            relationStatus: 'married',
            profilepic: null,
            livingStatus: 'yes',
            name: 'Wife of',
            middlename: '',
            lastname: 'Acc',
          },
          children: ['65fa79b5ca198a00e18c6775', '65fa7af7ca198a00e18c6f39'],
        },
      ],
      wifeChildrens: ['65fd2969de1b73057711f592'],
      husbandChildrens: null,
      userChildren: [
        '65fa79b5ca198a00e18c6775',
        '65fa7af7ca198a00e18c6f39',
        '65fd2969de1b73057711f592',
      ],
      husbands: [],
      spouses: [
        {
          _id: '65fa7b6cca198a00e18c7493',
          personalDetails: {
            gender: 'female',
            relationStatus: 'married',
            profilepic: null,
            livingStatus: 'yes',
            name: 'Second wife',
            middlename: '',
            lastname: 'Acc',
          },
          children: ['65fd2969de1b73057711f592'],
        },
        {
          _id: '65fa79c1ca198a00e18c6806',
          personalDetails: {
            gender: 'female',
            relationStatus: 'married',
            profilepic: null,
            livingStatus: 'yes',
            name: 'Wife of',
            middlename: '',
            lastname: 'Acc',
          },
          children: ['65fa79b5ca198a00e18c6775', '65fa7af7ca198a00e18c6f39'],
        },
      ],
    },
    {
      _id: '65fa7af7ca198a00e18c6f39',
      personalDetails: {
        gender: 'male',
        relationStatus: 'single',
        profilepic: null,
        livingStatus: 'yes',
        name: 'Son',
        middlename: '',
        lastname: 'Acc',
      },
      parents: ['65fa7545d5a2a2001268b4f8'],
      wifes: [],
      wifeChildrens: null,
      husbandChildrens: null,
      userChildren: [],
      husbands: [],
      spouses: [],
    },
    {
      _id: '65fbd71fe9f33103f5008914',
      personalDetails: {
        gender: 'male',
        relationStatus: 'married',
        profilepic: null,
        livingStatus: 'yes',
        name: 'SonThree',
        middlename: '',
        lastname: 'Fah',
      },
      parents: ['65fa7c35ca198a00e18c76c5'],
      wifes: [
        {
          _id: '65fd299ade1b73057711f775',
          personalDetails: {
            gender: 'female',
            relationStatus: 'married',
            profilepic: null,
            livingStatus: 'yes',
            name: 'Wife of',
            middlename: '',
            lastname: 'Son Three',
          },
          children: ['65fbd72fe9f33103f5008984'],
        },
      ],
      wifeChildrens: ['65fbd72fe9f33103f5008984'],
      husbandChildrens: null,
      userChildren: ['65fbd72fe9f33103f5008984'],
      husbands: [],
      spouses: [
        {
          _id: '65fd299ade1b73057711f775',
          personalDetails: {
            gender: 'female',
            relationStatus: 'married',
            profilepic: null,
            livingStatus: 'yes',
            name: 'Wife of',
            middlename: '',
            lastname: 'Son Three',
          },
          children: ['65fbd72fe9f33103f5008984'],
        },
      ],
    },
    {
      _id: '65fbcd83e9f33103f5005d24',
      personalDetails: {
        name: 'Al',
        middlename: '',
        profilepic: null,
        lastname: 'Fah',
        relationStatus: 'married',
        gender: 'male',
        livingStatus: 'yes',
      },
      parents: ['65fa7c35ca198a00e18c76c5'],
      wifes: [
        {
          _id: '65fd2977de1b73057711f62c',
          personalDetails: {
            gender: 'female',
            relationStatus: 'married',
            profilepic: null,
            livingStatus: 'yes',
            name: 'Wife of',
            middlename: '',
            lastname: 'Fah',
          },
          children: ['65fbcd92e9f33103f5005d98', '65fbcda2e9f33103f5005e14'],
        },
      ],
      wifeChildrens: ['65fbcd92e9f33103f5005d98', '65fbcda2e9f33103f5005e14'],
      husbandChildrens: null,
      userChildren: ['65fbcd92e9f33103f5005d98', '65fbcda2e9f33103f5005e14'],
      husbands: [],
      spouses: [
        {
          _id: '65fd2977de1b73057711f62c',
          personalDetails: {
            gender: 'female',
            relationStatus: 'married',
            profilepic: null,
            livingStatus: 'yes',
            name: 'Wife of',
            middlename: '',
            lastname: 'Fah',
          },
          children: ['65fbcd92e9f33103f5005d98', '65fbcda2e9f33103f5005e14'],
        },
      ],
    },
  ]);

  let filteredResult = filterTree(descendants);
  filteredResult = [...[descendants[0]], ...filteredResult];
  delete filteredResult[0].spouses;
  const sPS = [
    ...(filteredResult?.[0]?.wifes || []),
    ...(filteredResult?.[0]?.husbands || []),
  ];
  filteredResult[0].spouses = sPS;
  if (
    filteredResult[0]?.userChildren?.length > 0 &&
    filteredResult[0]?.spouses?.length <= 0
  ) {
    filteredResult[0]?.spouses?.push(plusBox);
  }

  const treeData = d3
    .stratify()
    .id(d => d._id)
    .parentId(d => d.parents?.[0])(filteredResult);
  const treeLayout = d3.tree().size([treeX, treeY]);
  const nodes = treeLayout(treeData);

  return (
    <View style={{flex: 1, transform: [{translateX: -150}]}}>
      {true && (
        <GestureHandlerRootView>
          <GestureDetector gesture={composed}>
            <Animated.View style={[animatedStyles]}>
              {/* {nodes.descendants().map((node, index) => (
                <View key={index}>
                  {node?.data?.name && extTree && index === 1 && (
                    <TouchableOpacity
                      key={index}
                      style={{
                        zIndex: 20,
                        position: 'absolute',
                        left: node.x + 10,
                        top: node.y + 0,
                        width: 20,
                        height: 20,
                        backgroundColor: 'white',
                        borderRadius: 10,
                        shadowColor: 'black',
                        shadowOffset: {width: 0, height: 2},
                        shadowOpacity: 0.5,
                        shadowRadius: 4,
                        elevation: 5,
                      }}
                      onPress={() => console.log('return')}>
                      <Text style={{textAlign: 'center'}}>🌳</Text>
                    </TouchableOpacity>
                  )}
                  {Array.isArray(node.data.spouses) && (
                    <>
                      {node.data.spouses.map((spouse, index) => (
                        <View key={index}>
                          {index !== 0 && (
                            <TouchableOpacity
                              key={index}
                              style={{
                                zIndex: 20,
                                position: 'absolute',
                                left: index * (viewWidth + gap) + node.x + 140,
                                top: node.y + 0,
                                width: 20,
                                height: 20,
                                backgroundColor: 'white',
                                borderRadius: 10,
                                shadowColor: 'black',
                                shadowOffset: {width: 0, height: 2},
                                shadowOpacity: 0.5,
                                shadowRadius: 4,
                                elevation: 5,
                              }}
                              onPress={() =>
                                Alert.alert('This will take you to spouse tree')
                              }>
                              <Text style={{textAlign: 'center'}}>🌳</Text>
                            </TouchableOpacity>
                          )}
                        </View>
                      ))}
                    </>
                  )}
                </View>
              ))} */}
              <Svg width={1500} height={1500} transform={{translateY: 30}}>
                {nodes.links().map((link, index) => (
                  <NodePath link={link} index={index} />
                ))}
                {nodes.descendants().map((node, index) => (
                  <G key={index} transform={{translateY: 0}}>
                    <Nodes node={node} index={index} />
                    {/* below is spouse code */}
                    {Array.isArray(node.data.spouses) && (
                      <>
                        {node.data.spouses.map((spouse, index) => (
                          <>
                            <SpousePath node={node} index={index} />
                            <Spouses
                              node={node}
                              index={index}
                              spouse={spouse}
                              viewWidth={viewWidth}
                              gap={gap}
                            />
                          </>
                        ))}
                      </>
                    )}
                  </G>
                ))}
              </Svg>
            </Animated.View>
          </GestureDetector>
        </GestureHandlerRootView>
      )}
    </View>
  );
};

export default App;
