export const config = {
    atlas: {
        stepper: {
            value: {
                display: 'flex',
                padding: '0',
            }
        },
        step: {
            value: {
                display: 'flex',
                alignItems: 'center',
            },
            content: {
                value: {
                    display: 'contents',
                    cursor: 'default',
                }
            },
            avatar: {
                value:{
                    width: '24px !important',
                    height: '24px !important',
                    marginLeft: '8px',
                    marginRight: '8px',
                }
            },
            font: {
                content: {
                    value: {
                        marginRight: '8px',
                    },
                    active: {
                        value: {
                            color: 'var(--semanticColor-text-default)',
                            opacity: '87%'
                        }
                    },
                    default: {
                        value: {
                            color: 'var(--semanticColor-text-default)',
                            opacity: '60%'
                        }
                    }  
                }
            }
        },
        "step:not(:last-child)": {
            value: {
                flex: '1',
            },
            states: {
                type: 'state',
                after: {
                    value: {
                        content: 'close-quote',
                        height: '1px',
                        backgroundColor: 'rgba(0, 0, 0, 0.23)',
                        flex: '1',
                        margin: '0'
                    }
                }
            }
        }
    },
};