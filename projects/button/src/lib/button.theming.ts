export const config = {
  button: {
    brand: {
      strong: {
        type: 'variant',
        description: 'hello world',
        value: {
          background: '$semanticColor.background.brand.strong-rest',
          color: '$semanticColor.text-inverse',
          border: 'none',
        },
        states: {
          hover: {
            type: 'state',
            description: 'hover state for brand contained buttons',
            value: {
              background: '$semanticColor.background.brand.strong-hover',
            },
          },
          focus: {
            type: 'state',
            description: 'focus state for brand contained buttons',
            value: {
              background: '$semanticColor.background.brand.strong-active',
            },
          },
          active: {
            type: 'state',
            description: 'active state for primary contained buttons',
            value: {
              background: '$semanticColor.background.brand.strong-active !important',
            },
          },
          disabled: {
            type: 'state',
            description: 'disabled state for brand contained buttons',
            value: {
              color: '$semanticColor.text.disabled',
              background: '$semanticColor.background.disabled',
              cursor: 'not-allowed',
            },
          },
          'disabled:hover': {
            type: 'state',
            description: 'hover state for disabled buttons',
            value: {
              color: '$semanticColor.text.disabled',
              background: '$semanticColor.background.disabled',
            },
          },
        },
      },
      contained: {
        // support backwards compatibility deprecated
        type: 'variant',
        description: 'hello world',
        value: {
          background: '$semanticColor.background.brand.strong-rest',
          color: '$semanticColor.text-inverse',
          border: 'none',
        },
        states: {
          hover: {
            type: 'state',
            description: 'hover state for brand contained buttons',
            value: {
              background: '$semanticColor.background.brand.strong-hover',
            },
          },
          focus: {
            type: 'state',
            description: 'focus state for brand contained buttons',
            value: {
              background: '$semanticColor.background.brand.strong-active',
            },
          },
          active: {
            type: 'state',
            description: 'active state for primary contained buttons',
            value: {
              background: '$semanticColor.background.brand.strong-active !important',
            },
          },
          disabled: {
            type: 'state',
            description: 'disabled state for brand contained buttons',
            value: {
              color: '$semanticColor.text.disabled',
              background: '$semanticColor.background.disabled',
              cursor: 'not-allowed',
            },
          },
          'disabled:hover': {
            type: 'state',
            description: 'hover state for disabled buttons',
            value: {
              color: '$semanticColor.text.disabled',
              background: '$semanticColor.background.disabled',
            },
          },
        },
      },
      soft: {
        type: 'variant',
        description: 'hello world',
        value: {
          background: '$semanticColor.background.brand.rest',
          color: '$semanticColor.text.helper.brand',
          border: 'none',
        },
        states: {
          hover: {
            type: 'state',
            description: 'hover state for brand buttons',
            value: {
              background: '$semanticColor.background.brand.soft-hover',
            },
          },
          focus: {
            type: 'state',
            description: 'focus state for brand buttons',
            value: {
              background: '$semanticColor.background.brand.soft-active',
            },
          },
          active: {
            type: 'state',
            description: 'active state for brand buttons',
            value: {
              background: '$semanticColor.background.brand.soft-active !important',
            },
          },
          disabled: {
            type: 'state',
            description: 'disabled state for brand buttons',
            value: {
              color: '$semanticColor.text.disabled',
              background: '$semanticColor.background.disabled',
              cursor: 'not-allowed',
            },
          },
          'disabled:hover': {
            type: 'state',
            description: 'hover state for disabled buttons',
            value: {
              color: '$semanticColor.text.disabled',
              background: '$semanticColor.background.disabled',
            },
          },
        },
      },
      outlined: {
        type: 'variant',
        description: 'hello world',
        value: {
          background: 'transparent',
          color: '$semanticColor.text.helper.brand',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: '$semanticColor.border.brand-soft',
        },
        states: {
          hover: {
            type: 'state',
            description: 'hover state for primary contained buttons',
            value: {
              background: '$semanticColor.background.brand.soft-hover',
              borderColor: '$semanticColor.background.brand.soft-hover',
            },
          },
          focus: {
            type: 'state',
            description: 'focus state for primary contained buttons',
            value: {
              background: '$semanticColor.background.brand.soft-active',
              borderColor: '$semanticColor.background.brand.soft-active',
              color: '$semanticColor.text.helper.brand',
            },
          },
          active: {
            type: 'state',
            description: 'active state for primary contained buttons',
            value: {
              background: '$semanticColor.background.brand.soft-active !important',
              color: '$semanticColor.text.helper.brand',
            },
          },
          disabled: {
            type: 'state',
            description: 'disabled state for primary contained buttons',
            value: {
              background: 'transparent',
              color: '$semanticColor.text.disabled',
              border: 'none',
              cursor: 'not-allowed',
            },
          },
          'disabled:hover': {
            type: 'state',
            description: 'hover state for disabled buttons',
            value: {
              background: 'transparent',
              color: '$semanticColor.text.disabled',
              border: 'none',
            },
          },
        },
      },
      'no-fill': {
        type: 'variant',
        description: 'hello world',
        value: {
          background: 'transparent',
          color: '$semanticColor.text.helper.brand',
          border: 'none',
        },
        states: {
          hover: {
            type: 'state',
            description: 'hover state for primary contained buttons',
            value: {
              background: '$semanticColor.background.brand.soft-hover',
              color: '$semanticColor.text.helper.brand',
            },
          },
          focus: {
            type: 'state',
            description: 'focus state for primary contained buttons',
            value: {
              background: '$semanticColor.background.brand.soft-active',
              color: '$semanticColor.text.helper.brand',
            },
          },
          active: {
            type: 'state',
            description: 'active state for primary contained buttons',
            value: {
              background: '$semanticColor.background.brand.soft-active !important',
              color: '$semanticColor.text.helper.brand',
            },
          },
          disabled: {
            type: 'state',
            description: 'disabled state for primary contained buttons',
            value: {
              color: '$semanticColor.text.disabled',
              background: 'transparent',
              border: 'none',
              cursor: 'not-allowed',
            },
          },
          'disabled:hover': {
            type: 'state',
            description: 'hover state for disabled buttons',
            value: {
              color: '$semanticColor.text.disabled',
              background: 'transparent',
              border: 'none',
            },
          },
        },
      },
      text: {
        // support backwards compatibility deprecated
        type: 'variant',
        description: 'hello world',
        value: {
          background: 'transparent',
          color: '$semanticColor.text.helper.brand',
          border: 'none',
        },
        states: {
          hover: {
            type: 'state',
            description: 'hover state for primary contained buttons',
            value: {
              background: '$semanticColor.background.brand.strong-hover',
              color: '$semanticColor.text-inverse',
            },
          },
          focus: {
            type: 'state',
            description: 'focus state for primary contained buttons',
            value: {
              background: '$semanticColor.background.brand.strong-active',
              color: '$semanticColor.text-inverse',
            },
          },
          active: {
            type: 'state',
            description: 'active state for primary contained buttons',
            value: {
              background: '$semanticColor.background.brand.strong-active !important',
              color: '$semanticColor.text-inverse',
            },
          },
          disabled: {
            type: 'state',
            description: 'disabled state for primary contained buttons',
            value: {
              color: '$semanticColor.text.disabled',
              background: '$semanticColor.background.disabled',
              border: 'none',
              cursor: 'not-allowed',
            },
          },
          'disabled:hover': {
            type: 'state',
            description: 'hover state for disabled buttons',
            value: {
              background: '$semanticColor.background.disabled',
              border: 'none',
            },
          },
        },
      },
    },
    neutral: {
      strong: {
        type: 'variant',
        description: 'hello world',
        value: {
          background: '$semanticColor.background.neutral.strong-rest',
          color: '$semanticColor.text-inverse',
          border: 'none',
        },
        states: {
          hover: {
            type: 'state',
            description: 'hover state for neutral contained buttons',
            value: {
              background: '$semanticColor.background.neutral.strong-hover',
            },
          },
          focus: {
            type: 'state',
            description: 'focus state for neutral contained buttons',
            value: {
              background: '$semanticColor.background.neutral.strong-active',
            },
          },
          active: {
            type: 'state',
            description: 'active state for neutral contained buttons',
            value: {
              background: '$semanticColor.background.neutral.strong-active !important',
            },
          },
          disabled: {
            type: 'state',
            description: 'disabled state for neutral contained buttons',
            value: {
              color: '$semanticColor.text.disabled',
              background: '$semanticColor.background.disabled',
              cursor: 'not-allowed',
            },
          },
          'disabled:hover': {
            type: 'state',
            description: 'hover state for disabled buttons',
            value: {
              color: '$semanticColor.text.disabled',
              background: '$semanticColor.background.disabled',
            },
          },
        },
      },
      contained: {
        // support backwards compatibility deprecated
        type: 'variant',
        description: 'hello world',
        value: {
          background: '$semanticColor.background.neutral.strong-rest',
          color: '$semanticColor.text-inverse',
          border: 'none',
        },
        states: {
          hover: {
            type: 'state',
            description: 'hover state for neutral contained buttons',
            value: {
              background: '$semanticColor.background.neutral.strong-hover',
            },
          },
          focus: {
            type: 'state',
            description: 'focus state for neutral contained buttons',
            value: {
              background: '$semanticColor.background.neutral.strong-active',
            },
          },
          active: {
            type: 'state',
            description: 'active state for neutral contained buttons',
            value: {
              background: '$semanticColor.background.neutral.strong-active !important',
            },
          },
          disabled: {
            type: 'state',
            description: 'disabled state for neutral contained buttons',
            value: {
              color: '$semanticColor.text.disabled',
              background: '$semanticColor.background.disabled',
              cursor: 'not-allowed',
            },
          },
          'disabled:hover': {
            type: 'state',
            description: 'hover state for disabled buttons',
            value: {
              color: '$semanticColor.text.disabled',
              background: '$semanticColor.background.disabled',
            },
          },
        },
      },
      soft: {
        type: 'variant',
        description: 'hello world',
        value: {
          background: '$semanticColor.background.neutral.rest',
          color: '$semanticColor.text.default',
          border: 'none',
        },
        states: {
          hover: {
            type: 'state',
            description: 'hover state for neutral contained buttons',
            value: {
              background: '$semanticColor.background.neutral.hover',
            },
          },
          focus: {
            type: 'state',
            description: 'focus state for neutral contained buttons',
            value: {
              background: '$semanticColor.background.neutral.strong-active',
            },
          },
          active: {
            type: 'state',
            description: 'active state for neutral contained buttons',
            value: {
              background: '$semanticColor.background.neutral.strong-active !important',
            },
          },
          disabled: {
            type: 'state',
            description: 'disabled state for primary contained buttons',
            value: {
              color: '$semanticColor.text.disabled',
              background: '$semanticColor.background.disabled',
              cursor: 'not-allowed',
            },
          },
          'disabled:hover': {
            type: 'state',
            description: 'hover state for disabled buttons',
            value: {
              color: '$semanticColor.text.disabled',
              background: '$semanticColor.background.disabled',
            },
          },
        },
      },
      outlined: {
        type: 'variant',
        description: 'hello world',
        value: {
          background: 'transparent',
          color: '$semanticColor.text.helper.neutral',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: '$semanticColor.border.neutral-soft',
        },
        states: {
          hover: {
            type: 'state',
            description: 'hover state for primary contained buttons',
            value: {
              background: '$semanticColor.background.neutral.soft-hover',
              borderColor: '$semanticColor.border.neutral-soft',
              color: '$semanticColor.text.helper.neutral',
            },
          },
          focus: {
            type: 'state',
            description: 'focus state for primary contained buttons',
            value: {
              background: '$semanticColor.background.neutral.soft-active',
              color: '$semanticColor.text.helper.neutral',
            },
          },
          active: {
            type: 'state',
            description: 'active state for primary contained buttons',
            value: {
              background: '$semanticColor.background.neutral.soft-active !important',
              color: '$semanticColor.text.helper.neutral',
            },
          },
          disabled: {
            type: 'state',
            description: 'disabled state for primary contained buttons',
            value: {
              background: 'transparent',
              color: '$semanticColor.text.disabled',
              border: 'none',
              cursor: 'not-allowed',
            },
          },
          'disabled:hover': {
            type: 'state',
            description: 'hover state for disabled buttons',
            value: {
              background: 'transparent',
              color: '$semanticColor.text.disabled',
              border: 'none',
            },
          },
        },
      },
      'no-fill': {
        type: 'variant',
        description: 'hello world',
        value: {
          background: 'transparent',
          color: '$semanticColor.text.helper.neutral',
          border: 'none',
        },
        states: {
          hover: {
            type: 'state',
            description: 'hover state for neutral contained buttons',
            value: {
              background: '$semanticColor.background.neutral.soft-hover',
              color: '$semanticColor.text.helper.neutral',
            },
          },
          focus: {
            type: 'state',
            description: 'focus state for neutral contained buttons',
            value: {
              background: '$semanticColor.background.neutral.soft-active',
              color: '$semanticColor.text.helper.neutral',
            },
          },
          active: {
            type: 'state',
            description: 'active state for primary contained buttons',
            value: {
              background: '$semanticColor.background.neutral.soft-active !important',
              color: '$semanticColor.text.helper.neutral',
            },
          },
          disabled: {
            type: 'state',
            description: 'disabled state for primary contained buttons',
            value: {
              color: '$semanticColor.text.disabled',
              background: 'transparent',
              border: 'none',
              cursor: 'not-allowed',
            },
          },
          'disabled:hover': {
            type: 'state',
            description: 'hover state for disabled buttons',
            value: {
              color: '$semanticColor.text.disabled',
              background: 'transparent',
              border: 'none',
            },
          },
        },
      },
      text: {
        // support backwards compatibility deprecated
        type: 'variant',
        description: 'hello world',
        value: {
          background: 'transparent',
          color: '$semanticColor.text.helper.neutral',
          border: 'none',
        },
        states: {
          hover: {
            type: 'state',
            description: 'hover state for neutral contained buttons',
            value: {
              background: '$semanticColor.background.neutral.strong-hover',
              color: '$semanticColor.text-inverse',
            },
          },
          focus: {
            type: 'state',
            description: 'focus state for neutral contained buttons',
            value: {
              background: '$semanticColor.background.neutral.strong-active',
              color: '$semanticColor.text-inverse',
            },
          },
          active: {
            type: 'state',
            description: 'active state for primary contained buttons',
            value: {
              background: '$semanticColor.background.neutral.strong-active !important',
              color: '$semanticColor.text-inverse',
            },
          },
          disabled: {
            type: 'state',
            description: 'disabled state for primary contained buttons',
            value: {
              color: '$semanticColor.text.disabled',
              background: '$semanticColor.background.disabled',
              border: 'none',
              cursor: 'not-allowed',
            },
          },
          'disabled:hover': {
            type: 'state',
            description: 'hover state for disabled buttons',
            value: {
              color: '$semanticColor.text.disabled',
              background: '$semanticColor.background.disabled',
              border: 'none',
            },
          },
        },
      },
    },
    danger: {
      strong: {
        type: 'variant',
        description: 'hello world',
        value: {
          background: '$semanticColor.background.danger.strong-rest',
          color: '$semanticColor.text-inverse',
          border: 'none',
        },
        states: {
          hover: {
            type: 'state',
            description: 'hover state for danger contained buttons',
            value: {
              background: '$semanticColor.background.danger.strong-hover',
            },
          },
          focus: {
            type: 'state',
            description: 'focus state for danger contained buttons',
            value: {
              background: '$semanticColor.background.danger.strong-active',
            },
          },
          active: {
            type: 'state',
            description: 'active state for danger contained buttons',
            value: {
              background: '$semanticColor.background.danger.strong-active !important',
            },
          },
          disabled: {
            type: 'state',
            description: 'disabled state for danger contained buttons',
            value: {
              color: '$semanticColor.text.disabled',
              background: '$semanticColor.background.disabled',
              cursor: 'not-allowed',
            },
          },
          'disabled:hover': {
            type: 'state',
            description: 'hover state for disabled buttons',
            value: {
              color: '$semanticColor.text.disabled',
              background: '$semanticColor.background.disabled',
            },
          },
        },
      },
      contained: {
        // support backwards compatibility deprecated
        type: 'variant',
        description: 'hello world',
        value: {
          background: '$semanticColor.background.danger.strong-rest',
          color: '$semanticColor.text-inverse',
          border: 'none',
        },
        states: {
          hover: {
            type: 'state',
            description: 'hover state for danger contained buttons',
            value: {
              background: '$semanticColor.background.danger.strong-hover',
            },
          },
          focus: {
            type: 'state',
            description: 'focus state for danger contained buttons',
            value: {
              background: '$semanticColor.background.danger.strong-active',
            },
          },
          active: {
            type: 'state',
            description: 'active state for danger contained buttons',
            value: {
              background: '$semanticColor.background.danger.strong-active !important',
            },
          },
          disabled: {
            type: 'state',
            description: 'disabled state for danger contained buttons',
            value: {
              color: '$semanticColor.text.disabled',
              background: '$semanticColor.background.disabled',
              cursor: 'not-allowed',
            },
          },
          'disabled:hover': {
            type: 'state',
            description: 'hover state for disabled buttons',
            value: {
              color: '$semanticColor.text.disabled',
              background: '$semanticColor.background.disabled',
            },
          },
        },
      },
      soft: {
        type: 'variant',
        description: 'hello world',
        value: {
          background: '$semanticColor.background.danger.rest',
          color: '$semanticColor.text.default',
          border: 'none',
        },
        states: {
          hover: {
            type: 'state',
            description: 'hover state for danger contained buttons',
            value: {
              background: '$semanticColor.background.danger.hover',
            },
          },
          focus: {
            type: 'state',
            description: 'focus state for danger contained buttons',
            value: {
              background: '$semanticColor.background.danger.strong-active',
            },
          },
          active: {
            type: 'state',
            description: 'active state for danger contained buttons',
            value: {
              background: '$semanticColor.background.danger.strong-active !important',
            },
          },
          disabled: {
            type: 'state',
            description: 'disabled state for danger contained buttons',
            value: {
              color: '$semanticColor.text.disabled',
              background: '$semanticColor.background.disabled',
              cursor: 'not-allowed',
            },
          },
          'disabled:hover': {
            type: 'state',
            description: 'hover state for disabled buttons',
            value: {
              color: '$semanticColor.text.disabled',
              background: '$semanticColor.background.disabled',
            },
          },
        },
      },
      outlined: {
        type: 'variant',
        description: 'hello world',
        value: {
          background: 'transparent',
          color: '$semanticColor.text.helper.danger',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: '$semanticColor.border.danger-soft',
        },
        states: {
          hover: {
            type: 'state',
            description: 'hover state for danger contained buttons',
            value: {
              background: '$semanticColor.background.danger.soft-hover',
              color: '$semanticColor.text.helper.danger',
              borderColor: '$semanticColor.border.danger-soft',
            },
          },
          focus: {
            type: 'state',
            description: 'focus state for danger contained buttons',
            value: {
              background: '$semanticColor.background.danger.soft-active',
              color: '$semanticColor.text-inverse',
            },
          },
          active: {
            type: 'state',
            description: 'active state for danger contained buttons',
            value: {
              background: '$semanticColor.background.danger.soft-active !important',
              color: '$semanticColor.text-inverse',
            },
          },
          disabled: {
            type: 'state',
            description: 'disabled state for danger contained buttons',
            value: {
              color: '$semanticColor.text.disabled',
              background: 'transparent',
              border: 'none',
              cursor: 'not-allowed',
            },
          },
          'disabled:hover': {
            type: 'state',
            description: 'hover state for disabled buttons',
            value: {
              color: '$semanticColor.text.disabled',
              background: 'transparent',
              border: 'none',
            },
          },
        },
      },
      'no-fill': {
        type: 'variant',
        description: 'hello world',
        value: {
          background: 'transparent',
          color: '$semanticColor.text.helper.danger',
          border: 'none',
        },
        states: {
          hover: {
            type: 'state',
            description: 'hover state for danger contained buttons',
            value: {
              background: '$semanticColor.background.danger.soft-hover',
              color: '$semanticColor.text.helper.danger',
            },
          },
          focus: {
            type: 'state',
            description: 'focus state for danger contained buttons',
            value: {
              background: '$semanticColor.background.danger.soft-active',
              color: '$semanticColor.text.helper.danger',
            },
          },
          active: {
            type: 'state',
            description: 'active state for danger contained buttons',
            value: {
              background: '$semanticColor.background.danger.soft-active !important',
              color: '$semanticColor.text.helper.danger',
            },
          },
          disabled: {
            type: 'state',
            description: 'disabled state for danger contained buttons',
            value: {
              color: '$semanticColor.text.disabled',
              background: 'transparent',
              border: 'none',
              cursor: 'not-allowed',
            },
          },
          'disabled:hover': {
            type: 'state',
            description: 'hover state for disabled buttons',
            value: {
              color: '$semanticColor.text.disabled',
              background: 'transparent',
              border: 'none',
            },
          },
        },
      },
      text: {
        // support backwards compatibility deprecated
        type: 'variant',
        description: 'hello world',
        value: {
          background: 'transparent',
          color: '$semanticColor.text.helper.danger',
          border: 'none',
        },
        states: {
          hover: {
            type: 'state',
            description: 'hover state for danger contained buttons',
            value: {
              background: '$semanticColor.background.danger.strong-hover',
              color: '$semanticColor.text-inverse',
            },
          },
          focus: {
            type: 'state',
            description: 'focus state for danger contained buttons',
            value: {
              background: '$semanticColor.background.danger.strong-active',
              color: '$semanticColor.text-inverse',
            },
          },
          active: {
            type: 'state',
            description: 'active state for danger contained buttons',
            value: {
              background: '$semanticColor.background.danger.strong-active !important',
              color: '$semanticColor.text-inverse',
            },
          },
          disabled: {
            type: 'state',
            description: 'disabled state for danger contained buttons',
            value: {
              color: '$semanticColor.text.disabled',
              background: '$semanticColor.background.disabled',
              border: 'none',
              cursor: 'not-allowed',
            },
          },
          'disabled:hover': {
            type: 'state',
            description: 'hover state for disabled buttons',
            value: {
              color: '$semanticColor.text.disabled',
              background: '$semanticColor.background.disabled',
              border: 'none',
            },
          },
        },
      },
    },
    success: {
      strong: {
        type: 'variant',
        description: 'hello world',
        value: {
          background: '$semanticColor.background.success.strong-rest',
          color: '$semanticColor.text-inverse',
          border: 'none',
        },
        states: {
          hover: {
            type: 'state',
            description: 'hover state for success contained buttons',
            value: {
              background: '$semanticColor.background.success.strong-hover',
            },
          },
          focus: {
            type: 'state',
            description: 'focus state for success contained buttons',
            value: {
              background: '$semanticColor.background.success.strong-active',
            },
          },
          active: {
            type: 'state',
            description: 'active state for success contained buttons',
            value: {
              background: '$semanticColor.background.success.strong-active !important',
            },
          },
          disabled: {
            type: 'state',
            description: 'disabled state for success contained buttons',
            value: {
              color: '$semanticColor.text.disabled',
              background: '$semanticColor.background.disabled',
              cursor: 'not-allowed',
            },
          },
          'disabled:hover': {
            type: 'state',
            description: 'hover state for disabled buttons',
            value: {
              color: '$semanticColor.text.disabled',
              background: '$semanticColor.background.disabled',
            },
          },
        },
      },
      contained: {
        // support backwards compatibility deprecated
        type: 'variant',
        description: 'hello world',
        value: {
          background: '$semanticColor.background.success.strong-rest',
          color: '$semanticColor.text-inverse',
          border: 'none',
        },
        states: {
          hover: {
            type: 'state',
            description: 'hover state for success contained buttons',
            value: {
              background: '$semanticColor.background.success.strong-hover',
            },
          },
          focus: {
            type: 'state',
            description: 'focus state for success contained buttons',
            value: {
              background: '$semanticColor.background.success.strong-active',
            },
          },
          active: {
            type: 'state',
            description: 'active state for success contained buttons',
            value: {
              background: '$semanticColor.background.success.strong-active !important',
            },
          },
          disabled: {
            type: 'state',
            description: 'disabled state for success contained buttons',
            value: {
              color: '$semanticColor.text.disabled',
              background: '$semanticColor.background.disabled',
              cursor: 'not-allowed',
            },
          },
          'disabled:hover': {
            type: 'state',
            description: 'hover state for disabled buttons',
            value: {
              color: '$semanticColor.text.disabled',
              background: '$semanticColor.background.disabled',
            },
          },
        },
      },
      soft: {
        type: 'variant',
        description: 'hello world',
        value: {
          background: '$semanticColor.background.success.rest',
          color: '$semanticColor.text.default',
          border: 'none',
        },
        states: {
          hover: {
            type: 'state',
            description: 'hover state for success contained buttons',
            value: {
              background: '$semanticColor.background.success.hover',
            },
          },
          focus: {
            type: 'state',
            description: 'focus state for success contained buttons',
            value: {
              background: '$semanticColor.background.success.strong-active',
            },
          },
          active: {
            type: 'state',
            description: 'active state for success contained buttons',
            value: {
              background: '$semanticColor.background.success.strong-active !important',
            },
          },
          disabled: {
            type: 'state',
            description: 'disabled state for success contained buttons',
            value: {
              color: '$semanticColor.text.disabled',
              background: '$semanticColor.background.disabled',
              cursor: 'not-allowed',
            },
          },
          'disabled:hover': {
            type: 'state',
            description: 'hover state for disabled buttons',
            value: {
              color: '$semanticColor.text.disabled',
              background: '$semanticColor.background.disabled',
            },
          },
        },
      },
      outlined: {
        type: 'variant',
        description: 'hello world',
        value: {
          background: 'transparent',
          color: '$semanticColor.text.helper.success',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: '$semanticColor.border.success-soft',
        },
        states: {
          hover: {
            type: 'state',
            description: 'hover state for success contained buttons',
            value: {
              background: '$semanticColor.background.success.soft-hover',
              color: '$semanticColor.text.helper.success',
              borderColor: '$semanticColor.border.success-soft',
            },
          },
          focus: {
            type: 'state',
            description: 'focus state for success contained buttons',
            value: {
              background: '$semanticColor.background.success.soft-active',
              color: '$semanticColor.text-inverse',
            },
          },
          active: {
            type: 'state',
            description: 'active state for success contained buttons',
            value: {
              background: '$semanticColor.background.success.soft-active !important',
              color: '$semanticColor.text-inverse',
            },
          },
          disabled: {
            type: 'state',
            description: 'disabled state for success contained buttons',
            value: {
              color: '$semanticColor.text.disabled',
              background: 'transparent',
              border: 'none',
              cursor: 'not-allowed',
            },
          },
          'disabled:hover': {
            type: 'state',
            description: 'hover state for disabled buttons',
            value: {
              color: '$semanticColor.text.disabled',
              background: 'transparent',
              border: 'none',
            },
          },
        },
      },
      'no-fill': {
        type: 'variant',
        description: 'hello world',
        value: {
          background: 'transparent',
          color: '$semanticColor.text.helper.success',
          border: 'none',
        },
        states: {
          hover: {
            type: 'state',
            description: 'hover state for success contained buttons',
            value: {
              background: '$semanticColor.background.success.soft-hover',
              color: '$semanticColor.text.helper.success',
            },
          },
          focus: {
            type: 'state',
            description: 'focus state for success contained buttons',
            value: {
              background: '$semanticColor.background.success.soft-active',
              color: '$semanticColor.text.helper.success',
            },
          },
          active: {
            type: 'state',
            description: 'active state for success contained buttons',
            value: {
              background: '$semanticColor.background.success.soft-active !important',
              color: '$semanticColor.text.helper.success',
            },
          },
          disabled: {
            type: 'state',
            description: 'disabled state for success contained buttons',
            value: {
              color: '$semanticColor.text.disabled',
              background: 'transparent',
              border: 'none',
              cursor: 'not-allowed',
            },
          },
          'disabled:hover': {
            type: 'state',
            description: 'hover state for disabled buttons',
            value: {
              color: '$semanticColor.text.disabled',
              background: 'transparent',
              border: 'none',
            },
          },
        },
      },
      text: {
        // support backwards compatibility deprecated
        type: 'variant',
        description: 'hello world',
        value: {
          background: 'transparent',
          color: '$semanticColor.text.helper.success',
          border: 'none',
        },
        states: {
          hover: {
            type: 'state',
            description: 'hover state for success contained buttons',
            value: {
              background: '$semanticColor.background.success.strong-hover',
              color: '$semanticColor.text-inverse',
            },
          },
          focus: {
            type: 'state',
            description: 'focus state for success contained buttons',
            value: {
              background: '$semanticColor.background.success.strong-active',
              color: '$semanticColor.text-inverse',
            },
          },
          active: {
            type: 'state',
            description: 'active state for success contained buttons',
            value: {
              background: '$semanticColor.background.success.strong-active !important',
              color: '$semanticColor.text-inverse',
            },
          },
          disabled: {
            type: 'state',
            description: 'disabled state for success contained buttons',
            value: {
              color: '$semanticColor.text.disabled',
              background: '$semanticColor.background.disabled',
              border: 'none',
              cursor: 'not-allowed',
            },
          },
          'disabled:hover': {
            type: 'state',
            description: 'hover state for disabled buttons',
            value: {
              color: '$semanticColor.text.disabled',
              background: '$semanticColor.background.disabled',
              border: 'none',
            },
          },
        },
      },
    },
    caution: {
      strong: {
        type: 'variant',
        description: 'hello world',
        value: {
          background: '$semanticColor.background.caution.strong-rest',
          color: '$semanticColor.text-helper-caution-inverse',
          border: 'none',
        },
        states: {
          hover: {
            type: 'state',
            description: 'hover state for caution contained buttons',
            value: {
              background: '$semanticColor.background.caution.strong-hover',
            },
          },
          focus: {
            type: 'state',
            description: 'focus state for caution contained buttons',
            value: {
              background: '$semanticColor.background.caution.strong-active',
            },
          },
          active: {
            type: 'state',
            description: 'active state for caution contained buttons',
            value: {
              background: '$semanticColor.background.caution.strong-active !important',
            },
          },
          disabled: {
            type: 'state',
            description: 'disabled state for caution contained buttons',
            value: {
              color: '$semanticColor.text.disabled',
              background: '$semanticColor.background.disabled',
              cursor: 'not-allowed',
            },
          },
          'disabled:hover': {
            type: 'state',
            description: 'hover state for disabled buttons',
            value: {
              color: '$semanticColor.text.disabled',
              background: '$semanticColor.background.disabled',
            },
          },
        },
      },
      contained: {
        // support backwards compatibility deprecated
        type: 'variant',
        description: 'hello world',
        value: {
          background: '$semanticColor.background.caution.strong-rest',
          color: '$semanticColor.text-inverse',
          border: 'none',
        },
        states: {
          hover: {
            type: 'state',
            description: 'hover state for caution contained buttons',
            value: {
              background: '$semanticColor.background.caution.strong-hover',
            },
          },
          focus: {
            type: 'state',
            description: 'focus state for caution contained buttons',
            value: {
              background: '$semanticColor.background.caution.strong-active',
            },
          },
          active: {
            type: 'state',
            description: 'active state for caution contained buttons',
            value: {
              background: '$semanticColor.background.caution.strong-active !important',
            },
          },
          disabled: {
            type: 'state',
            description: 'disabled state for caution contained buttons',
            value: {
              color: '$semanticColor.text.disabled',
              background: '$semanticColor.background.disabled',
              cursor: 'not-allowed',
            },
          },
          'disabled:hover': {
            type: 'state',
            description: 'hover state for disabled buttons',
            value: {
              color: '$semanticColor.text.disabled',
              background: '$semanticColor.background.disabled',
            },
          },
        },
      },
      soft: {
        type: 'variant',
        description: 'hello world',
        value: {
          background: '$semanticColor.background.caution.rest',
          color: '$semanticColor.text.default',
          border: 'none',
        },
        states: {
          hover: {
            type: 'state',
            description: 'hover state for caution contained buttons',
            value: {
              background: '$semanticColor.background.caution.hover',
            },
          },
          focus: {
            type: 'state',
            description: 'focus state for caution contained buttons',
            value: {
              background: '$semanticColor.background.caution.strong-active',
            },
          },
          active: {
            type: 'state',
            description: 'active state for caution contained buttons',
            value: {
              background: '$semanticColor.background.caution.strong-active !important',
            },
          },
          disabled: {
            type: 'state',
            description: 'disabled state for caution contained buttons',
            value: {
              color: '$semanticColor.text.disabled',
              background: '$semanticColor.background.disabled',
              cursor: 'not-allowed',
            },
          },
          'disabled:hover': {
            type: 'state',
            description: 'hover state for disabled buttons',
            value: {
              color: '$semanticColor.text.disabled',
              background: '$semanticColor.background.disabled',
            },
          },
        },
      },
      outlined: {
        type: 'variant',
        description: 'hello world',
        value: {
          background: 'transparent',
          color: '$semanticColor.text.helper.caution',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: '$semanticColor.border.caution-soft',
        },
        states: {
          hover: {
            type: 'state',
            description: 'hover state for caution contained buttons',
            value: {
              background: '$semanticColor.background.caution.soft-hover',
              color: '$semanticColor.text.helper.caution',
              borderColor: '$semanticColor.border.caution-soft',
            },
          },
          focus: {
            type: 'state',
            description: 'focus state for caution contained buttons',
            value: {
              background: '$semanticColor.background.caution.soft-active',
              color: '$semanticColor.text-inverse',
            },
          },
          active: {
            type: 'state',
            description: 'active state for caution contained buttons',
            value: {
              background: '$semanticColor.background.caution.soft-active !important',
              color: '$semanticColor.text-inverse',
            },
          },
          disabled: {
            type: 'state',
            description: 'disabled state for caution contained buttons',
            value: {
              color: '$semanticColor.text.disabled',
              background: 'transparent',
              border: 'none',
              cursor: 'not-allowed',
            },
          },
          'disabled:hover': {
            type: 'state',
            description: 'hover state for disabled buttons',
            value: {
              color: '$semanticColor.text.disabled',
              background: 'transparent',
              border: 'none',
            },
          },
        },
      },
      'no-fill': {
        type: 'variant',
        description: 'hello world',
        value: {
          background: 'transparent',
          color: '$semanticColor.text.helper.caution',
          border: 'none',
        },
        states: {
          hover: {
            type: 'state',
            description: 'hover state for caution contained buttons',
            value: {
              background: '$semanticColor.background.caution.soft-hover',
              color: '$semanticColor.text-helper-caution-inverse',
            },
          },
          focus: {
            type: 'state',
            description: 'focus state for caution contained buttons',
            value: {
              background: '$semanticColor.background.caution.soft-active',
              color: '$semanticColor.text-inverse',
            },
          },
          active: {
            type: 'state',
            description: 'active state for caution contained buttons',
            value: {
              background: '$semanticColor.background.caution.soft-active !important',
              color: '$semanticColor.text-inverse',
            },
          },
          disabled: {
            type: 'state',
            description: 'disabled state for caution contained buttons',
            value: {
              color: '$semanticColor.text.disabled',
              background: 'transparent',
              border: 'none',
              cursor: 'not-allowed',
            },
          },
          'disabled:hover': {
            type: 'state',
            description: 'hover state for disabled buttons',
            value: {
              color: '$semanticColor.text.disabled',
              background: 'transparent',
              border: 'none',
            },
          },
        },
      },
      text: {
        // support backwards compatibility deprecated
        type: 'variant',
        description: 'hello world',
        value: {
          background: 'transparent',
          color: '$semanticColor.text.helper.caution',
          border: 'none',
        },
        states: {
          hover: {
            type: 'state',
            description: 'hover state for caution contained buttons',
            value: {
              background: '$semanticColor.background.caution.strong-hover',
              color: '$semanticColor.text-inverse',
            },
          },
          focus: {
            type: 'state',
            description: 'focus state for caution contained buttons',
            value: {
              background: '$semanticColor.background.caution.strong-active',
              color: '$semanticColor.text-inverse',
            },
          },
          active: {
            type: 'state',
            description: 'active state for caution contained buttons',
            value: {
              background: '$semanticColor.background.caution.strong-active !important',
              color: '$semanticColor.text-inverse',
            },
          },
          disabled: {
            type: 'state',
            description: 'disabled state for caution contained buttons',
            value: {
              color: '$semanticColor.text.disabled',
              background: '$semanticColor.background.disabled',
              border: 'none',
              cursor: 'not-allowed',
            },
          },
          'disabled:hover': {
            type: 'state',
            description: 'hover state for disabled buttons',
            value: {
              color: '$semanticColor.text.disabled',
              background: '$semanticColor.background.disabled',
              border: 'none',
            },
          },
        },
      },
    },
    info: {
      strong: {
        type: 'variant',
        description: 'hello world',
        value: {
          background: '$semanticColor.background.info.strong-rest',
          color: '$semanticColor.text-inverse',
          border: 'none',
        },
        states: {
          hover: {
            type: 'state',
            description: 'hover state for info contained buttons',
            value: {
              background: '$semanticColor.background.info.strong-hover',
            },
          },
          focus: {
            type: 'state',
            description: 'focus state for info contained buttons',
            value: {
              background: '$semanticColor.background.info.strong-active',
            },
          },
          active: {
            type: 'state',
            description: 'active state for info contained buttons',
            value: {
              background: '$semanticColor.background.info.strong-active !important',
            },
          },
          disabled: {
            type: 'state',
            description: 'disabled state for info contained buttons',
            value: {
              color: '$semanticColor.text.disabled',
              background: '$semanticColor.background.disabled',
              cursor: 'not-allowed',
            },
          },
          'disabled:hover': {
            type: 'state',
            description: 'hover state for disabled buttons',
            value: {
              color: '$semanticColor.text.disabled',
              background: '$semanticColor.background.disabled',
            },
          },
        },
      },
      contained: {
        // support backwards compatibility deprecated
        type: 'variant',
        description: 'hello world',
        value: {
          background: '$semanticColor.background.info.strong-rest',
          color: '$semanticColor.text-inverse',
          border: 'none',
        },
        states: {
          hover: {
            type: 'state',
            description: 'hover state for info contained buttons',
            value: {
              background: '$semanticColor.background.info.strong-hover',
            },
          },
          focus: {
            type: 'state',
            description: 'focus state for info contained buttons',
            value: {
              background: '$semanticColor.background.info.strong-active',
            },
          },
          active: {
            type: 'state',
            description: 'active state for info contained buttons',
            value: {
              background: '$semanticColor.background.info.strong-active !important',
            },
          },
          disabled: {
            type: 'state',
            description: 'disabled state for info contained buttons',
            value: {
              color: '$semanticColor.text.disabled',
              background: '$semanticColor.background.disabled',
              cursor: 'not-allowed',
            },
          },
          'disabled:hover': {
            type: 'state',
            description: 'hover state for disabled buttons',
            value: {
              color: '$semanticColor.text.disabled',
              background: '$semanticColor.background.disabled',
            },
          },
        },
      },
      soft: {
        type: 'variant',
        description: 'hello world',
        value: {
          background: '$semanticColor.background.info.rest',
          color: '$semanticColor.text.default',
          border: 'none',
        },
        states: {
          hover: {
            type: 'state',
            description: 'hover state for info contained buttons',
            value: {
              background: '$semanticColor.background.info.hover',
            },
          },
          focus: {
            type: 'state',
            description: 'focus state for info contained buttons',
            value: {
              background: '$semanticColor.background.info.strong-active',
            },
          },
          active: {
            type: 'state',
            description: 'active state for info contained buttons',
            value: {
              background: '$semanticColor.background.info.strong-active !important',
            },
          },
          disabled: {
            type: 'state',
            description: 'disabled state for info contained buttons',
            value: {
              color: '$semanticColor.text.disabled',
              background: '$semanticColor.background.disabled',
              cursor: 'not-allowed',
            },
          },
          'disabled:hover': {
            type: 'state',
            description: 'hover state for disabled buttons',
            value: {
              color: '$semanticColor.text.disabled',
              background: '$semanticColor.background.disabled',
            },
          },
        },
      },
      outlined: {
        type: 'variant',
        description: 'hello world',
        value: {
          background: 'transparent',
          color: '$semanticColor.text.helper.info',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: '$semanticColor.border.info-soft',
        },
        states: {
          hover: {
            type: 'state',
            description: 'hover state for info contained buttons',
            value: {
              background: '$semanticColor.background.info.soft-hover',
              color: '$semanticColor.text.helper.info',
              borderColor: '$semanticColor.border.info-soft',
            },
          },
          focus: {
            type: 'state',
            description: 'focus state for info contained buttons',
            value: {
              background: '$semanticColor.background.info.strong-active',
              color: '$semanticColor.text-inverse',
            },
          },
          active: {
            type: 'state',
            description: 'active state for info contained buttons',
            value: {
              background: '$semanticColor.background.info.strong-active !important',
              color: '$semanticColor.text-inverse',
            },
          },
          disabled: {
            type: 'state',
            description: 'disabled state for info contained buttons',
            value: {
              color: '$semanticColor.text.disabled',
              background: 'transparent',
              border: 'none',
              cursor: 'not-allowed',
            },
          },
          'disabled:hover': {
            type: 'state',
            description: 'hover state for disabled buttons',
            value: {
              color: '$semanticColor.text.disabled',
              background: 'transparent',
              border: 'none',
            },
          },
        },
      },
      'no-fill': {
        type: 'variant',
        description: 'hello world',
        value: {
          background: 'transparent',
          color: '$semanticColor.text.helper.info',
          border: 'none',
        },
        states: {
          hover: {
            type: 'state',
            description: 'hover state for info contained buttons',
            value: {
              background: '$semanticColor.background.info.soft-hover',
              color: '$semanticColor.text.helper.info',
            },
          },
          focus: {
            type: 'state',
            description: 'focus state for info contained buttons',
            value: {
              background: '$semanticColor.background.info.soft-active',
              color: '$semanticColor.text.helper.info',
            },
          },
          active: {
            type: 'state',
            description: 'active state for info contained buttons',
            value: {
              background: '$semanticColor.background.info.soft-active !important',
              color: '$semanticColor.text.helper.info',
            },
          },
          disabled: {
            type: 'state',
            description: 'disabled state for info contained buttons',
            value: {
              color: '$semanticColor.text.disabled',
              background: 'transparent',
              border: 'none',
              cursor: 'not-allowed',
            },
          },
          'disabled:hover': {
            type: 'state',
            description: 'hover state for disabled buttons',
            value: {
              color: '$semanticColor.text.disabled',
              background: 'transparent',
              border: 'none',
            },
          },
        },
      },
      text: {
        // support backwards compatibility deprecated
        type: 'variant',
        description: 'hello world',
        value: {
          background: 'transparent',
          color: '$semanticColor.text.helper.info',
          border: 'none',
        },
        states: {
          hover: {
            type: 'state',
            description: 'hover state for info contained buttons',
            value: {
              background: '$semanticColor.background.info.strong-hover',
              color: '$semanticColor.text-inverse',
            },
          },
          focus: {
            type: 'state',
            description: 'focus state for info contained buttons',
            value: {
              background: '$semanticColor.background.info.strong-active',
              color: '$semanticColor.text-inverse',
            },
          },
          active: {
            type: 'state',
            description: 'active state for info contained buttons',
            value: {
              background: '$semanticColor.background.info.strong-active !important',
              color: '$semanticColor.text-inverse',
            },
          },
          disabled: {
            type: 'state',
            description: 'disabled state for info contained buttons',
            value: {
              color: 'transparent',
              background: '$semanticColor.background.disabled',
              border: 'none',
              cursor: 'not-allowed',
            },
          },
          'disabled:hover': {
            type: 'state',
            description: 'hover state for disabled buttons',
            value: {
              color: 'transparent',
              background: '$semanticColor.background.disabled',
              border: 'none',
            },
          },
        },
      },
    },
    size: {
      xsmall: {
        type: 'size',
        description: 'hello world',
        value: {
          fontSize: '12px',
          padding: '4px 8px 3px 8px',
          lineHeight: '16px',
          letterSpacing: '0.0025em',
        },
      },
      small: {
        type: 'size',
        description: 'hello world',
        value: {
          fontSize: '14px',
          padding: '4px 8px',
          lineHeight: '20px',
          letterSpacing: '0.0025em',
        },
      },
      medium: {
        type: 'size',
        description: 'hello world',
        value: {
          fontSize: '14px',
          padding: '8px 12px',
          lineHeight: '20px',
          letterSpacing: '0.0025em',
        },
      },
      large: {
        type: 'size',
        description: 'hello world',
        value: {
          fontSize: '16px',
          padding: '12px 20px',
          lineHeight: '24px',
          letterSpacing: '0.005em',
        },
      },
      xlarge: {
        type: 'size',
        description: 'hello world',
        value: {
          fontSize: '16px',
          padding: '16px 24px',
          lineHeight: '24px',
          letterSpacing: '0.005em',
        },
      },
      full: {
        xsmall: {
          type: 'size',
          description: 'hello world',
          value: {
            fontSize: '14px',
            padding: '3px',
          },
        },
        small: {
          type: 'size',
          description: 'hello world',
          value: {
            fontSize: '14px',
            padding: '4px',
          },
        },
        medium: {
          type: 'size',
          description: 'hello world',
          value: {
            fontSize: '14px',
            padding: '10px',
          },
        },
        large: {
          type: 'size',
          description: 'hello world',
          value: {
            fontSize: '16px',
            padding: '12px',
          },
        },
        xlarge: {
          type: 'size',
          description: 'hello world',
          value: {
            fontSize: '16px',
            padding: '16px',
          },
        },
      },
      rounded: {
        xsmall: {
          type: 'size',
          description: 'hello world',
          value: {
            fontSize: '14px',
            padding: '3px',
          },
        },
        small: {
          type: 'size',
          description: 'hello world',
          value: {
            fontSize: '14px',
            padding: '4px',
          },
        },
        medium: {
          type: 'size',
          description: 'hello world',
          value: {
            fontSize: '14px',
            padding: '10px',
          },
        },
        large: {
          type: 'size',
          description: 'hello world',
          value: {
            fontSize: '16px',
            padding: '12px',
          },
        },
        xlarge: {
          type: 'size',
          description: 'hello world',
          value: {
            fontSize: '16px',
            padding: '16px',
          },
        },
      },
    },
    radius: {
      soft: {
        type: 'radius',
        description: 'hello world',
        value: {
          borderRadius: '$radius-xsmall',
        },
      },
      softer: {
        type: 'radius',
        description: 'hello world',
        value: {
          borderRadius: '$radius-small',
        },
      },
      none: {
        type: 'radius',
        description: 'hello world',
        value: {
          borderRadius: '$radius-none',
        },
      },
      rounded: {
        type: 'radius',
        description: 'hello world',
        value: {
          borderRadius: '$radius-small',
        },
      },
      full: {
        type: 'radius',
        description: 'hello world',
        value: {
          borderRadius: '$radius-full',
        },
      },
    },
    group: {
      position: {
        horizontal: {
          value: {
            display: 'flex',
            'flex-direction': 'row',
          },
        },
        vertical: {
          value: {
            display: 'flex',
            'flex-direction': 'column',
          },
        },
      },
    },
  },
  atlas: {
    'icon-button': {
      size: {
        small: {
          type: 'size',
          dense: {
            value: {
              width: '28px',
              height: '28px',
            },
          },
          value: {
            width: '44px',
            height: '44px',
          },
        },
        medium: {
          type: 'size',
          dense: {
            value: {
              width: '32px',
              height: '32px',
            },
          },
          value: {
            width: '48px',
            height: '48px',
          },
        },
        large: {
          type: 'size',
          dense: {
            value: {
              width: '40px',
              height: '40px',
            },
          },
          value: {
            width: '56px',
            height: '56px',
          },
        },
      },
      color: {
        disabled: {
          states: {
            type: 'state',
            hover: {
              value: {
                backgroundColor: 'transparent',
                cursor: 'not-allowed',
              },
            },
          },
        },
        neutral: {
          states: {
            type: 'state',
            hover: {
              value: {
                backgroundColor: '$semanticColor.background.neutral.soft-hover',
                borderRadius: '50%',
                cursor: 'pointer',
              },
            },
          },
        },
        brand: {
          states: {
            type: 'state',
            hover: {
              value: {
                backgroundColor: '$semanticColor.background.brand.soft-hover',
                borderRadius: '50%',
                cursor: 'pointer',
              },
            },
          },
        },
        danger: {
          states: {
            type: 'state',
            hover: {
              value: {
                backgroundColor: '$semanticColor.background.danger.soft-hover',
                borderRadius: '50%',
                cursor: 'pointer',
              },
            },
          },
        },
        caution: {
          states: {
            type: 'state',
            hover: {
              value: {
                backgroundColor: '$semanticColor.background.caution.soft-hover',
                borderRadius: '50%',
                cursor: 'pointer',
              },
            },
          },
        },
        info: {
          states: {
            type: 'state',
            hover: {
              value: {
                backgroundColor: '$semanticColor.background.info.soft-hover',
                borderRadius: '50%',
                cursor: 'pointer',
              },
            },
          },
        },
        success: {
          states: {
            type: 'state',
            hover: {
              value: {
                backgroundColor: '$semanticColor.background.success.soft-hover',
                borderRadius: '50%',
                cursor: 'pointer',
              },
            },
          },
        },
      },
      value: {
        backgroundColor: 'transparent',
        border: 'none',
      },
    },
    icon: {
      color: {
        disabled: {
          value: {
            color: 'rgb(86,86,86,0.4)',
            pointerEvents: 'none',
          },
        },
        neutral: {
          value: {
            color: '$semanticColor.background.neutral.strong-rest',
          },
        },
        brand: {
          value: {
            color: '$semanticColor.background.brand.strong-rest',
          },
        },
        danger: {
          value: {
            color: '$semanticColor.background.danger.strong-rest',
          },
        },
        caution: {
          value: {
            color: '$semanticColor.background.caution.strong-rest',
          },
        },
        info: {
          value: {
            color: '$semanticColor.background.info.strong-rest',
          },
        },
        success: {
          value: {
            color: '$semanticColor.background.success.strong-rest',
          },
        },
      },
    },
  }
};