export const config = {
  'clock-face': {
    value: {
      'background-color': 'var(--semanticColor-layer-neutral-01) !important',
      'border-radius':' 50%',
      'box-sizing': 'border-box',
      display: 'flex',
      height: '260px',
      'justify-content': 'center',
      position: 'relative',
      width: '260px'
    },
    'clock-hand': {
      value: {
        height: '103px',
        padding: '0',
        position: 'absolute',
        top: 'calc(50% - 103px)',
        'transform-origin': '1px 100%',
        width: '2px',
        'z-index': '1',
      },
    },
    center: {
      value: {
        'border-radius': '50%',
        height: '8px',
        left: '50%',
        margin: '-4px',
        padding: '0',
        position: 'absolute',
        top: '50%',
        width: '8px',
      }
    },
    'clock-hand_minute > button': {
      value: {
        'align-items': 'center',
        'border-radius': '50%',
        'box-sizing': 'content-box',
        display: 'flex',
        height: '36px',
        'justify-content': 'center',
        left: 'calc(50% - 22px)',
        margin: '4px',
        position: 'absolute',
        top: '-26px',
        width: '36px',
      }
    },
    'clock-hand_hour > button': {
      value: {
        'align-items': 'center',
        'border-radius': '50%',
        'box-sizing': 'content-box',
        display: 'flex',
        height: '36px',
        'justify-content': 'center',
        left: 'calc(50% - 22px)',
        margin: '4px',
        position: 'absolute',
        top: '-26px',
        width: '36px'
      }
    },
    'clock-hand_minute_dot': {
      value: {
        background: '#FFF',
        'bdatepicker-playground copyorder-radius': '50%',
        display: 'block',
        height: '4px',
        width: '4px',
      }
    },
    color: {
      neutral: {
        value: {
          'background-color': '$semanticColor.background.neutral.strong-rest'
        }
      },
      brand: {
        value: {
          'background-color': '$semanticColor.background.brand.strong-rest'
        }
      },
      danger: {
        value: {
          'background-color': '$semanticColor.background.danger.strong-rest'
        }
      },
      caution: {
        value: {
          'background-color': '$semanticColor.background.caution.strong-rest'
        }
      },
      info: {
        value: {
          'background-color': '$semanticColor.background.info.strong-rest'
        }
      },
      success: {
        value: {
          'background-color': '$semanticColor.background.success.strong-rest'
        }
      },
    },

  }
}