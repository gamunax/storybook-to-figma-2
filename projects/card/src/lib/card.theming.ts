export const config = {
    "atlas-card": {
        "value": {
            width: "345px",
            position: "relative",
            borderRadius: "4px"
        },
        "no-bg": {
            "value": {
                background: "none",
                borderRadius: "0",
            }
        },
        "header": {
            "value": {
                fontFamily: "var(--semanticTypography-font-family-display)",
                fontSize: "var(--semanticTypography-font-size-heading-medium)",
            },
            "container": {
                "avatar": {
                    value: {  
                        gridTemplateColumns: "auto 2fr auto",
                      }
                },
                "value": {
                    display: "grid",
                    gridTemplateColumns: "2fr auto",
                    alignItems: "center",
                },
            },
        },
        "subheader": {
            "value": {
                fontFamily: "var(--semanticTypography-font-family-plain)",
                fontSize: "var(--semanticTypography-font-size-body-small)",
            },
        },
        "body": {
            "value": {
                fontFamily: "var(--semanticTypography-font-family-plain)",
                fontSize: "var(--semanticTypography-font-size-body-small)",
            }
        },
        "media": {
            "value": {
                width: "100%"
            }
        },
        "footer": {
            "children :not(:last-child)": {
                value: {
                    paddingRight: "8px",
                }
            }
        },
        "hover": {
            states: {
                hover: {
                    "value": {
                        transition: "0.1s all ease-in-out",
                    }
                }
            }
        }   
    },
    "atlas-card__content": {
        "-full-width.atlas-card": {
            value: {
                width: 'initial',
            },
        },
        "-full-width.atlas-card img": {
            value: {
                width: '100%',
            }
        },
    },
}