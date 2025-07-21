export const config = {
    checkbox: {
        neutral: {
            type: 'variant',
            description: 'hello world',
            "value": {
                color: '$semanticColor.background.neutral.strong-rest',
            },
            states: {
                checked: {
                    type: 'state',
                    description: 'checked state for default checkbox',
                    "value": {
                        color: '$semanticColor.background.neutral.strong-rest',
                    }
                },
                hover: {
                    type: 'state',
                    description: 'hover state for default checkbox',
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
                checked: {
                    type: 'state',
                    description: 'checked state for default checkbox',
                    "value": {
                        color: '$semanticColor.background.brand.strong-rest',
                    }
                },
                hover: {
                    type: 'state',
                    description: 'hover state for primary checkbox',
                    "value": {
                        color: '$semanticColor.background.brand.strong-hover',
                    }
                },
            },
        },
        danger: {
            type: 'variant',
            description: 'hello world',
            "value": {
                color: '$semanticColor.background.danger.strong-rest',
            },
            states: {
                checked: {
                    type: 'state',
                    description: 'checked state for default checkbox',
                    "value": {
                        color: '$semanticColor.background.danger.strong-rest',
                    }
                },
                hover: {
                    type: 'state',
                    description: 'hover state for error checkbox',
                    "value": {
                        color: '$semanticColor.background.danger.strong-hover',
                    }
                },
            },
            disabled: {
                type: 'state',
                description: 'disabled state for error checkbox',
                "value": {
                    color: '$semanticColor.background.disabled',
                }
            },
        },
        caution: {
            type: 'variant',
            description: 'hello world',
            "value": {
                color: '$semanticColor.background.caution.strong-rest',
            },
            states: {
                checked: {
                    type: 'state',
                    description: 'checked state for default checkbox',
                    "value": {
                        color: '$semanticColor.background.caution.strong-rest',
                    }
                },
                hover: {
                    type: 'state',
                    description: 'hover state for warning checkbox',
                    "value": {
                        color: '$semanticColor.background.caution.strong-hover',
                    }
                },
            },
        },
        success: {
            type: 'variant',
            description: 'hello world',
            "value": {
                color: '$semanticColor.background.success.strong-rest',
            },
            states: {
                checked: {
                    type: 'state',
                    description: 'checked state for default checkbox',
                    "value": {
                        color: '$semanticColor.background.caution.strong-rest',
                    }
                },
                hover: {
                    type: 'state',
                    description: 'hover state for success checkbox',
                    "value": {
                        color: '$semanticColor.background.success.strong-hover',
                    }
                },
            },
        },
        info: {
            type: 'variant',
            description: 'hello world',
            "value": {
                color: '$semanticColor.background.info.strong-rest',
            },
            states: {
                checked: {
                    type: 'state',
                    description: 'checked state for default checkbox',
                    "value": {
                        color: '$semanticColor.background.info.strong-rest',
                    }
                },
                hover: {
                    type: 'state',
                    description: 'hover state for info checkbox',
                    "value": {
                        color: '$semanticColor.background.info.strong-hover',
                    }
                },
            },
        },
        disabled: {
            type: 'state',
            description: 'disabled state for primary checkbox',
            "value": {
                cursor: 'not-allowed',
                color: '$semanticColor.background.disabled',
            }
        },
        "label--disabled": {
            type: 'state',
            description: 'disabled state for checkbox',
            "value": {
                cursor: 'not-allowed',
                color: '$semanticColor.text.disabled',
            }
        },
    },
}