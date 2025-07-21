export const config = {
    "link": {
      "underline": {
          "brand": {
              value: {
                  color: "$semanticColor.text-link-rest",
                  textDecoration: "underline"
              },
              states: {
                  hover: {
                      value: {
                          cursor: "pointer",
                          textDecoration: "none",
                          color: "$semanticColor.text-link-hover",
                      }
                  }
              }
          },
      },
      "brand": {
        value: {
            color: "$semanticColor.text-link-rest",
            textDecoration: "none"
        },
        states: {
            hover: {
                value: {
                    cursor: "pointer",
                    textDecoration: "underline",
                    color: "$semanticColor.text-link-hover",
                }
            }
        }
    },
    }
}