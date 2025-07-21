export const config = {
    "progress-bar": {
        container: {
            "value": {
               display: "grid",   
            },
            size: {
                small: {
                    "value": {
                        width: "25%",
                        fontSize: "12px",
                    }
                },
                medium: {
                    "value": {
                        width: "50%",
                        fontSize: "14px",
                    }
                },
                large: {
                    "value": {
                        width: "75%",
                        fontSize: "16px",
                    }
                },
                huge: {
                    "value": {
                        width: "100%",
                        fontSize: "18px",
                    }
                },
            },
            label: {
                "value": {
                    color: "var(--semanticColor-background-neutral-strong-rest)",
                    marginLeft: "auto",
                    marginRight: "auto",
                }
            }   
        },
        inner: {
            "value" :{
                maxWidth: "100%",
                transition: "width 2s",
                position: "relative",
                zIndex: "1",
                height: "8px",
            }, 
            brand: {
                "value": {
                    background: "var(--semanticColor-background-brand-strong-rest)",
                }
            },
            neutral: {
                "value": {
                    background: "var(--semanticColor-background-neutral-strong-rest)",
                }
            },
            success: {
                "value": {
                    background: "var(--semanticColor-background-success-strong-rest)",
                }
            },
            danger: {
                "value": {
                    background: "var(--semanticColor-background-danger-strong-rest)",
                }
            }
        },
        "value": {
            position: "relative",
            width: "100%",
            height: "8px",
        },
        states: {
            after: {
                type: "state",
                description: "state to fill the rest of the progress bar",
                "value": {
                    background: "var(--semanticColor-background-neutral-rest)",  
                    opacity: "60%",
                    width: "100%",
                    height: "8px",
                    content: "close-quote",
                    position: "absolute",
                    top: "0",
                }
            }
        }

    },  
    "circular-bar": {
        container: {
           "value": {
               display: "grid",
               placeItems: "center"
           } 
        },
        progress: {
            states: {
                before: {
                    type: "state",
                    description: "before state for circular progress bar",
                    "value": {
                        content: "close-quote",
                        position: "absolute",
                        height: "80%",
                        width: "80%",
                        backgroundColor: "var(--semanticColor-text-inverse)",
                        borderRadius: "50%"
                    }
                }
            },
            "value": {
                position: "relative",
                borderRadius: "50%",
                display: "grid",
                placeItems: "center",
                animation: "10s rotate linear"
            },
            size: {
                small: {
                    "value": {
                        width: "40px",
                        height: "40px",
                        fontSize: "12px",
                    }
                },
                medium: {
                    "value": {
                        width: "140px",
                        height: "140px",
                        fontSize: "14px",
                    }
                },
                large: {
                    "value": {
                        width: "200px",
                        height: "200px",
                        fontSize: "16px",
                    }
                },
                huge: {
                    "value": {
                        width: "250px",
                        height: "250px",
                        fontSize: "18px",
                    }
                },
            },
            color: {
                brand: {
                    "value": {
                        background: "var(--semanticColor-background-brand-strong-rest)",
                    }
                },
                neutral: {
                    "value": {
                        background: "var(--semanticColor-background-neutral-strong-rest)",
                    }
                },
                success: {
                    "value": {
                        background: "var(--semanticColor-background-success-strong-rest)",
                    }
                },
                danger: {
                    "value": {
                        background: "var(--semanticColor-background-danger-strong-rest)",
                    }
                },
                primary: { // support backwards compatibility deprecated
                    "value": {
                        background: "var(--semanticColor-background-brand-strong-rest)",
                    }
                },
                secondary: { // support backwards compatibility deprecated
                    "value": {
                        background: "var(--semanticColor-background-brand-strong-rest)",
                    }
                },
            }
        },
        percent: {
            container: {
                "value": {
                    position: "relative",
                },
                brand: {
                    "value": {
                        background: "var(--semanticColor-background-brand-strong-rest)",
                    }
                },
                neutral: {
                    "value": {
                        background: "var(--semanticColor-background-neutral-strong-rest)",
                    }
                },
                success: {
                    "value": {
                        background: "var(--semanticColor-background-success-strong-rest)",
                    }
                },
                danger: {
                    "value": {
                        background: "var(--semanticColor-background-danger-strong-rest)",
                    }
                }
            }
        }
    } 
}