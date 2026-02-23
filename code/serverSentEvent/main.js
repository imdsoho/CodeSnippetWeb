//$(document).ready(function () {
$(window).on('load', function() {
    $('#btnSubmit').click(function (event) {
        makeGraphCallbackFunction(createHeatmap);
    });

    function createHeatmap() {
        const uuid = crypto.randomUUID();

        let user_id = "imdsoho";
        let job_id = uuid;
        let heatmapApiUrl = "http://10.125.167.115:8000/plots?user_id="+user_id+"&job_id=" + job_id;

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
            beforeSend: function (){
                let url = "http://10.125.167.115:8000/get-plot-status?job_id=" + job_id;
                let options = {};
                let eventName = "plot";
                getStateFromSSE(url, options, eventName);
            },
            complete: function (){
                console.log("heatmap complete");
            }
        })
        .done(function (response){
            console.log("heatmap create done");
            skeletonFadeOut();
        });
    }


    function visualizeHeatmapData(response) {
        console.log("CREATE PLOT");

        setTimeout(function (){
            console.log(response);
        }, 3000);

        console.log("END PLOT");
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
