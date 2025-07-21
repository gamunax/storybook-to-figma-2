export const config = {
    list: {
        item: {
            type: 'variant',
            description: 'hello world',
            "value": {
                display: 'flex',
                alignItems: 'center',
                color: '$semanticColor.text.default',
                background: '$semanticColor.layer.neutral.01',
            },
            states: {
                hover: {
                    type: 'state',
                    description: 'hover state for list item',
                    "value": {
                        cursor: 'pointer',
                        background: '$semanticColor.background.neutral.soft-hover',
                    }
                },
            },
            brand: {
                disabled: {
                    type: 'state',
                    description: 'disabled state',
                    value: {
                        background: '$semanticColor.background.disabled',
                        cursor: 'not-allowed',
                        pointerEvents: 'none',
                    }
                },
                'selected.list-item': {
                    type: 'state',
                    description: 'selected state for list item',
                    "value": {
                        background: '$semanticColor.background.brand.soft-hover',
                    },
                    states: {
                        hover: {
                            type: 'state',
                            description: 'hover state for list item',
                            "value": {
                                cursor: 'default',
                                background: '$semanticColor.background.neutral.soft-hover',
                            }
                        },
                    },
                },
            },
            neutral: {
                disabled: {
                    type: 'state',
                    description: 'disabled state',
                    value: {
                        background: '$semanticColor.background.disabled'
                    }
                },
                'selected.list-item': {
                    type: 'state',
                    description: 'selected state for list item',
                    "value": {
                        background: '$semanticColor.background.brand.soft-hover',
                    },
                    states: {
                        hover: {
                            type: 'state',
                            description: 'hover state for list item',
                            "value": {
                                cursor: 'default',
                                background: '$semanticColor.background.neutral.soft-hover',
                            }
                        },
                    },
                },
            },
            danger: {
                disabled: {
                    type: 'state',
                    description: 'disabled state',
                    value: {
                        background: '$semanticColor.background.disabled'
                    }
                },
                'selected.list-item': {
                    type: 'state',
                    description: 'selected state for list item',
                    "value": {
                        background: '$semanticColor.background.brand.soft-hover',
                    },
                    states: {
                        hover: {
                            type: 'state',
                            description: 'hover state for list item',
                            "value": {
                                cursor: 'default',
                                background: '$semanticColor.background.neutral.soft-hover',
                            }
                        },
                    },
                },
            },
            caution: {
                disabled: {
                    type: 'state',
                    description: 'disabled state',
                    value: {
                        background: '$semanticColor.background.disabled'
                    }
                },
                'selected.list-item': {
                    type: 'state',
                    description: 'selected state for list item',
                    "value": {
                        background: '$semanticColor.background.brand.soft-hover',
                    },
                    states: {
                        hover: {
                            type: 'state',
                            description: 'hover state for list item',
                            "value": {
                                cursor: 'default',
                                background: '$semanticColor.background.neutral.soft-hover',
                            }
                        },
                    },
                },
            },
            success: {
                disabled: {
                    type: 'state',
                    description: 'disabled state',
                    value: {
                        background: '$semanticColor.background.disabled'
                    }
                },
                'selected.list-item': {
                    type: 'state',
                    description: 'selected state for list item',
                    "value": {
                        background: '$semanticColor.background.brand.soft-hover',
                    },
                    states: {
                        hover: {
                            type: 'state',
                            description: 'hover state for list item',
                            "value": {
                                cursor: 'default',
                                background: '$semanticColor.background.neutral.soft-hover',
                            }
                        },
                    },
                },
            },
            info: {
                disabled: {
                    type: 'state',
                    description: 'disabled state',
                    value: {
                        background: '$semanticColor.background.disabled'
                    }
                },
                'selected.list-item': {
                    type: 'state',
                    description: 'selected state for list item',
                    "value": {
                        background: '$semanticColor.background.brand.soft-hover',
                    },
                    states: {
                        hover: {
                            type: 'state',
                            description: 'hover state for list item',
                            "value": {
                                cursor: 'default',
                                background: '$semanticColor.background.neutral.soft-hover',
                            }
                        },
                    },
                },
            },
            size: {
                default: {
                    type: 'size',
                    description: 'hello world',
                    "value": {
                        padding: '12px 16px'
                    },
                },
                dense: {
                    type: 'size',
                    description: 'hello world',
                    "value": {
                        padding: '8px 16px'
                    },
                },
            },
        },
        reverse: {
            item: {
                type: 'variant',
                description: 'hello world',
                "value": {
                    display: 'flex',
                    alignItems: 'center',
                    color: '$semanticColor.text.default',
                    background: '$semanticColor.layer.neutral.01',
                },
                states: {
                    hover: {
                        type: 'state',
                        description: 'hover state for list item',
                        "value": {
                            cursor: 'pointer',
                            background: '$semanticColor.background.neutral.soft-hover',
                        }
                    },
                },
                brand: {
                    disabled: {
                        type: 'state',
                        description: 'disabled state',
                        value: {
                            background: '$semanticColor.background.disabled'
                        }
                    },
                    'selected.list-item': {
                        type: 'state',
                        description: 'selected state for list item',
                        "value": {
                            background: '$semanticColor.background.brand.soft-hover',
                        },
                        states: {
                            hover: {
                                type: 'state',
                                description: 'hover state for list item',
                                "value": {
                                    cursor: 'default',
                                    background: '$semanticColor.background.neutral.soft-hover',
                                }
                            },
                        },
                    },
                },
                neutral: {
                    disabled: {
                        type: 'state',
                        description: 'disabled state',
                        value: {
                            background: '$semanticColor.background.disabled'
                        }
                    },
                    'selected.list-item': {
                        type: 'state',
                        description: 'selected state for list item',
                        "value": {
                            background: '$semanticColor.background.brand.soft-hover',
                        },
                        states: {
                            hover: {
                                type: 'state',
                                description: 'hover state for list item',
                                "value": {
                                    cursor: 'default',
                                    background: '$semanticColor.background.neutral.soft-hover',
                                }
                            },
                        },
                    },
                },
                danger: {
                    disabled: {
                        type: 'state',
                        description: 'disabled state',
                        value: {
                            background: '$semanticColor.background.disabled'
                        }
                    },
                    'selected.list-item': {
                        type: 'state',
                        description: 'selected state for list item',
                        "value": {
                            background: '$semanticColor.background.brand.soft-hover',
                        },
                        states: {
                            hover: {
                                type: 'state',
                                description: 'hover state for list item',
                                "value": {
                                    cursor: 'default',
                                    background: '$semanticColor.background.neutral.soft-hover',
                                }
                            },
                        },
                    },
                },
                caution: {
                    disabled: {
                        type: 'state',
                        description: 'disabled state',
                        value: {
                            background: '$semanticColor.background.disabled'
                        }
                    },
                    'selected.list-item': {
                        type: 'state',
                        description: 'selected state for list item',
                        "value": {
                            background: '$semanticColor.background.brand.soft-hover',
                        },
                        states: {
                            hover: {
                                type: 'state',
                                description: 'hover state for list item',
                                "value": {
                                    cursor: 'default',
                                    background: '$semanticColor.background.neutral.soft-hover',
                                }
                            },
                        },
                    },
                },
                success: {
                    disabled: {
                        type: 'state',
                        description: 'disabled state',
                        value: {
                            background: '$semanticColor.background.disabled'
                        }
                    },
                    'selected.list-item': {
                        type: 'state',
                        description: 'selected state for list item',
                        "value": {
                            background: '$semanticColor.background.brand.soft-hover',
                        },
                        states: {
                            hover: {
                                type: 'state',
                                description: 'hover state for list item',
                                "value": {
                                    cursor: 'default',
                                    background: '$semanticColor.background.neutral.soft-hover',
                                }
                            },
                        },
                    },
                },
                info: {
                    disabled: {
                        type: 'state',
                        description: 'disabled state',
                        value: {
                            background: '$semanticColor.background.disabled'
                        }
                    },
                    'selected.list-item': {
                        type: 'state',
                        description: 'selected state for list item',
                        "value": {
                            background: '$semanticColor.background.brand.soft-hover',
                        },
                        states: {
                            hover: {
                                type: 'state',
                                description: 'hover state for list item',
                                "value": {
                                    cursor: 'default',
                                    background: '$semanticColor.background.neutral.soft-hover',
                                }
                            },
                        },
                    },
                },
                size: {
                    default: {
                        type: 'size',
                        description: 'hello world',
                        "value": {
                            padding: '12px 16px'
                        },
                    },
                    dense: {
                        type: 'size',
                        description: 'hello world',
                        "value": {
                            padding: '8px 16px'
                        },
                    },
                },
            },
        }
    },
}