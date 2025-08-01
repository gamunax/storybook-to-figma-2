// Foundation Grandparent theme config

export const foundationGrandparentConfig = {
  "colors": {
    "primary": {
      "main": {
        "description": "Main color used by most components (buttons, form controls)",
        "value": "{colorPalette.blue.700}",
        "type": "color"
      },
      "dark": {
        "description": "Alternative dark shade",
        "value": "{colorPalette.blue.800}",
        "type": "color"
      },
      "light": {
        "description": "Alternative light shade",
        "value": "{colorPalette.blue.100}",
        "type": "color"
      },
      "contrast": {
        "description": "Color that keeps a contrast ratio above AA when XX.main is used as a bg. color",
        "value": "rgba($colorPalette.contrast.light, 1.0)",
        "type": "color"
      },
      "states": {
        "contained-hover-background": {
          "description": "Hover state for buttons",
          "value": "{colorPalette.blue.600}",
          "type": "color"
        },
        "contained-pressed-background": {
          "description": "Pressed state for buttons",
          "value": "{colorPalette.blue.500}",
          "type": "color"
        },
        "contained-focus": {
          "description": "Focus state outline for buttons, inputs, dropdown",
          "value": "{colorPalette.blue.200}",
          "type": "color"
        },
        "contained-disabled-background": {
          "value": "rgba($colors.primary.main, 0.4)",
          "description": "Disabled state for buttons, inputs, dropdown",
          "type": "color"
        },
        "outlined-hover-background": {
          "value": "rgba($colors.primary.main, 0.08)",
          "description": "Fill background color for outlined & text variant components in hover state (Button, etc)",
          "type": "color"
        },
        "outlined-resting-border": {
          "value": "rgba($colors.primary.main, 0.5)",
          "description": "Used for outlined variant components in resting state (Button, Chip, etc)",
          "type": "color"
        }
      }
    },
    "secondary": {
      "main": {
        "description": "Main color used by most components (buttons, form controls)",
        "value": "{colorPalette.pink.700}",
        "type": "color"
      },
      "dark": {
        "description": "Alternative dark shade",
        "value": "{colorPalette.pink.800}",
        "type": "color"
      },
      "light": {
        "description": "Alternative light shade",
        "value": "{colorPalette.pink.100}",
        "type": "color"
      },
      "contrast": {
        "description": "Color that keeps a contrast ratio above AA when XX.main is used as a bg. color",
        "value": "rgba($colorPalette.contrast.light, 1.0)",
        "type": "color"
      },
      "states": {
        "contained-hover-background": {
          "description": "Hover state for buttons",
          "value": "{colorPalette.pink.600}",
          "type": "color"
        },
        "contained-pressed-background": {
          "description": "Pressed state for buttons",
          "value": "{colorPalette.pink.500}",
          "type": "color"
        },
        "contained-focus": {
          "description": "Focus state outline for buttons, inputs, dropdown",
          "value": "{colorPalette.pink.100}",
          "type": "color"
        },
        "contained-disabled-background": {
          "value": "rgba($colors.secondary.main, 0.4)",
          "description": "Disabled state for buttons, inputs, dropdown",
          "type": "color"
        },
        "outlined-hover-background": {
          "value": "rgba($colors.secondary.main, 0.08)",
          "description": "Fill background color for outlined & text variant components in hover state (Button, etc)",
          "type": "color"
        },
        "outlined-resting-border": {
          "value": "rgba($colors.secondary.main, 0.5)",
          "description": "Used for outlined variant components in resting state (Button, Chip, etc)",
          "type": "color"
        }
      }
    },
    "default": {
      "main": {
        "description": "Main color used by most components (buttons, form controls)",
        "value": "rgba($colorPalette.contrast.dark, 0.54)",
        "type": "color"
      },
      "dark": {
        "description": "Alternative dark shade",
        "value": "rgba($colorPalette.contrast.dark, 0.87)",
        "type": "color"
      },
      "light": {
        "description": "Alternative light shade",
        "value": "rgba($colorPalette.contrast.dark, 0.04)",
        "type": "color"
      },
      "contrast": {
        "description": "Color that keeps a contrast ratio above AA when XX.main is used as a bg. color",
        "value": "rgba($colorPalette.contrast.light, 1.0)",
        "type": "color"
      },
      "states": {
        "contained-hover-background": {
          "description": "Hover state for buttons",
          "value": "rgba($colorPalette.contrast.dark, 0.40)",
          "type": "color"
        },
        "contained-pressed-background": {
          "description": "Pressed state for buttons",
          "value": "rgba($colorPalette.contrast.dark, 0.40)",
          "type": "color"
        },
        "contained-focus": {
          "description": "Focus state outline for buttons, inputs, dropdown",
          "value": "{colorPalette.gray.900}",
          "type": "color"
        },
        "contained-disabled-background": {
          "value": "rgba($colorPalette.contrast.dark, 0.12)",
          "description": "Disabled state for buttons, inputs, dropdown",
          "type": "color"
        },
        "outlined-hover-background": {
          "value": "rgba($colorPalette.contrast.dark, 0.04)",
          "description": "Fill background color for outlined & text variant components in hover state (Button, etc)",
          "type": "color"
        },
        "outlined-resting-border": {
          "value": "rgba($colorPalette.contrast.dark, 0.54)",
          "description": "Used for outlined variant components in resting state (Button, Chip, etc)",
          "type": "color"
        }
      }
    },
    "text": {
      "primary": {
        "value": "rgba($colorPalette.contrast.dark, 0.87)",
        "description": "Text primary",
        "type": "color"
      },
      "secondary": {
        "value": "rgba($colorPalette.contrast.dark, 0.6)",
        "description": "Text secondary",
        "type": "color"
      },
      "disabled": {
        "value": "rgba($colorPalette.contrast.dark, 0.38)",
        "description": "Text disabled",
        "type": "color"
      }
    },
    "background": {
      "main": {
        "description": "Background main",
        "value": "{colorPalette.gray.50}",
        "type": "color"
      },
      "dark": {
        "description": "Background dark",
        "value": "{colorPalette.gray.200}",
        "type": "color"
      },
      "light": {
        "description": "Background light",
        "value": "rgba($colorPalette.contrast.light, 1.0)",
        "type": "color"
      },
      "surface": {
        "value": "rgba($colorPalette.contrast.light, 1.0)",
        "type": "color"
      }
    },
    "other": {
      "divider": {
        "value": "rgba($colorPalette.contrast.dark, 0.12)",
        "description": "Divider fill color",
        "type": "color"
      },
      "outline-border": {
        "value": "rgba($colorPalette.contrast.dark, 0.23)",
        "description": "Border style for outlined variant components in resting state (Text Field, Select, Chips, etc)",
        "type": "color"
      },
      "backdrop-overlay": {
        "value": "rgba($colorPalette.contrast.dark, 0.5)",
        "description": "Backdrop overlay style",
        "type": "color"
      },
      "filled-input-background": {
        "value": "rgba($colorPalette.contrast.dark, 0.09)",
        "description": "Fill background for standard variant Text Field & Select",
        "type": "color"
      },
      "standard-input-line": {
        "value": "rgba($colorPalette.contrast.dark, 0.42)",
        "description": "Border style for standard variant Text Field & Select",
        "type": "color"
      },
      "snackbar-background": {
        "description": "Snackbar background color",
        "value": "#3b3b3b",
        "type": "color"
      },
      "rating-active": {
        "value": "#ffc043",
        "description": "Active state color for Rating component",
        "type": "color"
      }
    },
    "error": {
      "main": {
        "description": "Used for alert component",
        "value": "#F44336",
        "type": "color"
      },
      "dark": {
        "description": "Alternative dark shade",
        "value": "#E31B0C",
        "type": "color"
      },
      "light": {
        "description": "Alternative light shade",
        "value": "#F88078",
        "type": "color"
      },
      "contrast": {
        "description": "Color that keeps a contrast ratio above AA when XX.main is used as a bg. color",
        "value": "#ffffff",
        "type": "color"
      },
      "states": {
        "contained-hover-background": {
          "description": "Fill background color for contained variant components hover in state (Button, FAB, etc)",
          "value": "#AB2F26",
          "type": "color"
        },
        "outlined-hover-background": {
          "value": "rgba($colors.error.main, 0.08)",
          "description": "Fill background color for outlined & text variant components in hover state (Button, etc)",
          "type": "color"
        },
        "outlined-resting-border": {
          "value": "rgba($colors.error.main, 0.5)",
          "description": "Used for outlined variant components in resting state (Button, Chip, etc)",
          "type": "color"
        }
      },
      "alert": {
        "content": {
          "description": "Text color for the error Alert component",
          "value": "#621B16",
          "type": "color"
        },
        "background": {
          "description": "Background color for the error Alert component",
          "value": "#FEECEB",
          "type": "color"
        }
      }
    },
    "info": {
      "main": {
        "description": "Used for alert component",
        "value": "#2196F3",
        "type": "color"
      },
      "dark": {
        "description": "Alternative dark shade",
        "value": "#0B79D0",
        "type": "color"
      },
      "light": {
        "description": "Alternative light shade",
        "value": "#64B6F7",
        "type": "color"
      },
      "contrast": {
        "description": "Color that keeps a contrast ratio above AA when XX.main is used as a bg. color",
        "value": "#ffffff",
        "type": "color"
      },
      "states": {
        "contained-hover-background": {
          "description": "Fill background color for contained variant components hover in state (Button, FAB, etc)",
          "value": "#1769AA",
          "type": "color"
        },
        "outlined-hover-background": {
          "value": "rgba($colors.info.main, 0.08)",
          "description": "Fill background color for outlined & text variant components in hover state (Button, etc)",
          "type": "color"
        },
        "outlined-resting-border": {
          "value": "rgba($colors.info.main, 0.5)",
          "description": "Used for outlined variant components in resting state (Button, Chip, etc)",
          "type": "color"
        }
      },
      "alert": {
        "content": {
          "description": "Text color for the info Alert component",
          "value": "#0D3C61",
          "type": "color"
        },
        "background": {
          "description": "Background color for the info Alert component",
          "value": "#E9F4FE",
          "type": "color"
        }
      }
    },
    "warning": {
      "main": {
        "description": "Used for alert component",
        "value": "#ED6C02",
        "type": "color"
      },
      "dark": {
        "description": "Alternative dark shade",
        "value": "#C77700",
        "type": "color"
      },
      "light": {
        "description": "Alternative light shade",
        "value": "#FFB547",
        "type": "color"
      },
      "contrast": {
        "description": "Color that keeps a contrast ratio above AA when XX.main is used as a bg. color",
        "value": "#ffffff",
        "type": "color"
      },
      "states": {
        "contained-hover-background": {
          "description": "Fill background color for contained variant components hover in state (Button, FAB, etc)",
          "value": "#A64C01",
          "type": "color"
        },
        "outlined-hover-background": {
          "value": "rgba($colors.warning.main, 0.08)",
          "description": "Fill background color for outlined & text variant components in hover state (Button, etc)",
          "type": "color"
        },
        "outlined-resting-border": {
          "value": "rgba($colors.warning.main, 0.5)",
          "description": "Used for outlined variant components in resting state (Button, Chip, etc)",
          "type": "color"
        }
      },
      "alert": {
        "content": {
          "description": "Text color for the warning Alert component",
          "value": "#5F2B01",
          "type": "color"
        },
        "background": {
          "description": "Background color for the warning Alert component",
          "value": "#FDF0E6",
          "type": "color"
        }
      }
    },
    "success": {
      "main": {
        "description": "Used for alert component",
        "value": "#4CAF50",
        "type": "color"
      },
      "dark": {
        "description": "Alternative dark shade",
        "value": "#3B873E",
        "type": "color"
      },
      "light": {
        "description": "Alternative light shade",
        "value": "#7BC67E",
        "type": "color"
      },
      "contrast": {
        "description": "Color that keeps a contrast ratio above AA when XX.main is used as a bg. color",
        "value": "#ffffff",
        "type": "color"
      },
      "states": {
        "contained-hover-background": {
          "description": "Fill background color for contained variant components hover in state (Button, FAB, etc)",
          "value": "#357B38",
          "type": "color"
        },
        "outlined-hover-background": {
          "value": "rgba($colors.success.main, 0.08)",
          "description": "Fill background color for outlined & text variant components in hover state (Button, etc)",
          "type": "color"
        },
        "outlined-resting-border": {
          "value": "rgba($colors.success.main, 0.5)",
          "description": "Used for outlined variant components in resting state (Button, Chip, etc)",
          "type": "color"
        }
      },
      "alert": {
        "content": {
          "description": "Text color for the success Alert component",
          "value": "#1E4620",
          "type": "color"
        },
        "background": {
          "description": "Background color for the success Alert component",
          "value": "#EDF7ED",
          "type": "color"
        }
      }
    }
  },
  "lineHeights": {
    "0": {
      "value": "12",
      "type": "lineHeights"
    },
    "1": {
      "value": "16",
      "type": "lineHeights"
    },
    "2": {
      "value": "20",
      "type": "lineHeights"
    },
    "3": {
      "value": "24",
      "type": "lineHeights"
    },
    "4": {
      "value": "28",
      "type": "lineHeights"
    },
    "5": {
      "value": "32",
      "type": "lineHeights"
    },
    "6": {
      "value": "40",
      "type": "lineHeights"
    },
    "7": {
      "value": "48",
      "type": "lineHeights"
    },
    "8": {
      "value": "56",
      "type": "lineHeights"
    },
    "9": {
      "value": "64",
      "type": "lineHeights"
    },
    "10": {
      "value": "72",
      "type": "lineHeights"
    },
    "11": {
      "value": "80",
      "type": "lineHeights"
    },
    "12": {
      "value": "120",
      "type": "lineHeights"
    },
    "1-lg": {
      "value": "18",
      "type": "lineHeights"
    }
  },
  "typography": {
    "desktop": {
      "body": {
        "1": {
          "value": {
            "fontFamily": "$fontFamilies.font-2",
            "fontWeight": "$fontWeights.400",
            "lineHeight": "$lineHeights.4",
            "fontSize": "$fontSizes.5",
            "letterSpacing": "0",
            "paragraphSpacing": "0"
          },
          "description": "Body 1",
          "type": "typography"
        },
        "2": {
          "value": {
            "fontFamily": "$fontFamilies.font-2",
            "fontWeight": "$fontWeights.400",
            "lineHeight": "$lineHeights.3",
            "fontSize": "$fontSizes.4",
            "letterSpacing": "0",
            "paragraphSpacing": "0"
          },
          "description": "Body 2 (Default)",
          "type": "typography"
        },
        "3": {
          "value": {
            "fontFamily": "$fontFamilies.font-2",
            "fontWeight": "$fontWeights.400",
            "lineHeight": "$lineHeights.2",
            "fontSize": "$fontSizes.3",
            "letterSpacing": "0",
            "paragraphSpacing": "0"
          },
          "description": "Body 3",
          "type": "typography"
        }
      },
      "display": {
        "1": {
          "value": {
            "fontFamily": "$fontFamilies.font-1",
            "fontWeight": "$fontWeights.700",
            "lineHeight": "$lineHeights.12",
            "fontSize": "$fontSizes.13",
            "letterSpacing": "0",
            "paragraphSpacing": "0"
          },
          "description": "Display 1",
          "type": "typography"
        }
      },
      "heading": {
        "1": {
          "value": {
            "fontFamily": "$fontFamilies.font-1",
            "fontWeight": "$fontWeights.700",
            "lineHeight": "$lineHeights.11",
            "fontSize": "$fontSizes.12",
            "letterSpacing": "0",
            "paragraphSpacing": "0"
          },
          "description": "Heading 1",
          "type": "typography"
        },
        "2": {
          "value": {
            "fontFamily": "$fontFamilies.font-1",
            "fontWeight": "$fontWeights.700",
            "lineHeight": "$lineHeights.10",
            "fontSize": "$fontSizes.11",
            "letterSpacing": "0",
            "paragraphSpacing": "0"
          },
          "description": "Heading 2",
          "type": "typography"
        },
        "3": {
          "value": {
            "fontFamily": "$fontFamilies.font-1",
            "fontWeight": "$fontWeights.700",
            "lineHeight": "$lineHeights.9",
            "fontSize": "$fontSizes.10",
            "letterSpacing": "0",
            "paragraphSpacing": "0"
          },
          "description": "Heading 3",
          "type": "typography"
        },
        "4": {
          "value": {
            "fontFamily": "$fontFamilies.font-1",
            "fontWeight": "$fontWeights.700",
            "lineHeight": "$lineHeights.7",
            "fontSize": "$fontSizes.9",
            "letterSpacing": "0",
            "paragraphSpacing": "0"
          },
          "description": "Heading 4",
          "type": "typography"
        },
        "5": {
          "value": {
            "fontFamily": "$fontFamilies.font-1",
            "fontWeight": "$fontWeights.700",
            "lineHeight": "$lineHeights.6",
            "fontSize": "$fontSizes.8",
            "letterSpacing": "0",
            "paragraphSpacing": "0"
          },
          "description": "Heading 5",
          "type": "typography"
        },
        "6": {
          "value": {
            "fontFamily": "$fontFamilies.font-1",
            "fontWeight": "$fontWeights.700",
            "lineHeight": "$lineHeights.5",
            "fontSize": "$fontSizes.7",
            "letterSpacing": "0",
            "paragraphSpacing": "0"
          },
          "description": "Heading 6",
          "type": "typography"
        }
      },
      "title": {
        "1": {
          "value": {
            "fontFamily": "$fontFamilies.font-1",
            "fontWeight": "$fontWeights.400",
            "lineHeight": "$lineHeights.6",
            "fontSize": "$fontSizes.8",
            "letterSpacing": "0",
            "paragraphSpacing": "0"
          },
          "description": "Title 1",
          "type": "typography"
        },
        "2": {
          "value": {
            "fontFamily": "$fontFamilies.font-1",
            "fontWeight": "$fontWeights.400",
            "lineHeight": "$lineHeights.5",
            "fontSize": "$fontSizes.7",
            "letterSpacing": "0",
            "paragraphSpacing": "0"
          },
          "description": "Title 2",
          "type": "typography"
        },
        "3": {
          "value": {
            "fontFamily": "$fontFamilies.font-2",
            "fontWeight": "$fontWeights.600",
            "lineHeight": "$lineHeights.4",
            "fontSize": "$fontSizes.5",
            "letterSpacing": "0",
            "paragraphSpacing": "0"
          },
          "description": "Title 3",
          "type": "typography"
        },
        "4": {
          "value": {
            "fontFamily": "$fontFamilies.font-2",
            "fontWeight": "$fontWeights.600",
            "lineHeight": "$lineHeights.3",
            "fontSize": "$fontSizes.4",
            "letterSpacing": "0",
            "paragraphSpacing": "0"
          },
          "description": "Title 4",
          "type": "typography"
        },
        "5": {
          "value": {
            "fontFamily": "$fontFamilies.font-2",
            "fontWeight": "$fontWeights.600",
            "lineHeight": "$lineHeights.2",
            "fontSize": "$fontSizes.3",
            "letterSpacing": "0",
            "paragraphSpacing": "0"
          },
          "description": "Title 5",
          "type": "typography"
        }
      }
    },
    "mobile": {
      "display": {
        "1": {
          "value": {
            "fontFamily": "$fontFamilies.font-1",
            "fontWeight": "$fontWeights.700",
            "lineHeight": "$lineHeights.11",
            "fontSize": "$fontSizes.12",
            "letterSpacing": "0",
            "paragraphSpacing": "0"
          },
          "description": "Display",
          "type": "typography"
        }
      },
      "heading": {
        "1": {
          "value": {
            "fontFamily": "$fontFamilies.font-1",
            "fontWeight": "$fontWeights.700",
            "lineHeight": "$lineHeights.8",
            "fontSize": "$fontSizes.10",
            "letterSpacing": "0",
            "paragraphSpacing": "0"
          },
          "description": "Heading 1",
          "type": "typography"
        },
        "2": {
          "value": {
            "fontFamily": "$fontFamilies.font-1",
            "fontWeight": "$fontWeights.700",
            "lineHeight": "$lineHeights.7",
            "fontSize": "$fontSizes.9",
            "letterSpacing": "0",
            "paragraphSpacing": "0"
          },
          "description": "Heading 2",
          "type": "typography"
        },
        "3": {
          "value": {
            "fontFamily": "$fontFamilies.font-1",
            "fontWeight": "$fontWeights.700",
            "lineHeight": "$lineHeights.6",
            "fontSize": "$fontSizes.8",
            "letterSpacing": "0",
            "paragraphSpacing": "0"
          },
          "description": "Heading 3",
          "type": "typography"
        },
        "4": {
          "value": {
            "fontFamily": "$fontFamilies.font-1",
            "fontWeight": "$fontWeights.700",
            "lineHeight": "$lineHeights.5",
            "fontSize": "$fontSizes.7-lg",
            "letterSpacing": "0",
            "paragraphSpacing": "0"
          },
          "description": "Heading 4",
          "type": "typography"
        },
        "5": {
          "value": {
            "fontFamily": "$fontFamilies.font-1",
            "fontWeight": "$fontWeights.700",
            "lineHeight": "$lineHeights.5",
            "fontSize": "$fontSizes.7",
            "letterSpacing": "0",
            "paragraphSpacing": "0"
          },
          "description": "Heading 5",
          "type": "typography"
        },
        "6": {
          "value": {
            "fontFamily": "$fontFamilies.font-1",
            "fontWeight": "$fontWeights.700",
            "lineHeight": "$lineHeights.4",
            "fontSize": "$fontSizes.5",
            "letterSpacing": "0",
            "paragraphSpacing": "0"
          },
          "description": "Heading 6",
          "type": "typography"
        }
      },
      "title": {
        "1": {
          "value": {
            "fontFamily": "$fontFamilies.font-1",
            "fontWeight": "$fontWeights.400",
            "lineHeight": "$lineHeights.5",
            "fontSize": "$fontSizes.7",
            "letterSpacing": "0",
            "paragraphSpacing": "0"
          },
          "description": "Title 1",
          "type": "typography"
        },
        "2": {
          "value": {
            "fontFamily": "$fontFamilies.font-1",
            "fontWeight": "$fontWeights.400",
            "lineHeight": "$lineHeights.4",
            "fontSize": "$fontSizes.5",
            "letterSpacing": "0",
            "paragraphSpacing": "0"
          },
          "description": "Title 2",
          "type": "typography"
        },
        "3": {
          "value": {
            "fontFamily": "$fontFamilies.font-2",
            "fontWeight": "$fontWeights.600",
            "lineHeight": "$lineHeights.3",
            "fontSize": "$fontSizes.4",
            "letterSpacing": "0",
            "paragraphSpacing": "0"
          },
          "description": "Title 3",
          "type": "typography"
        },
        "4": {
          "value": {
            "fontFamily": "$fontFamilies.font-2",
            "fontWeight": "$fontWeights.600",
            "lineHeight": "$lineHeights.2",
            "fontSize": "$fontSizes.3",
            "letterSpacing": "0",
            "paragraphSpacing": "0"
          },
          "description": "Title 4",
          "type": "typography"
        },
        "5": {
          "value": {
            "fontFamily": "$fontFamilies.font-2",
            "fontWeight": "$fontWeights.600",
            "lineHeight": "$lineHeights.1-lg",
            "fontSize": "$fontSizes.2",
            "letterSpacing": "0",
            "paragraphSpacing": "0"
          },
          "description": "Title 5",
          "type": "typography"
        }
      },
      "body": {
        "1": {
          "value": {
            "fontFamily": "$fontFamilies.font-2",
            "fontWeight": "$fontWeights.400",
            "lineHeight": "$lineHeights.3",
            "fontSize": "$fontSizes.4",
            "letterSpacing": "0",
            "paragraphSpacing": "0"
          },
          "description": "Body 1",
          "type": "typography"
        },
        "2": {
          "value": {
            "fontFamily": "$fontFamilies.font-2",
            "fontWeight": "$fontWeights.400",
            "lineHeight": "$lineHeights.2",
            "fontSize": "$fontSizes.3",
            "letterSpacing": "0",
            "paragraphSpacing": "0"
          },
          "description": "Body 2 (Default)",
          "type": "typography"
        },
        "3": {
          "value": {
            "fontFamily": "$fontFamilies.font-2",
            "fontWeight": "$fontWeights.400",
            "lineHeight": "$lineHeights.1-lg",
            "fontSize": "$fontSizes.2",
            "letterSpacing": "0",
            "paragraphSpacing": "0"
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
            "fontFamily": "$fontFamilies.font-2",
            "fontWeight": "$fontWeights.500",
            "lineHeight": "$lineHeights.3",
            "fontSize": "$fontSizes.4",
            "letterSpacing": "0",
            "paragraphSpacing": "0"
          },
          "description": "Button 1",
          "type": "typography"
        },
        "2": {
          "value": {
            "fontFamily": "$fontFamilies.font-2",
            "fontWeight": "$fontWeights.500",
            "lineHeight": "$lineHeights.2",
            "fontSize": "$fontSizes.3",
            "letterSpacing": "0",
            "paragraphSpacing": "0"
          },
          "description": "Button 2",
          "type": "typography"
        },
        "3": {
          "value": {
            "fontFamily": "$fontFamilies.font-2",
            "fontWeight": "$fontWeights.500",
            "lineHeight": "$lineHeights.1",
            "fontSize": "$fontSizes.1",
            "letterSpacing": "0",
            "paragraphSpacing": "0"
          },
          "description": "Button 3",
          "type": "typography"
        }
      },
      "tooltip": {
        "1": {
          "value": {
            "fontFamily": "$fontFamilies.font-2",
            "fontWeight": "$fontWeights.500",
            "lineHeight": "$lineHeights.2",
            "fontSize": "$fontSizes.1",
            "letterSpacing": "0",
            "paragraphSpacing": "0"
          },
          "description": "Tool Tip",
          "type": "typography"
        }
      },
      "input": {
        "1": {
          "value": {
            "fontFamily": "$fontFamilies.font-2",
            "fontWeight": "$fontWeights.400",
            "lineHeight": "$lineHeights.3",
            "fontSize": "$fontSizes.4",
            "letterSpacing": "0",
            "paragraphSpacing": "0"
          },
          "description": "Input Text",
          "type": "typography"
        },
        "2": {
          "value": {
            "fontFamily": "$fontFamilies.font-2",
            "fontWeight": "$fontWeights.400",
            "lineHeight": "$lineHeights.0",
            "fontSize": "$fontSizes.1",
            "letterSpacing": "0",
            "paragraphSpacing": "0"
          },
          "description": "Input Label",
          "type": "typography"
        },
        "3": {
          "value": {
            "fontFamily": "$fontFamilies.font-2",
            "fontWeight": "$fontWeights.400",
            "lineHeight": "$lineHeights.0",
            "fontSize": "$fontSizes.1",
            "letterSpacing": "0",
            "paragraphSpacing": "0"
          },
          "description": "Helper Text",
          "type": "typography"
        }
      },
      "table": {
        "1": {
          "value": {
            "fontFamily": "$fontFamilies.font-2",
            "fontWeight": "$fontWeights.500",
            "lineHeight": "$lineHeights.3",
            "fontSize": "$fontSizes.3",
            "letterSpacing": "0",
            "paragraphSpacing": "0"
          },
          "description": "Table Header",
          "type": "typography"
        }
      }
    },
    "footnote": {
      "1": {
        "value": {
          "fontFamily": "$fontFamilies.font-2",
          "fontWeight": "$fontWeights.400",
          "lineHeight": "$lineHeights.2",
          "fontSize": "$fontSizes.3",
          "letterSpacing": "0",
          "paragraphSpacing": "0"
        },
        "description": "Footnote 1",
        "type": "typography"
      }
    },
    "caption": {
      "1": {
        "value": {
          "fontFamily": "$fontFamilies.font-2",
          "fontWeight": "$fontWeights.400",
          "lineHeight": "$lineHeights.1",
          "fontSize": "$fontSizes.2",
          "letterSpacing": "0",
          "paragraphSpacing": "0"
        },
        "description": "Caption 1",
        "type": "typography"
      },
      "2": {
        "value": {
          "fontFamily": "$fontFamilies.font-2",
          "fontWeight": "$fontWeights.500",
          "lineHeight": "$lineHeights.1",
          "fontSize": "$fontSizes.1",
          "letterSpacing": "0",
          "paragraphSpacing": "0"
        },
        "description": "Caption 2",
        "type": "typography"
      }
    }
  },
  "fontSizes": {
    "1": {
      "value": "12",
      "type": "fontSizes"
    },
    "2": {
      "value": "13",
      "type": "fontSizes"
    },
    "3": {
      "value": "14",
      "type": "fontSizes"
    },
    "4": {
      "value": "16",
      "type": "fontSizes"
    },
    "5": {
      "value": "18",
      "type": "fontSizes"
    },
    "6": {
      "value": "20",
      "type": "fontSizes"
    },
    "7": {
      "value": "24",
      "type": "fontSizes"
    },
    "8": {
      "value": "32",
      "type": "fontSizes"
    },
    "9": {
      "value": "40",
      "type": "fontSizes"
    },
    "10": {
      "value": "48",
      "type": "fontSizes"
    },
    "11": {
      "value": "56",
      "type": "fontSizes"
    },
    "12": {
      "value": "64",
      "type": "fontSizes"
    },
    "13": {
      "value": "96",
      "type": "fontSizes"
    },
    "7-lg": {
      "value": "28",
      "type": "fontSizes"
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
  "fontFamilies": {
    "font-1": {
      "value": "MMC Display",
      "type": "fontFamilies"
    },
    "font-2": {
      "value": "Noto Sans",
      "type": "fontFamilies"
    }
  },
  "borderRadius": {
    "hard": {
      "value": "0",
      "type": "borderRadius"
    },
    "soft": {
      "value": "4",
      "type": "borderRadius"
    },
    "round": {
      "value": "30",
      "type": "borderRadius"
    }
  },
  "borderWidth": {
    "0": {
      "value": "0",
      "type": "borderWidth"
    },
    "1": {
      "value": "1",
      "type": "borderWidth"
    },
    "2": {
      "value": "2",
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
          "color": "$colorPalette.contrast.dark"
        },
        "type": "boxShadow"
      },
      "raised": {
        "value": {
          "x": "0",
          "y": "$scale.content.size.base * 2",
          "blur": "$scale.content.size.base * 2",
          "spread": "0",
          "color": "rgba($colorPalette.contrast.dark, 0.16)"
        },
        "type": "boxShadow"
      },
      "elevated": {
        "value": {
          "x": "0",
          "y": "$scale.content.size.base * 4",
          "blur": "$scale.content.size.base * 4",
          "spread": "0",
          "color": "rgba($colorPalette.contrast.dark, 0.16)"
        },
        "type": "boxShadow"
      },
      "floating": {
        "value": {
          "y": "$scale.content.size.base * 8",
          "blur": "$scale.content.size.base * 8",
          "spread": "0",
          "x": "0",
          "color": "rgba($colorPalette.contrast.dark, 0.16)"
        },
        "type": "boxShadow"
      },
      "lifted": {
        "value": {
          "x": "0",
          "y": "$scale.content.size.base * 12",
          "blur": "$scale.content.size.base * 12",
          "spread": "0",
          "color": "rgba($colorPalette.contrast.dark, 0.16)"
        },
        "type": "boxShadow"
      }
    }
  },
  "scale": {
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
  "colorPalette": {
    "blue": {
      "50": {
        "value": "rgba(240, 250, 255, 1.0)",
        "description": "50",
        "type": "other"
      },
      "100": {
        "value": "rgba(199, 237, 255, 1.0)",
        "description": "100",
        "type": "other"
      },
      "200": {
        "value": "rgba(159, 224, 255, 1.0)",
        "description": "200",
        "type": "other"
      },
      "300": {
        "value": "rgba(118, 211, 255, 1.0)",
        "description": "300",
        "type": "other"
      },
      "400": {
        "value": "rgba(59, 184, 240, 1.0)",
        "description": "400",
        "type": "other"
      },
      "500": {
        "value": "rgba(0, 157, 224, 1.0)",
        "description": "500 AA large text only",
        "type": "other"
      },
      "600": {
        "value": "rgba(0, 101, 172, 1.0)",
        "description": "600 AA",
        "type": "other"
      },
      "700": {
        "value": "rgba(0, 44, 119, 1.0)",
        "description": "700 AAA",
        "type": "other"
      },
      "800": {
        "value": "rgba(0, 31, 82, 1.0)",
        "description": "800 AAA",
        "type": "other"
      },
      "900": {
        "value": "rgba(0, 21, 56, 1.0)",
        "description": "900 AAA",
        "type": "other"
      }
    },
    "teal": {
      "50": {
        "value": "rgba(240, 253, 255, 1.0)",
        "description": "50",
        "type": "other"
      },
      "100": {
        "value": "rgba(212, 241, 246, 1.0)",
        "description": "100",
        "type": "other"
      },
      "200": {
        "value": "rgba(184, 229, 237, 1.0)",
        "description": "200",
        "type": "other"
      },
      "300": {
        "value": "rgba(156, 217, 228, 1.0)",
        "description": "300",
        "type": "other"
      },
      "400": {
        "value": "rgba(78, 168, 194, 1.0)",
        "description": "400 AAA dark text only",
        "type": "other"
      },
      "500": {
        "value": "rgba(0, 119, 160, 1.0)",
        "description": "500 AA",
        "type": "other"
      },
      "600": {
        "value": "rgba(0, 98, 134, 1.0)",
        "description": "600 AA",
        "type": "other"
      },
      "700": {
        "value": "rgba(0, 76, 108, 1.0)",
        "description": "700 AAA",
        "type": "other"
      },
      "800": {
        "value": "rgba(0, 54, 77, 1.0)",
        "description": "800 AAA",
        "type": "other"
      },
      "900": {
        "value": "rgba(0, 32, 46, 1.0)",
        "description": "900 AAA",
        "type": "other"
      }
    },
    "turquoise": {
      "50": {
        "value": "rgba(245, 255, 253, 1.0)",
        "description": "50",
        "type": "other"
      },
      "100": {
        "value": "rgba(214, 243, 237, 1.0)",
        "description": "100",
        "type": "other"
      },
      "200": {
        "value": "rgba(183, 231, 222, 1.0)",
        "description": "200",
        "type": "other"
      },
      "300": {
        "value": "rgba(152, 219, 206, 1.0)",
        "description": "300",
        "type": "other"
      },
      "400": {
        "value": "rgba(76, 185, 175, 1.0)",
        "description": "400 AAA dark text only",
        "type": "other"
      },
      "500": {
        "value": "rgba(0, 150, 143, 1.0)",
        "description": "500 AA large text only",
        "type": "other"
      },
      "600": {
        "value": "rgba(0, 122, 118, 1.0)",
        "description": "600 AA",
        "type": "other"
      },
      "700": {
        "value": "rgba(0, 94, 93, 1.0)",
        "description": "700 AAA",
        "type": "other"
      },
      "800": {
        "value": "rgba(0, 65, 64, 1.0)",
        "description": "800 AAA",
        "type": "other"
      },
      "900": {
        "value": "rgba(0, 36, 35, 1.0)",
        "description": "900 AAA",
        "type": "other"
      }
    },
    "green": {
      "50": {
        "value": "rgba(243, 255, 245, 1.0)",
        "description": "50",
        "type": "other"
      },
      "100": {
        "value": "rgba(214, 243, 237, 1.0)",
        "description": "100",
        "type": "other"
      },
      "200": {
        "value": "rgba(183, 231, 222, 1.0)",
        "description": "200",
        "type": "other"
      },
      "300": {
        "value": "rgba(152, 219, 206, 1.0)",
        "description": "300",
        "type": "other"
      },
      "400": {
        "value": "rgba(87, 198, 122, 1.0)",
        "description": "400 AAA dark text only",
        "type": "other"
      },
      "500": {
        "value": "rgba(0, 172, 65, 1.0)",
        "description": "500 AA large text only",
        "type": "other"
      },
      "600": {
        "value": "rgba(20, 133, 61, 1.0)",
        "description": "600 AA",
        "type": "other"
      },
      "700": {
        "value": "rgba(39, 93, 56, 1.0)",
        "description": "700 AAA",
        "type": "other"
      },
      "800": {
        "value": "rgba(27, 65, 39, 1.0)",
        "description": "800 AAA",
        "type": "other"
      },
      "900": {
        "value": "rgba(15, 36, 21, 1.0)",
        "description": "900 AAA",
        "type": "other"
      }
    },
    "pink": {
      "50": {
        "value": "rgba(255, 248, 249, 1.0)",
        "description": "50",
        "type": "other"
      },
      "100": {
        "value": "rgba(253, 223, 229, 1.0)",
        "description": "100",
        "type": "other"
      },
      "200": {
        "value": "rgba(251, 198, 210, 1.0)",
        "description": "200",
        "type": "other"
      },
      "300": {
        "value": "rgba(248, 172, 190, 1.0)",
        "description": "300",
        "type": "other"
      },
      "400": {
        "value": "rgba(243, 117, 165, 1.0)",
        "description": "400 AAA dark text only",
        "type": "other"
      },
      "500": {
        "value": "rgba(238, 61, 139, 1.0)",
        "description": "500 AA large text only",
        "type": "other"
      },
      "600": {
        "value": "rgba(208, 32, 115, 1.0)",
        "description": "600 AA",
        "type": "other"
      },
      "700": {
        "value": "rgba(178, 2, 91, 1.0)",
        "description": "700 AA",
        "type": "other"
      },
      "800": {
        "value": "rgba(120, 2, 61, 1.0)",
        "description": "800 AAA",
        "type": "other"
      },
      "900": {
        "value": "rgba(61, 1, 31, 1.0)",
        "description": "900 AAA",
        "type": "other"
      }
    },
    "purple": {
      "50": {
        "value": "rgba(249, 247, 251, 1.0)",
        "description": "50",
        "type": "other"
      },
      "100": {
        "value": "rgba(234, 224, 242, 1.0)",
        "description": "100",
        "type": "other"
      },
      "200": {
        "value": "rgba(219, 202, 233, 1.0)",
        "description": "200",
        "type": "other"
      },
      "300": {
        "value": "rgba(204, 179, 224, 1.0)",
        "description": "300",
        "type": "other"
      },
      "400": {
        "value": "rgba(167, 125, 200, 1.0)",
        "description": "400 AA large text only",
        "type": "other"
      },
      "500": {
        "value": "rgba(130, 70, 175, 1.0)",
        "description": "500 AA",
        "type": "other"
      },
      "600": {
        "value": "rgba(100, 60, 153, 1.0)",
        "description": "600 AAA",
        "type": "other"
      },
      "700": {
        "value": "rgba(70, 50, 130, 1.0)",
        "description": "700 AA",
        "type": "other"
      },
      "800": {
        "value": "rgba(48, 34, 89, 1.0)",
        "description": "800 AAA",
        "type": "other"
      },
      "900": {
        "value": "rgba(26, 18, 48, 1.0)",
        "description": "900 AAA",
        "type": "other"
      }
    },
    "blueGray": {
      "50": {
        "value": "rgba(248, 250, 252, 1.0)",
        "description": "50",
        "type": "other"
      },
      "100": {
        "value": "rgba(229, 237, 244, 1.0)",
        "description": "100",
        "type": "other"
      },
      "200": {
        "value": "rgba(209, 224, 236, 1.0)",
        "description": "200",
        "type": "other"
      },
      "300": {
        "value": "rgba(190, 211, 228, 1.0)",
        "description": "300",
        "type": "other"
      },
      "400": {
        "value": "rgba(162, 183, 205, 1.0)",
        "description": "400 AAA dark text only",
        "type": "other"
      },
      "500": {
        "value": "rgba(128, 150, 178, 1.0)",
        "description": "500 AA large text only",
        "type": "other"
      },
      "600": {
        "value": "rgba(98, 119, 152, 1.0)",
        "description": "600 AAA",
        "type": "other"
      },
      "700": {
        "value": "rgba(78, 98, 135, 1.0)",
        "description": "700 AA",
        "type": "other"
      },
      "800": {
        "value": "rgba(53, 66, 91, 1.0)",
        "description": "800 AAA",
        "type": "other"
      },
      "900": {
        "value": "rgba(27, 34, 47, 1.0)",
        "description": "900 AAA",
        "type": "other"
      }
    },
    "gray": {
      "50": {
        "value": "rgba(244, 244, 244, 1.0)",
        "description": "50",
        "type": "other"
      },
      "100": {
        "value": "rgba(235, 235, 235, 1.0)",
        "description": "100",
        "type": "other"
      },
      "200": {
        "value": "rgba(227, 227, 227, 1.0)",
        "description": "200",
        "type": "other"
      },
      "300": {
        "value": "rgba(218, 218, 218, 1.0)",
        "description": "300",
        "type": "other"
      },
      "400": {
        "value": "rgba(179, 179, 179, 1.0)",
        "description": "400 AAA dark text only",
        "type": "other"
      },
      "500": {
        "value": "rgba(148, 148, 148, 1.0)",
        "description": "500 AA large text only",
        "type": "other"
      },
      "600": {
        "value": "rgba(118, 118, 118, 1.0)",
        "description": "600 AAA",
        "type": "other"
      },
      "700": {
        "value": "rgba(86, 86, 86, 1.0)",
        "description": "700 AA",
        "type": "other"
      },
      "800": {
        "value": "rgba(59, 59, 59, 1.0)",
        "description": "800 AAA",
        "type": "other"
      },
      "900": {
        "value": "rgba(32, 32, 32, 1.0)",
        "description": "900 AAA",
        "type": "other"
      }
    },
    "contrast": {
      "light": {
        "value": "#ffffff",
        "description": "White",
        "type": "other"
      },
      "dark": {
        "value": "#000000",
        "type": "other"
      }
    }
  }
};