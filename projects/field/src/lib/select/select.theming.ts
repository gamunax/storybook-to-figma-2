export const config = {
  atlas: {
    select: {
      backdrop: {
        value: {
          background: "transparent",
          position: "absolute",
          top: "0",
          bottom: "0",
          left: "0",
          right: "0",
        },
      },
      "-disabled": {
        value: {
          color: "$semanticColor.text.disabled",
          cursor: "not-allowed",
        },
      },
      "-disabled > div.field-select > div.field-infix": {
        value: {
          color: "$semanticColor.text.disabled",
          cursor: "not-allowed",
        },
      },
      "-disabled > div.field-select > div.field-suffix > atlas-icon": {
        value: {
          color: "$semanticColor.background.disabled",
          cursor: "not-allowed",
        },
      },
      panel: {
        value: {
          width: "100%",
          "overflow-y": "auto",
        },
      },
    },
  },
};
