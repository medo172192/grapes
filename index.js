
const host = 'http://artf.github.io/grapesjs/';

const images = [
    host + 'img/grapesjs-logo.png',
    host + 'img/tmp-blocks.jpg',
    host + 'img/tmp-tgl-images.jpg',
    host + 'img/tmp-send-test.jpg',
    host + 'img/tmp-devices.jpg',
];

const pageDataEl = $("#editorData")
const page = pageDataEl.data('page')

const editor = grapesjs.init({
    showOffsets: 1,
    assetManager: {
        assets: images
    },
    noticeOnUnload: 0,
    container: '#gjs',
    height: '100vh',
    fromElement: 1,
    allowScripts: 1,
    plugins: [
        // 'grapesjs-custom-code',
        "gjs-blocks-basic",
        'grapesjs-plugin-forms',
        'grapesjs-tui-image-editor',
        'gjs-blocks-flexbox',
        'grapesjs-tabs',
        'grapesjs-tooltip',
        // 'grapesjs-parser-postcss',
        'grapesjs-typed',
        'grapesjs-navbar',
        // 'grapesjs-ui-suggest-classes',
        'grapesjs-preset-webpage',
        'grapesjs-component-countdown',
        'grapesjs-style-gradient',
        'grapesjs-style-filter',
        'grapesjs-style-bg',
        'gjs-plugin-filestack',
        'gjs-plugin-ckeditor',
        'grapesjs-touch',
        // '@silexlabs/grapesjs-fonts',
        "grapesjs-ga",
        "grapesjs-component-twitch",
        "grapesjs-tailwind"
    ],
    pluginsOpts: {
        // 'grapesjs-custom-code': {},
        "gjs-blocks-basic": {},
        'grapesjs-plugin-forms': {},
        'gjs-blocks-flexbox': {},
        'grapesjs-tabs': {},
        'grapesjs-tooltip': {},
        'grapesjs-typed': {},
        // 'grapesjs-parser-postcss': {},
        'grapesjs-navbar': {
            /* ...options */
        },
        'gjs-plugin-filestack': {
            key: 'Ajh5qpZXWQqmcxokCAM0Zz'
        },
        'gjs-plugin-ckeditor' : {
            options: {
                language: 'en',
                startupFocus: true,
                extraAllowedContent: '*(*);*{*}', // Allows any class and any inline style
                allowedContent: true, // Disable auto-formatting, class removing, etc.
                // enterMode: CKEDITOR.ENTER_BR,
                uiColor: '#0000001a', // Inline editor color
                extraPlugins: 'justify,colorbutton,panelbutton,font,sourcedialog,showblocks',
                toolbar: [
                    ["Format", "-", "Bold", "Italic", "Strike", "Underline", "Subscript", "Superscript", "RemoveFormat", "-", "NumberedList", "BulletedList", "-", "Outdent", "Indent", "-", "JustifyLeft", "JustifyCenter", "JustifyRight", "JustifyBlock", "-", "Link", "Unlink", "Anchor", "TextColor", "BGColor", "-", "ShowBlocks", "-", "Image", "Table", "-", "Sourcedialog"]
                ]
            },
            position: 'left',
        },
        "@silexlabs/grapesjs-fonts": {
            api_key: "AIzaSyAdJTYSLPlKz4w5Iqyy-JAF2o8uQKd1FKc"
        }
    },
    canvas: {
        styles: [
            'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css',
        ],
        scripts: [
            'https://code.jquery.com/jquery-3.3.1.slim.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js',
            'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js',
        ],
    },
    storageManager: {
        id: 'mabdulmonem-',
        autosave: false,
        autoload:false,
    },
    commands: {
        strict: false, // by default is true
    },
    styleManager: {
        sectors: [
            {
            name: 'General',
            open: true,
            buildProps: ['float', 'display', 'position', 'top', 'right', 'left', 'bottom']
        },

            {
                name: 'Flex',
                open: false,
                buildProps: ['flex-direction', 'flex-wrap', 'justify-content', 'align-items',
                    'align-content', 'order', 'flex-basis', 'flex-grow', 'flex-shrink', 'align-self'
                ]
            },
            {
                name: 'Dimension',
                open: false,
                buildProps: ['width', 'height', 'max-width', 'min-height', 'margin', 'padding'],
            },
            {
                name: 'Typography',
                open: false,
                buildProps: ['font-size', 'font-weight', 'letter-spacing', 'color',
                    'line-height', 'text-shadow'
                ],
            },
            {
                name: 'Decorations',
                open: false,
                buildProps: ['border-radius-c', 'background-color', 'border-radius', 'border',
                    'box-shadow', 'background'
                ],
            },
            // {
            //     name: 'Extra',
            //     open: false,
            //     properties: [{
            //         extend: 'filter'
            //     },
            //         {
            //             extend: 'filter',
            //             property: 'backdrop-filter'
            //         },
            //     ],
            //     buildProps: ['transition', 'perspective', 'transform'],
            // }
        ],
    },
});

const panelManager = editor.Panels;

const commands = editor.Commands;

function saveContent(editor) {
    $.ajax({
        url: pageDataEl.data("link"),
        type: "post",
        data: {
            html:   encodeHtml(editor.getHtml()),
            css : encodeHtml(editor.getCss()),
            js: encodeHtml(editor.getJs()),
            uuid: page.uuid,
            _token: $("meta[name=token]").attr("content")
        },
        success: function(response) {
            $.toast({
                heading: pageDataEl.data('success-msg'),
                text: response.msg,
                showHideTransition: 'slide',
                icon: 'success'
            })
        }
    })
}
function encodeHtml(html) {
    return html.replaceAll(/[\u00A0-\u9999<>\&]/g, function(i) {
        return '&#'+i.charCodeAt(0)+';';
    });
}


window.onbeforeunload = function (e) {
    // Cancel the event
    e.preventDefault();

    // Chrome requires returnValue to be set
    e.returnValue = 'Really want to quit the game?';
};

/* disable ctrl + s, since this is handled in iframe parent */
document.addEventListener("keydown", function(event) {
    if (event.ctrlKey && event.key === "s") {
        event.preventDefault();
        saveContent(editor)
    }
});

