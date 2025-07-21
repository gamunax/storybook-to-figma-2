export const config = {
    "bottom-nav": {
       "action": {
            "link": {
                states: {
                    active: {
                        value: {
                            color: '$semanticColors.background-brand-strong-rest'
                        }
                    },
                    visited: {
                        value: {
                            color: '$semanticColor.background-brand-strong-rest'
                        }
                    },
                    focus: {
                        value: {
                            color: '$semanticColor.background-brand-strong-rest'
                        }
                    },
                    hover: {
                        value: {
                            color: '$semanticColor.background-brand-strong-rest'
                        }
                    },
                    disabled: {
                        value: {
                            color: 'rgb(86, 86, 86, 0.4)',
                            pointerEvents: 'none'
                        }
                    }
                },
                value: {
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    color: '$semanticColor.background-neutral-strong-rest',
                    width: '100%'
                }
            },
            disabled: {
                value: {
                    cursor: 'not-allowed',
                }
            },
            value: {
                minWidth: '166px'
            }
        },
        "content": {
            value: {
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
            } 
        },
        value: {
            minWidth: '500px',
            minHeight: '56px',
            padding: '0'
        },
    }, 
}