export const config = {
    column:{
        value: {
            padding: "0",
        }
    },
    alert: {
        title: {
            "container": {
                value: {
                    minWidth: "50%",
                    padding: "4px"
                }
            }
        },
        center: {
            value:{
                alignContent: "center",
            }
        },
        right: {
            "container": {
                value: {
                    display: "flex",
                }
            }
        },
        style: {
            strong: {
                "neutral": {
                    "value": {
                        background: "$semanticColor.background.neutral.strong-rest",
                        color: "$semanticColor.text.inverse",
                    },
                    "atlas-icon-button": {
                        value: {
                            background: "$semanticColor.background.neutral.strong-rest",
                            color: "$semanticColor.icon.inverse"
                        }
                    },
                    'button': {
                        value: {
                            background: "$semanticColor.background.neutral.strong-rest",
                            color: "$semanticColor.text.inverse"
                        },
                        states: {
                            hover: {
                                value: {
                                    backgroundColor: "$semanticColor.background.neutral.strong-hover"
                                }
                            }
                        }
                    },
                },
                "danger":{
                    "value": {
                        background: "$semanticColor.background.danger.strong-rest",
                        color: "$semanticColor.text.inverse"
                    },
                    "atlas-icon-button": {
                        value: {
                            background: "$semanticColor.background.danger.strong-rest",
                            color: "$semanticColor.text.inverse"
                        }
                    },
                    'button': {
                        value: {
                            background: "$semanticColor.background.danger.strong-rest",
                            color: "$semanticColor.text.inverse"
                        },
                        states: {
                            hover: {
                                value: {
                                    backgroundColor: "$semanticColor.background.danger.soft-hover"
                                }
                            }
                        }
                    },
                },
                "caution":{
                    "value": {
                        background: "$semanticColor.background.caution.strong-rest",
                        color: "$semanticColor.text.helper.caution-inverse",
                    },
                    "atlas-icon-button": {
                        value: {
                            background: "$semanticColor.background.caution.strong-rest",
                            color: "$semanticColor.text.helper.caution-inverse"
                        }
                    },
                    'button': {
                        value: {
                            background: "$semanticColor.background.caution.strong-rest",
                            color: "$semanticColor.icon.caution"
                        },
                        states: {
                            hover: {
                                value: {
                                    backgroundColor: "$semanticColor.background.caution.soft-hover"
                                }
                            }
                        }
                    },
                },
                "info":{
                    "value": {
                        background: "$semanticColor.background.info.strong-rest",
                        color: "$semanticColor.text.inverse"
                    },
                    "atlas-icon-button": {
                        value: {
                            background: "$semanticColor.background.info.strong-rest",
                            color: "$semanticColor.icon.inverse"
                        }
                    },
                    'button': {
                        value: {
                            background: "$semanticColor.background.info.strong-rest",
                            color: "$semanticColor.text.inverse"
                        },
                        states: {
                            hover: {
                                value: {
                                    backgroundColor: "$semanticColor.background.info.soft-hover"
                                }
                            }
                        }
                    },
                },
                "success":{
                    "value": {
                        background: "$semanticColor.background.success.strong-rest",
                        color: "$semanticColor.text.inverse"
                    },
                    "atlas-icon-button": {
                        value: {
                            background: "$semanticColor.background.success.strong-rest",
                            color: "$semanticColor.icon.inverse"
                        }
                    },
                    'button': {
                        value: {
                            background: "$semanticColor.background.success.strong-rest",
                            color: "$semanticColor.text.inverse"
                        },
                        states: {
                            hover: {
                                value: {
                                    backgroundColor: "$semanticColor.background.success.soft-hover"
                                }
                            }
                        }
                    },
                },
            },
            soft: {
                "danger":{
                    "value": {
                        color: "$semanticColor.text.default",
                        backgroundColor: "$semanticColor.background.danger.rest"
                    },
                    "atlas-icon-button": {
                        value: {
                            color: "$semanticColor.text.default"
                        }
                    },
                    'button': {
                        value: {
                            color: "$semanticColor.text.helper.neutral"
                        },
                        states: {
                            hover: {
                                value: {
                                    color: "$semanticColor.text.helper.neutral",
                                    backgroundColor: "$semanticColor.background.danger.soft-hover"
                                }
                            }
                        }
                    },
                },
                "danger > div > atlas-icon": {
                    "value": {
                        color: "$semanticColor.background.danger.strong-rest"
                    }
                },
                "caution":{
                    "value": {
                        color: "$semanticColor.text.helper.caution-inverse",
                        backgroundColor: "$semanticColor.background.caution.rest"
                    },
                    "atlas-icon-button": {
                        value: {
                            color: "$semanticColor.text.helper.caution-inverse"
                        }
                    },
                    'button': {
                        value: {
                            color: "$semanticColor.text.helper.neutral"
                        },
                        states: {
                            hover: {
                                value: {
                                    color: "$semanticColor.text.helper.neutral",
                                    backgroundColor: "$semanticColor.background.caution.soft-hover"
                                }
                            }
                        }
                    },
                },
                "caution > div > atlas-icon": {
                    "value": {
                        color: "$semanticColor.background.caution.strong-rest"
                    }
                },    
                "info":{
                    "value": {
                        color: "$semanticColor.text.default",
                        backgroundColor: "$semanticColor.background.info.rest"
                    },
                    "atlas-icon-button": {
                        value: {
                            color: "$semanticColor.text.default"
                        }
                    },
                    'button': {
                        value: {
                            color: "$semanticColor.text.helper.neutral"
                        },
                        states: {
                            hover: {
                                value: {
                                    color: "$semanticColor.text.helper.neutral",
                                    backgroundColor: "$semanticColor.background.info.soft-hover"
                                }
                            }
                        }
                    },
                },
                "info > div > atlas-icon": {
                    "value": {
                        color: "$semanticColor.background.info.strong-rest"
                    }
                },
                "success":{
                    "value": {
                        color: "$semanticColor.text.default",
                        backgroundColor: "$semanticColor.background.success.rest"
                    },
                    "atlas-icon-button": {
                        value: {
                            color: "$semanticColor.text.default"
                        }
                    },
                    'button': {
                        value: {
                            color: "$semanticColor.text.helper.neutral"
                        },
                        states: {
                            hover: {
                                value: {
                                    color: "$semanticColor.text.helper.neutral",
                                    backgroundColor: "$semanticColor.background.success.soft-hover"
                                }
                            }
                        }
                    },
                },
                "success > div > atlas-icon": {
                    "value": {
                        color: "$semanticColor.background.success.strong-rest"
                    }
                },
            },
            outlined: {
                "danger":{
                    "value": {
                        color: "$semanticColor.text.default",
                        border: "1px solid $semanticColor.border.danger-strong"
                    },
                    "atlas-icon-button": {
                        value: {
                            color: "$semanticColor.text.default"
                        }
                    },
                    'button': {
                        value: {
                            color: "$semanticColor.text.helper.danger"
                        },
                        states: {
                            hover: {
                                value: {
                                    color: "$semanticColor.text.helper.danger",
                                    backgroundColor: "$semanticColor.background.danger.soft-hover"
                                }
                            }
                        }
                    },
                },
                "danger > div > atlas-icon": {
                    "value": {
                        color: "$semanticColor.background.danger.strong-rest"
                    }
                },
                "caution":{
                    "value": {
                        color: "$semanticColor.text.helper.caution-inverse",
                        border: "1px solid $semanticColor.border.caution"
                    },
                    "atlas-icon-button": {
                        value: {
                            color: "$semanticColor.text.helper.caution-inverse"
                        }
                    },
                    'button': {
                        value: {
                            color: "$semanticColor.text.helper.neutral"
                        },
                        states: {
                            hover: {
                                value: {
                                    color: "$semanticColor.text.helper.neutral",
                                    backgroundColor: "$semanticColor.background.caution.soft-hover"
                                }
                            }
                        }
                    },
                },
                "caution > div > atlas-icon": {
                    "value": {
                        color: "$semanticColor.background.caution.strong-rest"
                    }
                },    
                "info":{
                    "value": {
                        color: "$semanticColor.text.default",
                        border: "1px solid $semanticColor.border.info-strong"
                    },
                    "atlas-icon-button": {
                        value: {
                            color: "$semanticColor.text.default"
                        }
                    },
                    'button': {
                        value: {
                            color: "$semanticColor.text.helper.neutral"
                        },
                        states: {
                            hover: {
                                value: {
                                    color: "$semanticColor.text.helper.neutral",
                                    backgroundColor: "$semanticColor.background.info.soft-hover"
                                }
                            }
                        }
                    },
                },
                "info > div > atlas-icon": {
                    "value": {
                        color: "$semanticColor.background.info.strong-rest"
                    }
                },
                "success":{
                    "value": {
                        color: "$semanticColor.text.default",
                        border: "1px solid $semanticColor.border.success-strong"
                    },
                    "atlas-icon-button": {
                        value: {
                            color: "$semanticColor.text.default"
                        }
                    },
                    'button': {
                        value: {
                            color: "$semanticColor.text.helper.neutral"
                        },
                        states: {
                            hover: {
                                value: {
                                    color: "$semanticColor.text.helper.neutral",
                                    backgroundColor: "$semanticColor.background.success.soft-hover"
                                }
                            }
                        }
                    },
                },
                "success > div > atlas-icon": {
                    "value": {
                        color: "$semanticColor.background.success.strong-rest"
                    }
                },
            },
        },
        variant: { // support backwards compatibility deprecated
            strong: {
                "neutral": {
                    "value": {
                        background: "$semanticColor.background.neutral.strong-rest",
                        color: "$semanticColor.text.inverse",
                    },
                    "atlas-icon-button": {
                        value: {
                            color: "$semanticColor.icon.inverse"
                        }
                    },
                    'button': {
                        value: {
                            background: "$semanticColor.background.neutral.strong-rest",
                            color: "$semanticColor.text.inverse"
                        },
                        states: {
                            hover: {
                                value: {
                                    backgroundColor: "$semanticColor.background.neutral.strong-hover"
                                }
                            }
                        }
                    },
                },
                "danger":{
                    "value": {
                        background: "$semanticColor.background.danger.strong-rest",
                        color: "$semanticColor.text.inverse"
                    },
                    "atlas-icon-button": {
                        value: {
                            color: "$semanticColor.text.inverse"
                        }
                    },
                    'button': {
                        value: {
                            background: "$semanticColor.background.danger.strong-rest",
                            color: "$semanticColor.text.inverse"
                        },
                        states: {
                            hover: {
                                value: {
                                    backgroundColor: "$semanticColor.background.danger.soft-hover"
                                }
                            }
                        }
                    },
                },
                "caution":{
                    "value": {
                        background: "$semanticColor.background.caution.strong-rest",
                        color: "$semanticColor.text.helper.caution-inverse",
                    },
                    "atlas-icon-button": {
                        value: {
                            color: "$semanticColor.text.helper.caution-inverse"
                        }
                    },
                    'button': {
                        value: {
                            background: "$semanticColor.background.caution.strong-rest",
                            color: "$semanticColor.icon.caution"
                        },
                        states: {
                            hover: {
                                value: {
                                    backgroundColor: "$semanticColor.background.caution.soft-hover"
                                }
                            }
                        }
                    },
                },
                "info":{
                    "value": {
                        background: "$semanticColor.background.info.strong-rest",
                        color: "$semanticColor.text.inverse"
                    },
                    "atlas-icon-button": {
                        value: {
                            color: "$semanticColor.icon.inverse"
                        }
                    },
                    'button': {
                        value: {
                            background: "$semanticColor.background.info.strong-rest",
                            color: "$semanticColor.text.inverse"
                        },
                        states: {
                            hover: {
                                value: {
                                    backgroundColor: "$semanticColor.background.info.soft-hover"
                                }
                            }
                        }
                    },
                },
                "success":{
                    "value": {
                        background: "$semanticColor.background.success.strong-rest",
                        color: "$semanticColor.text.inverse"
                    },
                    "atlas-icon-button": {
                        value: {
                            color: "$semanticColor.icon.inverse"
                        }
                    },
                    'button': {
                        value: {
                            background: "$semanticColor.background.success.strong-rest",
                            color: "$semanticColor.text.inverse"
                        },
                        states: {
                            hover: {
                                value: {
                                    backgroundColor: "$semanticColor.background.success.soft-hover"
                                }
                            }
                        }
                    },
                },
            },
            soft: {
                "neutral":{
                    "value": {
                        color: "$semanticColor.text.default",
                        backgroundColor: "$semanticColor.background.neutral.rest"
                    },
                    "atlas-icon": {
                        value:{
                            color: "$semanticColor.icon.neutral"
                        }
                    },
                    "atlas-icon-button": {
                        value: {
                            color: "$semanticColor.text.default"
                        }
                    },
                    'button': {
                        value: {
                            color: "$semanticColor.text.helper.neutral"
                        },
                        states: {
                            hover: {
                                value: {
                                    color: "$semanticColor.text.helper.neutral",
                                    backgroundColor: "$semanticColor.background.neutral.soft-hover"
                                }
                            }
                        }
                    },
                },
                "neutral > div > atlas-icon": {
                    "value": {
                        color: "$semanticColor.background.neutral.strong-rest"
                    }
                },
                "danger":{
                    "value": {
                        color: "$semanticColor.text.default",
                        backgroundColor: "$semanticColor.background.danger.rest"
                    },
                    "atlas-icon": {
                        value:{
                            color: "$semanticColor.icon.danger"
                        }
                    },
                    "atlas-icon-button": {
                        value: {
                            color: "$semanticColor.text.default"
                        }
                    },
                    'button': {
                        value: {
                            color: "$semanticColor.text.helper.neutral"
                        },
                        states: {
                            hover: {
                                value: {
                                    color: "$semanticColor.text.helper.neutral",
                                    backgroundColor: "$semanticColor.background.danger.soft-hover"
                                }
                            }
                        }
                    },
                },
                "danger > div > atlas-icon": {
                    "value": {
                        color: "$semanticColor.background.danger.strong-rest"
                    }
                },
                "caution":{
                    "value": {
                        color: "$semanticColor.text.default",
                        backgroundColor: "$semanticColor.background.caution.rest"
                    },
                    "atlas-icon": {
                        value:{
                            color: "$semanticColor.icon.caution"
                        }
                    },
                    "atlas-icon-button": {
                        value: {
                            color: "$semanticColor.text.default"
                        }
                    },
                    'button': {
                        value: {
                            color: "$semanticColor.text.helper.neutral"
                        },
                        states: {
                            hover: {
                                value: {
                                    color: "$semanticColor.text.helper.neutral",
                                    backgroundColor: "$semanticColor.background.caution.soft-hover"
                                }
                            }
                        }
                    },
                },
                "caution > div > atlas-icon": {
                    "value": {
                        color: "$semanticColor.background.caution.strong-rest"
                    }
                },    
                "info":{
                    "value": {
                        color: "$semanticColor.text.default",
                        backgroundColor: "$semanticColor.background.info.rest"
                    },
                    "atlas-icon": {
                        value:{
                            color: "$semanticColor.icon.info"
                        }
                    },
                    "atlas-icon-button": {
                        value: {
                            color: "$semanticColor.text.default"
                        }
                    },
                    'button': {
                        value: {
                            color: "$semanticColor.text.helper.neutral"
                        },
                        states: {
                            hover: {
                                value: {
                                    color: "$semanticColor.text.helper.neutral",
                                    backgroundColor: "$semanticColor.background.info.soft-hover"
                                }
                            }
                        }
                    },
                },
                "info > div > atlas-icon": {
                    "value": {
                        color: "$semanticColor.background.info.strong-rest"
                    }
                },
                "success":{
                    "value": {
                        color: "$semanticColor.text.default",
                        backgroundColor: "$semanticColor.background.success.rest"
                    },
                    "atlas-icon": {
                        value:{
                            color: "$semanticColor.icon.success"
                        }
                    },
                    "atlas-icon-button": {
                        value: {
                            color: "$semanticColor.text.default"
                        }
                    },
                    'button': {
                        value: {
                            color: "$semanticColor.text.helper.neutral"
                        },
                        states: {
                            hover: {
                                value: {
                                    color: "$semanticColor.text.helper.neutral",
                                    backgroundColor: "$semanticColor.background.success.soft-hover"
                                }
                            }
                        }
                    },
                },
                "success > div > atlas-icon": {
                    "value": {
                        color: "$semanticColor.background.success.strong-rest"
                    }
                },
            },
            outlined: {
                "neutral":{
                    "value": {
                        color: "$semanticColor.text.default",
                        border: "1px solid $semanticColor.border.neutral-strong"
                    },
                    "atlas-icon": {
                        value:{
                            color: "$semanticColor.icon.neutral"
                        }
                    },
                    "atlas-icon-button": {
                        value: {
                            color: "$semanticColor.text.default"
                        }
                    },
                    'button': {
                        value: {
                            color: "$semanticColor.text.helper.neutral"
                        },
                        states: {
                            hover: {
                                value: {
                                    color: "$semanticColor.text.helper.neutral",
                                    backgroundColor: "$semanticColor.background.neutral.soft-hover"
                                }
                            }
                        }
                    },
                },
                "neutral > div > atlas-icon": {
                    "value": {
                        color: "$semanticColor.background.neutral.strong-rest"
                    }
                },
                "danger":{
                    "value": {
                        color: "$semanticColor.text.default",
                        border: "1px solid $semanticColor.border.danger-strong"
                    },
                    "atlas-icon": {
                        value:{
                            color: "$semanticColor.icon.danger"
                        }
                    },
                    "atlas-icon-button": {
                        value: {
                            color: "$semanticColor.text.default"
                        }
                    },
                    'button': {
                        value: {
                            color: "$semanticColor.text.helper.danger"
                        },
                        states: {
                            hover: {
                                value: {
                                    color: "$semanticColor.text.helper.danger",
                                    backgroundColor: "$semanticColor.background.danger.soft-hover"
                                }
                            }
                        }
                    },
                },
                "danger > div > atlas-icon": {
                    "value": {
                        color: "$semanticColor.background.danger.strong-rest"
                    }
                },
                "caution":{
                    "value": {
                        color: "$semanticColor.text.default",
                        border: "1px solid $semanticColor.border.caution"
                    },
                    "atlas-icon": {
                        value:{
                            color: "$semanticColor.icon.caution"
                        }
                    },
                    "atlas-icon-button": {
                        value: {
                            color: "$semanticColor.text.default"
                        }
                    },
                    'button': {
                        value: {
                            color: "$semanticColor.text.helper.neutral"
                        },
                        states: {
                            hover: {
                                value: {
                                    color: "$semanticColor.text.helper.neutral",
                                    backgroundColor: "$semanticColor.background.caution.soft-hover"
                                }
                            }
                        }
                    },
                },
                "caution > div > atlas-icon": {
                    "value": {
                        color: "$semanticColor.background.caution.strong-rest"
                    }
                },    
                "info":{
                    "value": {
                        color: "$semanticColor.text.default",
                        border: "1px solid $semanticColor.border.info-strong"
                    },
                    "atlas-icon": {
                        value:{
                            color: "$semanticColor.icon.info"
                        }
                    },
                    "atlas-icon-button": {
                        value: {
                            color: "$semanticColor.text.default"
                        }
                    },
                    'button': {
                        value: {
                            color: "$semanticColor.text.helper.neutral"
                        },
                        states: {
                            hover: {
                                value: {
                                    color: "$semanticColor.text.helper.neutral",
                                    backgroundColor: "$semanticColor.background.info.soft-hover"
                                }
                            }
                        }
                    },
                },
                "info > div > atlas-icon": {
                    "value": {
                        color: "$semanticColor.background.info.strong-rest"
                    }
                },
                "success":{
                    "value": {
                        color: "$semanticColor.text.default",
                        border: "1px solid $semanticColor.border.success-strong"
                    },
                    "atlas-icon": {
                        value:{
                            color: "$semanticColor.icon.success"
                        }
                    },
                    "atlas-icon-button": {
                        value: {
                            color: "$semanticColor.text.default"
                        }
                    },
                    'button': {
                        value: {
                            color: "$semanticColor.text.helper.neutral"
                        },
                        states: {
                            hover: {
                                value: {
                                    color: "$semanticColor.text.helper.neutral",
                                    backgroundColor: "$semanticColor.background.success.soft-hover"
                                }
                            }
                        }
                    },
                },
                "success > div > atlas-icon": {
                    "value": {
                        color: "$semanticColor.background.success.strong-rest"
                    }
                },
            },
            filled: {
                "neutral": {
                    "value": {
                        background: "$semanticColor.background.neutral.strong-rest",
                        color: "$semanticColor.text.inverse",
                    },
                    "atlas-icon-button": {
                        value: {
                            background: "$semanticColor.background.neutral.strong-rest",
                            color: "$semanticColor.icon.inverse"
                        }
                    },
                    'button': {
                        value: {
                            background: "$semanticColor.background.neutral.strong-rest",
                            color: "$semanticColor.text.inverse"
                        },
                        states: {
                            hover: {
                                value: {
                                    backgroundColor: "$semanticColor.background.neutral.strong-hover"
                                }
                            }
                        }
                    },
                },
                "danger":{
                    "value": {
                        background: "$semanticColor.background.danger.strong-rest",
                        color: "$semanticColor.text.inverse"
                    },
                    "atlas-icon-button": {
                        value: {
                            background: "$semanticColor.background.danger.strong-rest",
                            color: "$semanticColor.text.inverse"
                        }
                    },
                    'button': {
                        value: {
                            background: "$semanticColor.background.danger.strong-rest",
                            color: "$semanticColor.text.inverse"
                        },
                        states: {
                            hover: {
                                value: {
                                    backgroundColor: "$semanticColor.background.danger.soft-hover"
                                }
                            }
                        }
                    },
                },
                "caution":{
                    "value": {
                        background: "$semanticColor.background.caution.strong-rest",
                        color: "$semanticColor.text.helper.caution-inverse",
                    },
                    "atlas-icon-button": {
                        value: {
                            background: "$semanticColor.background.caution.strong-rest",
                            color: "$semanticColor.text.helper.caution-inverse"
                        }
                    },
                    'button': {
                        value: {
                            background: "$semanticColor.background.caution.strong-rest",
                            color: "$semanticColor.icon.caution"
                        },
                        states: {
                            hover: {
                                value: {
                                    backgroundColor: "$semanticColor.background.caution.soft-hover"
                                }
                            }
                        }
                    },
                },
                "info":{
                    "value": {
                        background: "$semanticColor.background.info.strong-rest",
                        color: "$semanticColor.text.inverse"
                    },
                    "atlas-icon-button": {
                        value: {
                            background: "$semanticColor.background.info.strong-rest",
                            color: "$semanticColor.icon.inverse"
                        }
                    },
                    'button': {
                        value: {
                            background: "$semanticColor.background.info.strong-rest",
                            color: "$semanticColor.text.inverse"
                        },
                        states: {
                            hover: {
                                value: {
                                    backgroundColor: "$semanticColor.background.info.soft-hover"
                                }
                            }
                        }
                    },
                },
                "success":{
                    "value": {
                        background: "$semanticColor.background.success.strong-rest",
                        color: "$semanticColor.text.inverse"
                    },
                    "atlas-icon-button": {
                        value: {
                            background: "$semanticColor.background.success.strong-rest",
                            color: "$semanticColor.icon.inverse"
                        }
                    },
                    'button': {
                        value: {
                            background: "$semanticColor.background.success.strong-rest",
                            color: "$semanticColor.text.inverse"
                        },
                        states: {
                            hover: {
                                value: {
                                    backgroundColor: "$semanticColor.background.success.soft-hover"
                                }
                            }
                        }
                    },
                },
            },
            primary: {
                "neutral":{
                    "value": {
                        color: "$semanticColor.text.default",
                        backgroundColor: "$semanticColor.background.neutral.rest"
                    },
                    "atlas-icon-button": {
                        value: {
                            color: "$semanticColor.text.default"
                        }
                    },
                    'button': {
                        value: {
                            color: "$semanticColor.text.helper.neutral"
                        },
                        states: {
                            hover: {
                                value: {
                                    color: "$semanticColor.text.helper.neutral",
                                    backgroundColor: "$semanticColor.background.neutral.soft-hover"
                                }
                            }
                        }
                    },
                },
                "neutral > div > atlas-icon": {
                    "value": {
                        color: "$semanticColor.background.neutral.strong-rest"
                    }
                },
                "danger":{
                    "value": {
                        color: "$semanticColor.text.default",
                        backgroundColor: "$semanticColor.background.danger.rest"
                    },
                    "atlas-icon-button": {
                        value: {
                            color: "$semanticColor.text.default"
                        }
                    },
                    'button': {
                        value: {
                            color: "$semanticColor.text.helper.neutral"
                        },
                        states: {
                            hover: {
                                value: {
                                    color: "$semanticColor.text.helper.neutral",
                                    backgroundColor: "$semanticColor.background.danger.soft-hover"
                                }
                            }
                        }
                    },
                },
                "danger > div > atlas-icon": {
                    "value": {
                        color: "$semanticColor.background.danger.strong-rest"
                    }
                },
                "caution":{
                    "value": {
                        color: "$semanticColor.text.default",
                        backgroundColor: "$semanticColor.background.caution.rest"
                    },
                    "atlas-icon-button": {
                        value: {
                            color: "$semanticColor.text.default"
                        }
                    },
                    'button': {
                        value: {
                            color: "$semanticColor.text.helper.neutral"
                        },
                        states: {
                            hover: {
                                value: {
                                    color: "$semanticColor.text.helper.neutral",
                                    backgroundColor: "$semanticColor.background.caution.soft-hover"
                                }
                            }
                        }
                    },
                },
                "caution > div > atlas-icon": {
                    "value": {
                        color: "$semanticColor.background.caution.strong-rest"
                    }
                },    
                "info":{
                    "value": {
                        color: "$semanticColor.text.default",
                        backgroundColor: "$semanticColor.background.info.rest"
                    },
                    "atlas-icon-button": {
                        value: {
                            color: "$semanticColor.text.default"
                        }
                    },
                    'button': {
                        value: {
                            color: "$semanticColor.text.helper.neutral"
                        },
                        states: {
                            hover: {
                                value: {
                                    color: "$semanticColor.text.helper.neutral",
                                    backgroundColor: "$semanticColor.background.info.soft-hover"
                                }
                            }
                        }
                    },
                },
                "info > div > atlas-icon": {
                    "value": {
                        color: "$semanticColor.background.info.strong-rest"
                    }
                },
                "success":{
                    "value": {
                        color: "$semanticColor.text.default",
                        backgroundColor: "$semanticColor.background.success.rest"
                    },
                    "atlas-icon-button": {
                        value: {
                            color: "$semanticColor.text.default"
                        }
                    },
                    'button': {
                        value: {
                            color: "$semanticColor.text.helper.neutral"
                        },
                        states: {
                            hover: {
                                value: {
                                    color: "$semanticColor.text.helper.neutral",
                                    backgroundColor: "$semanticColor.background.success.soft-hover"
                                }
                            }
                        }
                    },
                },
                "success > div > atlas-icon": {
                    "value": {
                        color: "$semanticColor.background.success.strong-rest"
                    }
                },
            },
            Secondary: {
                "neutral":{
                    "value": {
                        color: "$semanticColor.text.default",
                        border: "1px solid $semanticColor.border.neutral-strong"
                    },
                    "atlas-icon-button": {
                        value: {
                            color: "$semanticColor.text.default"
                        }
                    },
                    'button': {
                        value: {
                            color: "$semanticColor.text.helper.neutral"
                        },
                        states: {
                            hover: {
                                value: {
                                    color: "$semanticColor.text.helper.neutral",
                                    backgroundColor: "$semanticColor.background.neutral.soft-hover"
                                }
                            }
                        }
                    },
                },
                "neutral > div > atlas-icon": {
                    "value": {
                        color: "$semanticColor.background.neutral.strong-rest"
                    }
                },
                "danger":{
                    "value": {
                        color: "$semanticColor.text.default",
                        border: "1px solid $semanticColor.border.danger-strong"
                    },
                    "atlas-icon-button": {
                        value: {
                            color: "$semanticColor.text.default"
                        }
                    },
                    'button': {
                        value: {
                            color: "$semanticColor.text.helper.danger"
                        },
                        states: {
                            hover: {
                                value: {
                                    color: "$semanticColor.text.helper.danger",
                                    backgroundColor: "$semanticColor.background.danger.soft-hover"
                                }
                            }
                        }
                    },
                },
                "danger > div > atlas-icon": {
                    "value": {
                        color: "$semanticColor.background.danger.strong-rest"
                    }
                },
                "caution":{
                    "value": {
                        color: "$semanticColor.text.default",
                        border: "1px solid $semanticColor.border.caution"
                    },
                    "atlas-icon-button": {
                        value: {
                            color: "$semanticColor.text.default"
                        }
                    },
                    'button': {
                        value: {
                            color: "$semanticColor.text.helper.neutral"
                        },
                        states: {
                            hover: {
                                value: {
                                    color: "$semanticColor.text.helper.neutral",
                                    backgroundColor: "$semanticColor.background.caution.soft-hover"
                                }
                            }
                        }
                    },
                },
                "caution > div > atlas-icon": {
                    "value": {
                        color: "$semanticColor.background.caution.strong-rest"
                    }
                },    
                "info":{
                    "value": {
                        color: "$semanticColor.text.default",
                        border: "1px solid $semanticColor.border.info-strong"
                    },
                    "atlas-icon-button": {
                        value: {
                            color: "$semanticColor.text.default"
                        }
                    },
                    'button': {
                        value: {
                            color: "$semanticColor.text.helper.neutral"
                        },
                        states: {
                            hover: {
                                value: {
                                    color: "$semanticColor.text.helper.neutral",
                                    backgroundColor: "$semanticColor.background.info.soft-hover"
                                }
                            }
                        }
                    },
                },
                "info > div > atlas-icon": {
                    "value": {
                        color: "$semanticColor.background.info.strong-rest"
                    }
                },
                "success":{
                    "value": {
                        color: "$semanticColor.text.default",
                        border: "1px solid $semanticColor.border.success-strong"
                    },
                    "atlas-icon-button": {
                        value: {
                            color: "$semanticColor.text.default"
                        }
                    },
                    'button': {
                        value: {
                            color: "$semanticColor.text.helper.neutral"
                        },
                        states: {
                            hover: {
                                value: {
                                    color: "$semanticColor.text.helper.neutral",
                                    backgroundColor: "$semanticColor.background.success.soft-hover"
                                }
                            }
                        }
                    },
                },
                "success > div > atlas-icon": {
                    "value": {
                        color: "$semanticColor.background.success.strong-rest"
                    }
                },
            },
        },
        "action": {
            value: {
                cursor: "default"
            }
        },
        "separator": {
            value: {
                flex: "1 1 auto",
            },
        },
        "value": {
            minWidth: "360px",
            borderRadius: "4px",
            padding: "8px 8px 8px 12px",
        },
        "position": {
            "top": {
                "left": {
                    value: {
                        top: "15px",
                        position: "fixed",
                        left: "15px",
                    }
                },
                "center": {
                    value: {
                        top: "15px",
                        left: "50%",
                        position: "fixed",
                        transform: "translate(-50%, 0)"
                    }
                },
                "right": {
                    value: {
                        top: "15px",
                        position: "fixed",
                        right: "15px"
                    }
                }
            },
            "bottom": {
                "left": {
                    value: {
                        bottom: "15px",
                        position: "fixed",
                        left: "15px"
                    }
                },
                "center": {
                    value: {
                        bottom: "15px",
                        position: "fixed",
                        left: "50%",
                        transform: "translate(-50%, 0)"
                    }
                },
                "right": {
                    value: {
                        bottom: "15px",
                        position: "fixed",
                        right: "15px"
                    }
                }
            }
        },
    }
}