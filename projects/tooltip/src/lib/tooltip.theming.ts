export const config = {
    atlas: {
        'tooltip': {
            value: {
                margin: '20px 12px',
                maxWidth: '300px',
                minHeight: '28px',
                backgroundColor: '$semanticColor.background.tooltip',
                borderRadius: '2px',
                color: '$semanticColor.text.inverse',
                overflow: 'visible',
                padding: '4px 8px',
                textOverflow: 'ellipsis',
            },
            panel: {
                value: {
                    pointerEvents: 'none !important',
                },
                'top .atlas-tooltip::after': {
                    value: {
                        position: 'absolute',
                        content: '\" \"',
                        top: '100%',
                        left: '50%',
                        marginLeft: '-6px',
                        width: '0',
                        height: '0',
                        borderStyle: 'solid',
                        borderWidth: '6px',
                        borderColor: '$semanticColor.layer.screen transparent transparent transparent',

                    }
                },
                'bottom .atlas-tooltip::before': {
                    value: {
                        position: 'absolute',
                        content: '\" \"',
                        bottom: '100%',
                        left: '50%',
                        marginLeft: '-6px',
                        width: '0',
                        height: '0',
                        borderStyle: 'solid',
                        borderWidth: '6px',
                        borderColor: 'transparent transparent $semanticColor.layer.screen transparent',
                    }
                },
                'right .atlas-tooltip::after': {
                    value: {
                        position: 'absolute',
                        content: '\" \"',
                        top: '50%',
                        right: '100%',
                        marginTop: '-6px',
                        width: '0',
                        height: '0',
                        borderStyle: 'solid',
                        borderWidth: '6px',
                        borderColor: 'transparent $semanticColor.layer.screen transparent transparent',
                    }
                },
                'left .atlas-tooltip::after': {
                    value: {
                        position: 'absolute',
                        content: '\" \"',
                        top: '50%',
                        left: '100%',
                        marginTop: '-6px',
                        width: '0',
                        height: '0',
                        borderStyle: 'solid',
                        borderWidth: '6px',
                        borderColor: 'transparent transparent transparent $semanticColor.layer.screen',
                    }
                }
            },
            handset: {
                value: {
                    margin: '14px',
                    paddingLeft: '16px',
                    paddingRight: '16px',
                }
            },
            'no-arrow': {
                value: {
                    margin: '20px 12px',
                    maxWidth: '300px',
                    minHeight: '28px',
                    backgroundColor: '$semanticColor.background.tooltip',
                    borderRadius: '2px',
                    color: '$semanticColor.text.inverse',
                    overflow: 'visible',
                    padding: '4px 8px',
                    textOverflow: 'ellipsis',
                },
            }
        },

    },
};