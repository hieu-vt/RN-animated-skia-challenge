import React, { useEffect, useState } from 'react';

import { Block, Text } from '@components';

export const MyHolding = () => {
  // state
  const [data, setData] = useState<Array<number>>([]);

  // effect
  useEffect(() => {
    const arr = [];

    for (let i = 0; i < 20; i++) {
      arr.push(i);
    }

    setData(arr);
  }, []);

  // render
  return (
    <Block block>
      <Text text={'My holding'} fontWeight="700" />
      {data.map(item => (
        <Block marginTop={16} key={item.toString()}>
          <Text text={item.toString()} />
        </Block>
      ))}
    </Block>
  );
};
