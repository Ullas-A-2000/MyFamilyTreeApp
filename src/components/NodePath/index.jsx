import React from 'react';
import {Path} from 'react-native-svg';

export default function NodePath({link, index}) {
  return (
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
  );
}
