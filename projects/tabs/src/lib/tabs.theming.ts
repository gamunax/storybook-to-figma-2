export const config = {
    'atlas-tabs__header': {
        value: {
            display: 'flex',
            alignItems: 'center',
            width: 'auto'
        },
        '-centered': {
            value: {
                justifyContent: 'center',
            },
        },
        '-flex-start': {
            value: {
                justifyContent: 'flex-start',
            },
        },
        '-full-width': {
            value: {
                width: '100%'
            },
        },
        '-scroll': {
            value: {
                maxWidth: '100%',
                overflowX: 'hidden',
            },
        },
        '-scroll.atlas-tabs__header--centered': {
            value: {
                justifyContent: 'flex-start',
            },
        },
    },
    'atlas-tabs__scroll': {
        'outer': {
            value: {
                position: 'relative',
                padding: '0 30px',
            },
        },
        'left': {
            value: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                position: 'absolute',
                left: '0',
                top: '0',
                height: '100%',
                width: '30px',
                'z-index': '1',
                },
            },
        'right': {
            value: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                position: 'absolute',
                right: '0',
                top: '0',
                height: '100%',
                width: '30px',
                'z-index': '1',
            },
        },
    },
    'atlas-tabs__label': {
        value: {
            paddingTop: '12px',
            paddingBottom: '12px'
        },
        '-full-width': {
            value: {
                flexGrow: '1',
            },
        },

        '-centered': {
            value: {
                paddingTop: '12px',
                paddingBottom: '12px',
                'text-align': 'center'
            },
        },
        '-flex-start': {
            value: {
                paddingLeft: '8px',
                paddingRight: '8px',
            },
        },

        '-empty--brand': {
            '-border': {
                value: {
                    cursor: 'pointer',
                    'border-bottom': '2px solid transparent'
                },
            },
            '-disabled': {
                value: {
                    color: '$semanticColor.background.disabled',
                    'border-bottom': '2px solid transparent',
                    cursor: 'not-allowed'
                },
            },
            '-active': {
                value: {
                    color: '$semanticColor.text.helper.brand',
                    'border-bottom': '2px solid $semanticColor.text.helper.brand'
                },
            },
        },
        '-empty--neutral': {
            '-border': {
                value: {
                    cursor: 'pointer',
                    'border-bottom': '2px solid transparent'
                },
            },
            '-disabled': {
                value: {
                    color: '$semanticColor.background.disabled',
                    'border-bottom': '2px solid transparent',
                    cursor: 'not-allowed'
                },
            },
            '-active': {
                value: {
                    color: '$semanticColor.background.neutral.strong-rest',
                    'border-bottom': '2px solid $semanticColor.background.neutral.strong-rest'
                },
            },
        },
        '-filled--brand': {
            value: {
                background: '$semanticColor.background.brand.strong-rest',
                color: '$semanticColor.text.inverse',
                padding: '12px 0'
            },
            '-border': {
                value: {
                    cursor: 'pointer',
                    'border-bottom': '2px solid transparent'
                },
            },
            '-disabled': {
                value: {
                    background: '$semanticColor.background.brand.strong-rest',
                    color: '$semanticColor.text.disabled',
                    padding: '12px 0',
                    'border-bottom': '2px solid transparent',
                    cursor: 'not-allowed'
                },
            },
            '-active': {
                value: {
                    'border-bottom': '2px solid $semanticColor.text.inverse'
                },
            },
        },
        '-filled--neutral': {
            value: {
                background: '$semanticColor.background.neutral.strong-rest',
                color: '$semanticColor.text.inverse',
                padding: '12px 0'
            },
            '-border': {
                value: {
                    cursor: 'pointer',
                    'border-bottom': '2px solid transparent'
                },
            },
            '-disabled': {
                value: {
                    background: '$semanticColor.background.neutral.strong-rest',
                    color: '$semanticColor.text.disabled',
                    padding: '12px 0',
                    'border-bottom': '2px solid transparent',
                    cursor: 'not-allowed'
                },
            },
            '-active': {
                value: {
                    'border-bottom': '2px solid $semanticColor.text.inverse'
                },
            },
        },
        '-filled--caution': {
            value: {
                background: '$semanticColor.background.caution.strong-rest',
                color: '$semanticColor.text.inverse',
                padding: '12px 0'
            },
            '-border': {
                value: {
                    cursor: 'pointer',
                    'border-bottom': '2px solid transparent'
                },
            },
            '-disabled': {
                value: {
                    background: '$semanticColor.background.caution.strong-rest',
                    color: '$semanticColor.text.disabled',
                    padding: '12px 0',
                    'border-bottom': '2px solid transparent',
                    cursor: 'not-allowed'
                },
            },
            '-active': {
                value: {
                    'border-bottom': '2px solid $semanticColor.text.inverse'
                },
            },
        },
        '-filled--success': {
            value: {
                background: '$semanticColor.background.success.strong-rest',
                color: '$semanticColor.text.inverse',
                padding: '12px 0'
            },
            '-border': {
                value: {
                    cursor: 'pointer',
                    'border-bottom': '2px solid transparent'
                },
            },
            '-disabled': {
                value: {
                    background: '$semanticColor.background.success.strong-rest',
                    color: '$semanticColor.text.disabled',
                    padding: '12px 0',
                    'border-bottom': '2px solid transparent',
                    cursor: 'not-allowed'
                },
            },
            '-active': {
                value: {
                    'border-bottom': '2px solid $semanticColor.text.inverse'
                },
            },
        },
        '-filled--danger': {
            value: {
                background: '$semanticColor.background.danger.strong-rest',
                color: '$semanticColor.text.inverse',
                padding: '12px 0'
            },
            '-border': {
                value: {
                    cursor: 'pointer',
                    'border-bottom': '2px solid transparent'
                },
            },
            '-disabled': {
                value: {
                    background: '$semanticColor.background.brand.strong-rest',
                    color: '$semanticColor.text.disabled',
                    padding: '12px 0',
                    'border-bottom': '2px solid transparent',
                    cursor: 'not-allowed'
                },
            },
            '-active': {
                value: {
                    'border-bottom': '2px solid $semanticColor.text.inverse'
                },
            },
        },
    },
};