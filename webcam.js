// Grab elements, create settings, etc.
var recorder = new MRecordRTC();

// Get access to the camera!
(function () {
    navigator.getMedia = ( navigator.getUserMedia ||
                           navigator.webkitGetUserMedia ||
                           navigator.mozGetUserMedia ||
                           navigator.msGetUserMedia);

    navigator.getMedia(
        // constraints
        {video:true, audio:true},
        
        // success callback
        function (MediaStream) {
            var video = document.getElementsByTagName('video')[0];
            video.src = window.URL.createObjectURL(MediaStream);
            video.play();
            recorder.addStream(MediaStream);
            recorder.mediaType = {
               audio: true, // or StereoAudioRecorder
               video: true, // or WhammyRecorder
            };
            // mimeType is optional and should be set only in advance cases.
            /*recorder.mimeType = {
                audio: 'audio/wav',
                video: 'video/webm',
                gif:   'image/gif'
            };*/
            console.log("Recording...");
            recorder.startRecording();

        },
        //handle error
        function (error) {
            console.log(error);
        })     
})();

function stopStream()
        {
            recorder.stopRecording();
            var blobs = recorder.getBlob();
            var audioBlob = blobs.audio;
            var videoBlob = blobs.video;
            document.getElementById('btnInterview').disabled = true;
            document.getElementById('btnExport').disabled = false;
        }

function exportStream()
        {
            // invoke save-as dialog
            // for all recorded blobs
            recorder.save({
                audio: true,
                video: true
            });
            recorder.writeToDisk();
            document.getElementById('btnView').disabled = false;
        }  
        
function viewStream()
{
    // or get just single blob
    MRecordRTC.getFromDisk('video', function(dataURL) {
        var video2 = document.getElementsByTagName('video')[0];
        video2.src = dataURL;
    });
}
