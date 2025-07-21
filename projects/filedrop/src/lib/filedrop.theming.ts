export const config = {
    atlas: {
        filedrop: {
            value: {
                alignItems: "center",
                background: "var(--semanticColor-background-neutral)",
                border: "2px dashed var(--semanticColor-border-neutral-strong)",
                display: "flex",
                flexFlow: "column nowrap",
                justifyContent: "center",
                margin: "0",
                minHeight: "248px",
                padding: "24px 0",
                position: "relative",
                transition: "200ms all ease-in-out",
            },
            "file-title": {
                value: {
                    margin: "0 14px",
                    flex: "1",
                    whiteSpace: "nowrap",
                }
            },
            "-standard-width": {
                value: {
                    maxWidth: "580px",
                    minWidth: "380px",
                }
            },
            "-full-width": {
                value: {
                    maxWidth: '100%',
                    minWidth: "0",
                }
            },
            "-success": {
                value: {
                    background: "var(--semanticColor-background-neutral) !important",
                    border: "2px dashed var(--semanticColor-background-success-strong-rest) !important",
                }
            },
            "-failure": {
                value: {
                    background: "var(--semanticColor-background-neutral) !important",
                    border: "2px dashed var(--semanticColor-background-danger-strong-rest) !important",
                }
            },
            input: {               
                value: {
                    height: "100%",
                    left: "0",
                    opacity: "0",
                    position: "absolute",
                    top: "0",
                    width: "100%",
                    zIndex: "2"
                }
            },
            "input:hover": {               
                value: {
                    cursor: "pointer",
                }
            },
            content: {
                uploaded: {
                    value: {
                        display: "flex",
                        alignItems: "center",
                        zIndex: "2",
                        width: "calc(100% - 24px)",
                        flexWrap: "nowrap",
                        padding: "0 24px",
                    }
                },
                value: {
                    color: "var(--semanticColor-text-default)",
                    padding: "16px 0",    
                }                
            },
            progress: {
                value: {
                    minWidth: "164px",
                },
                name: {
                    value: {
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        width: "200px",
                    }
                }   
            },
            error: {
                message: {
                    value: {
                        float: "left",
                        color: "var(--semanticColor-background-danger-strong-rest) !important",
                    }
                }
            },
            cancel: {
                value: {
                    zIndex: "100",
                }
            },
            button: {
                value: {
                    position: "relative",
                    zIndex: "3"
                }
            }
        },
        fileover: {
            value: {
                background: "var(--semanticColor-background-brand-rest) !important",
                border: "2px dashed var(--semanticColor-border-brand-strong)",
                color: "var(--semanticColor-text-default) !important",
                transition: "200ms all ease-in-out !important",
            }
        },
        "fileover > atlas-button": {
            value: {
                display: "none",            
            }
        }
    }
}