export const config = {
    "app-bar": {
        "value": {
            "display": "flex",
            "flexDirection": "row",
            "alignItems": "center",
            "boxSizing": "border-box",
            "width": "100%",
            "whiteSpace": "nowrap",
            "padding": "12px 16px"
        },
        "default": {
            "value": {
                background: "var(--semanticColor-layer-neutral-01)",
                height: "64px",
            },
        },
        "brand": {
            value: {
                background: "var(--semanticColor-text-helper-brand)",
                height: "64px",
            },
            "icon-button > atlas-icon": {
                value: {
                    color: '$semanticColor-text-inverse'
                },
            },
            "icon-button": {
                states: {
                    hover: {
                        value: {
                            backgroundColor: "$semanticColor-background-info-soft-hover !important",
                        }
                    }
                }
            }, 
            avatar: {
                value: {
                    backgroundColor: "var(--semanticColor-text-inverse)",
                    color: "var(--semanticColor-background-brand-strong-rest)"
                }
            }
        },
        "separator": {
            value: {
                flex: "1 1 auto",
            },
        },
        "-position-relative": {
            "value": {
                position: 'relative'
            }
        },
        "-position-absolute": {
            "value": {
                position: 'absolute'
            }
        },
        "-position-static": {
            "value": {
                position: 'static'
            }
        },
        "-position-sticky": {
            "value": {
                position: 'sticky'
            }
        },
        "-position-fixed": {
            "value": {
                position: 'fixed'
            }
        },
        "-position-inherit": {
            "value": {
                position: 'inherit'
            }
        },
    }
}