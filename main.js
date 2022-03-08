var video = ""
var ml5status = ""
var errordetect = ""
var result = ""
var findthis
function setup()
{
    canvas = createCanvas(640, 420)
    canvas.center()
    video = createCapture(VIDEO)
    video.hide()
    video.size(640, 420)
}
function draw()
{
    image(video, 0, 0, 640, 420)
    if(ml5status != "")
    {
        detector.detect(video, gotResult)
        for(var i = 0; i < result.length; i++)
        {
            document.getElementById("status").innerHTML = "Status: Detecting Objects..."
            if(result[i].label == findthis)
            {
                document.getElementById("numberofobjects").innerHTML = "Detected an object matching your criteria!"
                fill("#ff0000")
                text(result[i].label + " (confidence: " + Math.round(result[i].confidence * 100) + "%)", result[i].x + 7.5, result[i].y + 15)
                noFill()
                stroke("#ff0000")
                rect(result[i].x, result[i].y, result[i].width, result[i].height)
            }
            else
            {
                document.getElementById("numberofobjects").innerHTML = "Detected no objects matching the criteria."
            }
            if(errordetect == true)
            {
                document.getElementById("status").innerHTML = "A non-fatal error occured."
            }
        }
    }
    if(errordetect == true)
    {
        document.getElementById("status").innerHTML = "An error occured, try again later."
    }
}
function start()
{
    findthis = document.getElementById("findthis").value
    document.getElementById("status").innerHTML = "Status: Warming up the object detector..."
    document.getElementById("numberofobjects").innerHTML = "Loading..."
    document.getElementById("start").disabled = true
    detector = ml5.objectDetector("cocossd", modelLoaded)
}
function modelLoaded()
{
    document.getElementById("status").innerHTML = "Status: Almost done..."
    video.loop()
    video.speed(1)
    video.volume(0)
    document.getElementById("status").innerHTML = "Status: Detecting objects..."
    console.log("Model loaded successfully!")
    ml5status = true
}
function gotResult(error, results)
{
    if(error)
    {
        console.log("An error occured:" + error)
        errordetect = true
    }
    else
    {
        console.log(results)
        result = results
    }
}