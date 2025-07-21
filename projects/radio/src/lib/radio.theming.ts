export const config = {
    radio: {
        neutral: {
            type: 'variant',
            description: 'hello world',
            "value": {
                color: '$semanticColor.background.neutral.strong-rest',
            },
            states: {
                hover: {
                    type: 'state',
                    description: 'hover state for default radio',
                    "value": {
                        color: '$semanticColor.background.neutral.strong-rest',
                    }
                },
            }
        },
        brand: {
            type: 'variant',
            description: 'hello world',
            "value": {
                color: '$semanticColor.background.brand.strong-rest',
            },
            states: {
                hover: {
                    type: 'state',
                    description: 'hover state for primary radio',
                    "value": {
                        color: '$semanticColor.background.brand.strong-hover',
                    }
                },
                disabled: {
                    type: 'state',
                    description: 'hover state for primary radio',
                    "value": {
                        color: '$semanticColor.text.helper.neutral',
                    }
                },
            }
        },
        danger: {
            type: 'variant',
            description: 'hello world',
            "value": {
                color: '$semanticColor.background.danger.strong-rest',
            },
            states: {
                hover: {
                    type: 'state',
                    description: 'hover state for error radio',
                    "value": {
                        color: '$semanticColor.background.danger.strong-hover',
                    }
                },
                disabled: {
                    type: 'state',
                    description: 'hover state for error radio',
                    "value": {
                        color: '$semanticColor.text.helper.neutral',
                    }
                },
            }
        },
        caution: {
            type: 'variant',
            description: 'hello world',
            "value": {
                color: '$semanticColor.background.caution.strong-rest',
            },
            states: {
                hover: {
                    type: 'state',
                    description: 'hover state for warning radio',
                    "value": {
                        color: '$semanticColor.background.caution.strong-hover',
                    }
                },
                disabled: {
                    type: 'state',
                    description: 'hover state for warning radio',
                    "value": {
                        color: '$semanticColor.text.helper.neutral',
                    }
                },
            }
        },
        success: {
            type: 'variant',
            description: 'hello world',
            "value": {
                color: '$semanticColor.background.success.strong-rest',
            },
            states: {
                hover: {
                    type: 'state',
                    description: 'hover state for success radio',
                    "value": {
                        color: '$semanticColor.background.success.strong-hover',
                    }
                },
                disabled: {
                    type: 'state',
                    description: 'hover state for success radio',
                    "value": {
                        color: '$semanticColor.text.helper.neutral',
                    }
                },
            }
        },
        info: {
            type: 'variant',
            description: 'hello world',
            "value": {
                color: '$semanticColor.background.neutral.strong-rest',
            },
            states: {
                hover: {
                    type: 'state',
                    description: 'hover state for info radio',
                    "value": {
                        color: '$semanticColor.background.info.strong-hover',
                    }
                },
                disabled: {
                    type: 'state',
                    description: 'hover state for info radio',
                    "value": {
                        background: '$semanticColor.text.disabled',
                        color: '$semanticColor.text.disabled',
                    }
                },
            }
        },
        label: {
            states: {
                hover: {
                    "value": {
                        cursor: 'pointer',
                    }
                }
            }
        },
        disabled: {
            type: 'state',
            description: 'disabled state for primary radio',
            "value": {
                cursor: 'not-allowed',
                color: '$semanticColor.text.disabled',
            }
        },
        "label--disabled": {
            type: 'state',
            description: 'disabled state for radio',
            "value": {
                cursor: 'not-allowed',
                color: '$semanticColor.text.disabled',
            }
        },
    },
}