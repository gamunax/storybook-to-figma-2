export const config = {
    table: {
        value: {
            borderSpacing: '0',
            width: '100%'
        },
        header: {
            value: {
                color: '$semanticColor.text.default',
                textAlign: 'left'
            },
            default: {
                type: 'size',
                "value": {
                    height: '56px',                   
                },
            },
            dense: {
                type: 'size',
                "value": {
                    height: '36px',                   
                },
            },
            column: {               
                default: {
                    value: {
                        padding: '16px'
                    },
                },
                dense: {
                    value: {
                        padding: '6px 16px'
                    },
                },
                active: {
                    value: {
                        backgroundColor: '$semanticColor.background.neutral.soft-hover'
                    }   
                },
                inactive:  {
                   value: {
                      opacity: '0.35'
                    }
                },
                sortable: {
                    value: {
                        paddingLeft: '8px',
                        alignItems: 'flex-start',
                        cursor: 'pointer',
                    }
                },   
                'sort-button': {
                    '-desc': {
                        value: {
                            transform: 'rotate(180deg)',
                        }  
                    },
                    value: {
                        margin: '0 var(--small-3) 0 0',
                    }
                },
                'align-right': {
                    value: {
                        textAlign: 'right'
                    }
                }
            } 
        },
        body: {
            column: {
                default: {
                    value: {
                        height: '56px',
                        padding: '18px 16px'
                    },
                },
                dense: {
                    value: {
                        height: '36px',
                        padding: '14px 16px'
                    },
                    checkbox: {
                        value: {
                            paddingLeft: '27px !important'
                        },
                    }
                },
            }
        },
        row: {
            type: 'variant',
            "value": {               
                color: '$semanticColor.text.default',
                borderSpacing: '0'
            },
            selected: {
                type: 'variant',
                "value": {
                    background: 'var(--semanticColor-background-brand-soft-hover)',
                },
            },
            states: {
                hover: {
                    type: 'state',
                    description: 'hover state for list item',
                    "value": {
                        background: '$semanticColor.background.neutral.soft-hover',
                    }
                },
            },
            border: {
                type: 'variant',
                description: 'hello world',
                "value": {
                    boxShadow: 'inset 0px -1px 0px rgba(0, 0, 0, 0.12)'
                },
            },
            primary: {
                selected: {
                    type: 'state',
                    description: 'selected state for list item',
                    "value": {
                        background: '$semanticColor.background.brand.soft-hover',
                    }
                },
            },
            secondary: {
                selected: {
                    type: 'state',
                    description: 'selected state for list item',
                    "value": {
                        background: '$semanticColor.background.brand.soft-hover',
                    }
                },
            },
            default: {
                selected: {
                    type: 'state',
                    description: 'selected state for list item',
                    "value": {
                        background: '$semanticColor.background.neutral.soft-hover',
                    }
                },
            },
            error: {
                selected: {
                    type: 'state',
                    description: 'selected state for list item',
                    "value": {
                        background: '$semanticColor.background.danger.soft-hover',
                    }
                },
            },
            warning: {
                selected: {
                    type: 'state',
                    description: 'selected state for list item',
                    "value": {
                        background: '$semanticColor.background.caution.soft-hover',
                    }
                },
            },
            success: {
                selected: {
                    type: 'state',
                    description: 'selected state for list item',
                    "value": {
                        background: '$semanticColor.background.success.soft-hover',
                    }
                },
            },
            info: {
                selected: {
                    type: 'state',
                    description: 'selected state for list item',
                    "value": {
                        background: '$semanticColor.background.info.soft-hover',
                    }
                },
            },
            size: {
                default: {
                    type: 'size',
                    description: 'hello world',
                    "value": {
                        height: '56px',
                        padding: '18px 16px'
                    },
                },
                dense: {
                    type: 'size',
                    description: 'hello world',
                    "value": {
                        height: '48px',
                        padding: '14px 16px'
                    },
                },
            },
        },
    },
}