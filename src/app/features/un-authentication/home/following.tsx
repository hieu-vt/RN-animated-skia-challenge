import React from 'react';

import { Block, Text } from '@components';
import { FlashList } from '@shopify/flash-list';

const arr = Array(100)
  .fill(0)
  .map((_, i) => i);

export const Following = () => {
  // state

  // render
  return (
    <FlashList
      key={2}
      data={arr}
      contentContainerStyle={{
        paddingVertical: 16,
      }}
      renderItem={({ item }) => (
        <Block height={35} color="blue" middle>
          <Text center>My holdings: {item}</Text>
        </Block>
      )}
      estimatedItemSize={50}
    />
  );
};
