export const config = {
    "calendar": {
        "body": {
            disabled: {
                value: {
                    cursor: "default",
                }
            },
            "disabled > .calendar-body-cell-content": {
                value: {
                    color: "var(--semanticColor-text-disabled)",
                }
            },
            label: {
                value: {
                    height: "0",
                    lineHeight: "0",
                    textAlign: "left",
                    paddingLeft: "var(--var-calendar-body-label-side-padding)",
                    paddingRight: "var(--var-calendar-body-label-side-padding)",
                }
            },
            "in-preview": {
                value: {
                    color: "var(--semanticColor-border-neutral)",
                    borderTop: "var(--var-calendar-body-preview-cell-border)",
                    borderBottom: "var(--var-calendar-body-preview-cell-border)",
                }
            },
            "input-separator": {
                value: {
                    borderColor: "transparent",
                }
            },
            selected: {
                value: {
                    background: "var(--semanticColor-background-brand-strong-rest)",
                    color: "var(--semanticColor-text-inverse)",
                }
            },
            today: {
                value: {
                    border: "1px solid var(--semanticColor-background-brand-strong-rest) !important",
                }
            },
            cell: {
                content: {
                    "focus-indicator": {
                        value: {
                            position: "absolute",
                        }
                    },
                    value: {
                        top: "1px",
                        // left: "var(--var-calendar-body-cell-content-margin)",
                        zIndex: "1",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxSizing: "border-box",
                        // width: "var(--var-calendar-body-cell-content-size)",
                        // height: "var(--var-calendar-body-cell-content-size)",
                        width: "95%",
                        height: "95%",
                        lineHeight: "0",
                        borderWidth: "var(--var-calendar-body-cell-content-border-width)",
                        borderStyle: "solid",
                        borderRadius: "var(--var-calendar-body-cell-radius)",
                        borderColor: "transparent",
                    }
                },
                value: {
                    position: "relative",
                    // height: "0",
                    lineHeight: "0",
                    textAlign: "center",
                    outline: "none",
                    cursor: "pointer",
                    width: "36px",
                    height: "40px",
                },
                preview: {
                    value: {
                        content: "close-quote",
                        position: "absolute",
                        top: "var(--var-calendar-body-cell-content-margin)",
                        left: "0",
                        zIndex: "0",
                        boxSizing: "border-box",
                        height: "var(--var-calendar-body-cell-content-size)",
                        width: "100%",
                        borderTop: "var(--var-calendar-body-preview-cell-border)",
                        borderBottom: "var(--var-calendar-body-preview-cell-border)",
                        borderLeft: "var(--var-calendar-body-preview-cell-border)",
                        borderRight: "var(--var-calendar-body-preview-cell-border)",
                    }
                },
                states: {
                    // before: {
                    //     value: {
                    //         content: "close-quote",
                    //         position: "absolute",
                    //         top: "var(--var-calendar-body-cell-content-margin)",
                    //         left: "0",
                    //         zIndex: "0",
                    //         boxSizing: "border-box",
                    //         height: "var(--var-calendar-body-cell-content-size)",
                    //         width: "100%",
                    //         borderTop: "var(--var-calendar-body-preview-cell-border)",
                    //         borderBottom: "var(--var-calendar-body-preview-cell-border)",
                    //         borderLeft: "var(--var-calendar-body-preview-cell-border)",
                    //         borderRight: "var(--var-calendar-body-preview-cell-border)",
                    //     }
                    // },
                    // after: {
                    //     value: {
                    //         content: "close-quote",
                    //         position: "absolute",
                    //         top: "var(--var-calendar-body-cell-content-margin)",
                    //         left: "0",
                    //         zIndex: "0",
                    //         boxSizing: "border-box",
                    //         height: "var(--var-calendar-body-cell-content-size)",
                    //         width: "100%",
                    //         borderTop: "var(--var-calendar-body-preview-cell-border)",
                    //         borderBottom: "var(--var-calendar-body-preview-cell-border)",
                    //         borderLeft: "var(--var-calendar-body-preview-cell-border)",
                    //         borderRight: "var(--var-calendar-body-preview-cell-border)",
                    //     }
                    // },
                }
            },
            "preview-start": {
                states: {
                    after: {
                        value: {
                            left: "var(--var-calendar-body-cell-content-margin)",
                            width: "var(--var-calendar-range-end-body-cell-size)",
                            borderTopLeftRadius: "var(--var-calendar-body-cell-radius)",
                            borderBottomLeftRadius: "var(--var-calendar-body-cell-radius)",
                        }
                    }
                },
                value: {
                    borderLeft: "var(--var-calendar-body-preview-cell-border)",
                }
            },
            "preview-end": {
                value: {
                    borderRight: "var(--var-calendar-body-preview-cell-border)",
                }
            },
            "range-start": {
                states: {
                    after: {
                        value: {
                            left: "var(--var-calendar-body-cell-content-margin)",
                            width: "var(--var-calendar-range-end-body-cell-size)",
                            borderTopLeftRadius: "var(--var-calendar-body-cell-radius)",
                            borderBottomLeftRadius: "var(--var-calendar-body-cell-radius)",
                        }
                    }
                }
            },
            "comparison-start": {
                states: {
                    after: {
                        value: {
                            left: "var(--var-calendar-body-cell-content-margin)",
                            width: "var(--var-calendar-range-end-body-cell-size)",
                            borderTopLeftRadius: "var(--var-calendar-body-cell-radius)",
                            borderBottomLeftRadius: "var(--var-calendar-body-cell-radius)",
                        }
                    }
                }
            },
            "range-start:not(calendar-body-in-comparison-range)": {
                states: {
                    before: {
                        value: {
                            left: "var(--var-calendar-body-cell-content-margin)",
                            width: "var(--var-calendar-range-end-body-cell-size)",
                            borderTopLeftRadius: "var(--var-calendar-body-cell-radius)",
                            borderBottomLeftRadius: "var(--var-calendar-body-cell-radius)",
                        }
                    }
                }
            },
            "comparison-start:not(calendar-body-comparison-bridge-start)": {
                states: {
                    before: {
                        value: {
                            left: "var(--var-calendar-body-cell-content-margin)",
                            width: "var(--var-calendar-range-end-body-cell-size)",
                            borderTopLeftRadius: "var(--var-calendar-body-cell-radius)",
                            borderBottomLeftRadius: "var(--var-calendar-body-cell-radius)",
                        }
                    }
                }
            },
            value: {
                // minWidth: "var(--var-calendar-body-min-size)",
                color: "var(--var-calendar-body-text-color)",
            }
        }
    }
}