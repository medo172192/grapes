@extends('admin.layout.index', [
    'title' => _i('Pages'),
    'subtitle' => _i('Pages'),
])


@push('css')
    <style>
        .model-width {
            max-width: 861px !important;
        }

        .models-width {
            max-width: 861px !important;
        }
    </style>
@endpush

@section('content')
    <div class="row">

        <div class="col-sm-12">
            <div class="row">

                <div class="col-md-6 col-xl-4">
                    <div class="card social-widget-card">
                        <div class="card-block-big {{$remaining <= 1 ? "bg-google-plus" : ( $remaining <= 3 ? 'bg-warning' :  'bg-twitter')}} ">
                            <h3 class="text-md-center">
                                {{$remaining}}
                            </h3>
                            <p class="text-md-center">{{ _i('Remaining pages') }}</p>
                            {{--                            <i class="small ti-shopping-cart"></i>--}}
                        </div>
                    </div>
                </div><!-- ./Remaining pages -->
                <div class="col-md-6 col-xl-4">
                    <div class="card social-widget-card">
                        <div class="card-block-big " style="background-color: #28a745!important">
                            <h3 class="text-md-center">
                                {{$created_pages_count}}
                            </h3>
                            <p class="text-md-center">{{ _i('Created pages count') }}</p>
                            {{--                            <i class="small ti-shopping-cart"></i>--}}
                        </div>
                    </div>
                </div><!-- ./created_pages_count -->
                <div class="col-md-6 col-xl-4">
                    <div class="card social-widget-card">
                        <div class="card-block-big bg-linkein">
                            <h3 class="text-md-center">
                                {{$max_page_counts}}
                            </h3>
                            <p class="text-md-center">{{ _i('Package Limit') }}</p>
                            {{--                            <i class="small ti-shopping-cart"></i>--}}
                        </div>
                    </div>
                </div><!-- ./Package Limit -->
            </div>
        </div>

        <div class="col-sm-12">
            <div class="card">
                <div class="card-header">
                    <h5> {{ _i('Landing Pages List') }} </h5>
                    @if($remaining >= 1)
                        <a id="create_new" href="#" class='btn btn-primary btn-sm mb-2 float-left'
                           data-target='#landingPageModal' data-toggle='modal'>
                            {{ _i('Create new Landing Page') }}
                        </a>

                    @else
                        <a class='mb-2 float-left'>
                            {{ _i('Please upgrade, your limitation has ended') }}
                        </a>

                    @endif

                </div>
                <div class="card-block">
                    <div class="col-sm-12">
                        <!-- Ajax data source (Arrays) table start -->
                        <div class="card">
                            <div class="card-block">
                                <div class="table-responsive dt-responsive">
                                    <table id="datatable" class="table table-striped table-bordered nowrap">
                                        <thead>
                                        <tr>
                                            <th>{{ _i('Title') }}</th>
                                            <th>{{ _i('Link') }}</th>
                                            <th>{{ _i('Options') }}</th>
                                        </tr>
                                        </thead>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <!-- Ajax data source (Arrays) table end -->
                    </div>
                </div>
            </div>
        </div>
    </div>
    @include('admin.landing_pages.modal')
@endsection

@push('js')
    <script>
        var table = $('#datatable').DataTable({
            order: [],
            processing: true,
            serverSide: true,
            ajax: '{{ route('admin.package.landing-page.index') }}',
            columns: [{
                data: 'title',
                name: 'title'
            },
                {
                    data: 'subdomain',
                    name: 'subdomain'
                },
                {
                    data: 'options',
                    name: 'options',
                    orderable: true,
                    searchable: true
                }
            ]
        });


        // $("#create_new").click(function(e){
        //     e.preventDefault();
        //     $("#landingPageForm")[0].reset();
        //     // $("#landingPageModal").modal('show')
        // })

        $(".btn-submit").click(function (e) {
            e.preventDefault();
            $.ajax({
                type: "post",
                url: "{{ route('admin.landing.pages.store') }}",
                data: $("#landingPageForm").serializeArray(),
                success: function (response) {
                    new Noty({
                        type: response.status,
                        layout: 'topRight',
                        text: response.msg,
                        timeout: 2000,
                        killer: true
                    }).show();

                    $('#landingPageModal').modal("hide");

                    $('#datatable').DataTable().draw(false);
                    $("#landingPageForm")[0].reset();

                    window.open(response.data, "_blank")
                },
                error: function (response) {
                    const error = response.responseJSON
                    new Noty({
                        type: error.status,
                        layout: 'topRight',
                        text: error.msg,
                        timeout: 2000,
                        killer: true
                    }).show();
                }
            })
        })


        $('body').on('click', '.btn-delete[data-url]', function (e) {
            e.preventDefault();
            $.ajax({
                url: $(this).data('url'),
                type: 'DELETE',
                dataType: 'json',
                data: {
                    method: '_DELETE',
                    submit: true
                }
            }).done((response) => {
                new Noty({
                    type: response.status,
                    layout: 'topRight',
                    text: response.msg,
                    timeout: 2000,
                    killer: true
                }).show();
            })
                .always(function (data) {
                    $('#datatable').DataTable().draw(false);
                });
        });
    </script>
@endpush
