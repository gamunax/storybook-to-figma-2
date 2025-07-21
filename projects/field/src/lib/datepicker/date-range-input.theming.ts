export const config = {
   "date": {
       "range": {
           "input": {
               "container": {
                    value: {
                        display: "flex",
                        alignItems: "center",
                    }
               },
               "separator": {
                   value: {
                        margin: "0 8px 0 4px" 
                   }
               },
               "inner": {
                   value: {
                        font: "inherit",
                        background: "transparent",
                        color: "currentColor",
                        border: "none",
                        outline: "none",
                        padding: "0",
                        margin: "0",
                        verticalAlign: "bottom",
                        textAlign: "inherit",
                        "-webkit-appearance": "none",
                        width: "100%"
                   },
               },
               "mirror": {
                   value: {
                       userSelect: "none",
                       visibility: "hidden",
                       whiteSpace: "nowrap",
                       display: "inline-block",
                       minWidth: "2px"
                   }
               },
               "start-wrapper": {
                   "inner":{
                       value: {
                        position: "absolute",
                        top: "0",
                        left: "0",
                       }
                   },
                   value: {
                    position: "relative",
                    overflow: "hidden",
                    maxWidth: "90px",
                   }
               },
               "end-wrapper": {
                   value: {
                    flexGrow: "1",
                    maxWidth: "90px",
                   }
               },
               value: {
                    display: "block",
                    width: "100%"
               }
           }
       }
   }
   
}