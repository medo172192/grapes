<div class="modal fade" id="landingPageModal" role="dialog" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">{{ _i('Create new Landing Page') }}</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <form id='landingPageForm'>
                <div class="modal-body">

                    @csrf
                    <div class="row">

                        <div class="col-md-12">
                            <div class="form-group">
                                <label for="title">{{ _i('Page Title') }}</label>
                                <input id="title" class="form-control modal-name" name='title'>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label for="subdomain">{{ _i('Page subdomain') }}</label>
                                <input id="subdomain" class="form-control modal-name" name='subdomain'>
                            </div>
                        </div>

                        <div class="col-md-12">
                            <style>
                                div.radio-with-Icon {
                                    display: block;
                                }

                                div.radio-with-Icon p.radioOption-Item {
                                    display: inline-block;
                                    width: 200px;
                                    height: 200px;
                                    box-sizing: border-box;
                                    margin: 25px 15px;
                                    border: none;
                                }

                                div.radio-with-Icon p.radioOption-Item label {
                                    display: block;
                                    height: 100%;
                                    width: 100%;
                                    padding: 10px;
                                    border-radius: 10px;
                                    border: 1px solid #de1831;
                                    color: #de1831;
                                    cursor: pointer;
                                    opacity: .8;
                                    transition: none;
                                    font-size: 13px;
                                    /* padding-top: 25px; */
                                    text-align: center;
                                    margin: 0 !important;
                                }

                                div.radio-with-Icon p.radioOption-Item label:hover,
                                div.radio-with-Icon p.radioOption-Item label:focus,
                                div.radio-with-Icon p.radioOption-Item label:active {
                                    opacity: .5;
                                    background-color: #de1831;
                                    color: #fff;
                                    margin: 0 !important;
                                }

                                div.radio-with-Icon p.radioOption-Item label::after,
                                div.radio-with-Icon p.radioOption-Item label:after,
                                div.radio-with-Icon p.radioOption-Item label::before,
                                div.radio-with-Icon p.radioOption-Item label:before {
                                    opacity: 0 !important;
                                    width: 0 !important;
                                    height: 0 !important;
                                    margin: 0 !important;
                                }

                                div.radio-with-Icon p.radioOption-Item label i.fa {
                                    display: block;
                                    font-size: 50px;
                                }

                                div.radio-with-Icon p.radioOption-Item input[type="radio"] {
                                    opacity: 0 !important;
                                    width: 0 !important;
                                    height: 0 !important;
                                }

                                div.radio-with-Icon p.radioOption-Item input[type="radio"]:active~label {
                                    opacity: 1;
                                }

                                div.radio-with-Icon p.radioOption-Item input[type="radio"]:checked~label {
                                    opacity: 1;
                                    border: none;
                                    background-color: #de1831;
                                    color: #fff;
                                }

                                div.radio-with-Icon p.radioOption-Item input[type="radio"]:hover,
                                div.radio-with-Icon p.radioOption-Item input[type="radio"]:focus,
                                div.radio-with-Icon p.radioOption-Item input[type="radio"]:active {
                                    margin: 0 !important;
                                }

                                div.radio-with-Icon p.radioOption-Item input[type="radio"]+label:before,
                                div.radio-with-Icon p.radioOption-Item input[type="radio"]+label:after {
                                    margin: 0 !important;
                                }
                            </style>

                            <div class="radio-with-Icon">
                                @foreach (\App\Bll\Utility::getLandingPageTemplateOfStore() as $template)
                                    <p class="radioOption-Item">
                                        <input type="radio" name="template_id" id="BannerType{{ $template->id }}"
                                            value="{{ $template->id }}" class="ng-valid ng-dirty ng-touched ng-empty"
                                            aria-invalid="false" style="">
                                        <label for="BannerType{{ $template->id }}">
                                            <img src="{{ asset($template->feature_image) }}" class="img-thumbnail"
                                                alt="">
                                            {{ $template->data->name }}
                                        </label>
                                    </p>
                                @endforeach



                            </div>

                        </div>
                    </div>

                </div>
            </form>
            <div class="modal-footer">
                <button type="button" class="btn btn-default waves-effect"
                    data-dismiss="modal">{{ _i('Close') }}</button>
                <button type="button"
                    class="btn btn-primary waves-effect waves-light btn-submit">{{ _i('Save') }}</button>
            </div>

        </div>
    </div>
</div>
