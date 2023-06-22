const defaultToolbar = panelManager.getPanel('options').get('buttons');

// Add save button to the panel
defaultToolbar.add({
    id: 'save-btn',
    className: 'fa fa-save',
    command: function(editor) {
       saveContent(editor)
    },
    attributes: {
        title: 'Save'
    }
});


defaultToolbar.add({
    id: 'view-shop-btn',
    className: 'fa fa-shopping-cart',
    command: function(editor) {
        window.open(pageDataEl.data("store-link"), "_blank");
    },
    attributes: {
        title: 'View your landing page'
    }
});
//i18n