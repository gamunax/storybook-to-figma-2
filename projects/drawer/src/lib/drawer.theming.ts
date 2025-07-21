export const config = {
    "drawer": {
        "value": {
            "display": "flex",
            "flexDirection": "column",
            "box-shadow": "0px 16px 16px rgba(0, 0, 0, 0.16)",
            "height": "100%",
            "position": "relative",
            "left": "0px",
            "box-sizing": "border-box",
        },
        "default": {
            "value": {
                background: "#FFFFFF",
                color: "var(--semanticColor-text-helper)",
            },
        },
        "expanded": {
            "value": {
                width: "320px",
            },
        },
        "dense": {
            "value": {
                width: "240px",
            },
        },
        "condensed": {
            "value": {
                width: "54px",
            },
        },
        "primary": {
            value: {
                background: "var(--semanticColor-text-helper-brand)",
                color: "var(--semanticColor-text-inverse)"
            },
        },
        "secondary": {
            value: {
                background: "var(--semanticColor-text-helper-brand)",
                color: "var(--semanticColor-text-inverse)"
            },
        },
        "brand": {
            value: {
                background: "var(--semanticColor-text-helper-brand)",
                color: "var(--semanticColor-text-inverse)"
            },
        },
        "neutral": {
            "value": {
                background: "#FFFFFF",
                color: "var(--semanticColor-text-helper)"
            },
        },
    }
}