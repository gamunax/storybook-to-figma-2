export const config = {
    switch: {
        btn: {
            value: {
                cursor: "pointer",
                display: "inline-block",
                outline: "0",
                position: "relative",
                transition: "all 0.3s ease",
                userSelect: "none",
                verticalAlign: "middle",
            },
            disabled: {
                "value": {
                    background: "$semanticColor.background.disabled",
                }
            },
            "off": {
                value: {
                    background: '$semanticColor.background.neutral.rest',
                }
            },
            size: {
                medium: {
                    value: {
                        borderRadius: "120px",
                        height: "20px",
                        padding: "2px",
                        width: "40px",
                    },
                },
                "medium::after": {
                    value: {
                        height: "16px",
                        width: "16px",
                    }
                },
                small: {
                    value: {
                        borderRadius: "120px",
                        height: "16px",
                        padding: "2px",
                        width: "32px",
                    },
                },
                "small::after": {
                    value: {
                        height: "12px",
                        width: "12px",
                    }
                },
            },
            color: {
                neutral: {
                    'on': {
                        value: {
                            background: '$semanticColor.background.neutral.strong-rest',
                        }
                    },
                    states: {
                        hover: {
                            type: 'state',
                            description: 'hover state for default radio',
                            "value": {
                                background: '$semanticColor.background.neutral.strong-rest',
                            }
                        },
                        disabled: {
                            type: 'state',
                            description: 'hover state for default radio',
                            "value": {
                                background: '$semanticColor.background.disabled',
                            }
                        },
                    }
                },
                brand: {
                    'on': {
                        value: {
                            background: '$semanticColor.background.brand.strong-rest',
                        }
                    },
                    states: {
                        hover: {
                            type: 'state',
                            description: 'hover state for primary radio',
                            "value": {
                                background: '$semanticColor.background.brand.strong-hover',
                            }
                        },
                        disabled: {
                            type: 'state',
                            description: 'hover state for primary radio',
                            "value": {
                                background: '$semanticColor.background.disabled',
                            }
                        },
                    }
                },
                danger: {
                    'on': {
                        value: {
                            background: '$semanticColor.background.danger.strong-rest',
                        }
                    },
                    states: {
                        hover: {
                            type: 'state',
                            description: 'hover state for error radio',
                            "value": {
                                background: '$semanticColor.background.danger.strong-hover',
                            }
                        },
                        disabled: {
                            type: 'state',
                            description: 'hover state for error radio',
                            "value": {
                                background: '$semanticColor.background.disabled',
                            }
                        },
                    }
                },
                caution: {
                    'on': {
                        value: {
                            background: '$semanticColor.background.caution.strong-rest',
                        }
                    },
                    states: {
                        hover: {
                            type: 'state',
                            description: 'hover state for warning radio',
                            "value": {
                                background: '$semanticColor.background.caution.strong-hover',
                            }
                        },
                        disabled: {
                            type: 'state',
                            description: 'hover state for warning radio',
                            "value": {
                                background: '$semanticColor.background.disabled',
                            }
                        },
                    }
                },
                success: {
                    'on': {
                        value: {
                            background: '$semanticColor.background.success.strong-rest',
                        }
                    },
                    states: {
                        hover: {
                            type: 'state',
                            description: 'hover state for success radio',
                            "value": {
                                background: '$semanticColor.background.success.strong-hover',
                            }
                        },
                        disabled: {
                            type: 'state',
                            description: 'hover state for success radio',
                            "value": {
                                background: '$semanticColor.background.disabled',
                            }
                        },
                    }
                },
                info: {
                    'on': {
                        value: {
                            background: '$semanticColor.background.info.strong-rest',
                        }
                    },
                    states: {
                        hover: {
                            type: 'state',
                            description: 'hover state for info radio',
                            "value": {
                                background: '$semanticColor.background.info.strong-hover',
                            }
                        },
                        disabled: {
                            type: 'state',
                            description: 'hover state for info radio',
                            "value": {
                                background: '$semanticColor.background.disabled',
                            }
                        },
                    }
                },
            },    
        },
        "btn-on::after": {
            value: {
                background: "$semanticColor.text.inverse",
                borderRadius: "120px",
                content: "\"\"",
                display: "block",
                left: "0",
                position: "relative",
                transition: "all 0.3s ease",
            }
        },
        "btn-off::after": {
            value: {
                background: "$semanticColor.icon.neutral",
                borderRadius: "120px",
                content: "\"\"",
                display: "block",
                left: "0",
                position: "relative",
                transition: "all 0.3s ease",
            }
        },
        input: {
            value: {
                display: "none",
            }
        },
        label: {
            value: {
                margin: "0 2px",
                display: "inline",
                verticalAlign: "middle",
                userSelect: "none",
                cursor: 'pointer'
            }
        },
        disabled: {
            type: "state",
            description: "hover state for default checkbox",
            value: {
                pointerEvents: "none",
                color: "$semanticColor.background.disabled",
            },
        },
    },
    "switch-btn.switch-btn-size-medium.switch-btn-on::after": {
        value: {
            left: "calc(100% - 16px)",
        }
    },
    "switch-btn.switch-btn-size-small.switch-btn-on::after": {
        value: {
            left: "calc(100% - 12px)",
        }
    },
    "switch-btn.switch-btn-disabled.switch-btn-off::after": {
        value: {
            background: "$semanticColor.background.disabled",
        }
    }
};
