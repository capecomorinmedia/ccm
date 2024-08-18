jQuery(document).ready(function() {

    jQuery("nav .nav li").bind("click", function() {
        jQuery(".nav li").removeClass('active');
        jQuery(this).addClass('active');
    });


    // When the user scrolls down 20px from the top of the document, show the button
    if (jQuery(".jury-cat-menu").length) {
        function scrollFunction(nav_top) {
            //alert(nav_top.top);
            if (jQuery(document).scrollTop() > (nav_top)) {
                jQuery(".jury-cat-menu").addClass('navbar-fixed-top');
            } else {
                jQuery(".jury-cat-menu").removeClass('navbar-fixed-top');
            }
        }

        setTimeout(function() {
            var nav_top = jQuery(".jury-cat-menu").offset().top;
            document.onscroll = function() {
                scrollFunction(nav_top);
            };
        }, 100);
    }
    /*
    jQuery('[data-toggle=confirmation]').confirmation({
      rootSelector: '[data-toggle=confirmation]',
      // other options
    });
    */
    /*if (jQuery("#news-from-indianwikimedia").length){  
    	jQuery.get( "http//www.indianwikimedia.com/wp-admin/admin-ajax.php?action=iwm_ajax_call&widget_id=iwm_award_feed", function( data ) {
    		jQuery( "#news-from-indianwikimedia" ).html( data );
    	});
    }
    if (jQuery("#videos-from-indianwikimedia").length){  
    	jQuery.get( "http://www.indianwikimedia.com/iwm/indianwikimedia/youtube-video-awards.php", function( data ) {
    		jQuery( "#videos-from-indianwikimedia" ).html( data );
    	});
    }*/


    function category_select() {
        if (jQuery("#award").length) {
            jQuery('div#nomination-row').each(function(i) {
                jQuery(this).find('#award-' + jQuery(this).find('#award').val()).show();
                //alert(jQuery(this).find('#award-'+jQuery(this).find('#award').val()));
            });
            jQuery("#nominee-form").on('change', '#award', function(e) {
                jQuery(this).parents('#nomination-row').find(".cat").hide();
                //jQuery(this).parents('#nomination-row').find(".cat").reset();
                jQuery(this).parents('#nomination-row').find(jQuery(this).parents('#nomination-row').find('#award-' + jQuery(this).parents('div#nomination-row').find('#award').val())).show();
            });
        }
    }
    category_select();

    if (jQuery("#nomination-row").length) {
        jQuery("#nominee-form").on("click", 'a#plus-nom', function(e) {
            if (jQuery('#nomination_form #nomination-row').length > 14) {
                return false;
            }
            var nomination_row = jQuery("div#nomination-row").eq(0).clone();
            jQuery(nomination_row).find('.error').html('');
            jQuery(nomination_row).find('input.form-control').attr('style', '');
            jQuery(nomination_row).find('input[type=text],input[type=date]').val('');
            jQuery(nomination_row).find('.video_link').show();
            jQuery(nomination_row).find('#progress-wrp').remove();
            jQuery(nomination_row).find('#award').val(jQuery('#award option:eq(0)').val());
            jQuery(nomination_row).find('.cat').hide();
            jQuery(nomination_row).find('.cat').val(jQuery('.cat option:eq(0)').val());
            jQuery(nomination_row).find('#award-10').show();
            jQuery("#nominee-form").append(nomination_row);
            jQuery('#nomination_form #nomination-row').each(function(j) {
                jQuery(this).find('.cat').each(function(k) {
                    jQuery(this).attr('name', 'cat[' + j + '][' + jQuery(this).attr('rel') + '][]');
                });
            });
            jQuery('.nom-entry').each(function(i) {
                jQuery(this).text("Entry #" + (i + 1));
            });
            //jQuery('#nomination_form input#telecast_date').each(function(i){
            jQuery('#nomination_form input#telecast_date').datepicker({
                startDate: '05/01/2023',
                endDate: '03/31/2024',
            });
            //});
            //upload_file();
            return false;
        });
        jQuery("#nominee-form").on("click", "a#minus-nom", function() {
            jQuery(this).parents('#nomination-row').remove();
            jQuery('.nom-entry').each(function(i) {
                jQuery(this).text("Entry #" + (i + 1));
            });
            jQuery('#nomination_form #nomination-row').each(function(j) {
                jQuery(this).find('.cat').each(function(k) {
                    jQuery(this).attr('name', 'cat[' + j + '][' + jQuery(this).attr('rel') + '][]');
                });
            });
            //upload_file();
            return false;
        });
    }


    // Select all links with hashes
    jQuery('#myNavbar a[href*="#"]')
        // Remove links that don't actually link to anything
        .not('#myNavbar [href="#"]')
        .not('#myNavbar [href="#0"]')
        .click(function(event) {
            // On-page links
            if (
                location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
                location.hostname == this.hostname
            ) {
                // Figure out element to scroll to
                var target = jQuery(this.hash);
                target = target.length ? target : jQuery('[name=' + this.hash.slice(1) + ']');
                // Does a scroll target exist?
                if (target.length) {
                    // Only prevent default if animation is actually gonna happen
                    event.preventDefault();
                    jQuery('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1000, function() {
                        // Callback after animation
                        // Must change focus!
                        var jQuerytarget = jQuery(target);
                        jQuerytarget.focus();
                        if (jQuerytarget.is(":focus")) { // Checking if the target was focused
                            return false;
                        } else {
                            jQuerytarget.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                            jQuerytarget.focus(); // Set focus again
                        };
                    });
                }
            }
        });

    wow = new WOW({
        animateClass: 'animated',
        offset: 100,
        callback: function(box) {
            console.log("WOW: animating <" + box.tagName.toLowerCase() + ">")
        }
    });
    wow.init();

    var extensionLists = {}; //Create an object for all extension lists
    extensionLists.video = ['webm', 'ogv', 'mp4', 'jpg', 'jpeg', 'png', 'ppt'];
    //One validation function for all file types    
    function isValidFileType(fName, fType) {
        return extensionLists[fType].indexOf(fName.split('.').pop()) > -1;
    }

    function form_submit() {
        jQuery('#nomination-form form').on("submit", function(event) {
            event.preventDefault(); // Prevent the form from submitting via the browser
            var form = jQuery(this);
            jQuery.ajax({
                type: 'post',
                url: form.attr('action'),
                data: form.serialize() + '&ajax=1&submit=1'
            }).done(function(data) {
                // Optionally alert the user of success here...
                jQuery('.ajax-container').html(data);
                form_submit();
            }).fail(function(data) {
                // Optionally alert the user of an error here...
                return true;
            });
            return false;
        });
    }
    //form_submit();

    if (jQuery("#plathform_name").length) {
        jQuery("#nominee-form").on("change", '#plathform_name', function(e) {
            //jQuery('select#plathform_name').change(function(){
            if (jQuery(this).val() != "others") {
                jQuery(this).parents('#nomination-row').find(".video_link").show();
                jQuery(this).parents('#nomination-row').find("#progress-wrp").remove();
                //upload_file();
            } else {
                if (jQuery(this).parents('#nomination-row').find("#progress-wrp").length != 1) {
                    var upload_field = "<div class='form-group' id='progress-wrp'><label class='control-label col-sm-4' >Upload File <span class='red'>*</span></label><div class='col-sm-8 nopad'><div class='input-group'><span class='btn btn-default btn-file'><input id='video-file' class='form-contro' name='upload[]' type='file'/></span><a href='#' onclick='return false;' id='upload' class='input-group-addon'><span class='fa fa-upload'></span>&nbsp;&nbsp;<span class='video-status'></span></a></div><span class='msg' style='margin-top:10px;width:100%;float:left;'>File should be in WebM/MP4/OGV/JPG/PNG/PPT format and size should be less than 100MB. Once the video is uploaded a link will be generated.The entry video link can be used to submit in other categories instead of uploading the full video again.</span></div></div>";
                    jQuery(this).parents('#nomination-row').find(".video_link").hide();
                    jQuery(this).parents('#nomination-row').find(".video_link").parent().append(upload_field);
                    //upload_file();
                }
            }
        });
    }
    //plathform_select();

    //if (jQuery("#video-file").length){
    var upload_count = 0;
    var response_count = 0;
    jQuery("#nominee-form").on("change", '#video-file,#upload', function(e) {
        upload_count++;
        //jQuery("div#nomination-row").find("#video-file").bind("change",function(event){
        var size = 1024;
        var nomination_row = jQuery(this).parents('#nomination-row');
        var video_size = (jQuery(nomination_row).find("#video-file")[0].files[0].size / 1024) / 1024;
        if (video_size == 0) {
            return false;
        }



        if (video_size < size && isValidFileType(jQuery(this).parents('#nomination-row').find("#video-file")[0].files[0].name, 'video')) {
            jQuery('input#submit').attr("disabled", "disabled");

            if (jQuery("#nominee-form .suceess").length == 0) {
                jQuery('input#submit').parent().append("<div class='suceess'>Wait till the file gets uploaded.</div>");
            }
            var form = new FormData();
            form.append("video", jQuery(nomination_row).find("#video-file")[0].files[0]);
            form.append("upload_count", upload_count);
            post_url = "/nomination/upload";
            $.ajax({
                url: post_url,
                type: "POST",
                data: form,
                contentType: false,
                cache: false,
                processData: false,
                xhr: function() {
                    //upload Progress
                    var xhr = $.ajaxSettings.xhr();
                    if (xhr.upload) {
                        xhr.upload.addEventListener('progress', function(event) {
                            var percent = 0;
                            var position = event.loaded || event.position;
                            var total = event.total;
                            if (event.lengthComputable) {
                                percent = Math.ceil(position / total * 100);
                            }
                            //update progressbar
                            //$("#progress-wrp .progress-bar").css("width", + percent +"%");
                            jQuery(nomination_row).find("#progress-wrp").find(".video-status").text(percent + "%");
                        }, true);
                    }
                    return xhr;
                },
                error: function(jqXHR, exception) {
                    //alert(jqXHR.status);
                    var msg = '';
                    if (jqXHR.status === 0) {
                        msg = 'Not connect.\n Verify Network.';
                    } else if (jqXHR.status == 404) {
                        msg = 'Requested page not found. [404]';
                    } else if (jqXHR.status == 500) {
                        msg = 'Internal Server Error [500].';
                    } else if (exception === 'parsererror') {
                        msg = 'Requested JSON parse failed.';
                    } else if (exception === 'timeout') {
                        msg = 'Time out error.';
                    } else if (exception === 'abort') {
                        msg = 'Ajax request aborted.';
                    } else {
                        msg = 'Uncaught Error.\n' + jqXHR.responseText;
                    }
                    alert(msg);
                },
                mimeType: "multipart/form-data"
            }).done(function(res) {
                var obj = jQuery.parseJSON(res);
                response_count++;
                if (obj.error == "0") {
                    jQuery(nomination_row).find("#video_link").val(obj.msg);
                    if (response_count == upload_count) {
                        jQuery(nomination_row).find(".video_link").show();
                        jQuery(nomination_row).find("#progress-wrp").remove();
                        jQuery('input#submit').removeAttr("disabled");
                        //jQuery(".video_link").show();
                        jQuery(".suceess").remove();
                        uploded();
                    }
                } else {
                    jQuery(nomination_row).find("#progress-wrp").find(".error").text(obj.msg);
                    alert(obj.msg);
                }
                //$(form).reset(); //reset form
                //$(result_output).html(res); //output response from server
                //jQuery('#upload').prop( "disabled", false); //enable submit button once ajax is done
            });
            return false;

        } else {
            alert("File should be in WebM/MP4/OGV/JPG/PNG/PPT format and size should be less than 100MB");
            return false;
        }
    });

    jQuery('#telecast_date').datepicker({
        startDate: '05/01/2023',
        endDate: '03/31/2024',
    });

    //if (jQuery("#copy-content").length){
    jQuery("#myModal-uploaded-files").on("click", "#copy-content", function() {
        alert(jQuery(this).attr('href'));
        return false;
    });
    // }

    jQuery(".jury-video .video-rating span").hover(function() {
        var index = jQuery(this).index();
        jQuery(this).parents(".video-rating").find("span:lt('" + (index + 1) + "')").addClass("active");
    }, function() {
        var index = jQuery(this).index();
        jQuery(this).parents(".video-rating").find("span:lt('" + (index + 1) + "')").removeClass("active");
    });
    jQuery(".jury-video .video-rating span").click(function() {
        var index = jQuery(this).index();
        jQuery(this).parents(".video-rating").find("span").removeClass("lock");
        jQuery(this).parents(".video-rating").find("span:lt('" + (index + 1) + "')").addClass("lock");
        submit_entries();
    });

    function submit_entries() {
        jQuery.ajax({
            type: 'post',
            url: '/jury/jury_ajax_form_submit',
            data: jQuery('#login').serialize()
        }).done(function(data) {
            // Optionally alert the user of success here...
            console.log(data);
        }).fail(function(data) {
            // Optionally alert the user of an error here...
            console.log(data);
            return true;
        });
    }


    function uploded() {
        jQuery.ajax({
            type: 'post',
            url: '/nomination/uploaded',
            data: '&ajax=1'
        }).done(function(data) {
            // Optionally alert the user of success here...
            //alert(jQuery(data).find('.form-container').html());
            if (jQuery(data).find('.form-container').length) {
                jQuery('.uploded-files').show();
                jQuery('#myModal-uploaded-files .modal-body').html(jQuery(data).find('.form-container').html());
            }
        }).fail(function(data) {
            // Optionally alert the user of an error here...
            return true;
        });
    }
    if (jQuery(".uploded-files").length) {
        uploded();
    }


    //}
});