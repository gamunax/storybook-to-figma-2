// Foundation theme config

export const foundationConfig = {
  "colors": {
    "action": {
      "primary": {
        "main-contained": {
          "description": "Main fill background color used for components in rest state (Buttons, form controls)",
          "value": "rgba(11, 65, 173, 1.0)",
          "type": "color"
        },
        "main-outlined": {
          "description": "Text or icon Color that keeps a contrast ratio above AA when main is used as a bg color",
          "value": "rgba(11, 65, 173, 1.0)",
          "type": "color"
        },
        "content-light": {
          "description": "Text or icon Color that keeps a contrast ratio above AA when main is used as a bg color",
          "value": "$scale.color.contrast.light.100",
          "type": "color"
        },
        "content-dark": {
          "description": "Text or icon fill color that keeps a contrast ratio above AA when outline background state is used",
          "value": "$colors.action.primary.main-contained",
          "type": "color"
        },
        "contained-hover-background": {
          "description": "Background fill color for contained actions in hover state",
          "value": "rgba(14, 83, 221, 1.0)",
          "type": "color"
        },
        "contained-active-background": {
          "description": "Background fill color for contained actions in active state",
          "value": "rgba(44, 110, 242, 1.0)",
          "type": "color"
        },
        "focus": {
          "description": "Outline color for contained & outlined actions in focus state (Button, icon button, input, dropdown, etc)",
          "value": "$scale.color.blue.200",
          "type": "color"
        },
        "contained-disabled-background": {
          "value": "rgba(11, 65, 173, 0.4)",
          "description": "Background fill color for contained actions in disabled state (Button)",
          "type": "color"
        },
        "outlined-hover-background": {
          "value": "rgba(14, 83, 221, 1.0)",
          "description": "Background fill color for outlined actions in hover state (Button, icon button, input, dropdown)",
          "type": "color"
        },
        "outlined-active-background": {
          "value": "rgba(44, 110, 242, 1.0)",
          "description": "Background fill color for outlined actions in active state (Button)",
          "type": "color"
        },
        "highlight-hover-background": {
          "value": "rgba(11, 65, 173, 0.1)",
          "description": "Parent background fill color for actions in hover state",
          "type": "color"
        }
      },
      "primary-reverse": {
        "main-contained": {
          "description": "Main fill background color used for components in rest state (Buttons, form controls)",
          "value": "$scale.color.contrast.light.100",
          "type": "color"
        },
        "main-outlined": {
          "description": "Text or icon Color that keeps a contrast ratio above AA when main is used as a bg color",
          "value": "$scale.color.contrast.light.100",
          "type": "color"
        },
        "content-light": {
          "description": "Text or icon Color that keeps a contrast ratio above AA when main is used as a bg color",
          "value": "$scale.color.contrast.light.100",
          "type": "color"
        },
        "content-dark": {
          "description": "Text or icon fill color that keeps a contrast ratio above AA when outline background state is used",
          "value": "$colors.action.primary.main-contained",
          "type": "color"
        },
        "contained-hover-background": {
          "description": "Background fill color for contained actions in hover state",
          "value": "rgba(14, 83, 221, 1.0)",
          "type": "color"
        },
        "contained-active-background": {
          "description": "Background fill color for contained actions in active state",
          "value": "rgba(44, 110, 242, 1.0)",
          "type": "color"
        },
        "focus": {
          "description": "Outline color for contained & outlined actions in focus state (Button, icon button, input, dropdown, etc)",
          "value": "$scale.color.blue.200",
          "type": "color"
        },
        "contained-disabled-background": {
          "value": "rgba(11, 65, 173, 0.4)",
          "description": "Background fill color for contained actions in disabled state (Button)",
          "type": "color"
        },
        "outlined-hover-background": {
          "value": "$scale.color.contrast.light.100",
          "description": "Background fill color for outlined actions in hover state (Button, icon button, input, dropdown)",
          "type": "color"
        },
        "outlined-active-background": {
          "value": "$scale.color.contrast.light.100",
          "description": "Background fill color for outlined actions in active state (Button)",
          "type": "color"
        }
      },
      "secondary": {
        "main-contained": {
          "description": "Main fill background color used for components in rest state (Buttons, form controls)",
          "value": "$scale.color.pink.700",
          "type": "color"
        },
        "main-outlined": {
          "description": "Text or icon Color that keeps a contrast ratio above AA when main is used as a bg color",
          "value": "$scale.color.pink.700",
          "type": "color"
        },
        "content-light": {
          "description": "Text or icon Color that keeps a contrast ratio above AA when main is used as a bg color",
          "value": "$scale.color.contrast.light.100",
          "type": "color"
        },
        "content-dark": {
          "description": "Text or icon fill color that keeps a contrast ratio above AA when outline background state is used",
          "value": "$scale.color.pink.700",
          "type": "color"
        },
        "contained-hover-background": {
          "description": "Background fill color for contained actions in hover state",
          "value": "$scale.color.pink.600",
          "type": "color"
        },
        "contained-active-background": {
          "description": "Background fill color for contained actions in active state",
          "value": "$scale.color.pink.500",
          "type": "color"
        },
        "focus": {
          "description": "Outline color for contained & outlined actions in focus state (Button, icon button, input, dropdown, etc)",
          "value": "$scale.color.pink.200",
          "type": "color"
        },
        "contained-disabled-background": {
          "value": "rgba($colors.action.secondary.main-contained, 0.4)",
          "description": "Background fill color for contained actions in disabled state (Button)",
          "type": "color"
        },
        "outlined-hover-background": {
          "value": "$scale.color.pink.600",
          "description": "Background fill color for outlined actions in hover state (Button, icon button, input, dropdown)",
          "type": "color"
        },
        "outlined-active-background": {
          "value": "$scale.color.pink.500",
          "description": "Background fill color for outlined actions in active state (Button)",
          "type": "color"
        },
        "highlight-hover-background": {
          "value": "rgba($colors.action.secondary.main-contained, 0.1)",
          "description": "Parent background fill color for actions in hover state",
          "type": "color"
        }
      },
      "secondary-reverse": {
        "main-contained": {
          "description": "Main fill background color used for components in rest state (Buttons, form controls)",
          "value": "$scale.color.contrast.light.100",
          "type": "color"
        },
        "main-outlined": {
          "description": "Outline fill color for outlined actions in rest state (Button, chip)",
          "value": "$scale.color.contrast.light.100",
          "type": "color"
        },
        "content-light": {
          "description": "Text or icon Color that keeps a contrast ratio above AA when main is used as a bg color",
          "value": "$scale.color.contrast.light.100",
          "type": "color"
        },
        "content-dark": {
          "description": "Text or icon fill color that keeps a contrast ratio above AA when outline background state is used",
          "value": "$scale.color.pink.700",
          "type": "color"
        },
        "contained-hover-background": {
          "description": "Background fill color for contained actions in hover state",
          "value": "$scale.color.pink.600",
          "type": "color"
        },
        "contained-active-background": {
          "description": "Background fill color for contained actions in active state",
          "value": "$scale.color.pink.500",
          "type": "color"
        },
        "focus": {
          "description": "Outline color for contained & outlined actions in focus state (Button, icon button, input, dropdown, etc)",
          "value": "$scale.color.pink.200",
          "type": "color"
        },
        "contained-disabled-background": {
          "value": "rgba($colors.action.secondary.main-contained, 0.4)",
          "description": "Background fill color for contained actions in disabled state (Button)",
          "type": "color"
        },
        "outlined-hover-background": {
          "value": "$scale.color.contrast.light.100",
          "description": "Background fill color for outlined actions in hover state (Button, icon button, input, dropdown)",
          "type": "color"
        },
        "outlined-active-background": {
          "value": "$scale.color.contrast.light.100",
          "description": "Background fill color for outlined actions in active state (Button)",
          "type": "color"
        }
      },
      "default": {
        "main-contained": {
          "description": "Main fill background color used for components in rest state (Buttons, form controls)",
          "value": "$scale.color.gray.700",
          "type": "color"
        },
        "main-outlined": {
          "description": "Outline fill color for outlined actions in rest state (Button, chip)",
          "value": "$scale.color.gray.700",
          "type": "color"
        },
        "content-light": {
          "description": "Text or icon Color that keeps a contrast ratio above AA when main is used as a bg color",
          "value": "$scale.color.contrast.light.100",
          "type": "color"
        },
        "content-dark": {
          "description": "Text or icon fill color that keeps a contrast ratio above AA when outline background state is used",
          "value": "$scale.color.gray.700",
          "type": "color"
        },
        "contained-hover-background": {
          "description": "Background fill color for contained actions in hover state",
          "value": "$scale.color.gray.600",
          "type": "color"
        },
        "contained-active-background": {
          "description": "Background fill color for contained actions in active state",
          "value": "$scale.color.gray.500",
          "type": "color"
        },
        "focus": {
          "description": "Outline color for contained & outlined actions in focus state (Button, icon button, input, dropdown, etc)",
          "value": "$scale.color.gray.200",
          "type": "color"
        },
        "contained-disabled-background": {
          "value": "rgba($colors.action.default.main-contained, 0.4)",
          "description": "Background fill color for contained actions in disabled state (Button)",
          "type": "color"
        },
        "outlined-hover-background": {
          "value": "$scale.color.gray.600",
          "description": "Background fill color for outlined actions in hover state (Button, icon button, input, dropdown)",
          "type": "color"
        },
        "outlined-active-background": {
          "value": "$scale.color.gray.500",
          "description": "Background fill color for outlined actions in active state (Button)",
          "type": "color"
        },
        "highlight-hover-background": {
          "value": "rgba($colors.action.default.main-contained, 0.1)",
          "description": "Parent background fill color for actions in hover state",
          "type": "color"
        }
      },
      "info": {
        "main-contained": {
          "description": "Main fill background color used for components in rest state (Buttons, form controls)",
          "value": "$scale.color.alert.info.400",
          "type": "color"
        },
        "main-outlined": {
          "description": "Outline fill color for outlined actions in rest state (Button, chip)",
          "value": "$colors.action.info.main-contained",
          "type": "color"
        },
        "content-light": {
          "description": "Text or icon Color that keeps a contrast ratio above AA when main is used as a bg color",
          "value": "$scale.color.contrast.light.100",
          "type": "color"
        },
        "content-dark": {
          "description": "Text or icon fill color that keeps a contrast ratio above AA when outline background state is used",
          "value": "$scale.color.contrast.dark.85",
          "type": "color"
        },
        "contained-hover-background": {
          "description": "Background fill color for contained actions in hover state",
          "value": "$scale.color.alert.info.300",
          "type": "color"
        },
        "contained-active-background": {
          "description": "Background fill color for contained actions in active state",
          "value": "$scale.color.alert.info.200",
          "type": "color"
        },
        "focus": {
          "description": "Outline color for contained & outlined actions in focus state (Button, icon button, input, dropdown, etc)",
          "value": "$scale.color.alert.info.200",
          "type": "color"
        },
        "contained-disabled-background": {
          "value": "rgba($colors.action.info.main-contained, 0.4)",
          "description": "Background fill color for contained actions in disabled state (Button)",
          "type": "color"
        },
        "outlined-hover-background": {
          "value": "$scale.color.alert.info.300",
          "description": "Background fill color for outlined actions in hover state (Button, icon button, input, dropdown)",
          "type": "color"
        },
        "outlined-active-background": {
          "value": "$scale.color.alert.info.200",
          "description": "Background fill color for outlined actions in active state (Button)",
          "type": "color"
        },
        "highlight-hover-background": {
          "value": "rgba($colors.action.info.main-contained, 0.1)",
          "description": "Parent background fill color for actions in hover state",
          "type": "color"
        }
      },
      "success": {
        "main-contained": {
          "description": "Main fill background color used for components in rest state (Buttons, form controls)",
          "value": "$scale.color.alert.success.800",
          "type": "color"
        },
        "main-outlined": {
          "description": "Outline fill color for outlined actions in rest state (Button, chip)",
          "value": "$colors.action.success.main-contained",
          "type": "color"
        },
        "content-light": {
          "description": "Text or icon Color that keeps a contrast ratio above AA when main is used as a bg color",
          "value": "$scale.color.contrast.light.100",
          "type": "color"
        },
        "content-dark": {
          "description": "Text or icon fill color that keeps a contrast ratio above AA when outline background state is used",
          "value": "$scale.color.contrast.dark.85",
          "type": "color"
        },
        "contained-hover-background": {
          "description": "Background fill color for contained actions in hover state",
          "value": "$scale.color.alert.success.700",
          "type": "color"
        },
        "contained-active-background": {
          "description": "Background fill color for contained actions in active state",
          "value": "$scale.color.alert.success.600",
          "type": "color"
        },
        "focus": {
          "description": "Outline color for contained & outlined actions in focus state (Button, icon button, input, dropdown, etc)",
          "value": "$scale.color.alert.success.200",
          "type": "color"
        },
        "contained-disabled-background": {
          "value": "rgba($colors.action.success.main-contained, 0.4)",
          "description": "Background fill color for contained actions in disabled state (Button)",
          "type": "color"
        },
        "outlined-hover-background": {
          "value": "$scale.color.alert.success.700",
          "description": "Background fill color for outlined actions in hover state (Button, icon button, input, dropdown)",
          "type": "color"
        },
        "outlined-active-background": {
          "value": "$scale.color.alert.success.600",
          "description": "Background fill color for outlined actions in active state (Button)",
          "type": "color"
        },
        "highlight-hover-background": {
          "value": "rgba($colors.action.success.main-contained, 0.1)",
          "description": "Parent background fill color for actions in hover state",
          "type": "color"
        }
      },
      "warning": {
        "main-contained": {
          "description": "Main fill background color used for components in rest state (Buttons, form controls)",
          "value": "$scale.color.alert.warning.500",
          "type": "color"
        },
        "main-outlined": {
          "description": "Outline fill color for outlined actions in rest state (Button, chip)",
          "value": "$colors.action.warning.main-contained",
          "type": "color"
        },
        "content-light": {
          "description": "Text or icon Color that keeps a contrast ratio above AA when main is used as a bg color",
          "value": "$scale.color.contrast.light.100",
          "type": "color"
        },
        "content-dark": {
          "description": "Text or icon fill color that keeps a contrast ratio above AA when outline background state is used",
          "value": "$scale.color.contrast.dark.85",
          "type": "color"
        },
        "contained-hover-background": {
          "description": "Background fill color for contained actions in hover state",
          "value": "$scale.color.alert.warning.400",
          "type": "color"
        },
        "contained-active-background": {
          "description": "Background fill color for contained actions in active state",
          "value": "$scale.color.alert.warning.300",
          "type": "color"
        },
        "focus": {
          "description": "Outline color for contained & outlined actions in focus state (Button, icon button, input, dropdown, etc)",
          "value": "$scale.color.alert.warning.200",
          "type": "color"
        },
        "contained-disabled-background": {
          "value": "rgba({colors.action.warning.main-contained}, 0.4)",
          "description": "Background fill color for contained actions in disabled state (Button)",
          "type": "color"
        },
        "outlined-hover-background": {
          "value": "$scale.color.alert.warning.400",
          "description": "Background fill color for outlined actions in hover state (Button, icon button, input, dropdown)",
          "type": "color"
        },
        "outlined-active-background": {
          "value": "$scale.color.alert.warning.300",
          "description": "Background fill color for outlined actions in active state (Button)",
          "type": "color"
        },
        "highlight-hover-background": {
          "value": "rgba($colors.action.warning.main-contained, 0.1)",
          "description": "Parent background fill color for actions in hover state",
          "type": "color"
        }
      },
      "error": {
        "main-contained": {
          "description": "Main fill background color used for components in rest state (Buttons, form controls)",
          "value": "$scale.color.alert.error.600",
          "type": "color"
        },
        "main-outlined": {
          "description": "Outline fill color for outlined actions in rest state (Button, chip)",
          "value": "$colors.action.error.main-contained",
          "type": "color"
        },
        "content-light": {
          "description": "Text or icon Color that keeps a contrast ratio above AA when main is used as a bg color",
          "value": "$scale.color.contrast.light.100",
          "type": "color"
        },
        "content-dark": {
          "description": "Text or icon fill color that keeps a contrast ratio above AA when outline background state is used",
          "value": "$scale.color.contrast.dark.85",
          "type": "color"
        },
        "contained-hover-background": {
          "description": "Background fill color for contained actions in hover state",
          "value": "$scale.color.alert.error.600",
          "type": "color"
        },
        "contained-active-background": {
          "description": "Background fill color for contained actions in active state",
          "value": "$scale.color.alert.error.500",
          "type": "color"
        },
        "focus": {
          "description": "Outline color for contained & outlined actions in focus state (Button, icon button, input, dropdown, etc)",
          "value": "$scale.color.alert.error.200",
          "type": "color"
        },
        "contained-disabled-background": {
          "value": "rgba($colors.action.error.main-contained, 0.4)",
          "description": "Background fill color for contained actions in disabled state (Button)",
          "type": "color"
        },
        "outlined-hover-background": {
          "value": "$scale.color.alert.error.600",
          "description": "Background fill color for outlined actions in hover state (Button, icon button, input, dropdown)",
          "type": "color"
        },
        "outlined-active-background": {
          "value": "$scale.color.alert.error.500",
          "description": "Background fill color for outlined actions in active state (Button)",
          "type": "color"
        },
        "highlight-hover-background": {
          "value": "rgba($colors.action.error.main-contained, 0.1)",
          "description": "Parent background fill color for actions in hover state",
          "type": "color"
        }
      }
    },
    "text": {
      "default": {
        "main-dark": {
          "value": "$scale.color.contrast.dark.85",
          "description": "Text main dark",
          "type": "color"
        },
        "main-light": {
          "value": "$scale.color.contrast.light.100",
          "description": "Text main light",
          "type": "color"
        },
        "secondary-dark": {
          "value": "$scale.color.contrast.dark.65",
          "description": "Text secondary dark (support)",
          "type": "color"
        },
        "secondary-light": {
          "value": "$scale.color.contrast.light.65",
          "description": "Text secondary light (support)",
          "type": "color"
        },
        "disabled-dark": {
          "value": "$scale.color.contrast.dark.40",
          "description": "Text disabled dark",
          "type": "color"
        },
        "disabled-light": {
          "value": "$scale.color.contrast.light.40",
          "description": "Text disabled light",
          "type": "color"
        }
      },
      "primary": {
        "main": {
          "value": "$scale.color.blue.800",
          "type": "color",
          "description": "Text primary main "
        },
        "main-light": {
          "value": "$scale.color.blue.200",
          "type": "color",
          "description": "Text primary main light"
        },
        "secondary": {
          "value": "$scale.color.blue.700",
          "type": "color",
          "description": "Text primary secondary"
        },
        "secondary-light": {
          "value": "$scale.color.blue.500",
          "type": "color",
          "description": "Text primary secondary light"
        },
        "disabled": {
          "value": "rgba($colors.text.primary.main, 0.4)",
          "type": "color",
          "description": "Text primary disabled"
        }
      },
      "secondary": {
        "main": {
          "value": "$scale.color.pink.800",
          "type": "color",
          "description": "Text secondary main"
        },
        "main-light": {
          "value": "$scale.color.pink.200",
          "type": "color",
          "description": "Text secondary main light"
        },
        "secondary": {
          "value": "$scale.color.pink.700",
          "type": "color",
          "description": "Text secondary secondary"
        },
        "secondary-light": {
          "value": "$scale.color.pink.500",
          "type": "color",
          "description": "Text secondary secondary light"
        },
        "disabled": {
          "value": "rgba($colors.text.secondary.main, 0.4)",
          "type": "color",
          "description": "Text secondary disabled"
        }
      }
    },
    "background": {
      "default": {
        "main": {
          "description": "Background main",
          "value": "$scale.color.gray.50",
          "type": "color"
        },
        "dark": {
          "description": "Background dark",
          "value": "$scale.color.gray.200",
          "type": "color"
        },
        "light": {
          "description": "Background light",
          "value": "$scale.color.contrast.light.100",
          "type": "color"
        },
        "modal-overlay": {
          "value": "$scale.color.contrast.dark.50",
          "description": "Backdrop color when modal is active",
          "type": "color"
        },
        "divider": {
          "value": "$scale.color.contrast.dark.10",
          "type": "color",
          "description": "Line color for the divider"
        }
      },
      "primary": {
        "main": {
          "value": "$scale.color.blue.700",
          "description": "Background main",
          "type": "color"
        },
        "dark": {
          "value": "$scale.color.blue.800",
          "description": "Background dark",
          "type": "color"
        },
        "light": {
          "value": "$scale.color.blue.100",
          "description": "Background light",
          "type": "color"
        }
      },
      "secondary": {
        "main": {
          "value": "$scale.color.pink.700",
          "description": "Background main",
          "type": "color"
        },
        "dark": {
          "value": "$scale.color.pink.800",
          "description": "Background dark",
          "type": "color"
        },
        "light": {
          "value": "$scale.color.pink.100",
          "description": "Background light",
          "type": "color"
        }
      }
    },
    "surface": {
      "default": {
        "main": {
          "value": "$scale.color.contrast.light.100",
          "type": "color"
        },
        "dark": {
          "value": "$scale.color.gray.200",
          "type": "color"
        },
        "light": {
          "value": "$scale.color.gray.50",
          "description": "50",
          "type": "color"
        }
      },
      "primary": {
        "main": {
          "value": "$scale.color.blue.700",
          "description": "700",
          "type": "color"
        },
        "dark": {
          "value": "$scale.color.blue.800",
          "description": "Background dark",
          "type": "color"
        },
        "light": {
          "value": "$scale.color.blue.100",
          "description": "Background light",
          "type": "color"
        }
      },
      "secondary": {
        "main": {
          "value": "$scale.color.pink.700",
          "description": "700",
          "type": "color"
        },
        "dark": {
          "value": "$scale.color.pink.800",
          "description": "800",
          "type": "color"
        },
        "light": {
          "value": "$scale.color.pink.100",
          "description": "100",
          "type": "color"
        }
      }
    },
    "form": {
      "input-border": {
        "value": "$scale.color.contrast.dark.25",
        "description": "Border style for outlined variant components in resting state (Text Field, Select, Chips, etc)",
        "type": "color"
      },
      "input-background": {
        "value": "$scale.color.contrast.dark.5",
        "description": "Fill background for standard variant Text Field & Select",
        "type": "color"
      },
      "input-label": {
        "value": "$colors.text.default.secondary-dark",
        "type": "color"
      },
      "input-text": {
        "value": "$colors.text.default.main-dark",
        "type": "color"
      },
      "helper-text": {
        "value": "$colors.text.default.secondary-dark",
        "type": "color"
      }
    },
    "alert": {
      "snackbar": {
        "soft-background": {
          "description": "Snackbar background color",
          "value": "$scale.color.gray.50",
          "type": "color"
        },
        "strong-background": {
          "description": "Snackbar background color",
          "value": "$scale.color.gray.800",
          "type": "color"
        },
        "soft-border": {
          "value": "$scale.color.gray.800",
          "type": "color"
        },
        "content-light": {
          "value": "$scale.color.contrast.light.100",
          "type": "color"
        },
        "content-dark": {
          "value": "$scale.color.contrast.dark.85",
          "type": "color"
        }
      },
      "info": {
        "soft-background": {
          "value": "$scale.color.alert.info.50",
          "type": "color"
        },
        "strong-background": {
          "value": "$scale.color.alert.info.400",
          "type": "color"
        },
        "soft-border": {
          "value": "$scale.color.alert.info.400",
          "type": "color"
        },
        "content-light": {
          "value": "$scale.color.contrast.light.100",
          "type": "color"
        },
        "content-dark": {
          "value": "$scale.color.contrast.dark.85",
          "type": "color"
        }
      },
      "success": {
        "soft-background": {
          "value": "$scale.color.alert.success.50",
          "type": "color"
        },
        "strong-background": {
          "value": "$scale.color.alert.success.800",
          "type": "color"
        },
        "soft-border": {
          "value": "$scale.color.alert.success.800",
          "type": "color"
        },
        "content-light": {
          "value": "$scale.color.contrast.light.100",
          "type": "color"
        },
        "content-dark": {
          "value": "$scale.color.contrast.dark.85",
          "type": "color"
        }
      },
      "warning": {
        "soft-background": {
          "value": "$scale.color.alert.warning.50",
          "type": "color"
        },
        "strong-background": {
          "value": "$scale.color.alert.warning.500",
          "type": "color"
        },
        "soft-border": {
          "value": "$scale.color.alert.warning.500",
          "type": "color"
        },
        "content-light": {
          "value": "$scale.color.contrast.light.100",
          "type": "color"
        },
        "content-dark": {
          "value": "$scale.color.contrast.dark.85",
          "type": "color"
        }
      },
      "error": {
        "soft-background": {
          "value": "$scale.color.alert.error.50",
          "type": "color"
        },
        "strong-background": {
          "value": "$scale.color.alert.error.600",
          "type": "color"
        },
        "soft-border": {
          "value": "$scale.color.alert.error.600",
          "type": "color"
        },
        "content-light": {
          "value": "$scale.color.contrast.light.100",
          "type": "color"
        },
        "content-dark": {
          "value": "$scale.color.contrast.dark.85",
          "type": "color"
        }
      }
    },
    "reaction": {
      "rating-active": {
        "value": "#ffc043",
        "description": "Active state color for Rating component",
        "type": "color"
      }
    },
    "gradient": {
      "blue-green": {
        "value": "linear-gradient(145deg, rgba(0,172,85,1) 0%, rgba(0,157,224,1) 100%)",
        "type": "color",
        "description": "Gradient blue to green"
      },
      "blue-teal": {
        "value": "linear-gradient(145deg, rgba(0,119,160,1) 0%, rgba(0,157,224,1) 100%)",
        "type": "color",
        "description": "Gradient blue to teal"
      },
      "blue-purple": {
        "value": "linear-gradient(145deg, rgba(130,70,175,1) 0%, rgba(0,157,224,1) 100%)",
        "type": "color",
        "description": "Gradient blue to purple"
      },
      "blue-pink": {
        "value": "linear-gradient(145deg, rgba(238,61,139,1) 0%, rgba(0,157,224,1) 100%)",
        "type": "color",
        "description": "Gradient blue to pink"
      },
      "blue-turquoise": {
        "value": "linear-gradient(145deg, rgba(0,150,143,1) 0%, rgba(0,157,224,1) 100%)",
        "type": "color",
        "description": "Gradient blue to turquoise"
      }
    }
  },
  "typography": {
    "desktop": {
      "display": {
        "1": {
          "value": {
            "fontFamily": "$fontFamilies.heading",
            "fontWeight": "$fontWeights.700",
            "lineHeight": "$lineHeights.desktop.display",
            "fontSize": "$fontSizes.desktop.display",
            "letterSpacing": "$letterSpacing.decrease-30",
            "paragraphSpacing": "$paragraphSpacing.desktop.display"
          },
          "description": "Display 1",
          "type": "typography"
        }
      },
      "heading": {
        "1": {
          "value": {
            "fontFamily": "$fontFamilies.heading",
            "fontWeight": "$fontWeights.700",
            "lineHeight": "$lineHeights.desktop.h1",
            "fontSize": "$fontSizes.desktop.h1",
            "letterSpacing": "$letterSpacing.decrease-10",
            "paragraphSpacing": "$paragraphSpacing.desktop.h1"
          },
          "description": "Heading 1",
          "type": "typography"
        },
        "2": {
          "value": {
            "fontFamily": "$fontFamilies.heading",
            "fontWeight": "$fontWeights.700",
            "lineHeight": "$lineHeights.desktop.h2",
            "fontSize": "$fontSizes.desktop.h2",
            "letterSpacing": "$letterSpacing.none",
            "paragraphSpacing": "$paragraphSpacing.desktop.h2"
          },
          "description": "Heading 2",
          "type": "typography"
        },
        "3": {
          "value": {
            "fontFamily": "$fontFamilies.heading",
            "fontWeight": "$fontWeights.700",
            "lineHeight": "$lineHeights.desktop.h3",
            "fontSize": "$fontSizes.desktop.h3",
            "letterSpacing": "$letterSpacing.none",
            "paragraphSpacing": "$paragraphSpacing.desktop.h3"
          },
          "description": "Heading 3",
          "type": "typography"
        },
        "4": {
          "value": {
            "fontFamily": "$fontFamilies.heading",
            "fontWeight": "$fontWeights.700",
            "lineHeight": "$lineHeights.desktop.h4",
            "fontSize": "$fontSizes.desktop.h4",
            "letterSpacing": "$letterSpacing.none",
            "paragraphSpacing": "$paragraphSpacing.desktop.h4"
          },
          "description": "Heading 4",
          "type": "typography"
        },
        "5": {
          "value": {
            "fontFamily": "$fontFamilies.heading",
            "fontWeight": "$fontWeights.700",
            "lineHeight": "$lineHeights.desktop.h5",
            "fontSize": "$fontSizes.desktop.h5",
            "letterSpacing": "$letterSpacing.increase-5",
            "paragraphSpacing": "$paragraphSpacing.desktop.h5"
          },
          "description": "Heading 5",
          "type": "typography"
        },
        "6": {
          "value": {
            "fontFamily": "$fontFamilies.heading",
            "fontWeight": "$fontWeights.700",
            "lineHeight": "$lineHeights.desktop.h6",
            "fontSize": "$fontSizes.desktop.h6",
            "letterSpacing": "$letterSpacing.none",
            "paragraphSpacing": "$paragraphSpacing.desktop.h6"
          },
          "description": "Heading 6",
          "type": "typography"
        }
      },
      "title": {
        "1": {
          "value": {
            "fontFamily": "$fontFamilies.heading",
            "fontWeight": "$fontWeights.400",
            "lineHeight": "$lineHeights.desktop.title1",
            "fontSize": "$fontSizes.desktop.title1",
            "letterSpacing": "$letterSpacing.increase-5",
            "paragraphSpacing": "$paragraphSpacing.desktop.title1"
          },
          "description": "Title 1",
          "type": "typography"
        },
        "2": {
          "value": {
            "fontFamily": "$fontFamilies.heading",
            "fontWeight": "$fontWeights.400",
            "lineHeight": "$lineHeights.desktop.title2",
            "fontSize": "$fontSizes.desktop.title2",
            "letterSpacing": "$letterSpacing.none",
            "paragraphSpacing": "$paragraphSpacing.desktop.title2"
          },
          "description": "Title 2",
          "type": "typography"
        },
        "3": {
          "value": {
            "fontFamily": "$fontFamilies.body",
            "fontWeight": "$fontWeights.600",
            "lineHeight": "$lineHeights.desktop.title3",
            "fontSize": "$fontSizes.desktop.title3",
            "letterSpacing": "$letterSpacing.increase-3",
            "paragraphSpacing": "$paragraphSpacing.desktop.title3"
          },
          "description": "Title 3",
          "type": "typography"
        },
        "4": {
          "value": {
            "fontFamily": "$fontFamilies.body",
            "fontWeight": "$fontWeights.600",
            "lineHeight": "$lineHeights.desktop.title4",
            "fontSize": "$fontSizes.desktop.title4",
            "letterSpacing": "$letterSpacing.increase-3",
            "paragraphSpacing": "$paragraphSpacing.desktop.title4"
          },
          "description": "Title 4",
          "type": "typography"
        },
        "5": {
          "value": {
            "fontFamily": "$fontFamilies.body",
            "fontWeight": "$fontWeights.600",
            "lineHeight": "$lineHeights.desktop.title5",
            "fontSize": "$fontSizes.desktop.title5",
            "letterSpacing": "$letterSpacing.increase-2",
            "paragraphSpacing": "$paragraphSpacing.desktop.title5"
          },
          "description": "Title 5",
          "type": "typography"
        }
      },
      "body": {
        "1": {
          "value": {
            "fontFamily": "$fontFamilies.body",
            "fontWeight": "$fontWeights.400",
            "lineHeight": "$lineHeights.desktop.body1",
            "fontSize": "$fontSizes.desktop.body1",
            "letterSpacing": "$letterSpacing.increase-10",
            "paragraphSpacing": "$paragraphSpacing.desktop.body1"
          },
          "description": "Body 1",
          "type": "typography"
        },
        "2": {
          "value": {
            "fontFamily": "$fontFamilies.body",
            "fontWeight": "$fontWeights.400",
            "lineHeight": "$lineHeights.desktop.body2",
            "fontSize": "$fontSizes.desktop.body2",
            "letterSpacing": "$letterSpacing.increase-10",
            "paragraphSpacing": "$paragraphSpacing.desktop.body2"
          },
          "description": "Body 2 (Default)",
          "type": "typography"
        },
        "3": {
          "value": {
            "fontFamily": "$fontFamilies.body",
            "fontWeight": "$fontWeights.400",
            "lineHeight": "$lineHeights.desktop.body3",
            "fontSize": "$fontSizes.desktop.body3",
            "letterSpacing": "$letterSpacing.increase-5",
            "paragraphSpacing": "$paragraphSpacing.desktop.body3"
          },
          "description": "Body 3",
          "type": "typography"
        }
      }
    },
    "mobile": {
      "display": {
        "1": {
          "value": {
            "fontFamily": "$fontFamilies.heading",
            "fontWeight": "$fontWeights.700",
            "lineHeight": "$lineHeights.mobile.display",
            "fontSize": "$fontSizes.mobile.display",
            "letterSpacing": "$letterSpacing.decrease-10",
            "paragraphSpacing": "$paragraphSpacing.mobile.display"
          },
          "description": "Display",
          "type": "typography"
        }
      },
      "heading": {
        "1": {
          "value": {
            "fontFamily": "$fontFamilies.heading",
            "fontWeight": "$fontWeights.700",
            "lineHeight": "$lineHeights.mobile.h1",
            "fontSize": "$fontSizes.mobile.h1",
            "letterSpacing": "$letterSpacing.none",
            "paragraphSpacing": "$paragraphSpacing.mobile.h1"
          },
          "description": "Heading 1",
          "type": "typography"
        },
        "2": {
          "value": {
            "fontFamily": "$fontFamilies.heading",
            "fontWeight": "$fontWeights.700",
            "lineHeight": "$lineHeights.mobile.h2",
            "fontSize": "$fontSizes.mobile.h2",
            "letterSpacing": "{letterSpacing.none}",
            "paragraphSpacing": "$paragraphSpacing.mobile.h2"
          },
          "description": "Heading 2",
          "type": "typography"
        },
        "3": {
          "value": {
            "fontFamily": "$fontFamilies.heading",
            "fontWeight": "$fontWeights.700",
            "lineHeight": "$lineHeights.mobile.h3",
            "fontSize": "$fontSizes.mobile.h3",
            "letterSpacing": "$letterSpacing.increase-5",
            "paragraphSpacing": "$paragraphSpacing.mobile.h3"
          },
          "description": "Heading 3",
          "type": "typography"
        },
        "4": {
          "value": {
            "fontFamily": "$fontFamilies.heading",
            "fontWeight": "$fontWeights.700",
            "lineHeight": "$lineHeights.mobile.h4",
            "fontSize": "$fontSizes.mobile.h4",
            "letterSpacing": "$letterSpacing.increase-5",
            "paragraphSpacing": "$paragraphSpacing.mobile.h4"
          },
          "description": "Heading 4",
          "type": "typography"
        },
        "5": {
          "value": {
            "fontFamily": "$fontFamilies.heading",
            "fontWeight": "$fontWeights.700",
            "lineHeight": "$lineHeights.mobile.h5",
            "fontSize": "$fontSizes.mobile.h5",
            "letterSpacing": "$letterSpacing.none",
            "paragraphSpacing": "$paragraphSpacing.mobile.h5"
          },
          "description": "Heading 5",
          "type": "typography"
        },
        "6": {
          "value": {
            "fontFamily": "$fontFamilies.heading",
            "fontWeight": "$fontWeights.700",
            "lineHeight": "$lineHeights.mobile.h6",
            "fontSize": "$fontSizes.mobile.h6",
            "letterSpacing": "$letterSpacing.increase-3",
            "paragraphSpacing": "$paragraphSpacing.mobile.h6"
          },
          "description": "Heading 6",
          "type": "typography"
        }
      },
      "title": {
        "1": {
          "value": {
            "fontFamily": "$fontFamilies.heading",
            "fontWeight": "$fontWeights.400",
            "lineHeight": "$lineHeights.mobile.title1",
            "fontSize": "$fontSizes.mobile.title1",
            "letterSpacing": "$letterSpacing.none",
            "paragraphSpacing": "$paragraphSpacing.mobile.title1"
          },
          "description": "Title 1",
          "type": "typography"
        },
        "2": {
          "value": {
            "fontFamily": "$fontFamilies.heading",
            "fontWeight": "$fontWeights.400",
            "lineHeight": "$lineHeights.mobile.title2",
            "fontSize": "$fontSizes.mobile.title2",
            "letterSpacing": "$letterSpacing.increase-3",
            "paragraphSpacing": "$paragraphSpacing.mobile.title2"
          },
          "description": "Title 2",
          "type": "typography"
        },
        "3": {
          "value": {
            "fontFamily": "$fontFamilies.body",
            "fontWeight": "$fontWeights.600",
            "lineHeight": "$lineHeights.mobile.title3",
            "fontSize": "$fontSizes.mobile.title3",
            "letterSpacing": "$letterSpacing.increase-3",
            "paragraphSpacing": "$paragraphSpacing.mobile.title3"
          },
          "description": "Title 3",
          "type": "typography"
        },
        "4": {
          "value": {
            "fontFamily": "$fontFamilies.body",
            "fontWeight": "$fontWeights.600",
            "lineHeight": "$lineHeights.mobile.title4",
            "fontSize": "$fontSizes.mobile.title4",
            "letterSpacing": "$letterSpacing.increase-2",
            "paragraphSpacing": "$paragraphSpacing.mobile.title4"
          },
          "description": "Title 4",
          "type": "typography"
        },
        "5": {
          "value": {
            "fontFamily": "$fontFamilies.body",
            "fontWeight": "$fontWeights.600",
            "lineHeight": "$lineHeights.mobile.title5",
            "fontSize": "$fontSizes.mobile.title5",
            "letterSpacing": "$letterSpacing.increase-2",
            "paragraphSpacing": "$paragraphSpacing.mobile.title5"
          },
          "description": "Title 5",
          "type": "typography"
        }
      },
      "body": {
        "1": {
          "value": {
            "fontFamily": "$fontFamilies.body",
            "fontWeight": "$fontWeights.400",
            "lineHeight": "$lineHeights.mobile.body1",
            "fontSize": "$fontSizes.mobile.body1",
            "letterSpacing": "$letterSpacing.increase-10",
            "paragraphSpacing": "$paragraphSpacing.mobile.body1"
          },
          "description": "Body 1",
          "type": "typography"
        },
        "2": {
          "value": {
            "fontFamily": "$fontFamilies.body",
            "fontWeight": "$fontWeights.400",
            "lineHeight": "$lineHeights.mobile.body2",
            "fontSize": "$fontSizes.mobile.body2",
            "letterSpacing": "$letterSpacing.increase-5",
            "paragraphSpacing": "$paragraphSpacing.mobile.body2"
          },
          "description": "Body 2 (Default)",
          "type": "typography"
        },
        "3": {
          "value": {
            "fontFamily": "$fontFamilies.body",
            "fontWeight": "$fontWeights.400",
            "lineHeight": "$lineHeights.mobile.body3",
            "fontSize": "$fontSizes.mobile.body3",
            "letterSpacing": "$letterSpacing.increase-5",
            "paragraphSpacing": "$paragraphSpacing.mobile.body3"
          },
          "description": "Body 3",
          "type": "typography"
        }
      }
    },
    "component": {
      "button": {
        "1": {
          "value": {
            "fontFamily": "$fontFamilies.body",
            "fontWeight": "$fontWeights.500",
            "lineHeight": "$lineHeights.desktop.body2",
            "fontSize": "$fontSizes.desktop.body2",
            "letterSpacing": "$letterSpacing.increase-10",
            "paragraphSpacing": "0px"
          },
          "description": "Button 1",
          "type": "typography"
        },
        "2": {
          "value": {
            "fontFamily": "$fontFamilies.body",
            "fontWeight": "$fontWeights.500",
            "lineHeight": "$lineHeights.desktop.body3",
            "fontSize": "$fontSizes.desktop.body3",
            "letterSpacing": "$letterSpacing.increase-5",
            "paragraphSpacing": "0px"
          },
          "description": "Button 2",
          "type": "typography"
        },
        "3": {
          "value": {
            "fontFamily": "$fontFamilies.body",
            "fontWeight": "$fontWeights.500",
            "lineHeight": "$lineHeights.desktop.caption1",
            "fontSize": "$fontSizes.desktop.caption2",
            "letterSpacing": "$letterSpacing.increase-5",
            "paragraphSpacing": "0px"
          },
          "description": "Button 3",
          "type": "typography"
        }
      },
      "tooltip": {
        "text": {
          "value": {
            "fontFamily": "$fontFamilies.body",
            "fontWeight": "$fontWeights.500",
            "lineHeight": "$lineHeights.desktop.body3",
            "fontSize": "$fontSizes.desktop.caption2",
            "letterSpacing": "0",
            "paragraphSpacing": "0"
          },
          "description": "Tool Tip",
          "type": "typography"
        }
      },
      "input": {
        "text": {
          "value": {
            "fontFamily": "$fontFamilies.body",
            "fontWeight": "$fontWeights.400",
            "lineHeight": "$lineHeights.desktop.body2",
            "fontSize": "$fontSizes.desktop.body2",
            "letterSpacing": "$letterSpacing.increase-10",
            "paragraphSpacing": "$paragraphSpacing.desktop.body2"
          },
          "description": "Input Text",
          "type": "typography"
        },
        "label": {
          "value": {
            "fontFamily": "$fontFamilies.body",
            "fontWeight": "$fontWeights.400",
            "lineHeight": "$lineHeights.desktop.caption2",
            "fontSize": "$fontSizes.desktop.caption2",
            "letterSpacing": "$letterSpacing.increase-10",
            "paragraphSpacing": "$paragraphSpacing.desktop.caption2"
          },
          "description": "Input Label",
          "type": "typography"
        },
        "helper-text": {
          "value": {
            "fontFamily": "$fontFamilies.body",
            "fontWeight": "$fontWeights.400",
            "lineHeight": "$lineHeights.desktop.caption2",
            "fontSize": "$fontSizes.desktop.caption2",
            "letterSpacing": "$letterSpacing.increase-10",
            "paragraphSpacing": "$paragraphSpacing.desktop.caption2"
          },
          "description": "Helper Text",
          "type": "typography"
        }
      },
      "table": {
        "header": {
          "value": {
            "fontFamily": "$fontFamilies.body",
            "fontWeight": "$fontWeights.500",
            "lineHeight": "$lineHeights.desktop.body2",
            "fontSize": "$fontSizes.desktop.body3",
            "letterSpacing": "$letterSpacing.increase-5",
            "paragraphSpacing": "$paragraphSpacing.desktop.body2"
          },
          "description": "Table Header",
          "type": "typography"
        }
      }
    },
    "footnote": {
      "1": {
        "value": {
          "fontFamily": "$fontFamilies.body",
          "fontWeight": "$fontWeights.400",
          "lineHeight": "$lineHeights.desktop.body3",
          "fontSize": "$fontSizes.desktop.body3",
          "letterSpacing": "$letterSpacing.increase-5",
          "paragraphSpacing": "$paragraphSpacing.desktop.body3"
        },
        "description": "Footnote 1",
        "type": "typography"
      }
    },
    "caption": {
      "1": {
        "value": {
          "fontFamily": "$fontFamilies.body",
          "fontWeight": "$fontWeights.400",
          "lineHeight": "$lineHeights.desktop.caption1",
          "fontSize": "$fontSizes.desktop.caption1",
          "letterSpacing": "$letterSpacing.increase-5",
          "paragraphSpacing": "$paragraphSpacing.desktop.caption1"
        },
        "description": "Caption 1",
        "type": "typography"
      },
      "2": {
        "value": {
          "fontFamily": "$fontFamilies.body",
          "fontWeight": "$fontWeights.500",
          "lineHeight": "$lineHeights.desktop.caption2",
          "fontSize": "$fontSizes.desktop.caption2",
          "letterSpacing": "$letterSpacing.increase-10",
          "paragraphSpacing": "$paragraphSpacing.desktop.caption2"
        },
        "description": "Caption 2",
        "type": "typography"
      }
    }
  },
  "fontFamilies": {
    "heading": {
      "value": "MMC Display",
      "type": "fontFamilies"
    },
    "body": {
      "value": "Noto Sans",
      "type": "fontFamilies"
    }
  },
  "fontSizes": {
    "desktop": {
      "caption2": {
        "value": "12px",
        "type": "fontSizes"
      },
      "caption1": {
        "value": "13px",
        "type": "fontSizes"
      },
      "body3": {
        "value": "14px",
        "type": "fontSizes"
      },
      "body2": {
        "value": "16px",
        "type": "fontSizes"
      },
      "body1": {
        "value": "18px",
        "type": "fontSizes"
      },
      "title5": {
        "value": "14px",
        "type": "fontSizes"
      },
      "title4": {
        "value": "16px",
        "type": "fontSizes"
      },
      "title3": {
        "value": "18px",
        "type": "fontSizes"
      },
      "title2": {
        "value": "24px",
        "type": "fontSizes"
      },
      "title1": {
        "value": "32px",
        "type": "fontSizes"
      },
      "h6": {
        "value": "24px",
        "type": "fontSizes"
      },
      "h5": {
        "value": "32px",
        "type": "fontSizes"
      },
      "h4": {
        "value": "40px",
        "type": "fontSizes"
      },
      "h3": {
        "value": "48px",
        "type": "fontSizes"
      },
      "h2": {
        "value": "56px",
        "type": "fontSizes"
      },
      "h1": {
        "value": "64px",
        "type": "fontSizes"
      },
      "display": {
        "value": "96px",
        "type": "fontSizes"
      }
    },
    "mobile": {
      "caption2": {
        "value": "12px",
        "type": "fontSizes"
      },
      "caption1": {
        "value": "13px",
        "type": "fontSizes"
      },
      "body3": {
        "value": "13px",
        "type": "fontSizes"
      },
      "body2": {
        "value": "14px",
        "type": "fontSizes"
      },
      "body1": {
        "value": "16px",
        "type": "fontSizes"
      },
      "title5": {
        "value": "13px",
        "type": "fontSizes"
      },
      "title4": {
        "value": "14px",
        "type": "fontSizes"
      },
      "title3": {
        "value": "16px",
        "type": "fontSizes"
      },
      "title2": {
        "value": "18px",
        "type": "fontSizes"
      },
      "title1": {
        "value": "24px",
        "type": "fontSizes"
      },
      "h6": {
        "value": "18px",
        "type": "fontSizes"
      },
      "h5": {
        "value": "24px",
        "type": "fontSizes"
      },
      "h4": {
        "value": "28px",
        "type": "fontSizes"
      },
      "h3": {
        "value": "32px",
        "type": "fontSizes"
      },
      "h2": {
        "value": "40px",
        "type": "fontSizes"
      },
      "h1": {
        "value": "48px",
        "type": "fontSizes"
      },
      "display": {
        "value": "64px",
        "type": "fontSizes"
      }
    }
  },
  "fontWeights": {
    "100": {
      "value": "ExtraLight",
      "type": "fontWeights"
    },
    "200": {
      "value": "Light",
      "type": "fontWeights"
    },
    "300": {
      "value": "Thin",
      "type": "fontWeights"
    },
    "400": {
      "value": "Regular",
      "type": "fontWeights"
    },
    "500": {
      "value": "Medium",
      "type": "fontWeights"
    },
    "600": {
      "value": "SemiBold",
      "type": "fontWeights"
    },
    "700": {
      "value": "Bold",
      "type": "fontWeights"
    },
    "800": {
      "value": "ExtraBold",
      "type": "fontWeights"
    },
    "900": {
      "value": "Black",
      "type": "fontWeights"
    },
    "400-book": {
      "value": "Book",
      "type": "fontWeights"
    }
  },
  "letterSpacing": {
    "none": {
      "value": "0%",
      "type": "letterSpacing"
    },
    "increase-base": {
      "value": "0.05%",
      "type": "letterSpacing"
    },
    "decrease-base": {
      "value": "-0.05%",
      "type": "letterSpacing"
    },
    "increase-2": {
      "value": "0.1%",
      "type": "letterSpacing"
    },
    "increase-3": {
      "value": "0.15%",
      "type": "letterSpacing"
    },
    "increase-4": {
      "value": "0.2%",
      "type": "letterSpacing"
    },
    "increase-5": {
      "value": "0.25%",
      "type": "letterSpacing"
    },
    "increase-10": {
      "value": "0.5%",
      "type": "letterSpacing"
    },
    "decrease-30": {
      "value": "-1.5%",
      "type": "letterSpacing"
    },
    "decrease-10": {
      "value": "-0.5%",
      "type": "letterSpacing"
    }
  },
  "lineHeights": {
    "desktop": {
      "caption2": {
        "value": "12px",
        "type": "lineHeights"
      },
      "caption1": {
        "value": "16px",
        "type": "lineHeights"
      },
      "body3": {
        "value": "20px",
        "type": "lineHeights"
      },
      "body2": {
        "value": "24px",
        "type": "lineHeights"
      },
      "body1": {
        "value": "28px",
        "type": "lineHeights"
      },
      "title5": {
        "value": "20px",
        "type": "lineHeights"
      },
      "title4": {
        "value": "24px",
        "type": "lineHeights"
      },
      "title3": {
        "value": "28px",
        "type": "lineHeights"
      },
      "title2": {
        "value": "32px",
        "type": "lineHeights"
      },
      "title1": {
        "value": "40px",
        "type": "lineHeights"
      },
      "h6": {
        "value": "32px",
        "type": "lineHeights"
      },
      "h5": {
        "value": "40px",
        "type": "lineHeights"
      },
      "h4": {
        "value": "48px",
        "type": "lineHeights"
      },
      "h3": {
        "value": "64px",
        "type": "lineHeights"
      },
      "h2": {
        "value": "72px",
        "type": "lineHeights"
      },
      "h1": {
        "value": "80px",
        "type": "lineHeights"
      },
      "display": {
        "value": "120px",
        "type": "lineHeights"
      }
    },
    "mobile": {
      "caption2": {
        "value": "12px",
        "type": "lineHeights"
      },
      "caption1": {
        "value": "16px",
        "type": "lineHeights"
      },
      "body3": {
        "value": "18px",
        "type": "lineHeights"
      },
      "body2": {
        "value": "20px",
        "type": "lineHeights"
      },
      "body1": {
        "value": "24px",
        "type": "lineHeights"
      },
      "title5": {
        "value": "18px",
        "type": "lineHeights"
      },
      "title4": {
        "value": "20px",
        "type": "lineHeights"
      },
      "title3": {
        "value": "24px",
        "type": "lineHeights"
      },
      "title2": {
        "value": "28px",
        "type": "lineHeights"
      },
      "title1": {
        "value": "32px",
        "type": "lineHeights"
      },
      "h6": {
        "value": "28px",
        "type": "lineHeights"
      },
      "h5": {
        "value": "32px",
        "type": "lineHeights"
      },
      "h4": {
        "value": "32px",
        "type": "lineHeights"
      },
      "h3": {
        "value": "40px",
        "type": "lineHeights"
      },
      "h2": {
        "value": "48px",
        "type": "lineHeights"
      },
      "h1": {
        "value": "56px",
        "type": "lineHeights"
      },
      "display": {
        "value": "80px",
        "type": "lineHeights"
      }
    }
  },
  "paragraphSpacing": {
    "desktop": {
      "caption2": {
        "value": "$lineHeights.desktop.caption2",
        "type": "paragraphSpacing"
      },
      "caption1": {
        "value": "$lineHeights.desktop.caption1",
        "type": "paragraphSpacing"
      },
      "body3": {
        "value": "$lineHeights.desktop.body3",
        "type": "paragraphSpacing"
      },
      "body2": {
        "value": "$lineHeights.desktop.body2",
        "type": "paragraphSpacing"
      },
      "body1": {
        "value": "$lineHeights.desktop.body1",
        "type": "paragraphSpacing"
      },
      "title5": {
        "value": "$lineHeights.desktop.title5",
        "type": "paragraphSpacing"
      },
      "title4": {
        "value": "$lineHeights.desktop.title4",
        "type": "paragraphSpacing"
      },
      "title3": {
        "value": "$lineHeights.desktop.title3",
        "type": "paragraphSpacing"
      },
      "title2": {
        "value": "$lineHeights.desktop.title2",
        "type": "paragraphSpacing"
      },
      "title1": {
        "value": "$lineHeights.desktop.title1",
        "type": "paragraphSpacing"
      },
      "h6": {
        "value": "$lineHeights.desktop.h6",
        "type": "paragraphSpacing"
      },
      "h5": {
        "value": "$lineHeights.desktop.h5",
        "type": "paragraphSpacing"
      },
      "h4": {
        "value": "$lineHeights.desktop.h4",
        "type": "paragraphSpacing"
      },
      "h3": {
        "value": "$lineHeights.desktop.h3",
        "type": "paragraphSpacing"
      },
      "h2": {
        "value": "$lineHeights.desktop.h2",
        "type": "paragraphSpacing"
      },
      "h1": {
        "value": "$lineHeights.desktop.h1",
        "type": "paragraphSpacing"
      },
      "display": {
        "value": "$lineHeights.desktop.display",
        "type": "paragraphSpacing"
      }
    },
    "mobile": {
      "caption2": {
        "value": "$lineHeights.mobile.caption2",
        "type": "paragraphSpacing"
      },
      "caption1": {
        "value": "$lineHeights.mobile.caption1",
        "type": "paragraphSpacing"
      },
      "body3": {
        "value": "$lineHeights.mobile.body3",
        "type": "paragraphSpacing"
      },
      "body2": {
        "value": "$lineHeights.mobile.body2",
        "type": "paragraphSpacing"
      },
      "body1": {
        "value": "$lineHeights.mobile.body1",
        "type": "paragraphSpacing"
      },
      "title5": {
        "value": "$lineHeights.mobile.title5",
        "type": "paragraphSpacing"
      },
      "title4": {
        "value": "$lineHeights.mobile.title4",
        "type": "paragraphSpacing"
      },
      "title3": {
        "value": "$lineHeights.mobile.title3",
        "type": "paragraphSpacing"
      },
      "title2": {
        "value": "$lineHeights.mobile.title2",
        "type": "paragraphSpacing"
      },
      "title1": {
        "value": "$lineHeights.mobile.title1",
        "type": "paragraphSpacing"
      },
      "h6": {
        "value": "$lineHeights.mobile.h6",
        "type": "paragraphSpacing"
      },
      "h5": {
        "value": "$lineHeights.mobile.h5",
        "type": "paragraphSpacing"
      },
      "h4": {
        "value": "$lineHeights.mobile.h4",
        "type": "paragraphSpacing"
      },
      "h3": {
        "value": "$lineHeights.mobile.h3",
        "type": "paragraphSpacing"
      },
      "h2": {
        "value": "$lineHeights.mobile.h2",
        "type": "paragraphSpacing"
      },
      "h1": {
        "value": "$lineHeights.mobile.h1",
        "type": "paragraphSpacing"
      },
      "display": {
        "value": "$lineHeights.mobile.display",
        "type": "paragraphSpacing"
      }
    }
  },
  "borderRadius": {
    "none": {
      "value": "0",
      "type": "borderRadius"
    },
    "soft": {
      "value": "$scale.content.size.base",
      "type": "borderRadius"
    },
    "softer": {
      "value": "$scale.content.size.base * $borderRadius.soft",
      "type": "borderRadius"
    },
    "rounded": {
      "value": "$scale.content.size.base * 60",
      "type": "borderRadius"
    }
  },
  "borderWidth": {
    "none": {
      "value": "0",
      "type": "borderWidth"
    },
    "xs": {
      "value": "1",
      "type": "borderWidth"
    },
    "sm": {
      "value": "$scale.content.size.base",
      "type": "borderWidth"
    },
    "md": {
      "value": "$scale.content.size.base * $borderWidth.sm",
      "type": "borderWidth"
    },
    "lg": {
      "value": "$scale.content.size.base * $borderWidth.md",
      "type": "borderWidth"
    },
    "xl": {
      "value": "$scale.content.size.base * $borderWidth.lg",
      "type": "borderWidth"
    }
  },
  "boxShadow": {
    "elevation": {
      "flat": {
        "value": {
          "x": "0",
          "y": "0",
          "blur": "0",
          "spread": "0",
          "color": "$scale.color.contrast.dark"
        },
        "type": "boxShadow"
      },
      "raised": {
        "value": {
          "x": "0",
          "y": "$scale.content.size.base * 2",
          "blur": "$scale.content.size.base * 2",
          "spread": "0",
          "color": "rgba($scale.color.contrast.dark, 0.16)"
        },
        "type": "boxShadow"
      },
      "elevated": {
        "value": {
          "x": "0",
          "y": "$scale.content.size.base * 4",
          "blur": "$scale.content.size.base * 4",
          "spread": "0",
          "color": "rgba($scale.color.contrast.dark, 0.16)"
        },
        "type": "boxShadow"
      },
      "floating": {
        "value": {
          "y": "$scale.content.size.base * 8",
          "blur": "$scale.content.size.base * 8",
          "spread": "0",
          "x": "0",
          "color": "rgba($scale.color.contrast.dark, 0.16)"
        },
        "type": "boxShadow"
      },
      "lifted": {
        "value": {
          "x": "0",
          "y": "$scale.content.size.base * 12",
          "blur": "$scale.content.size.base * 12",
          "spread": "0",
          "color": "rgba($scale.color.contrast.dark, 0.16)"
        },
        "type": "boxShadow"
      }
    }
  },
  "spacing": {
    "base": {
      "value": "$scale.content.spacing.base",
      "type": "spacing"
    },
    "vertical-2": {
      "value": "$spacing.base * 2",
      "type": "spacing"
    },
    "vertical-3": {
      "value": "$spacing.base * 3",
      "type": "spacing"
    },
    "vertical-4": {
      "value": "$spacing.base * 4",
      "type": "spacing"
    },
    "vertical-5": {
      "value": "$spacing.base * 5",
      "type": "spacing"
    },
    "vertical-6": {
      "value": "$spacing.base * 6",
      "type": "spacing"
    },
    "vertical-7": {
      "value": "$spacing.base * 7",
      "type": "spacing"
    },
    "vertical-8": {
      "value": "$spacing.base * 8",
      "type": "spacing"
    },
    "vertical-9": {
      "value": "$spacing.base * 9",
      "type": "spacing"
    },
    "vertical-10": {
      "value": "$spacing.base * 10",
      "type": "spacing"
    },
    "vertical-11": {
      "value": "$spacing.base * 11",
      "type": "spacing"
    },
    "vertical-12": {
      "value": "$spacing.base * 12",
      "type": "spacing"
    },
    "horizontal-2": {
      "value": "$spacing.base * 2",
      "type": "spacing"
    },
    "horizontal-3": {
      "value": "$spacing.base * 3",
      "type": "spacing"
    },
    "horizontal-4": {
      "value": "$spacing.base * 4",
      "type": "spacing"
    },
    "horizontal-5": {
      "value": "$spacing.base * 5",
      "type": "spacing"
    },
    "horizontal-6": {
      "value": "$spacing.base * 6",
      "type": "spacing"
    },
    "horizontal-7": {
      "value": "$spacing.base * 7",
      "type": "spacing"
    },
    "horizontal-8": {
      "value": "$spacing.base * 8",
      "type": "spacing"
    },
    "horizontal-9": {
      "value": "$spacing.base * 9",
      "type": "spacing"
    },
    "horizontal-10": {
      "value": "$spacing.base * 10",
      "type": "spacing"
    },
    "horizontal-11": {
      "value": "$spacing.base * 11",
      "type": "spacing"
    },
    "horizontal-12": {
      "value": "$spacing.base * 12",
      "type": "spacing"
    },
    "none": {
      "value": "0",
      "type": "spacing"
    }
  },
  "scale": {
    "color": {
      "blue": {
        "50": {
          "value": "rgb(240, 250, 255)",
          "description": "50",
          "type": "other"
        },
        "100": {
          "value": "rgb(199, 237, 255)",
          "description": "100",
          "type": "other"
        },
        "200": {
          "value": "rgb(159, 224, 255)",
          "description": "200",
          "type": "other"
        },
        "300": {
          "value": "rgb(118, 211, 255)",
          "description": "300",
          "type": "other"
        },
        "400": {
          "value": "rgb(59, 184, 240)",
          "description": "400",
          "type": "other"
        },
        "500": {
          "value": "rgb(0, 157, 224)",
          "description": "500 AA large text only",
          "type": "other"
        },
        "600": {
          "value": "rgb(0, 101, 172)",
          "description": "600 AA",
          "type": "other"
        },
        "700": {
          "value": "rgb(0, 44, 119)",
          "description": "700 AAA",
          "type": "other"
        },
        "800": {
          "value": "rgb(0, 31, 82)",
          "description": "800 AAA",
          "type": "other"
        },
        "900": {
          "value": "rgb(0, 21, 56)",
          "description": "900 AAA",
          "type": "other"
        }
      },
      "teal": {
        "50": {
          "value": "rgb(240, 253, 255)",
          "description": "50",
          "type": "other"
        },
        "100": {
          "value": "rgb(212, 241, 246)",
          "description": "100",
          "type": "other"
        },
        "200": {
          "value": "rgb(184, 229, 237)",
          "description": "200",
          "type": "other"
        },
        "300": {
          "value": "rgb(156, 217, 228)",
          "description": "300",
          "type": "other"
        },
        "400": {
          "value": "rgb(78, 168, 194)",
          "description": "400 AAA dark text only",
          "type": "other"
        },
        "500": {
          "value": "rgb(0, 119, 160)",
          "description": "500 AA",
          "type": "other"
        },
        "600": {
          "value": "rgb(0, 98, 134)",
          "description": "600 AA",
          "type": "other"
        },
        "700": {
          "value": "rgb(0, 76, 108)",
          "description": "700 AAA",
          "type": "other"
        },
        "800": {
          "value": "rgb(0, 54, 77)",
          "description": "800 AAA",
          "type": "other"
        },
        "900": {
          "value": "rgb(0, 32, 46)",
          "description": "900 AAA",
          "type": "other"
        }
      },
      "turquoise": {
        "50": {
          "value": "rgb(245, 255, 253)",
          "description": "50",
          "type": "other"
        },
        "100": {
          "value": "rgb(214, 243, 237)",
          "description": "100",
          "type": "other"
        },
        "200": {
          "value": "rgb(183, 231, 222)",
          "description": "200",
          "type": "other"
        },
        "300": {
          "value": "rgb(152, 219, 206)",
          "description": "300",
          "type": "other"
        },
        "400": {
          "value": "rgb(76, 185, 175)",
          "description": "400 AAA dark text only",
          "type": "other"
        },
        "500": {
          "value": "rgb(0, 150, 143)",
          "description": "500 AA large text only",
          "type": "other"
        },
        "600": {
          "value": "rgb(0, 122, 118)",
          "description": "600 AA",
          "type": "other"
        },
        "700": {
          "value": "rgb(0, 94, 93)",
          "description": "700 AAA",
          "type": "other"
        },
        "800": {
          "value": "rgb(0, 65, 64)",
          "description": "800 AAA",
          "type": "other"
        },
        "900": {
          "value": "rgb(0, 36, 35)",
          "description": "900 AAA",
          "type": "other"
        }
      },
      "green": {
        "50": {
          "value": "rgb(243, 255, 245)",
          "description": "50",
          "type": "other"
        },
        "100": {
          "value": "rgb(214, 243, 237)",
          "description": "100",
          "type": "other"
        },
        "200": {
          "value": "rgb(183, 231, 222)",
          "description": "200",
          "type": "other"
        },
        "300": {
          "value": "rgb(152, 219, 206)",
          "description": "300",
          "type": "other"
        },
        "400": {
          "value": "rgb(87, 198, 122)",
          "description": "400 AAA dark text only",
          "type": "other"
        },
        "500": {
          "value": "rgb(0, 172, 65)",
          "description": "500 AA large text only",
          "type": "other"
        },
        "600": {
          "value": "rgb(20, 133, 61)",
          "description": "600 AA",
          "type": "other"
        },
        "700": {
          "value": "rgb(39, 93, 56)",
          "description": "700 AAA",
          "type": "other"
        },
        "800": {
          "value": "rgb(27, 65, 39)",
          "description": "800 AAA",
          "type": "other"
        },
        "900": {
          "value": "rgb(15, 36, 21)",
          "description": "900 AAA",
          "type": "other"
        }
      },
      "pink": {
        "50": {
          "value": "rgb(255, 248, 249)",
          "description": "50",
          "type": "other"
        },
        "100": {
          "value": "rgb(253, 223, 229)",
          "description": "100",
          "type": "other"
        },
        "200": {
          "value": "rgb(251, 198, 210)",
          "description": "200",
          "type": "other"
        },
        "300": {
          "value": "rgb(248, 172, 190)",
          "description": "300",
          "type": "other"
        },
        "400": {
          "value": "rgb(243, 117, 165)",
          "description": "400 AAA dark text only",
          "type": "other"
        },
        "500": {
          "value": "rgb(238, 61, 139)",
          "description": "500 AA large text only",
          "type": "other"
        },
        "600": {
          "value": "rgb(208, 32, 115)",
          "description": "600 AA",
          "type": "other"
        },
        "700": {
          "value": "rgb(178, 2, 91)",
          "description": "700 AA",
          "type": "other"
        },
        "800": {
          "value": "rgb(120, 2, 61)",
          "description": "800 AAA",
          "type": "other"
        },
        "900": {
          "value": "rgb(61, 1, 31)",
          "description": "900 AAA",
          "type": "other"
        }
      },
      "purple": {
        "50": {
          "value": "rgb(249, 247, 251)",
          "description": "50",
          "type": "other"
        },
        "100": {
          "value": "rgb(234, 224, 242)",
          "description": "100",
          "type": "other"
        },
        "200": {
          "value": "rgb(219, 202, 233)",
          "description": "200",
          "type": "other"
        },
        "300": {
          "value": "rgb(204, 179, 224)",
          "description": "300",
          "type": "other"
        },
        "400": {
          "value": "rgb(167, 125, 200)",
          "description": "400 AA large text only",
          "type": "other"
        },
        "500": {
          "value": "rgb(130, 70, 175)",
          "description": "500 AA",
          "type": "other"
        },
        "600": {
          "value": "rgb(100, 60, 153)",
          "description": "600 AAA",
          "type": "other"
        },
        "700": {
          "value": "rgb(70, 50, 130)",
          "description": "700 AA",
          "type": "other"
        },
        "800": {
          "value": "rgb(48, 34, 89)",
          "description": "800 AAA",
          "type": "other"
        },
        "900": {
          "value": "rgb(26, 18, 48)",
          "description": "900 AAA",
          "type": "other"
        }
      },
      "blueGray": {
        "50": {
          "value": "rgb(248, 250, 252)",
          "description": "50",
          "type": "other"
        },
        "100": {
          "value": "rgb(229, 237, 244)",
          "description": "100",
          "type": "other"
        },
        "200": {
          "value": "rgb(209, 224, 236)",
          "description": "200",
          "type": "other"
        },
        "300": {
          "value": "rgb(190, 211, 228)",
          "description": "300",
          "type": "other"
        },
        "400": {
          "value": "rgb(162, 183, 205)",
          "description": "400 AAA dark text only",
          "type": "other"
        },
        "500": {
          "value": "rgb(128, 150, 178)",
          "description": "500 AA large text only",
          "type": "other"
        },
        "600": {
          "value": "rgb(98, 119, 152)",
          "description": "600 AAA",
          "type": "other"
        },
        "700": {
          "value": "rgb(78, 98, 135)",
          "description": "700 AA",
          "type": "other"
        },
        "800": {
          "value": "rgb(53, 66, 91)",
          "description": "800 AAA",
          "type": "other"
        },
        "900": {
          "value": "rgb(27, 34, 47)",
          "description": "900 AAA",
          "type": "other"
        }
      },
      "gray": {
        "50": {
          "value": "rgb(244, 244, 244)",
          "description": "50",
          "type": "other"
        },
        "100": {
          "value": "rgb(235, 235, 235)",
          "description": "100",
          "type": "other"
        },
        "200": {
          "value": "rgb(227, 227, 227)",
          "description": "200",
          "type": "other"
        },
        "300": {
          "value": "rgb(218, 218, 218)",
          "description": "300",
          "type": "other"
        },
        "400": {
          "value": "rgb(179, 179, 179)",
          "description": "400 AAA dark text only",
          "type": "other"
        },
        "500": {
          "value": "rgb(148, 148, 148)",
          "description": "500 AA large text only",
          "type": "other"
        },
        "600": {
          "value": "rgb(118, 118, 118)",
          "description": "600 AAA",
          "type": "other"
        },
        "700": {
          "value": "rgb(86, 86, 86)",
          "description": "700 AA",
          "type": "other"
        },
        "800": {
          "value": "rgb(59, 59, 59)",
          "description": "800 AAA",
          "type": "other"
        },
        "900": {
          "value": "rgb(32, 32, 32)",
          "description": "900 AAA",
          "type": "other"
        }
      },
      "alert": {
        "info": {
          "50": {
            "value": "rgb(234, 241, 255)",
            "description": "50",
            "type": "other"
          },
          "100": {
            "value": "rgb(167, 210, 255)",
            "description": "100",
            "type": "other"
          },
          "200": {
            "value": "rgb(140, 178, 255)",
            "description": "200",
            "type": "other"
          },
          "300": {
            "value": "rgb(93, 147, 255)",
            "description": "300",
            "type": "other"
          },
          "400": {
            "value": "rgb(44, 110, 242)",
            "description": "400 AAA dark text only",
            "type": "other"
          },
          "500": {
            "value": "rgb(26, 87, 208)",
            "description": "500",
            "type": "other"
          },
          "600": {
            "value": "rgb(12, 66, 174)",
            "description": "600",
            "type": "other"
          },
          "700": {
            "value": "rgb(2, 48, 140)",
            "description": "700",
            "type": "other"
          },
          "800": {
            "value": "rgb(0, 35, 106)",
            "description": "800",
            "type": "other"
          },
          "900": {
            "value": "rgb(0, 24, 72)",
            "description": "900",
            "type": "other"
          }
        },
        "success": {
          "50": {
            "value": "rgb(241, 255, 246)",
            "type": "other",
            "description": "50"
          },
          "100": {
            "value": "rgb(209, 255, 226)",
            "description": "100",
            "type": "other"
          },
          "200": {
            "value": "rgb(177, 255, 205)",
            "description": "200",
            "type": "other"
          },
          "300": {
            "value": "rgb(146, 255, 185)",
            "description": "300",
            "type": "other"
          },
          "400": {
            "value": "rgb(114, 255, 165)",
            "description": "400",
            "type": "other"
          },
          "500": {
            "value": "rgb(88, 235, 141)",
            "description": "500",
            "type": "other"
          },
          "600": {
            "value": "rgb(60, 201, 111)",
            "description": "600",
            "type": "other"
          },
          "700": {
            "value": "rgb(38, 167, 85)",
            "description": "700",
            "type": "other"
          },
          "800": {
            "value": "rgb(20, 133, 61)",
            "description": "800",
            "type": "other"
          },
          "900": {
            "value": "rgb(8, 99, 41)",
            "description": "900",
            "type": "other"
          }
        },
        "warning": {
          "50": {
            "value": "rgb(255, 248, 229)",
            "type": "other",
            "description": "50"
          },
          "100": {
            "value": "rgb(255, 237, 183)",
            "description": "100",
            "type": "other"
          },
          "200": {
            "value": "rgb(255, 225, 138)",
            "description": "200",
            "type": "other"
          },
          "300": {
            "value": "rgb(255, 213, 92)",
            "description": "300",
            "type": "other"
          },
          "400": {
            "value": "rgb(255, 201, 46)",
            "description": "400",
            "type": "other"
          },
          "500": {
            "value": "rgb(255, 190, 0)",
            "description": "500",
            "type": "other"
          },
          "600": {
            "value": "rgb(214, 160, 0)",
            "description": "600",
            "type": "other"
          },
          "700": {
            "value": "rgb(173, 129, 0)",
            "description": "700",
            "type": "other"
          },
          "800": {
            "value": "rgb(133, 99, 0)",
            "description": "800",
            "type": "other"
          },
          "900": {
            "value": "rgb(92, 68, 0)",
            "description": "900",
            "type": "other"
          }
        },
        "error": {
          "50": {
            "value": "rgb(255, 239, 239)",
            "description": "50",
            "type": "other"
          },
          "100": {
            "value": "rgb(255, 203, 202)",
            "description": "100",
            "type": "other"
          },
          "200": {
            "value": "rgb(255, 168, 166)",
            "description": "200",
            "type": "other"
          },
          "300": {
            "value": "rgb(255, 132, 130)",
            "description": "300",
            "type": "other"
          },
          "400": {
            "value": "rgb(255, 97, 93)",
            "description": "400 AAA dark text only",
            "type": "other"
          },
          "500": {
            "value": "rgb(231, 75, 72)",
            "description": "500",
            "type": "other"
          },
          "600": {
            "value": "rgb(197, 53, 50)",
            "description": "600",
            "type": "other"
          },
          "700": {
            "value": "rgb(163, 35, 32)",
            "description": "700",
            "type": "other"
          },
          "800": {
            "value": "rgb(129, 21, 18)",
            "description": "800",
            "type": "other"
          },
          "900": {
            "value": "rgb(95, 10, 8)",
            "description": "900",
            "type": "other"
          }
        }
      },
      "contrast": {
        "light": {
          "5": {
            "value": "rgba(255, 255, 255, 0.05)",
            "description": "5%",
            "type": "other"
          },
          "10": {
            "value": "rgba(255, 255, 255, 0.10)",
            "description": "10%",
            "type": "other"
          },
          "15": {
            "value": "rgba(255, 255, 255, 0.15)",
            "description": "15%",
            "type": "other"
          },
          "20": {
            "value": "rgba(255, 255, 255, 0.20)",
            "description": "20%",
            "type": "other"
          },
          "25": {
            "value": "rgba(255, 255, 255, 0.25)",
            "description": "25%",
            "type": "other"
          },
          "30": {
            "value": "rgba(255, 255, 255, 0.30)",
            "description": "30%",
            "type": "other"
          },
          "35": {
            "value": "rgba(255, 255, 255, 0.35)",
            "description": "35%",
            "type": "other"
          },
          "40": {
            "value": "rgba(255, 255, 255, 0.40)",
            "description": "40%",
            "type": "other"
          },
          "45": {
            "value": "rgba(255, 255, 255, 0.45)",
            "description": "45%",
            "type": "other"
          },
          "50": {
            "value": "rgba(255, 255, 255, 0.50)",
            "description": "50%",
            "type": "other"
          },
          "55": {
            "value": "rgba(255, 255, 255, 0.55)",
            "description": "55%",
            "type": "other"
          },
          "60": {
            "value": "rgba(255, 255, 255, 0.60)",
            "description": "60%",
            "type": "other"
          },
          "65": {
            "value": "rgba(255, 255, 255, 0.65)",
            "description": "65%",
            "type": "other"
          },
          "70": {
            "value": "rgba(255, 255, 255, 0.70)",
            "description": "70%",
            "type": "other"
          },
          "75": {
            "value": "rgba(255, 255, 255, 0.75)",
            "description": "75%",
            "type": "other"
          },
          "80": {
            "value": "rgba(255, 255, 255, 0.80)",
            "description": "80%",
            "type": "other"
          },
          "85": {
            "value": "rgba(255, 255, 255, 0.85)",
            "description": "85%",
            "type": "other"
          },
          "90": {
            "value": "rgba(255, 255, 255, 0.90)",
            "description": "90%",
            "type": "other"
          },
          "95": {
            "value": "rgba(255, 255, 255, 0.95)",
            "description": "95%",
            "type": "other"
          },
          "100": {
            "value": "rgba(255, 255, 255, 1.0)",
            "description": "100%",
            "type": "other"
          }
        },
        "dark": {
          "5": {
            "value": "rgba(0, 0, 0, 0.05)",
            "description": "5%",
            "type": "other"
          },
          "10": {
            "value": "rgba(0, 0, 0, 0.10)",
            "description": "10%",
            "type": "other"
          },
          "15": {
            "value": "rgba(0, 0, 0, 0.15)",
            "description": "15%",
            "type": "other"
          },
          "20": {
            "value": "rgba(0, 0, 0, 0.20)",
            "description": "20%",
            "type": "other"
          },
          "25": {
            "value": "rgba(0, 0, 0, 0.25)",
            "description": "25%",
            "type": "other"
          },
          "30": {
            "value": "rgba(0, 0, 0, 0.30)",
            "description": "30%",
            "type": "other"
          },
          "35": {
            "value": "rgba(0, 0, 0, 0.35)",
            "description": "35%",
            "type": "other"
          },
          "40": {
            "value": "rgba(0, 0, 0, 0.40)",
            "description": "40%",
            "type": "other"
          },
          "45": {
            "value": "rgba(0, 0, 0, 0.45)",
            "description": "45%",
            "type": "other"
          },
          "50": {
            "value": "rgba(0, 0, 0, 0.50)",
            "description": "50%",
            "type": "other"
          },
          "55": {
            "value": "rgba(0, 0, 0, 0.55)",
            "description": "55%",
            "type": "other"
          },
          "60": {
            "value": "rgba(0, 0, 0, 0.60)",
            "description": "60%",
            "type": "other"
          },
          "65": {
            "value": "rgba(0, 0, 0, 0.65)",
            "description": "65%",
            "type": "other"
          },
          "70": {
            "value": "rgba(0, 0, 0, 0.70)",
            "description": "70%",
            "type": "other"
          },
          "75": {
            "value": "rgba(0, 0, 0, 0.75)",
            "description": "75%",
            "type": "other"
          },
          "80": {
            "value": "rgba(0, 0, 0, 0.80)",
            "description": "80%",
            "type": "other"
          },
          "85": {
            "value": "rgba(0, 0, 0, 0.85)",
            "description": "85%",
            "type": "other"
          },
          "90": {
            "value": "rgba(0, 0, 0, 0.90)",
            "description": "90%",
            "type": "other"
          },
          "95": {
            "value": "rgba(0, 0, 0, 0.95)",
            "description": "95%",
            "type": "other"
          },
          "100": {
            "value": "rgba(0, 0, 0, 1.0)",
            "description": "100%",
            "type": "other"
          }
        }
      }
    },
    "content": {
      "size": {
        "base": {
          "value": "2",
          "type": "other"
        }
      },
      "spacing": {
        "base": {
          "value": "2",
          "type": "other"
        }
      }
    }
  },
  "size": {
    "base": {
      "value": "$scale.content.size.base",
      "type": "sizing"
    },
    "icon": {
      "xs": {
        "value": "$size.base * 8",
        "type": "sizing"
      },
      "sm": {
        "value": "$size.base * 10",
        "type": "sizing"
      },
      "md": {
        "value": "$size.base * 12",
        "type": "sizing"
      },
      "lg": {
        "value": "$size.base * 16",
        "type": "sizing"
      }
    }
  },
  "opacity": {
    "opacity-10": {
      "value": "10%",
      "type": "opacity"
    },
    "opacity-20": {
      "value": "20%",
      "type": "opacity"
    },
    "opacity-30": {
      "value": "30%",
      "type": "opacity"
    },
    "opacity-40": {
      "value": "40%",
      "type": "opacity"
    },
    "opacity-50": {
      "value": "50%",
      "type": "opacity"
    },
    "opacity-60": {
      "value": "60%",
      "type": "opacity"
    },
    "opacity-70": {
      "value": "70%",
      "type": "opacity"
    },
    "opacity-80": {
      "value": "80%",
      "type": "opacity"
    },
    "opacity-90": {
      "value": "90%",
      "type": "opacity"
    }
  }
};