import React, { useEffect, useState } from 'react';

import { Block, Text } from '@components';
import { FlashList } from '@shopify/flash-list';

export const MyHolding = () => {
  // state
  const [data, setData] = useState([]);

  // effect
  useEffect(() => {
    const arr = [];

    for (let i = 0; i < 20; i++) {
      arr.push(i);
    }

    setData(arr as any);
  }, []);

  // render
  return (
    <FlashList
      key={1}
      data={data}
      contentContainerStyle={{
        paddingVertical: 16,
      }}
      renderItem={({ item }) => (
        <Block height={35} color="brown" middle>
          <Text center>My holdings: {item}</Text>
        </Block>
      )}
      estimatedItemSize={35}
    />
  );
};
