export const config = {
    popover: {
        title: {
            value: {
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center'
            },
            color: {
                neutral: {
                    type: 'variant',
                    description: 'hello world',
                    "value": {
                        backgroundColor: '$semanticColor.layer.neutral.01',
                        color: '$semanticColor.text.default',
                    },
                },
                brand: {
                    type: 'variant',
                    description: 'hello world',
                    "value": {
                        backgroundColor: '$semanticColor.background.brand.strong-rest',
                        color: '$semanticColor.text.default',
                    },
                },
                danger: {
                    type: 'variant',
                    description: 'hello world',
                    "value": {
                        backgroundColor: '$semanticColor.background.danger.strong-rest',
                        color: '$semanticColor.text.default',
                    },
                },
                caution: {
                    type: 'variant',
                    description: 'hello world',
                    "value": {
                        backgroundColor: '$semanticColor.background.caution.strong-rest',
                        color: '$semanticColor.text.default',
                    },
                },
                success: {
                    type: 'variant',
                    description: 'hello world',
                    "value": {
                        backgroundColor: '$semanticColor.background.success.strong-rest',
                        color: '$semanticColor.text.default',
                    },
                },
                info: {
                    type: 'variant',
                    description: 'hello world',
                    "value": {
                        backgroundColor: '$semanticColor.background.info.strong-rest',
                        color: '$semanticColor.text.default',
                    },
                },
            }
        },
        value: {
            backgroundColor: '$semanticColor.layer.neutral.01',
            minHeight: '300px',
            zIndex: '300px',
            position: 'absolute',
            display: 'block'
        },
        content: {
            value: {
                backgroundColor: '$semanticColor.layer.neutral.01',
                color:  '$semanticColor.text.secondary',
            }
        },
        responsive: {
            states: {
                after: {
                    value: {
                        display: 'none',
                    }   
                }
            }   
        },
        "back-button": {
            value: {
                cursor: 'pointer',
            }  
        },
        top: {
            states: {
              "after": {
                value: {
                    marginLeft: '-1.4em',
                    transform:' rotate(-45deg)',
                    transformOrigin: 'top left',
                    bottom: '-2em',
                    left: '50%',
                }
              }
            }
        },
        right: {
            value: {
                transform: 'translate(20px)',
            },
            states: {
              "after": {
                value: {
                    marginLeft: '-1.4em',
                    transform:'  rotate(45deg)',
                    transformOrigin: 'top left',
                    bottom: '0.1em',
                    left: '50%',
                }
              }
            }
        },
        bottom: {
            states: {
             "after": {
                value: {
                    marginLeft: '-1.4em',
                    transform:'rotate(135deg)',
                    transformOrigin: 'top left',
                    bottom: '0',
                    left: '50%',
                }
              }
            }
        },
        left: {
            value: {
                transform:' translate(-20px)', 
            },
            states: {
              "after": {
                value: {
                    marginLeft: '-1.4em',
                    transform:' rotate(-135deg)',
                    transformOrigin: 'top left',
                    bottom: '-1.9em',
                    left: '50%',
                }
              }
            }
        },
        align: {
            center: {
                vertical: {
                    value: {
                        display: 'flex',
                        alignItems: 'center'
                    }
                }
            }
        }
    },
}