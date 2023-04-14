import React, { useEffect, useState } from 'react';

import { Block, Text } from '@components';

export const Following = () => {
  // state
  const [data, setData] = useState<Array<number>>([]);

  // effect
  useEffect(() => {
    const arr = [];

    for (let i = 0; i < 100; i++) {
      arr.push(i);
    }

    setData(arr);
  }, []);

  // render
  return (
    <Block>
      <Text text={'Following'} fontWeight="700" />
      {data.map(item => (
        <Block marginTop={16} key={item.toString()}>
          <Text text={item.toString()} />
        </Block>
      ))}
    </Block>
  );
};
