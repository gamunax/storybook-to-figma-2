export const config = {
  slider: {
   "description": "used variables for slider styling",
   "thickness": {
        value: "48px",
   },
   "min-size": { 
       value: " 128px"
   },
   "padding": { 
       value: " 8px"
   }, 
   "track-thickness": {
       value: "2px"
   },
   "thumb-size": {
       value: "12px"
   },
   "thumb-arrow-gap": {
       value: "12px"
   },
   "thumb-label-size": {
       value: "28px"
   },
   "tick-size": {
       value: "2px"
   },
   "focus-ring-size": {
       value: "32px"
   },
   "ease-out-duration": {
        value: "400ms"
   },
   "ease-out-timing-function": {
       value: "cubic-bezier(0.25, 0.8, 0.25, 1)"
   }
  },
  atlas: {
      slider: {
          "wrapper": {
              value: {
                position: "absolute", 
              }
          },
          "track": {
            "wrapper": {
                "-disabled": {
                    value: {
                        backgroundColor: "#B3B3B3",
                    }
                },
                value: {
                    position: "absolute",
                    top: "0",
                    left: "0",
                    overflow: "hidden",
                    borderRadius: "2px",
                }
            },  
            "fill": {
                "-disabled": {
                    value: {
                        backgroundColor: "transparent",
                    }
                },
                "brand": {
                    value: {
                        backgroundColor: "var(--semanticColor-background-brand-strong-rest)",
                    }
                },
                value: {
                    position: "absolute",
                    transformOrigin: "0 0",
                    transition: "transform var(--slider-ease-out-duration) var(--slider-ease-out-timing-function), background-color var(--slider-ease-out-duration) var(--slider-ease-out-timing-function)",
                }
            },
            "background": {
                "-left": {
                    value: {
                        transformOrigin: "0 0"
                    }
                },
                "-right": {
                    value: {
                        transformOrigin: "100% 100%"
                    }
                },
                "-disabled": {
                    value: {
                        backgroundColor: "transparent",
                        position: "absolute",
                        zIndex: "2",
                    }
                },
                "brand": {
                    value: {
                        background: "var(--semanticColor-background-disabled)",
                    }
                },
                value: {
                    transition: "transform var(--slider-ease-out-duration) var(--slider-ease-out-timing-function), background-color var(--slider-ease-out-duration) var(--slider-ease-out-timing-function)",
                }
            }
          },
          "ticks": {
              "container": {
                  value: {
                    position: "absolute",
                    left: "0",
                    top: "0",
                    overflow: "hidden", 
                  }
              },
              "-disabled": {
                value: {
                    backgroundColor: "transparent",
                }
              },
              value: {
                backgroundRepeat: "repeat",
                backgroundClip: "content-box",
                boxSizing: "border-box",
                opacity: "0",
                transition: "opacity var(--slider-ease-out-duration) var(--slider-ease-out-timing-function)",
              }
          },
          "thumb": {
              "container": {
                value: {
                    position: "absolute",
                    zIndex: "1",
                    transition: "transform var(--slider-ease-out-duration) var(--slider-ease-out-timing-function)",
                }
              },
              "label": {
                  "text": {
                      value: {
                        zIndex: "1",
                        opacity: "0",
                        transition:" opacity var(--slider-ease-out-duration) var(--slider-ease-out-timing-function)",
                        color: "var(--semanticColor-background-neutral-strong-rest)",
                      }
                  },
                  value: {
                    display: "none",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "absolute",
                    width: "var(--slider-thumb-label-size)",
                    height: "var(--slider-thumb-label-size)",
                    borderRadius: "50%",
                    transition: "transform var(--slider-ease-out-duration) var(--slider-ease-out-timing-function), border-radius  var(--slider-ease-out-duration) var(--slider-ease-out-timing-function), background-color  var(--slider-ease-out-duration) var(--slider-ease-out-timing-function)",
                  }
              },
              "-disabled": {
                value: {
                    backgroundColor: "#B3B3B3",
                    boxShadow: "none"
                }
              },
              "brand": {
                  value: {
                    backgroundColor: "var(--semanticColor-background-brand-strong-rest)",
                  }
              },
              value: {
                position: "absolute",
                right: "calc(-1 * (var(--slider-thumb-size) / 2))",
                bottom: "calc(-1 * (var(--slider-thumb-size) / 2))",
                boxSizing: "border-box",
                width: "var(--slider-thumb-size)",
                height: "var(--slider-thumb-size)",
                borderRadius: "50%",
                transition: "transform var(--slider-ease-out-duration) var(--slider-ease-out-timing-function), background-color var(--slider-ease-out-duration) var(--slider-ease-out-timing-function), box-shadow var(--slider-ease-out-duration) var(--slider-ease-out-timing-function), border-color var(--slider-ease-out-duration) var(--slider-ease-out-timing-function)",
              }
          },
          "focus": {
              "ring": {
                  value: {
                    position: "absolute",
                    width: "var(--slider-focus-ring-size)",
                    height: "var(--slider-focus-ring-size)",
                    borderRadius: "50%",
                    transform: "scale(0)",
                    opacity: "0",
                    transition: "transform var(--slider-ease-out-duration) var(--slider-ease-out-timing-function), background-color var(--slider-ease-out-duration) var(--slider-ease-out-timing-function), opacity var(--slider-ease-out-duration) var(--slider-ease-out-timing-function)"
                  }
              }
          },
          "-horizontal": {
              value: {
                height: "var(--slider-thickness)",
                minWidth: "var(--slider-min-size)",
                width: "100%"
              }
          },
          "-vertical": {
              value: {
                width: "var(--slider-thickness)",
                minHeight: "var(--slider-min-size)",
              }
          },
          value: {
            display: "inline-block",
            position: "relative",
            boxSizing: "border-box",
            padding: "var(--slider-padding)",
            outline: "none",
            verticalAlign: "middle",
          }
      },
  }
};
