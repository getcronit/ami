export const buttonStyles = {
  components: {
    Button: {
      variants: {
        'no-hover': {
          _hover: {
            boxShadow: 'none'
          }
        },
        'transparent-with-icon': {
          bg: 'transparent',
          fontWeight: 'bold',
          borderRadius: 'inherit',
          cursor: 'pointer',
          _hover: 'none',
          _active: {
            bg: 'transparent',
            transform: 'none',
            borderColor: 'transparent'
          },
          _focus: {
            boxShadow: 'none'
          },
          _hover: {
            boxShadow: 'none'
          }
        },
        darkghost: {
          bg: 'transparent',
          color: 'white',
          _hover: {
            bg: 'gray.700',
            color: 'white'
          },
          _active: {
            bg: 'transparent',
            color: 'white'
          },
          _focus: {
            boxShadow: 'none'
          }
        }
      },
      baseStyle: {
        borderRadius: '15px',
        _focus: {
          boxShadow: 'none'
        }
      }
    }
  }
}
