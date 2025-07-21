export const config = {
    avatar: {
        type: 'variant',
        description: 'hello world',
        neutral: {
            type: 'variant',
            description: 'hello world',
            "value": {
                backgroundColor: '$semanticColor.background.neutral.strong-rest',
                color: '$semanticColor.text.inverse',
            }
        },
        brand: {
            type: 'variant',
            description: 'hello world',
            "value": {
                backgroundColor: '$semanticColor.background.brand.strong-rest',
                color: '$semanticColor.text.inverse',
            }
        },
        danger: {
            type: 'variant',
            description: 'hello world',
            "value": {
                backgroundColor: '$semanticColor.background.danger.strong-rest',
                color: '$semanticColor.text.inverse',
            }
        },
        caution: {
            type: 'variant',
            description: 'hello world',
            "value": {
                backgroundColor: '$semanticColor.background.caution.strong-rest',
                color: '$semanticColor.text.inverse',
            }
        },
        success: {
            type: 'variant',
            description: 'hello world',
            "value": {
                backgroundColor: '$semanticColor.background.success.strong-rest',
                color: '$semanticColor.text.inverse',
            }
        },
        info: {
            type: 'variant',
            description: 'hello world',
            "value": {
                backgroundColor: '$semanticColor.background.info.strong-rest',
                color: '$semanticColor.text.inverse',
            }
        },
        "value": {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '$semanticColor.background.neutral.strong-rest',
            color: '$semanticColor.text.inverse',
        },
        image: {
            type: 'variant',
            description: 'hello world',
            "value": {
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: '0'
            }
        },
        size: {
            large: {
                type: 'size',
                description: 'hello world',
                "value": {
                    height: '40px',
                    width: '40px',
                },
            },
            xsmall: {
                type: 'size',
                description: 'xsmall',
                "value": {
                    height: '18px',
                    width: '18px',
                },
            },
            small: {
                type: 'size',
                description: 'small',
                "value": {
                    height: '24px',
                    width: '24px',
                },
            },
            medium: {
                type: 'size',
                description: 'medium',
                "value": {
                    height: '32px',
                    width: '32px',
                },
            },
            xlarge: {
                type: 'size',
                description: 'large',
                "value": {
                    height: '48px',
                    width: '48px',
                },
            },
        },
        radius: {
            soft: {
                type: 'radius',
                description: 'hello world',
                "value": {
                    borderRadius: "$radius-xsmall",
                },
            },
            softer: {
                type: 'radius',
                description: 'hello world',
                "value": {
                    borderRadius: "$radius-small",
                },
            },
            none: {
                type: 'radius',
                description: 'hello world',
                "value": {
                    borderRadius: "$radius-none",
                },
            },
            full: {
                type: 'radius',
                description: 'hello world',
                "value": {
                    borderRadius: "$radius-full",
                },
            },
        },
    },
}