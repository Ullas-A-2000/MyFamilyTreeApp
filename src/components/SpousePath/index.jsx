import React from 'react';
import {Path} from 'react-native-svg';

export default function SpousePath({node, index}) {
  return (
    <>
      {index === 0 ? (
        <>
          {node?.data?.userChildren?.length > 0 ? (
            <Path
              transform={{translateY: 45}}
              key={index}
              d={'M' + (node.x + 40) + ',' + (node.y - 15) + 'h 30 '}
              fill="none"
              stroke="blue"
            />
          ) : (
            // spouse connection when they dont have children
            <Path
              transform={{translateY: 45}}
              key={index}
              d={'M' + (node.x + 20) + ',' + (node.y - 15) + 'h 40 '}
              fill="none"
              stroke="blue"
            />
          )}
        </>
      ) : (
        <Path
          transform={{translateY: 45 + index * 10}}
          key={index}
          d={
            'M' + (node.x + 20) + ',' + (node.y - 15) + `h ${40 + index * 120}`
          }
          fill="none"
          stroke="blue"
        />
      )}
    </>
  );
}
