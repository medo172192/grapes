<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta content="{{csrf_token()}}" name="token">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    @if (($settings = get_main_settings()) != null)
        <title> {{ $settings['title'] }} | {{ !empty($title) ? $title : _i('Control panel') }}</title>
    @else
        <title>{{ $page->title }} | {{ _i(config('app.DOMAIN_NAME')) }}</title>
    @endif
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link rel="stylesheet" href="//unpkg.com/grapesjs/dist/css/grapes.min.css">
{{--    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>--}}
    <script src="//unpkg.com/grapesjs"></script>
    <script src="https://unpkg.com/grapesjs-preset-webpage"></script>
    <script src="https://unpkg.com/grapesjs-custom-code"></script>
    <script src="https://unpkg.com/grapesjs-blocks-basic"></script>
    <script src="https://unpkg.com/grapesjs-plugin-forms"></script>
    <script src="https://unpkg.com/grapesjs-tui-image-editor"></script>
    <script src="https://unpkg.com/grapesjs-blocks-flexbox"></script>
    <script src="https://unpkg.com/grapesjs-lory-slider"></script>
    <script src="https://unpkg.com/grapesjs-tabs"></script>
    <script src="https://unpkg.com/grapesjs-tooltip"></script>
    <script src="https://unpkg.com/grapesjs-parser-postcss"></script>
    <script src="https://unpkg.com/grapesjs-typed"></script>
    <script src="https://unpkg.com/@silexlabs/grapesjs-fonts"></script>
    <script src="https://unpkg.com/grapesjs-navbar"></script>
    <script src="https://unpkg.com/grapesjs-ui-suggest-classes"></script>
    <script src="https://unpkg.com/grapesjs-component-countdown"></script>
    <script src="https://unpkg.com/grapesjs-style-gradient"></script>

    <script src="https://unpkg.com/grapesjs-component-twitch"></script>
    <script src="https://unpkg.com/grapesjs-ga"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-toast-plugin/1.3.2/jquery.toast.min.css"/>
</head>


<body>
<span class="d-none"
      data-success-msg="{{_i('Success')}}"
      id="editorData"
      data-search-link="{{ route('landing.page.products.search') }}"
      data-store-link="https://{{$link}}"
      data-link="{{ route('landing.page.editor.save', getLangCode()) }}"
      data-page="{{ json_encode($page) }}"
></span>
<div id="gjs" >
    <style>
        {!! $page->css !!}
    </style>

    {!! html_entity_decode(html_entity_decode($page->html)) !!}
    <script>
        {!! html_entity_decode(html_entity_decode($page->js)) !!}
    </script>
</div>

<script src="{{ asset('admin_dashboard/bower_components/jquery/js/jquery.min.js') }}"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-toast-plugin/1.3.2/jquery.toast.min.js"></script>


<script src="{{ asset("/js/grapesjs/plugins/grapesjs-tailwind.min.js") }}"></script>
<script src="{{ asset("/js/grapesjs/index.js") }}"></script>
<script src="{{ asset("/js/grapesjs/toolbar.js") }}"></script>
<script src="{{ asset("/js/grapesjs/commands.js") }}"></script>
<script src="{{ asset("/js/grapesjs/events.js") }}"></script>


@include("admin.landing_pages.blocks.contact_form")


</body>

</html>
