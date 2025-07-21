export const config = {
    atlas: {
        breadcrumb: {
            value: {
                display: 'flex',
                flexFlow: 'row nowrap',
                alignItems: 'center',
            },
            item: {
                '-active': {
                    value: {
                        color: '$semanticColor.text.secondary',
                    }
                },
                '-inactive': {
                    value: {
                        color: '$semanticColor.text.disabled',
                        cursor: 'pointer',
                    }
                },
                '-disabled': {
                    'wrapper': {
                        value: {
                            cursor: 'not-allowed',
                        }   
                    },
                    value: {
                        color: '$semanticColor.text.disabled',
                        pointerEvents: 'none',
                    }
                },
                '-disabled > atlas-icon': {
                    value: {
                        color: '$semanticColor.background.disabled',
                    }
                },
                '-disabled > atlas-link > atlas-icon': {
                    value: {
                        color: '$semanticColor.background.disabled',
                    }
                },
                '-disabled > atlas-link > a': {
                    value: {
                        color: '$semanticColor.text.disabled',
                    }
                },
                '-hide': {
                    value: {
                        display: 'none'
                    }
                },
                '-collapsed': {
                    value: { 
                        backgroundColor: '$semanticColor.background.neutral.soft-hover',
                        borderRadius: '2px',
                        color: '$semanticColor-background-neutral-strong-rest',
                        cursor: 'pointer',
                        margin: '0 4px',
                        padding: '0 5px',
                        display: 'flex',
                        width: '24px',
                    }
                },    
                '-collapsed > atlas-icon': {
                    value: {
                        width: '14px',
                    }
                },  
                "link": {
                    "underline": {
                        "brand": {
                            value: {
                                color: "$semanticColor.background.brand.strong-rest",
                                textDecoration: "underline"
                            },
                            states: {
                                hover: {
                                    value: {
                                        cursor: "pointer",
                                        textDecoration: "none"
                                    }
                                }
                            }
                        },
                        "neutral": {
                            value: {
                                color: "rgba(86,86,86,1)",
                                textDecoration: "underline"
                              },
                              states: {
                                  hover: {
                                      value: {
                                          cursor: "pointer",
                                          textDecoration: "none"
                                      }
                                  }
                              }
                        }
                    },
                    "brand": {
                      value: {
                          color: "$semanticColor.background.brand.strong-rest",
                          textDecoration: "none"
                      },
                      states: {
                          hover: {
                              value: {
                                  cursor: "pointer",
                                  textDecoration: "underline"
                              }
                          }
                      }
                  },
                  "neutral": {
                      value: {
                          color: "rgba(86,86,86,1)",
                          textDecoration: "none"
                        },
                        states: {
                            hover: {
                                value: {
                                    cursor: "pointer",
                                    textDecoration: "underline"
                                }
                            }
                        }
                  }
                },  
                value: {
                    alignItems: 'center',
                    display: 'flex',
                    flexFlow: 'row nowrap',
                    userSelect: 'none',
                },
                separator: {
                    value: {
                        padding: '0 7px',
                        color: '$semanticColor.background.neutral.strong-rest'
                    }
                },
                'separator > atlas-icon': {
                    value: {
                        padding: '1px 0px',
                        margin: '0 -4px',
                        color: '$semanticColor.background.neutral.strong-rest',
                        width: '18px',
                        verticalAlign: 'bottom',
                    }
                }                            
            },
            'item > atlas-icon' : {
                value: {
                    marginRight: '3px',
                    width: '18px',
                    verticalAlign: 'bottom',
                }
            },
                   
        },       
    }    
}