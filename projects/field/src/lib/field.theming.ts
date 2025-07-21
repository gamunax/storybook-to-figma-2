export const config = {

    field: {
        'full-width': {
            value: {
                maxWidth: 'none'
            }
        },
        value: {
            display: 'block',
            width: '100%',
            maxWidth: '380px'
            },
        label: {
            value: {
                paddingBottom: '10px',
                display: 'inline-block',
                color: '$semanticColor.light.text.secondary'
            },
            focus: {
                'neutral > atlas-field-label': {
                    'value': {
                        color: '$semanticColor.background.neutral.strong-rest',
                    },  
                },
                'neutral > span': {
                    'value': {
                        color: '$semanticColor.background.neutral.strong-rest',
                    },  
                },    
                'brand > atlas-field-label': {                   
                    value: {
                        color: '$semanticColor.background.brand.strong-rest',
                    }                   
                },
                'brand > span': {
                    'value': {
                        color: '$semanticColor.background.brand.strong-rest',
                    },  
                },
                'soft > span': {
                    'value': {
                        color: '$semanticColor.background.soft.strong-rest',
                    },  
                },    
                'soft > atlas-field-label': {                   
                    value: {
                        color: '$semanticColor.background.soft.strong-rest',
                    }                   
                },  
                'info > atlas-field-label': {
                    'value': {
                        color: '$semanticColor.background.info.strong-rest',
                    },  
                },
                'info > span': {
                    'value': {
                        color: '$semanticColor.background.info.strong-rest',
                    },  
                },  
                'warning > atlas-field-label': {
                    'value': {
                        color: '$semanticColor.background.caution.strong-rest',
                    },  
                },
                'warning > span': {
                    'value': {
                        color: '$semanticColor.background.caution.strong-rest',
                    },  
                },  
                'danger > atlas-field-label': {
                    'value': {
                        color: '$semanticColor.background.danger.strong-rest',
                    },  
                },
                'danger > span': {
                    'value': {
                        color: '$semanticColor.background.danger.strong-rest',
                    },  
                },  
                'success > atlas-field-label': {
                    'value': {
                        color: '$semanticColor.background.success.strong-rest',
                    },  
                },
                'success > span': {
                    'value': {
                        color: '$semanticColor.background.success.strong-rest',
                    },  
                },   
            },            
            required: {
                value: {
                    marginLeft: '2px'
                }
            },
            'disabled > atlas-field-label ': {
                value: {
                    color: "$semanticColor.text.disabled",
                }
            },
            'error > atlas-field-label': {
                value: {
                    color: '$semanticColor.background.danger.strong-rest',
                }
            },
            'error > span': {
                value: {
                    color: '$semanticColor.background.danger.strong-rest',
                }
            }
        },
        'vertical-container': {
            value: {
                display: 'flex',
                'align-items': 'center'
            }
        },
        outlined: {
            textarea: {
                value: {
                    padding: '0',
                }
            },
            value: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxSizing: 'border-box',
                minHeight: '40px',
                width: '100%',
                left: '0',
                top: '0',
                borderRadius: '4px',
                padding: '0px 12px',
                background: '$semanticColor.layer.neutral.01',             
            },
            inactive: {
                value: {
                    color: '$semanticColor.text.default',
                    border: '1px solid $semanticColor.border.disabled',
                    padding: '0 13px'
                }
            },
            disabled: {
                value: {
                    cursor: 'not-allowed',
                    color: '$semanticColor.icon.neutral',
                    border: '1px solid $semanticColor.border.disabled',                  
                }
            },
            neutral: {
                value: {
                    color: '$semanticColor.text.default',
                    border: '1px solid $semanticColor.border.neutral',
                    padding: '0 13px' // accounts for initial 1px border
                }
            },
            brand: {
                type: 'variant',
                description: 'hello world',
                focus: {
                    type: 'class',
                    description: 'focus class state for brand input',
                    "value": {
                        // padding: '0 12px',
                        borderWidth: '2px',
                        borderStyle: 'solid',
                        borderColor: '$semanticColor.background.brand.strong-active',
                        outlineWidth: '2px',
                        outlineStyle: 'solid',
                        outlineColor: 'transparent',
                    }
                },
                states: {
                    disabled: {
                        type: 'state',
                        description: 'hover state for brand input',
                        "value": {
                            borderColor: '$semanticColor.icon.neutral',
                        }
                    },
                }
            },
            success: {
                type: 'variant',
                description: 'hello world',
                focus: {
                    type: 'class',
                    description: 'focus class for success input',
                    "value": {
                        // padding: '0 12px',
                        borderWidth: '2px',
                        borderStyle: 'solid',
                        borderColor: '$semanticColor.background.success.strong-rest',
                        outlineWidth: '2px',
                        outlineStyle: 'solid',
                        outlineColor: 'transparent',
                    }
                },
                states: {
                    disabled: {
                        type: 'state',
                        description: 'hover state for success input',
                        "value": {
                            borderColor: '$semanticColor.icon.neutral',
                        }
                    },
                }
            },
            info: {
                type: 'variant',
                description: 'hello world',
                focus: {
                    type: 'class',
                    description: 'focus class for info input',
                    "value": {
                        // padding: '0 12px',
                        borderWidth: '2px',
                        borderStyle: 'solid',
                        borderColor: '$semanticColor.background.info.strong-rest',
                        outlineWidth: '2px',
                        outlineStyle: 'solid',
                        outlineColor: 'transparent',
                    }
                },
                states: {
                    disabled: {
                        type: 'state',
                        description: 'hover state for info input',
                        "value": {
                            borderColor: '$semanticColor.icon.neutral',
                        }
                    },
                }
            },
            soft: {
                type: 'variant',
                description: 'hello world',
                focus: {
                    type: 'class',
                    description: 'focus class for soft input',
                    "value": {
                        // padding: '0 12px',
                        borderWidth: '2px',
                        borderStyle: 'solid',
                        borderColor: '$semanticColor.background.soft.strong-active',
                        outlineWidth: '2px',
                        outlineStyle: 'solid',
                        outlineColor: 'transparent',
                    }
                },
                states: {
                    disabled: {
                        type: 'state',
                        description: 'hover state for soft input',
                        "value": {
                            borderColor: '$semanticColor.icon.neutral',
                        }
                    },
                }
            },
            danger: {
                type: 'variant',
                description: 'hello world',
                focus: {
                    type: 'class',
                    description: 'focus class for error input',
                    "value": {
                        // padding: '0 12px',
                        borderWidth: '2px',
                        borderStyle: 'solid',
                        borderColor: '$semanticColor.background.danger.strong-rest',
                        outlineWidth: '2px',
                        outlineStyle: 'solid',
                        outlineColor: 'transparent',
                    }
                },
                states: {
                    disabled: {
                        type: 'state',
                        description: 'hover state for error input',
                        "value": {
                            borderColor: '$semanticColor.icon.neutral',
                        }
                    },
                }
            },
            caution: {
                type: 'variant',
                description: 'hello world',
                focus: {
                    type: 'class',
                    description: 'focus class for warning input',
                    "value": {
                        // padding: '0 12px',
                        borderWidth: '2px',
                        borderStyle: 'solid',
                        borderColor: '$semanticColor.background.caution.strong-rest',
                        outlineWidth: '2px',
                        outlineStyle: 'solid',
                        outlineColor: 'transparent',
                    }
                },
                states: {
                    disabled: {
                        type: 'state',
                        description: 'hover state for warning input',
                        "value": {
                            borderColor: '$semanticColor.icon.neutral',
                        }
                    },
                }
            }
        },
        filled: {
            type: 'variant',
            description: 'hello world',
            textarea: {
                value: {
                    padding: '0',
                }
            },
            value: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxSizing: 'border-box',
                minHeight: '40px',
                width: '100%',
                left: '0',
                top: '0',
                borderRadius: '4px',
                padding: '0px 13px', // accounts for initial 1px border
                backgroundColor: '$semanticColor.background.neutral.rest',
            },
            inactive: {
                value: {
                    color: '$semanticColor.text.default',
                    border: '1px solid $semanticColor.border.neutral',
                }
            },
            disabled: {
                value: {
                    cursor: 'not-allowed',
                    color: '$semanticColor.icon.neutral',
                    borderColor: '$semanticColor.border.neutral-strong',
                }
            },
            neutral: {
                value: {
                    color: '$semanticColor.text.default',
                    border: '1px solid $semanticColor.border.neutral',
                }
            },
            brand: {
                type: 'variant',
                description: 'hello world',
                focus: {
                    type: 'class',
                    description: 'focus class state for brand input',
                    "value": {
                        // padding: '0 12px',
                        borderWidth: '2px',
                        borderStyle: 'solid',
                        borderColor: '$semanticColor.background.brand.strong-active',
                        outlineWidth: '2px',
                        outlineStyle: 'solid',
                        outlineColor: 'transparent',
                    }
                },
                states: {
                    disabled: {
                        type: 'state',
                        description: 'hover state for brand input',
                        "value": {
                            borderColor: '$semanticColor.icon.neutral',
                        }
                    },
                }
            },
            soft: {
                type: 'variant',
                description: 'hello world',
                focus: {
                    type: 'class',
                    description: 'focus class for soft input',
                    "value": {
                        // padding: '0 12px',
                        borderWidth: '2px',
                        borderStyle: 'solid',
                        borderColor: '$semanticColor.background.soft.strong-active',
                        outlineWidth: '2px',
                        outlineStyle: 'solid',
                        outlineColor: 'transparent',
                    }
                },
                states: {
                    disabled: {
                        type: 'state',
                        description: 'hover state for soft input',
                        "value": {
                            borderColor: '$semanticColor.icon.neutral',
                        }
                    },
                }
            },
            danger: {
                type: 'variant',
                description: 'hello world',
                focus: {
                    type: 'class',
                    description: 'focus class for error input',
                    "value": {
                        // padding: '0 12px',
                        borderWidth: '2px',
                        borderStyle: 'solid',
                        borderColor: '$semanticColor.background.danger.strong-rest',
                        outlineWidth: '2px',
                        outlineStyle: 'solid',
                        outlineColor: 'transparent',
                    }
                },
                states: {
                    disabled: {
                        type: 'state',
                        description: 'hover state for error input',
                        "value": {
                            borderColor: '$semanticColor.icon.neutral',
                        }
                    },
                }
            },
            caution: {
                type: 'variant',
                description: 'hello world',
                focus: {
                    type: 'class',
                    description: 'focus class for warning input',
                    "value": {
                        // padding: '0 12px',
                        borderWidth: '2px',
                        borderStyle: 'solid',
                        borderColor: '$semanticColor.background.caution.strong-rest',
                        outlineWidth: '2px',
                        outlineStyle: 'solid',
                        outlineColor: 'transparent',
                    }
                },
                states: {
                    disabled: {
                        type: 'state',
                        description: 'hover state for warning input',
                        "value": {
                            borderColor: '$semanticColor.icon.neutral',
                        }
                    },
                }
            },
            success: {
                type: 'variant',
                description: 'hello world',
                focus: {
                    type: 'class',
                    description: 'focus class for success input',
                    "value": {
                        // padding: '0 12px',
                        borderWidth: '2px',
                        borderStyle: 'solid',
                        borderColor: '$semanticColor.background.success.strong-rest',
                        outlineWidth: '2px',
                        outlineStyle: 'solid',
                        outlineColor: 'transparent',
                    }
                },
                states: {
                    disabled: {
                        type: 'state',
                        description: 'hover state for success input',
                        "value": {
                            borderColor: '$semanticColor.icon.neutral',
                        }
                    },
                }
            },
            info: {
                type: 'variant',
                description: 'hello world',
                focus: {
                    type: 'class',
                    description: 'focus class for info input',
                    "value": {
                        // padding: '0 12px',
                        borderWidth: '2px',
                        borderStyle: 'solid',
                        borderColor: '$semanticColor.background.info.strong-rest',
                        outlineWidth: '2px',
                        outlineStyle: 'solid',
                        outlineColor: 'transparent',
                    }
                },
                states: {
                    disabled: {
                        type: 'state',
                        description: 'hover state for info input',
                        "value": {
                            borderColor: '$semanticColor.icon.neutral',
                        }
                    },
                }
            },
        },
        invalid: {
            type: 'class',
            description: 'Used when any field style has errors',
            value: {                
                border: '2px solid $semanticColor.background.danger.strong-rest !important',
                padding: '0 12px' 
            }
        },
        size: {
            large: {
                type: 'size',
                description: 'hello world',
                "value": {
                    height: '56px'
                },
            },
            medium: {
                type: 'size',
                description: 'hello world',
                "value": {
                    height: '48px'
                },
            },
            small: {
                type: 'size',
                description: 'hello world',
                "value": {
                    height: '40px'
                },
            },
        },
        infix: {
            value: {
                flex: '1 1 auto',
                display: 'flex',
                alignItems: 'center',
                height: '100%',
                width: '100%',
                color: '$semanticColor.text.default '                
            },
            disabled: {
                value: {
                    color: '$semanticColor.text.disabled !important'                
                }
            },
            "disabled > ::placeholder": {
                value: {
                    color: '$semanticColor.text.disabled'                
                }
            }
        },
        prefix: {
            value: {
                color:  '$semanticColor.background.neutral.strong-rest',
                'margin-right': '8px'
            },
            disabled:{
                value: {
                    color:  '$semanticColor.background.disabled !important',
                }
            }
        },
        suffix: {
            value: {
                whiteSpace: 'nowrap',
                flex: 'none',
                position: 'relative',
                color:  '$semanticColor.background.neutral.strong-rest',
                'margin-left': '8px'
            },
            disabled:{
                value: {
                    color:  '$semanticColor.background.disabled !important',
                }
            }
        },
        error: {
            value: {
                color: '$semanticColor.background.danger.strong-rest',
                paddingTop: '12px',
                display: 'block'
            }
        },
        hint: {
            value: {
                paddingTop: '12px',
                display: 'block',
                color: '$semanticColor.light.text.secondary'
            },
            'disabled > atlas-field-hint': {
                value: {
                    color: "$semanticColor.text.disabled",
                }
            },
        },
        radius: {
            none: {
                type: 'radius',
                description: 'hello world',
                "value": {
                    borderRadius: "$radius-none",
                },
            },
            softer: {
                type: 'radius',
                description: 'hello world',
                "value": {
                    borderRadius: "",
                },
            },
            soft: {
                type: 'radius',
                description: 'hello world',
                "value": {
                    borderRadius: "$radius-xsmall",
                },
            },
            rounded: {
                type: 'radius',
                description: 'hello world',
                "value": {
                    borderRadius: "$radius-full",
                },
            },
        },
    },    
}

