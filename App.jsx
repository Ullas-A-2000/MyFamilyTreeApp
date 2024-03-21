/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import * as d3 from 'd3-hierarchy';
import {Path, G, Rect, Svg} from 'react-native-svg';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
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
  const scaleN = useSharedValue(0);
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

  const animatedStylesScale = useAnimatedStyle(() => ({
    transform: [{scale: scaleN.value}],
  }));

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {scale: scaleN.value},
      {translateX: x.value},
      {translateY: y.value},
    ],
  }));

  const composed = Gesture.Simultaneous(pan, pinch);
  const [data, setData] = useState([
    {name: 'Root', parent: '', spouses: ['Wife of Root'], children: 2},

    {
      name: 'Parent 1',
      parent: 'Root',
      spouses: ['wife 1', 'Wife 2', 'Wife 3', 'wife 4'],
      children: 2,
    },
    {name: '', parent: 'Root'},
    {name: '', parent: 'Root'},
    {name: '', parent: 'Root'},
    {name: '', parent: 'Root'},
    {
      name: 'Parent 2',
      parent: 'Root',
    },

    {
      name: 'Child n1',
      parent: 'Parent 1',
      spouses: ['Wife n1', 'wife n2'],
      children: null,
    },
    {name: '', parent: 'Parent 1'},
    {name: '', parent: 'Parent 1'},
    {
      name: 'Child n2',
      parent: 'Parent 1',
      spouses: ['Wife m1', 'wife m2'],
      children: 1,
    },
    // {name: 'Child nn2', parent: 'Parent 1', spouses: ['Wife m1','wife m2'], children: null},
    {
      name: 'child 1',
      parent: 'Child n2',
    },
    {
      name: 'child 2',
      parent: 'Child n2',
    },

    // {name: '', parent: 'Parent 1'},
    // {name: 'Child nn', parent: 'Parent 1', spouses: ['Wife 2'], children: null},
    // {name: 'Parent 2', parent: 'Root', spouses: ['Wife 2'], children: 2},
    // {name: 'Child 3', parent: 'Parent 2'},
    // {name: 'Child 4', parent: 'Parent 2', spouses: ['Wife 2'], children: 2},
    // {name: '', parent: 'Parent 2'},
    // {name: 'Child 5', parent: 'Child 4'},
    // {name: 'Child 6', parent: 'Child 4'},
  ]);
  const [bkUp, setBkUp] = useState([]);
  const [extTree, setExtTree] = useState(false);
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
      wifes: [],
      spouses: [],
      wifeChildrens: null,
      husbandChildrens: null,
      userChildren: [
        '65fa7545d5a2a2001268b4f8',
        '65fbcd83e9f33103f5005d24',
        '65fbd71fe9f33103f5008914',
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
          children: ['65fa7bbbca198a00e18c757f'],
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
      wifeChildrens: ['65fa7bbbca198a00e18c757f'],
      husbandChildrens: null,
      userChildren: [
        '65fa79b5ca198a00e18c6775',
        '65fa7af7ca198a00e18c6f39',
        '65fa7bbbca198a00e18c757f',
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
          children: ['65fa7bbbca198a00e18c757f'],
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
      _id: '65fbd71fe9f33103f5008914',
      personalDetails: {
        gender: 'male',
        relationStatus: 'single',
        profilepic: null,
        livingStatus: 'yes',
        name: 'SonThree',
        middlename: '',
        lastname: 'Fah',
      },
      parents: ['65fa7c35ca198a00e18c76c5'],
      wifes: [],
      wifeChildrens: null,
      husbandChildrens: null,
      userChildren: ['65fbd72fe9f33103f5008984'],
      husbands: [],
      spouses: [],
    },
    {
      _id: '65fa7bbbca198a00e18c757f',
      personalDetails: {
        gender: 'male',
        relationStatus: 'single',
        profilepic: null,
        livingStatus: 'yes',
        name: 'Lopper',
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
      _id: '65fbcd83e9f33103f5005d24',
      personalDetails: {
        gender: 'male',
        relationStatus: 'single',
        profilepic: null,
        livingStatus: 'yes',
        name: 'Alele',
        middlename: '',
        lastname: 'Fah',
      },
      parents: ['65fa7c35ca198a00e18c76c5'],
      wifes: [],
      wifeChildrens: null,
      husbandChildrens: null,
      userChildren: ['65fbcd92e9f33103f5005d98', '65fbcda2e9f33103f5005e14'],
      husbands: [],
      spouses: [],
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
  ]);

  function filterAndRemove(data) {
    let updatedData = [];

    for (let i = 1; i < data.length; i++) {
      const child = data[i];
      // -> adding plus button to spouse
      if (child?.userChildren?.length > 0 && child?.spouses?.length <= 0) {
        child?.spouses?.push(plusBox);
      }
      if (child.spouses && child.spouses.length > 0) {
        // Check if spouses exist and add gap if necessary
        const addEmptySpace = Array(child.spouses.length).fill({
          _id: '',
          personalDetails: {
            gender: '',
            relationStatus: '',
            profilepic: null,
            livingStatus: '',
            name: '',
            middlename: '',
            lastname: '',
          },
          parents: child.parents,
          wifes: [],
          wifeChildrens: null,
          husbandChildrens: null,
          userChildren: [],
          husbands: [],
          spouses: [],
        });
        updatedData = [...updatedData, child, ...addEmptySpace];
      } else {
        updatedData.push(child);
      }
    }
    return updatedData;
  }

  function renderNodes(node, index) {
    if (node?.data?.spouses?.length > 0) {
      // addGap(node.data,index)
    }
    return (
      <>
        {node?.data?._id && (
          <View
            key={index}
            style={{
              position: 'absolute',
              zIndex: 10,
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

  let filteredResult = filterAndRemove(descendants);
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

  function goToSpouseTree(spouseName, husbName) {
    const spouseData = [
      {
        name: 'spouseFather',
        parent: '',
        spouses: ['spouseMother'],
        children: 2,
      },
      {
        name: spouseName,
        parent: 'spouseFather',
        spouses: [husbName],
        children: null,
      },
    ];
    setBkUp(data);
    setData(spouseData);
    setExtTree(true);
    setTreeY(200);
  }

  function returnToOwnerTree() {
    setData(bkUp);
    setExtTree(false);
    setTreeY(500);
  }

  function renderSpouses(node, index, spouse) {
    return (
      <>
        {spouse.personalDetails.isPlus ? (
          <>{renderPlusButton(node, index, spouse)}</>
        ) : (
          <>
            <View
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

  function renderPlusButton(node, index, spouse) {
    return (
      <>
        <View
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

  return (
    <View style={{flex: 1}}>
      {true && (
        <GestureHandlerRootView>
          {/* <GestureDetector gesture={pinch}> */}
          {/* <Animated.View style={[animatedStylesScale]}> */}
          <GestureDetector gesture={composed}>
            <Animated.View style={[animatedStyles]}>
              {nodes.descendants().map((node, index) => (
                <>
                  {node?.data?.name && extTree && index === 1 && (
                    <TouchableOpacity
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
                      onPress={() => returnToOwnerTree()}>
                      <Text style={{textAlign: 'center'}}>🌳</Text>
                    </TouchableOpacity>
                  )}
                  {Array.isArray(node.data.spouses) && (
                    <>
                      {node.data.spouses.map((spouse, index) => (
                        <>
                          {index !== 0 && (
                            <TouchableOpacity
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
                                goToSpouseTree(spouse, node.data.name)
                              }>
                              <Text style={{textAlign: 'center'}}>🌳</Text>
                            </TouchableOpacity>
                          )}
                        </>
                      ))}
                    </>
                  )}
                </>
              ))}

              {/* spouse default connection when they have children */}

              {/* card height */}
              <Svg width={1500} height={1500} transform={{translateY: 30}}>
                {nodes.links().map((link, index) => (
                  <>
                    {link.target.data.personalDetails.name && (
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
                          (link.target.x - 25) +
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
                    {renderNodes(node, index)}

                    {/* below is spouse code */}
                    {Array.isArray(node.data.spouses) && (
                      <>
                        {node.data.spouses.map((spouse, index) => (
                          <View key={index}>
                            {index === 0 ? (
                              <>
                                {node?.data?.userChildren?.length > 0 ? (
                                  <Path
                                    //card height
                                    transform={{translateY: 45}}
                                    key={index}
                                    d={
                                      'M' +
                                      (node.x + 40) +
                                      ',' +
                                      (node.y - 15) +
                                      'h 30 '
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
                                      'M' +
                                      (node.x + 20) +
                                      ',' +
                                      (node.y - 15) +
                                      'h 40 '
                                    }
                                    fill="none"
                                    stroke="blue"
                                  />
                                )}
                              </>
                            ) : (
                              <>
                                <Path
                                  //card height
                                  transform={{translateY: 45 + index * 10}}
                                  key={index}
                                  d={
                                    'M' +
                                    (node.x + 20) +
                                    ',' +
                                    (node.y - 15) +
                                    `h ${40 + index * 140}`
                                  }
                                  fill="none"
                                  stroke="blue"
                                />
                              </>
                            )}
                            {/* below is spouse boxes */}
                            {renderSpouses(node, index, spouse)}
                          </View>
                        ))}
                        {/* spouse default connection when they have children */}
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
      )}
    </View>
  );
};

export default App;
