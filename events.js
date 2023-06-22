


editor.on('component:selected', () => {

    const command = 'addProductCommand';

    // Get the selected component and its default toolbar
    const selectedComponent = editor.getSelected();

    const defaultToolbar = selectedComponent.get('toolbar');

    const classes = selectedComponent.getEl().classList;


    console.log(classes.contains('ecommerce-product-item') );

    if(
        classes.contains('ecommerce-product-item') 
    || classes.contains('ecommerce-single-product-item')
    )
    {
        // Check if this command already exists on this component toolbar
        const commandExists = defaultToolbar.some(item => item.command === command);

        console.log(commandExists,selectedComponent);
        // If it doesn't already exist, add it
        if (!commandExists) {
            selectedComponent.set({
                toolbar: [...defaultToolbar, { attributes: { class: 'fa fa-product-hunt' }, command: command }]
            });
        }
    }

});
