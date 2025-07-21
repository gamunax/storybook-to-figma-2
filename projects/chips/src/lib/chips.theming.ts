export const config = {
    atlas: {
        chip: {
            value: {
                display: "flex",
                flexFlow: "row nowrap",
                alignItems: "center",
            },
            list: {
                value: {
                    display: "flex",
                    flexFlow: "row wrap",
                    alignItems: "center",
                },
            },
            wrapper: {
                value: {
                    display: "flex",
                    flexFlow: "row wrap",
                    alignItems: "center",
                },
            },
            "list-stacked .atlas-chip-list": {
                value: {
                    display: "flex",
                    flexFlow: "column wrap",
                    alignItems: "flex-start",
                },
            },
            disabled: {
                type: "state",
                description: "hover state for default checkbox",
                value: {
                    pointerEvents: "none",
                    cursor: "not-allowed",
                    background: "$semanticColor.background.disabled",
                    color: "$semanticColor.text.disabled",
                },
            },
            indicator: {
                value: {
                    width: "8px",
                    height: "8px",
                    borderRadius: '36px'
                },
                '-left': {
                    value: {
                        marginLeft: '10px'
                    }       
                },
                '-right': {
                    value: {
                        marginRight: '10px'
                    }      
                },
                "-neutral": {
                    value: {
                        backgroundColor: "$semanticColor.text.inverse",
                        color: "$semanticColor.text.secondary",
                    },
                },
                "-brand": {
                    value: {
                        backgroundColor: "$semanticColor.background.brand.strong-rest",
                        color: "$semanticColor.text.inverse",
                    },
                },
                "-danger": {
                    value: {
                        backgroundColor: "$semanticColor.background.danger.strong-rest",
                        color: "$semanticColor.text.inverse",
                    },
                },
                "-caution": {
                    value: {
                        backgroundColor: "$semanticColor.background.caution.strong-rest",
                        color: "$semanticColor.icon.caution",
                    },
                },
                "-success": {
                    value: {
                        backgroundColor: "$semanticColor.background.success.strong-rest",
                        color: "$semanticColor.text.inverse",
                    },
                },
                "-info": {
                    value: {
                        backgroundColor: "$semanticColor.background.info.strong-rest",
                        color: "$semanticColor.text.inverse",
                    },
                },
            },
            size: {
                medium: {
                    value: {
                        borderRadius: "120px",
                        height: "32px",
                        padding: "8px 0",
                        margin: "2px 4px",
                    },
                    mode: {
                        'text-only': {
                            value: {
                                padding: "0 10px",                                
                            },
                        },
                        're-text-only': {
                            value: {
                                padding: "0 8px 0 10px",
                            },
                        },
                        'with-icon': {
                            value: {
                                paddingLeft: "4px",
                                paddingRight: "10px",
                            },
                        },
                        're-with-icon': {
                            value: {
                                padding: "0 6px 0 4px",
                            },
                        },
                        'with-avatar': {
                            value: {
                                paddingLeft: "4px",
                                paddingRight: "10px",
                            },
                        },
                        're-with-avatar': {
                            value: {
                                paddingLeft: "4px",
                            },
                        },
                    },
                    "wrapper atlas-icon": {
                        value: {
                            marginRight: "6px",
                        },
                    },
                    "close-icon": {
                        value: {
                            margin: "-4px 4px -4px 0px",
                            cursor: "pointer",
                            maxWidth: "24px",
                        }
                    },
                },
                small: {
                    value: {
                        borderRadius: "120px",
                        height: "24px",
                        padding: "4px",
                        margin: "2px",
                    },
                    mode: {
                        'text-only': {
                            value: {
                                padding: "4px",
                            },
                        },
                        're-text-only': {
                            value: {
                                padding: "0 6px 0 2px",
                            },
                        },
                        'with-icon': {
                            value: {
                                paddingLeft: "4px",
                                paddingRight: "6px",
                            },
                        },
                        're-with-icon': {
                            value: {
                                padding: "0 6px 0 0",
                            },
                        },
                        'with-avatar': {
                            value: {
                                paddingLeft: "4px",
                                paddingRight: "10px",
                            },
                        },
                        're-with-avatar': {
                            value: {
                                paddingLeft: "4px",
                            },
                        },
                    },
                    "wrapper atlas-icon": {
                        value: {
                            marginRight: "6px",
                            maxWidth: "18px",
                        }
                    },
                    "close-icon": {
                        value: {
                            margin: "0",
                            cursor: "pointer",
                            maxWidth: "18px",
                        }
                    },
                }
            },
            color: {
                neutral: {
                    type: "variant",
                    description: "hello world",
                    filled: {
                        type: "variant",
                        description: "hello world",
                        value: {
                            background: "$semanticColor.background.neutral.strong-rest",
                            color: "$semanticColor.text.inverse",
                        },
                        states: {
                            hover: {
                                type: "state",
                                description: "hover state for default contained chips",
                                value: {
                                    background: "$semanticColor.background.neutral.strong-rest",
                                },
                            },
                            focus: {
                                type: "state",
                                description: "focus state for default contained chips",
                                value: {
                                    background: "$semanticColor.border.selected",
                                    outlineWidth: "1px",
                                    outlineStyle: "solid",
                                    outlineColor: "$semanticColor.border.selected",  //TODO: miss token
                                },
                            },
                            active: {
                                type: "state",
                                description: "active state for default contained chips",
                                value: {
                                    background:
                                        "$semanticColor.background.neutral.strong-active",
                                },
                            },
                            disabled: {
                                type: "state",
                                description: "disabled state for default contained chips",
                                value: {
                                    background:
                                        "$semanticColor.background.disabled",
                                    cursor: "not-allowed",
                                },
                            },
                        },
                    },
                    outlined: {
                        type: "variant",
                        description: "hello world",
                        value: {
                            background: "transparent",
                            color: "$semanticColor.text.helper.neutral",
                            borderWidth: "1px",
                            borderStyle: "solid",
                            borderColor: "$semanticColor.border.neutral-strong",
                        },
                        states: {
                            hover: {
                                type: "state",
                                description: "hover state for default contained chips",
                                value: {
                                    background: "$semanticColor.background.neutral.strong-hover",
                                    color: "$semanticColor.text.inverse",
                                },
                            },
                            focus: {
                                type: "state",
                                description: "focus state for default contained chips",
                                value: {
                                    background: "$semanticColor.border.selected",
                                    outlineWidth: "1px",
                                    outlineStyle: "solid",
                                    outlineColor: "$semanticColor.border.selected",
                                    color: "$semanticColor.text.inverse",
                                },
                            },
                            active: {
                                type: "state",
                                description: "active state for default contained chips",
                                value: {
                                    background:
                                        "$semanticColor.background.neutral.strong-active",
                                    color: "$semanticColor.text.inverse",
                                },
                            },
                            disabled: {
                                type: "state",
                                description: "disabled state for default contained chips",
                                value: {
                                    background:
                                        "$semanticColor.background.disabled",
                                    cursor: "not-allowed",
                                },
                            },
                        },
                    },
                },
                brand: {
                    type: "variant",
                    description: "hello world",
                    filled: {
                        type: "variant",
                        description: "hello world",
                        value: {
                            background: "$semanticColor.background.brand.strong-rest",
                            color: "$semanticColor.text.inverse",
                            border: "none",
                        },
                        states: {
                            hover: {
                                type: "state",
                                description: "hover state for primary contained chips",
                                value: {
                                    background: "$semanticColor.background.brand.strong-hover",
                                },
                            },
                            focus: {
                                type: "state",
                                description: "focus state for primary contained chips",
                                value: {
                                    background:
                                        "$semanticColor.background.brand.strong-active",
                                    outlineWidth: "1px",
                                    outlineStyle: "solid",
                                    outlineColor: "$semanticColor.border.selected",
                                },
                            },
                            active: {
                                type: "state",
                                description: "active state for primary contained chips",
                                value: {
                                    background:
                                        "$semanticColor.background.brand.strong-active",
                                },
                            },
                            disabled: {
                                type: "state",
                                description: "disabled state for primary contained chips",
                                value: {
                                    background:
                                        "$semanticColor.background.disabled",
                                    cursor: "not-allowed",
                                },
                            },
                        },
                    },
                    outlined: {
                        type: "variant",
                        description: "hello world",
                        value: {
                            background: "transparent",
                            color: "$semanticColor.border.brand-strong",
                            borderWidth: "1px",
                            borderStyle: "solid",
                            borderColor: "$semanticColor.border.brand-strong",
                        },
                        states: {
                            hover: {
                                type: "state",
                                description: "hover state for primary contained chips",
                                value: {
                                    background: "$semanticColor.background.brand.strong-hover",
                                    color: "$semanticColor.text.inverse",
                                },
                            },
                            focus: {
                                type: "state",
                                description: "focus state for primary contained chips",
                                value: {
                                    background: "$semanticColor.border.selected",
                                    outlineWidth: "1px",
                                    outlineStyle: "solid",
                                    outlineColor: "$semanticColor.border.selected",
                                    color: "$semanticColor.text.inverse",
                                },
                            },
                            active: {
                                type: "state",
                                description: "active state for primary contained chips",
                                value: {
                                    background:
                                        "$semanticColor.background.brand.strong-active",
                                    color: "$semanticColor.text.inverse",
                                },
                            },
                            disabled: {
                                type: "state",
                                description: "disabled state for primary contained chips",
                                value: {
                                    background:
                                        "$semanticColor.background.disabled",
                                    cursor: "not-allowed",
                                },
                            },
                        },
                    },
                },
                danger: {
                    filled: {
                        type: "variant",
                        description: "hello world",
                        value: {
                            background: "$semanticColor.background.danger.strong-rest",
                            color: "$semanticColor.text.inverse",
                            border: "none",
                        },
                        states: {
                            hover: {
                                type: "state",
                                description: "hover state for error contained chips",
                                value: {
                                    background: "$semanticColor.background.danger.strong-hover",
                                },
                            },
                            focus: {
                                type: "state",
                                description: "focus state for error contained chips",
                                value: {
                                    background:
                                        "$semanticColor.background.danger.strong-active",
                                    outlineWidth: "1px",
                                    outlineStyle: "solid",
                                    outlineColor: "$semanticColor.border.selected",
                                },
                            },
                            active: {
                                type: "state",
                                description: "active state for error contained chips",
                                value: {
                                    background:
                                        "$semanticColor.background.danger.strong-active",
                                },
                            },
                            disabled: {
                                type: "state",
                                description: "disabled state for error contained chips",
                                value: {
                                    background:
                                        "$semanticColor.background.disabled",
                                    cursor: "not-allowed",
                                },
                            },
                        },
                    },
                    outlined: {
                        type: "variant",
                        description: "hello world",
                        value: {
                            background: "transparent",
                            color: "$semanticColor.border.danger-strong",
                            borderWidth: "1px",
                            borderStyle: "solid",
                            borderColor: "$semanticColor.border.danger-strong",
                        },
                        states: {
                            hover: {
                                type: "state",
                                description: "hover state for error contained chips",
                                value: {
                                    background: "$semanticColor.background.danger.strong-hover",
                                    color: "$semanticColor.text.inverse",
                                },
                            },
                            focus: {
                                type: "state",
                                description: "focus state for error contained chips",
                                value: {
                                    background: "$semanticColor.border.selected",
                                    outlineWidth: "1px",
                                    outlineStyle: "solid",
                                    outlineColor: "$semanticColor.text.border.selected",
                                    color: "$semanticColor.text.inverse",
                                },
                            },
                            active: {
                                type: "state",
                                description: "active state for error contained chips",
                                value: {
                                    background:
                                        "$semanticColor.background.danger.strong-active",
                                    color: "$semanticColor.text.inverse",
                                },
                            },
                            disabled: {
                                type: "state",
                                description: "disabled state for error contained chips",
                                value: {
                                    background:
                                        "$semanticColor.background.disabled",
                                    cursor: "not-allowed",
                                },
                            },
                        },
                    },
                },
                caution: {
                    type: "variant",
                    description: "hello world",
                    filled: {
                        type: "variant",
                        description: "hello world",
                        value: {
                            background: "$semanticColor.background.caution.strong-rest",
                            color: "$semanticColor.icon.caution-inverse",
                            border: "none",
                        },
                        states: {
                            hover: {
                                type: "state",
                                description: "hover state for warning contained chips",
                                value: {
                                    background: "$semanticColor.background.caution.strong-hover",
                                },
                            },
                            focus: {
                                type: "state",
                                description: "focus state for warning contained chips",
                                value: {
                                    background:
                                        "$semanticColor.background.caution.strong-active",
                                    outlineWidth: "1px",
                                    outlineStyle: "solid",
                                    outlineColor: "$semanticColor.border.selected",
                                },
                            },
                            active: {
                                type: "state",
                                description: "active state for warning contained chips",
                                value: {
                                    background:
                                        "$semanticColor.background.caution.strong-active",
                                },
                            },
                            disabled: {
                                type: "state",
                                description: "disabled state for warning contained chips",
                                value: {
                                    background:
                                        "$semanticColor.background.disabled",
                                    cursor: "not-allowed",
                                },
                            },
                        },
                    },
                    outlined: {
                        type: "variant",
                        description: "hello world",
                        value: {
                            background: "transparent",
                            color: "$semanticColor.icon.caution-inverse",
                            borderWidth: "1px",
                            borderStyle: "solid",
                            borderColor: "$semanticColor.background.caution.strong-rest",
                        },
                        states: {
                            hover: {
                                type: "state",
                                description: "hover state for warning contained chips",
                                value: {
                                    background: "$semanticColor.background.caution.strong-hover",
                                    color: "$semanticColor.icon.caution-inverse",
                                },
                            },
                            focus: {
                                type: "state",
                                description: "focus state for warning contained chips",
                                value: {
                                    background: "$semanticColor.border.selected",
                                    outlineWidth: "1px",
                                    outlineStyle: "solid",
                                    outlineColor: "$semanticColor.text.border.selected",
                                    color: "$semanticColor.icon.caution",
                                },
                            },
                            active: {
                                type: "state",
                                description: "active state for primary contained chips",
                                value: {
                                    background:
                                        "$semanticColor.background.brand.strong-active",
                                    color: "$semanticColor.text.inverse",
                                },
                            },
                            disabled: {
                                type: "state",
                                description: "disabled state for primary contained chips",
                                value: {
                                    background:
                                        "$semanticColor.background.disabled",
                                    cursor: "not-allowed",
                                },
                            },
                        },
                    },
                },
                success: {
                    type: "variant",
                    description: "hello world",
                    filled: {
                        type: "variant",
                        description: "hello world",
                        value: {
                            background: "$semanticColor.background.success.strong-rest",
                            color: "$semanticColor.text.inverse",
                            border: "none",
                        },
                        states: {
                            hover: {
                                type: "state",
                                description: "hover state for success contained chips",
                                value: {
                                    background: "$semanticColor.background.success.strong-hover",
                                },
                            },
                            focus: {
                                type: "state",
                                description: "focus state for success contained chips",
                                value: {
                                    background:
                                        "$semanticColor.background.success.strong-active",
                                    outlineWidth: "1px",
                                    outlineStyle: "solid",
                                    outlineColor: "$semanticColor.border.selected",
                                },
                            },
                            active: {
                                type: "state",
                                description: "active state for success contained chips",
                                value: {
                                    background:
                                        "$semanticColor.background.success.strong-active",
                                },
                            },
                            disabled: {
                                type: "state",
                                description: "disabled state for success contained chips",
                                value: {
                                    background:
                                        "$semanticColor.background.disabled",
                                    cursor: "not-allowed",
                                },
                            },
                        },
                    },
                    outlined: {
                        type: "variant",
                        description: "hello world",
                        value: {
                            background: "transparent",
                            color: "$semanticColor.border.success-strong",
                            borderWidth: "1px",
                            borderStyle: "solid",
                            borderColor: "$semanticColor.text.border.success-strong",
                        },
                        states: {
                            hover: {
                                type: "state",
                                description: "hover state for success contained chips",
                                value: {
                                    background: "$semanticColor.background.success.strong-hover",
                                    color: "$semanticColor.text.inverse",
                                },
                            },
                            focus: {
                                type: "state",
                                description: "focus state for success contained chips",
                                value: {
                                    background: "$semanticColor.border.selected",
                                    outlineWidth: "1px",
                                    outlineStyle: "solid",
                                    outlineColor: "$semanticColor.border.selected",
                                    color: "$semanticColor.text.inverse",
                                },
                            },
                            active: {
                                type: "state",
                                description: "active state for success contained chips",
                                value: {
                                    background:
                                        "$semanticColor.background.success.strong-active",
                                    color: "$semanticColor.text.inverse",
                                },
                            },
                            disabled: {
                                type: "state",
                                description: "disabled state for success contained chips",
                                value: {
                                    background:
                                        "$semanticColor.background.disabled",
                                    cursor: "not-allowed",
                                },
                            },
                        },
                    },
                },
                info: {
                    type: "variant",
                    description: "hello world",
                    filled: {
                        type: "variant",
                        description: "hello world",
                        value: {
                            background: "$semanticColor.background.info.strong-rest",
                            color: "$semanticColor.text.inverse",
                            border: "none",
                        },
                        states: {
                            hover: {
                                type: "state",
                                description: "hover state for info contained chips",
                                value: {
                                    background: "$semanticColor.background.info.strong-hover",
                                },
                            },
                            focus: {
                                type: "state",
                                description: "focus state for primainfory contained chips",
                                value: {
                                    background:
                                        "$semanticColor.background.info.strong-hover",
                                    outlineWidth: "1px",
                                    outlineStyle: "solid",
                                    outlineColor: "$semanticColor.border.selected",
                                },
                            },
                            active: {
                                type: "state",
                                description: "active state for info contained chips",
                                value: {
                                    background:
                                        "$semanticColor.background.info.strong-hover",
                                },
                            },
                            disabled: {
                                type: "state",
                                description: "disabled state for info contained chips",
                                value: {
                                    background:
                                        "$semanticColor.background.disabled",
                                    cursor: "not-allowed",
                                },
                            },
                        },
                    },
                    outlined: {
                        type: "variant",
                        description: "hello world",
                        value: {
                            background: "transparent",
                            color: "$semanticColor.border.info-strong",
                            borderWidth: "1px",
                            borderStyle: "solid",
                            borderColor: "$semanticColor.text.border.info-strong",
                        },
                        states: {
                            hover: {
                                type: "state",
                                description: "hover state for info contained chips",
                                value: {
                                    background: "$semanticColor.background.info.strong-hover",
                                    color: "$semanticColor.text.inverse",
                                },
                            },
                            focus: {
                                type: "state",
                                description: "focus state for info contained chips",
                                value: {
                                    background: "$semanticColor.border.selected",
                                    outlineWidth: "1px",
                                    outlineStyle: "solid",
                                    outlineColor: "$semanticColor.text.border.selected",
                                    color: "$semanticColor.text.inverse",
                                },
                            },
                            active: {
                                type: "state",
                                description: "active state for info contained chips",
                                value: {
                                    background:
                                        "$semanticColor.background.info.strong-hover",
                                    color: "$semanticColor.text.inverse",
                                },
                            },
                            disabled: {
                                type: "state",
                                description: "disabled state for info contained chips",
                                value: {
                                    background:
                                        "$semanticColor.background.disabled",
                                    cursor: "not-allowed",
                                },
                            },
                        },
                    },
                },
            },
            light: {
                hover: {
                    type: "state",
                    description: "light mode displays lighter colored chips",
                    value: {
                        background: "inherit",
                    },
                },
                "-neutral": {
                    value: {
                        backgroundColor: "$semanticColor.text.inverse",
                        color: "$semanticColor.text.inverse"
                    },
                },
                "-brand": {
                    value: {
                        backgroundColor: "$semanticColor.background.brand.soft-hover",
                        color: "$semanticColor.text.inverse"
                    },
                },
                "-danger": {
                    value: {
                        backgroundColor: "$semanticColor.background.danger.soft-hover",
                        color: "$semanticColor.text.inverse"
                    },
                },
                "-caution": {
                    value: {
                        backgroundColor: "$semanticColor.background.caution.soft-hover",
                        color: "$semanticColor.text.inverse"
                    },
                },
                "-success": {
                    value: {
                        backgroundColor: "$semanticColor.background.success.soft-hover",
                        color: "$semanticColor.text.inverse"
                    },
                },
                "-info": {
                    value: {
                        backgroundColor: "$semanticColor.background.info.soft-hover",
                        color: "$semanticColor.text.inverse"
                    },
                },
            },
        },
    },
};
