export const config = {
   "datepicker": {
      "input": {
          value: {
            font: "inherit",
            background: "transparent",
            color: "currentColor",
            border: "none",
            outline: "none",
            padding: "0",
            margin: "0",
            width: "100%",
            maxWidth: "100%",
            verticalAlign: "bottom",
            textAlign: "inherit",
            "-webkit-appearance": "none",
          }
      }
   },
   "var-datepicker": {
      "description": "used variables for datepicker component",
      "swift": {
        "ease": {
          "out": {
            "duration": {
              value: " 400ms"
            },
            "timing": {
              "function": {
                value: "cubic-bezier(0.25, 0.8, 0.25, 1)"
              }
            },
            value: "all $var-datepicker-swift-ease-out-duration $var-datepicker-swift-ease-out-timing-function"
          }
        }
      },
      "date": {
        "range": {
          "input": {
            "separator": {
              "spacing": {
                value: "4px"
              }
            },
            "part": {
              "max-width": {
                value: " calc(50% - #{$date-range-input-separator-spacing})"
              }
            }
          }
        }
      },
      "calendar": {
        "padding": {
          value: "8px"
        }
      },
      "non-touch": {
        "calendar": {
          "cell-size": {
            value: "40px"
          },
          "width": {
            value: "310px"
          },
          "height": {
            value: "418px"
          }
        }
      },
      "touch": {
        "landscape": {
          "width": {
            value: "64vh"
          },
          "height": {
            value: "80vh"
          }
        },
        "portrait": {
          "width": {
            value: "80vh"
          },
          "height": {
            value: "100vh"
          },
        },
        "min-width": {
          value: "250px"
        },
        "min-height": {
          value: "312px"
        },
        "max-width": {
          value: "750px"
        },
        "max-height": {
          value: "788px"
        }
      }
    }
}