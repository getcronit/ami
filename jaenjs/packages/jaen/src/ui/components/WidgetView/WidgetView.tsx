import {Button, Flex, Stack, VStack} from '@chakra-ui/react'

import {useAdminWidgets} from '../../../services/widgets/useAdminWidgets'

export interface WidgetViewProps {}

export const WidgetView = (props: WidgetViewProps) => {
  const {widgets, selectedWidgetIndex, toggleWidget} = useAdminWidgets()

  // console.log('SelectedWidget', SelectedWidget)

  const Widget =
    selectedWidgetIndex !== null ? widgets[selectedWidgetIndex] : null

  return (
    <Flex h="full">
      <Stack
        w="15rem"
        h="full"
        bg="gray.800"
        p={2}
        display={widgets.length > 0 ? 'flex' : 'none'}>
        {/* <Heading size="md" color="gray.400" px="4" py="2">
          Widgets
        </Heading> */}

        <VStack onClick={() => toggleWidget(null)}>
          {widgets.map((widget, i) => {
            const {Icon, name} = widget.options

            return (
              <Button
                color="white"
                bg="gray.700"
                _hover={{bg: 'gray.600'}}
                _active={{bg: 'gray.600'}}
                isActive={Widget?.options?.name === name}
                justifyContent="left"
                w="full"
                leftIcon={<Icon />}
                onClick={() => toggleWidget(i)}>
                {name}
              </Button>
            )
          })}
        </VStack>
      </Stack>

      {Widget && <Widget />}

      {/* <Box>{SelectedWidget ? <SelectedWidget /> : <div>Nothing</div>}</Box> */}
    </Flex>
  )
}
