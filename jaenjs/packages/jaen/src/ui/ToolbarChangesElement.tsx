import {
  Box,
  Button, Divider
} from '@chakra-ui/react';
import { useChanges } from '../services/hooks';
import React from 'react';


export const ToolbarChangesElement = () => {
  const { totalChanges } = useChanges();

  if (totalChanges === 0) {
    return null;
  }

  return (
    <>
      <Box>
        <Divider orientation="vertical" color="red" />
      </Box>
      <Button
        variant={'ghost'}
        size="sm"
        fontWeight="normal"
        pointerEvents={'none'}>
        {totalChanges} {totalChanges === 1 ? 'change' : 'changes'}
      </Button>
      <Box>
        <Divider orientation="vertical" color="red" />
      </Box>
    </>
  );
};
