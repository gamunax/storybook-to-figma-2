export const config = {
    atlas: {
       navigation: {
            title: {
                neutral: {
                    value: {
                        color: '$semanticColor.text.secondary'
                    }
                },
                brand: {
                    value: {
                        color: '$semanticColor.text.secondary'
                    }
                },
            },
            container: {
                value: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 12px'
                }
            },
            label: {
                "bottom-active": {
                    neutral: {
                        value: {
                            color: '$semanticColor.background.neutral.strog.rest',
                        }
                    },
                    brand: {
                        value: {
                            borderColor: '$semanticColor.background.brand.strog.rest'
                        }
                    },
                    value: {
                        borderBottom: '2px solid',
                        paddingBottom: '9px'
                    }
                },
                neutral: {
                    value: {
                        color: '$semanticColor.background.neutral.strog.rest',
                    }
                },
                brand: {
                    value: {
                        color: '$semanticColor.background.brand.strog.rest',
                    }
                },
                value: {
                    cursor: 'pointer',
                    backgroundColor: 'transparent',
                    border: 'none',
                    
                    textDecoration: 'none',
                    transition: 'color 0.3s',
                    padding: '0'
                },
            },
            megamenu: {
                open: {
                    value: {
                        display: 'flex'
                    }
                },
                value: {
                    display: 'none',
                    position: 'absolute',
                    top: '100%',
                    left: '0',
                    zIndex: '1000',
                    marginTop: '2px',
                    background: '$semanticColor.text.inverse',
                }
            },
            "custom-area": {
                neutral: {
                    value: {
                        color: '$semanticColor.text.default',
                    }
                },
                brand: {
                    value: {
                        color: '$semanticColor.text.default',
                    }
                },
                value: {
                    width: '290px',
                    height: '100%',
                    padding: '40px', 
                    background: 'var(--colors-gradient-blue-teal)'
                }
            },
            content: {
                title: {
                    value: {
                        paddingBottom: '8px',
                    }
                },
                area: {
                    value: {
                        minWidth: '250px',
                        padding: '24px',
                        display: 'flex',
                        flexWrap: 'wrap',
                        flexDirection: 'row',
                        gap: '24px',
                    }
                }
            }
       }

    },
};