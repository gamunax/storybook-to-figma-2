export const config = {
  option: {
      type: 'variant',
      description: 'hello world',
      value: {        
        color: '$semanticColor.text.default',
        padding: '6px 16px',
        display: 'flex',
        alignItems: 'center',
      },
      states: {
        hover: {
          type: 'state',
          description: 'hover state for option',
          value: {
            backgroundColor: '$semanticColor.background.neutral.soft-hover',
            cursor: 'pointer',
          }
        },
      },
      neutral: {
        type: 'variant',
        description: 'hello world',
        selected: {
          type: 'state',
          description: 'selected state for default option',
          value: {
            backgroundColor: '$semanticColor.background-selected-rest',
            cursor: 'pointer',
          }
        },
        disabled: {
          type: 'state',
          description: 'selected state for default option',
          value: {
            backgroundColor: '$semanticColor.background.disabled',
            color: '$semanticColor.text.disabled',
            cursor: 'not-allowed',
          }
        },
      },
      brand: {
        type: 'variant',
        description: 'hello world',      
        selected: {
          type: 'state',
          description: 'selected state for primary option',
          value: {
            backgroundColor: '$semanticColor.background-selected-rest',
            cursor: 'pointer',
          }
        },
        active: {
          type: 'state',
          description: 'selected state for primary option',
          value: {
            backgroundColor: '$semanticColor.background.brand.soft-hover',
            cursor: 'pointer',
          }
        },
        disabled: {
          type: 'state',
          description: 'selected state for primary option',
          value: {
            backgroundColor: '$semanticColor.background.disabled',
            color: '$semanticColor.text.disabled',
            cursor: 'not-allowed',
          }
        },
      },
      danger: {
        type: 'variant',
        description: 'hello world',      
        selected: {
          type: 'state',
          description: 'selected state for error option',
          value: {
            backgroundColor: '$semanticColor.background-selected-rest',
            cursor: 'pointer',
          }
        },
        disabled: {
          type: 'state',
          description: 'selected state for error option',
          value: {
            backgroundColor: 'transparent',
            color: '$semanticColor.text.disabled',
            cursor: 'not-allowed',
          }
        },
      },
      caution: {
        type: 'variant',
        description: 'hello world',      
        selected: {
          type: 'state',
          description: 'selected state for warning option',
          value: {
            backgroundColor: '$semanticColor.background-selected-rest',
            cursor: 'pointer',
          }
        },
        disabled: {
          type: 'state',
          description: 'selected state for warning option',
          value: {
            backgroundColor: 'transparent',
            color: '$semanticColor.text.disabled',
            cursor: 'not-allowed',
          }
        },
      },
      success: {
        type: 'variant',
        description: 'hello world',      
        selected: {
          type: 'state',
          description: 'selected state for success option',
          value: {
            backgroundColor: '$semanticColor.background-selected-rest',
            cursor: 'pointer',
          }
        },
        disabled: {
          type: 'state',
          description: 'selected state for success option',
          value: {
            backgroundColor: 'transparent',
            color: '$semanticColor.text.disabled',
            cursor: 'not-allowed',
          }
        },
      },
      info: {
        type: 'variant',
        description: 'hello world',      
        selected: {
          type: 'state',
          description: 'selected state for info option',
          value: {
            backgroundColor: '$semanticColor.background-selected-rest',
            cursor: 'pointer',
          }
        },
        disabled: {
          type: 'state',
          description: 'selected state for info option',
          value: {
            backgroundColor: 'transparent',
            color: '$semanticColor.text.disabled',
            cursor: 'not-allowed',
          }
        },
      },
  },
}

