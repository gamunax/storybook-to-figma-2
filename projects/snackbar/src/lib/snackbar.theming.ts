export const config = {
    "snackbar": {
        "variant": {
            "dark": {
                "value": {
                    background: "$semanticColor.background.neutral.strong-rest",
                    color: "$semanticColor.text.inverse",
                },
                "atlas-icon-button": {
                    value: {
                        color: "$semanticColor.text.inverse !important"
                    }
                },
                "atlas-action-button": {
                    value: {
                        marginRight: '2px',
                        color: "$semanticColor.text.inverse !important"
                    }
                },
            },
            "light": {
                "value": {
                    background: "$semanticColor.background.neutral.rest",
                    color: "$semanticColor.text.default",
                },
                "atlas-icon-button": {
                    value: {
                        color: "$semanticColor.text.default !important"
                    }
                },
                "atlas-action-button": {
                    value: {
                        marginRight: '2px',
                        color: "$semanticColor.text.default"
                    }
                },
            }
        },
        "action": {
            value: {
                cursor: "default",
                display: "flex",
                alignItems: "center",
            }
        },
        "separator": {
            value: {
                flex: "1 1 auto",
            },
        },
        "position": {
            "top": {
                "left": {
                    value: {
                        top: "15px",
                        left: "15px"
                    }
                },
                "center": {
                    value: {
                        top: "15px",
                        left: "50%",
                        transform: "translate(-50%, 0)"
                    }
                },
                "right": {
                    value: {
                        top: "15px",
                        right: "15px"
                    }
                }
            },
            "bottom": {
                "left": {
                    value: {
                        bottom: "15px",
                        left: "15px"
                    }
                },
                "center": {
                    value: {
                        bottom: "15px",
                        left: "50%",
                        transform: "translate(-50%, 0)"
                    }
                },
                "right": {
                    value: {
                        bottom: "15px",
                        right: "15px"
                    }
                }
            }
        },
        "value": {
            minWidth: "223px",
            borderRadius: "4px",
            padding: "14px 24px 14px 16px",
            display: "inline-flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "fixed"
        },
    }
}