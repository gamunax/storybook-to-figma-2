export const config = {
    'atlas-pagination': {
        value: {
            margin: '0',
            padding: '0',
            display: 'flex',       
        },    
    },
    'atlas-pagination__container': {
        value: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: '0',
            margin: '0',
        },      
    },    
    'atlas-pagination__no-fill-neutral--active': {
        value: {
            background: '$semanticColor.background.brand.rest !important',
            color: '$semanticColor.text.helper.brand !important',
        },  
    },
    'atlas-pagination__no-fill-neutral:hover': {
        value: {
            background: '$semanticColor.background.neutral.soft-hover !important',
            color: '$semanticColor.text.secondary !important',
        },  
    },
    'atlas-pagination__no-fill-brand--active': {
        value: {
            background: '$semanticColor.background.brand.strong-rest !important',
            color: '$semanticColor.text.inverse !important',
        },  
    },
    'atlas-pagination__strong-neutral--active': {
        value: {
            background: '$semanticColor.background.neutral.strong-active !important',           
        },  
    },
    'atlas-pagination__strong-brand--active': {
        value: {
            background: '$semanticColor.background.brand.strong-active',
            color: '$semanticColor.text.inverse',
        },  
    },
    'atlas-pagination__arrow--disabled': {
        value: {
            color:'$semanticColor.background.disabled !important',
            background: 'transparent !important',
            borderColor: '$semanticColor.background.disabled !important',  
        },    
    },
    'atlas-pagination__item--disabled' : {
        value: {
            color:'$semanticColor.text.disabled !important',
            background: '$semanticColor.text.disabled !important',
            borderColor: '$semanticColor.background.disabled !important',  
        }, 
    },
    'atlas-pagination__item--disabled:active':{
        value: {
            color:'$semanticColor.text.disabled !important',
            background: '$semanticColor.text.disabled !important',
            borderColor: '$semanticColor.background.disabled !important',  
        }, 
    },
    'atlas-pagination__item--disabled:hover': {
        value: {
            color:'$semanticColor.text.disabled !important',
            background: '$semanticColor.text.disabled !important',
            borderColor: '$semanticColor.background.disabled !important',  
        },
    },
    'atlas-pagination li': {
        value: {
            display:'inline-block',
            margin: '0 3px',
        },
    },
    'atlas-pagination > li > atlas-button > button > span':{
        value: {
            width: '8px',
            height: '8px'
        },
    },
    'atlas-pagination > li > atlas-button > button.atlas-button.button-size-small': {
        value: {
            padding: '9px',
        },
    },
    'atlas-pagination > li > atlas-button > button.atlas-button.button-size-rounded-small': {
        value: {
            padding: '9px',
        },
    },    
    'atlas-pagination > li > atlas-button > button.atlas-button.button-size-medium': {
        value: {
            padding: '12px',
        },
    },
    'atlas-pagination > li > atlas-button > button.atlas-button.button-size-rounded-medium': {
        value: {
            padding: '12px',
        },
    },
    'atlas-pagination > li > atlas-button > button.atlas-button.button-size-large': {
        value: {
            padding: '16px',
        },
    },
    'atlas-pagination > li > atlas-button > button.atlas-button.button-size-rounded-large': {
        value: {
            padding: '16px',
        },
    },
    'atlas-pagination > li > atlas-button > button.button-size-medium  > span > atlas-icon':{
        value: {
            width: '19px',
        },
    },
    'atlas-pagination > li > atlas-button > button.button-size-large > span > atlas-icon':{
        value: {
            width: '19px',
        },
    },
    'atlas-pagination > li > atlas-button > button.button-size-rounded-medium  > span > atlas-icon':{
        value: {
            width: '19px',
        },
    },
    'atlas-pagination > li > atlas-button > button.button-size-rounded-large > span > atlas-icon':{
        value: {
            width: '19px',
        },
    },
    'atlas-pagination > li > atlas-button > button.button-size-small > span > atlas-icon':{
        value: {
            width: '16px',
        },
    },
    'atlas-pagination > li > atlas-button > button.button-size-rounded-small > span > atlas-icon':{
        value: {
            width: '16px',
        },
    },
    'atlas-pagination__items-per-page': {
        value: {
            margin: '0 10px',
        },
    },
};