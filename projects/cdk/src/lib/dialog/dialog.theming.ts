export const config = {
    atlas: {
        dialog: {
            container: {
                value: {
                    display: 'block',
                    padding: '16px 24px',
                    borderRadius: '4px',
                    boxSizing: 'border-box',
                    overflow: 'auto',
                    outline: '0',
                    background: 'var(--semanticColor-layer-neutral-01)',
                    color: 'var(--semanticColor-text-default)',
                    boxShadow:' 0px 24px 24px rgba(0, 0, 0, 0.16)',
                    width: '100%',
                    height: '100%',
                    minHeight: 'inherit',
                    maxHeight: 'inherit',
                },               
            },
            content: {
                value: {
                    display: 'block',
                    margin: '0 -24px',
                    padding: '0 24px',
                    maxHeight:  '65vh',
                    overflow: 'auto',
                }
            },
            title: {
                value: {
                    margin: '0 0 16px',
                    display: 'block',
                }
            },
            actions: {
                value: {
                    padding: '8px 0',
                    display: 'flex',
                    flexWrap: 'wrap',
                    minHeight: '52px',
                    alignItems: 'center',
                    boxSizing: 'content-box',
                    marginBottom: '-16px',
                }
            }           
        },
    },
};