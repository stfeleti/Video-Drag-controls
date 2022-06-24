objDefaults = {
    onDragStart: function(currentTime) {
        console.log('onDragStart called');
        console.log('currentTime: ' + currentTime)
    },
    onDragStop: function(videoDuration) {
        console.log('onDragStart called');
        console.log('videoDuration: ' + videoDuration);
    },
    ticker: 0,
    framerate: 60,
    videoDuration: 0,
    currentTime: 0,
    ready: false,
    monitorStartTime: 0,
    monitorInt: 10,
    pointerDistance: 0,
    speedMultiplier: 20,
    totalFrames: 180,
    pointerDistance: 0,
    zeroBased: false,
    disableSpin: false,
    disableWrap: false,
    videoDuration: 0,
    showCursor: false,
    dragging: false,
    pointerStartPosX: 0,
    pointerEndPosX: 0
}
var initialPlay = false;
var b = this;
b.$el = $("#v0");
var obj = $.extend({}, objDefaults);

$('#v0').on('canplay', function() {
    if (initialPlay) return;
    initialPlay = true;
    $(this)[0].currentTime = 0;



});

$("#v0").bind("mousedown touchstart touchmove touchend mousemove click", function(key) {
    CheckDrag(key);
});
$(document).bind("mouseup", function(event) {
    obj.dragging = false;
    obj.onDragStop(obj.videoDuration);
    $("#mouse-drgging").html(`mouseup ${obj.dragging}`);
});
$("#v0").bind("mousemove", function(event) {
        obj.dragging ? (event.preventDefault(), b.browser.isIE && obj.showCursor && b.$el.css("cursor", "grabbing")) : !b.browser.isIE && obj.showCursor && b.$el.css("cursor", "grabbing"), b.trackPointer(obj)
    })
    //Check if the cursor is is touching the element
b.getPointerEvent = function(event) {
    $("#mouse-obj-position").html(`x: ${obj.pointerEndPosX}`);
    return !isNaN(event.originalEvent) && !isNaN(event.originalEvent.targetTouches) ? event.originalEvent.targetTouches[0] : event
}

b.refresh = function() {
    0 === obj.ticker && (obj.ticker = setInterval(b.render, Math.round(1e3 / obj.framerate)))
}

b.showCurrentTimeFrame = function() {
    let time = b.getNormalizedCurrentFrame();
    f[time].removeClass("previous-image").addClass("current-image")
}
b.getNormalizedCurrentFrame = function() {
    var a, b;
    return e.disableWrap ? (a = Math.min(e.currentFrame, e.totalFrames - (e.zeroBased ? 1 : 0)), b = Math.min(e.endFrame, e.totalFrames - (e.zeroBased ? 1 : 0)), a = Math.max(a, e.zeroBased ? 0 : 1), b = Math.max(b, e.zeroBased ? 0 : 1), e.currentFrame = a, e.endFrame = b) : (a = Math.ceil(e.currentFrame % e.totalFrames)) < 0 && (a += e.totalFrames - (e.zeroBased ? 1 : 0)), a
}, b.getCurrentFrame = function() {
    return e.currentFrame
}
b.render = function() {
        var a;
        if (obj.currenTime !== obj.videoDuration) {
            if (obj.videoDuration < obj.currenTime) {
                a = Math.floor(.1 * (obj.videoDuration - obj.currenTime))
            } else {
                a = Math.ceil(.1 * (obj.videoDuration - obj.currenTime));

            }
            obj.currenTime += a;
            b.showCurrentTimeFrame();
            b.$el.trigger("frameIndexChanged", [b.getNormalizedCurrentFrame(), obj.totalFrames]);
        } else {
            window.clearInterval(obj.ticker);
            obj.ticker = 0
        }
    }
    //Track the cursor when dragging

var currentMousePos = {
    x: -1,
    y: -1
};
$(document).mousemove(function(event) {
    currentMousePos.x = event.pageX;
    currentMousePos.y = event.pageY;
    $("#mouse-position").html(`x: ${currentMousePos.x}, y: ${currentMousePos.y}`);
});
$("#mouse-obj-position").html(`x: ${obj.pointerEndPosX}`);
b.trackPointer = function(key) {

    $("#mouse-position").html(`x: ${currentMousePos.x}, y: ${currentMousePos.y}`);
    $("#mouse-obj-position").html(`x: ${obj.pointerEndPosX}`);

    $("#mouse-drgging").html(`trackPointer ${obj.dragging}\n`);
    if (obj.ready && obj.dragging) {

        obj.pointerEndPosX = b.getPointerEvent(key).pageX;
        $("#mouse-obj-position").html(`x: ${obj.pointerEndPosX}`);
        obj.pointerDistance = obj.pointerEndPosX - obj.pointerStartPosX;
        if (obj.monitorStartTime < (new Date).getTime() - obj.monitorInt && obj.pointerDistance > 0 && obj.pointerDistance > 0) {
            obj.videoDuration = obj.currentTime + Math.ceil((obj.totalFrames - 1) * obj.speedMultiplier * (obj.pointerDistance / b.$el.width()))
        } else {
            obj.videoDuration = obj.currentTime + Math.floor((obj.totalFrames - 1) * obj.speedMultiplier * (obj.pointerDistance / b.$el.width()))
        }
        obj.disableWrap && (obj.videoDuration = Math.min(obj.totalFrames - (obj.zeroBased ? 1 : 0), obj.videoDuration), obj.videoDuration = Math.max(obj.zeroBased ? 0 : 1, obj.videoDuration)), b.refresh(), obj.monitorStartTime = (new Date).getTime(), obj.pointerStartPosX = b.getPointerEvent(key).pageX
    }

}
b.browser = {}
b.browser.isIE = function() {
    var key = -1;
    if ("Microsoft Internet Explorer" === navigator.appName) {
        var b = navigator.userAgent;
        null !== new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})").exec(b) && (key = parseFloat(RegExp.$1))
    }
    return -1 !== key
}

function CheckDrag(key) {
    key.preventDefault();
    //check if mouse right click on element
    if ("mousedown" === key.type && 1 === key.which || "touchstart" === key.type) {
        obj.pointerStartPosX = b.getPointerEvent(key).pageX;
        obj.dragging = true;
        obj.onDragStart(obj.currentTime);
        $("#mouse-drgging").html(`mouse down ${obj.dragging}`);
    } else {
        if ("touchmove" === key.type) {
            b.trackPointer(key);
        } else {
            if ("touchend" === key.type) {
                obj.dragging = false;
                obj.onDragStop(obj.videoDuration);
                $("#mouse-drgging").html(`touch ${obj.dragging}`);
            }
        }
    }
}