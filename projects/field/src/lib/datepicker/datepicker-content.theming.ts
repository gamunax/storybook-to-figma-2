export const config = {
   "datepicker": {
      "content": {
         "touch": {
            value: {
               display: "block",
               maxHeight: "80vh",
               overflow: "auto",
               margin: "-24px",
            }
         },
         value: {
            display: "block",
            borderRadius: "2px",
            boxShadow: "0px 8px 8px rgba(0, 0, 0, 0.16)",
         }
      },
      "close-button": {
         value: {
            position: "absolute",
            top: "100%",
            left: "0",
            marginTop: "8px"
         }
      }
   },
   "var-calendar": {
    "description": "Used variables for calendar",
    "padding": {
      value: "24px",
    },
    "header": {
      "divider-width": {
        value: "1px",
      }
    },
    "arrow": {
      "size": {
        value: "5px"
      },
      "diabled-opacity": {
        value: "0.5"
      }
    },
    "prev": {
      "next": {
        "icon": {
          "border": {
            "width": {
              value: "2px"
            }
          },
          "margin": {
            value: "15.5px"
          }
        }
      }
    },
    "body": {
      "text": {
        "color": {
          value: "var(--semanticColor-text-default)",
        }
      },
      "label": {
        "padding-start": {
          value: "5%",
        },
        "side-padding": {
          value: "math.div(33%, 7)",
        }
      },
      "cell": {
        "min-size": {
          value: "32px"
        },
        "content-margin": {
          value: "5%",
        },
        "content-border-width": {
          value: "1px",
        },
        "content-size": {
          value: "100% - $var-calendar.body.cell.content-margin * 2",
        },
        "radius": {
          value: "999px"
        },
      },
      "preview": {
        "cell-border": {
          value: "none"
        }
      },
      "min-size": {
        value: "7 * $var-calendar.body.cell.min-size"
      },
    },
    "range": {
      "end": {
        "body": {
          "cell-size": {
            value: "$var-calendar.body.cell.content.size + $var-calendar.body.cell.content.margin"
          }
        }
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