export const config = {
    badge: {
        value: {
            position: "relative",
        },
        content: {
            value: {
                position: "absolute",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
                borderRadius: "64px",
                fontSize: "12px",
                userSelect: "none",
            },
            "-neutral": {
                value: {
                    backgroundColor: "$semanticColor.background.neutral.strong-rest",
                    color: "$semanticColor.text.inverse",
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
                    color: "$semanticColor.text.inverse",
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
            mode: {
                "-numbers": {
                    value: {
                        padding: "0 6.5px",
                        minWidth: "7px"
                    },
                    top: {
                        value: {
                            top: "-8px",
                        }
                    },
                    bottom: {
                        value: {
                            bottom: "-8px",
                        }
                    },
                    left: {
                        '1' : {
                            value: {
                                left: "-55%",
                            }
                        },   
                        '2' : {
                            value: {
                                left: "-75%",
                            }
                        },   
                        '3' : {
                            value: {
                                left: "-130%",
                            }
                        },   
                        '4' : {
                            value: {
                                left: "-130%",
                            }
                        },                           
                    },
                    right: {
                        '1' : {
                            value: {
                                right: "-55%",
                            }
                        },   
                        '2' : {
                            value: {
                                right: "-75%",
                            }
                        },   
                        '3' : {
                            value: {
                                right: "-100%",
                            }
                        },   
                        '4' : {
                            value: {
                                right: "-130%",
                            }
                        },        
                    },
                },
                "-dot": {
                    value: {
                        width: "8px",
                        height: "8px"
                    },
                    top: {
                        value: {
                            top: "-2px",
                        }
                    },
                    bottom: {
                        value: {
                            bottom: "-2px",
                        }
                    },
                    left: {
                        '1' : {
                            value: {
                                left: "-33%",
                            }
                        },   
                        '2' : {
                            value: {
                                left: "-33%",
                            }
                        },   
                        '3' : {
                            value: {
                                left: "-33%",
                            }
                        },          
                    },
                    right: {
                        '1' : {
                            value: {
                                right: "-33%",
                            }
                        },   
                        '2' : {
                            value: {
                                right: "-33%",
                            }
                        },   
                        '3' : {
                            value: {
                                right: "-33%",
                            }
                        },        
                    },
                },
            },
        },        
    },
};
