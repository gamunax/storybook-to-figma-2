export const config = {
    "calendar": {
        "header": {
            value: {
                display: "flex",
                flexFlow: "column",
                justifyContent: "center",   
            }
        },
        "hero": {
            "year": {
                value: { 
                  color: "var(--semanticColor-layer-neutral-01)",
                }
            },
            "month": {
                value: {
                  marginTop: "2px",
                  color: "var(--semanticColor-layer-neutral-01)",
                }
            },
            value: {
                height: "100px",
                display: "flex",
                flexFlow: "column nowrap",
                justifyContent: "start",
                padding: "16px 24px",
                userSelect: "none",
                background: "var(--semanticColor-background-brand-strong-rest)",
            }
        },
        "content": {
            value: {
                outline: "none",
            }
        },
        "controls": {
            value: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }
        },
        "controls > atlas-button > button": {
            states: {
                hover: {
                    value: {
                        backgroundColor: "unset",
                        color: "unset",
                        outlineWidth: "0",
                    }
                },
                focus: {
                    value: {
                        backgroundColor: "unset",
                        color: "unset",
                        outlineWidth: "0",
                    }
                },
                active: {
                    value: {
                        backgroundColor: "unset",
                        color: "unset",
                        outlineWidth: "0",
                    }
                },
            }
        },
        "spacer": {
            value: {
                flex: "1 1 auto",
            }
        },
        "button": {
            "previous": {
                value: {
                    padding: "14px 0",
                }
            },
            "next": {
                value: {
                    padding: "14px 0",
                }
            },
            "period": {
                value: {
                    minWidth: "0",
                    display: "flex",
                    alignItems: "center"
                }
            },
        },
        "table": {
            "header": {
                "divider": {
                    value: {
                        position: "relative",
                        height: "var(--var-calendar-header-divider-width)",
                        padding: "0"
                    }
                },
                "day": {
                    value: {
                        paddingTop: "6px",
                        paddingBottom: "6px",
                        color: "var(--semanticColor-text-disabled)",
                    }
                },
                value: {
                    border: "1px solid #0000"
                }
            },
            "header th": {
                value: {
                    textAlign: "center",
                }
            },
            "year": {
                value: {
                    padding: "0",
                    borderSpacing: "20px 8px"
                }
            },
            value: {
                borderSpacing: "2px 0px",
                width: "100%",
                padding: "0 8px"
            }
        },
        value: {
            display: "block",
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
}