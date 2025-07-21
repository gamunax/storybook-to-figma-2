export const config = {
    "atlas-accordion": {
        "group": {
            "value": {
                borderRadius: "2px 2px 4px 4px",
            }
        },
        "group > atlas-accordion-item": {
            "value": {
                borderBottom: "1px solid $semanticColor.border.divider",
                display: "grid"
            }
        },
        item: {
            disabled: {
                "value": {
                    background: "rgba(0,0,0,0.12)",
                    color: "$semanticColor.text.disabled",
                    pointerEvents: 'none',
                },
            },
            head: {
                "value": {
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr"
                }
            },
            "icon-container-disabled > *": {
                "value": {
                    color: "rgba(0,0,0,0.12)",
                },
            },
            "icon-container": {
                "value": {
                    color: "$semanticColor.background.neutral.strong-rest",
                },
            },
            "icon-alignment": {
                "value": {
                    textAlign: 'end'
                },
            },
            heading: {
                "value": {
                    color: "$semanticColor.text.default",
                },
            },
            subheading: {
                "value": {
                    color: "$semanticColor.text.secondary",
                },
            },
            content: {
                disabled: {
                    "value": {
                        color: "$semanticColor.text.disabled",
                    }
                },
                "value": {
                    color: "$semanticColor.text.default",
                    opacity: '1',
                    transition: 'opacity 500ms ease-out',
                },
            },
            "value": {
                background: "$semanticColor.layer.neutral-01",
            }
        }  
    },
}