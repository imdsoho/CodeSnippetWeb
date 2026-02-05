//$(document).ready(function () {
$(window).on('load', function() {
    $('#btnSubmit').click(function (event) {
        makeGraphCallbackFunction(createHeatmap);
    });

    function createHeatmap() {
        let heatmapApiUrl = "http://10.125.167.115:8000/create_heatmap";
        let apiData = {};

        $.ajax({
            type: 'GET',
            async: true,
            url: heatmapApiUrl,
            dataType: 'json',
            data: apiData,
            success: visualizeHeatmapData,
            error: function (response, status){
                console.log(response + ": \n" + status);
            },
            beforeSend: ajaxBeforeSendEvent,
            complete: function (){
                console.log("heatmap complete");
            }
        })
        .done(function (response){
            console.log("heatmap create done");
            skeletonFadeOut();
        });
    }

    function ajaxBeforeSendEvent(){
        let url = "http://127.0.0.1:8000/get-waypoints";
        let options = {};
        let eventName = "ping";
        let elementId = "coordinates";
        getStateFromSSE(url, options, eventName);
    }

    function visualizeHeatmapData(response) {
    }

    function makeGraphCallbackFunction(callBack){
        try{
            skeletonFadeIn();
            callBack();
        }
        catch(error){
            return false;
        }
    }

    function skeletonFadeIn(useFlag = true, time = 1){
        if(useFlag) {
            if($(".muscle").hasClass("not-first")){
                $(".muscle").addClass("blurry-image");
            }
            else{
                $(".muscle").addClass("not-first").fadeOut(time, function () {
                    $(".skeleton").fadeIn(time);
                });
            }
        }
    }

    function skeletonFadeOut(useFlag = true, time = 1){
        if(useFlag) {
            $(".muscle").removeClass("blurry-image");

            $(".skeleton").fadeOut(time, function () {
                $(".muscle").fadeIn(time);
            });
        }
    }
});
