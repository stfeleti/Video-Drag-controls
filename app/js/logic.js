$("#video").bind("mousedown touchstart touchmove touchend mousemove click", ($) => {
    $.preventDefault();
    if ("mousedown" === $.type && 1 === $.which || "touchstart" === $.type) {
        a.pointerStartPosX = n.getPointerEvent($).pageX;
        a.dragging = !0;
        a.onDragStart(a.currentTime);
    } else if ("touchmove" === $.type) {
        n.trackPointer($)
    } else if ("touchend" === $.type) {
        a.dragging = false;
        a.onDragStop(a.stopVideoAt)
    }
})


var n;
var a;

function GetDragObject(element, options) {
    var a, n = this;
    n.$el = $(element);

    a = $.extend({}, defaultOptions, r)

    (n.$el.bind("mousedown touchstart touchmove touchend mousemove click", function(e) {
        e.preventDefault();
        if ("mousedown" === e.type && 1 === e.which || "touchstart" === e.type) {
            a.pointerStartPosX = n.getPointerEvent(e).pageX;
            a.dragging = !0;
            a.onDragStart(a.currentTime);
        } else if ("touchmove" === e.type)
            n.trackPointer(e);
        else if ("touchend" === e.type) {
            a.dragging = false;
            a.onDragStop(a.endTime);
        }
    }), e(document).bind("mouseup", function(t) {
        a.dragging = false;
        a.onDragStop(a.endTime);
    }), e(document).bind("mousemove", function(e) {
        if (a.dragging) {
            e.preventDefault()
            if (n.browser.isIE && a.showCursor)
                n.$el.css('cursor', 'grabbing')
            else if (!n.browser.isIE && a.showCursor) n.$el.css('cursor', 'grab');
            return n.trackPointer(e)
        }
    }));

    n.getPointerEvent = function(e) {
        return e.originalEvent.targetTouches ? e.originalEvent.targetTouches[0] : e
    };
    n.trackPointer = function(e) {
        if (a.ready && a.dragging) {
            a.pointerEndPosX = n.getPointerEvent(e).pageX;
            if (a.monitorStartTime < (new Date).getTime() - a.monitorInt) {
                a.pointerDistance = a.pointerEndPosX - a.pointerStartPosX;
                if (a.pointerDistance > 0)
                    a.endTime = a.currentTime + Math.ceil((a.totalTime - 1) * a.speedMultiplier * (a.pointerDistance / n.$el.width()))
                else
                    a.endTime = a.currentTime + Math.floor((a.totalTime - 1) * a.speedMultiplier * (a.pointerDistance / n.$el.width())), a.disableWrap && (a.endTime = Math.min(a.totalTime - (a.zeroBased ? 1 : 0), a.endTime), a.endTime = Math.max(a.zeroBased ? 0 : 1, a.endTime)), n.refresh(), a.monitorStartTime = (new Date).getTime(), a.pointerStartPosX = n.getPointerEvent(e).pageX
            }
        }
    };
    n.refresh = function() {
        if (0 === a.ticker) {
            a.ticker = setInterval(n.render, Math.round(1e3 / a.framerate))
        }
    }



    return a;
}

defaultOptions = {
    dragging: false,
    ready: false,
    pointerStartPosX: 0,
    pointerEndPosX: 0,
    pointerDistance: 0,
    monitorStartTime: 0,
    monitorInt: 10,
    ticker: 0,
    speedMultiplier: 20,
    videoduration: 180,
    currentTime: 0,
    stopVideoAt: 0,
    loadedVideo: 0,
    Timerate: 60,
    domains: null,
    domain: "",
    parallel: false,
    queueAmount: 8,
    idle: 0,
    filePrefix: "",
    ext: "png",
    height: 300,
    width: 300,
    styles: {},
    navigation: false,
    newGui: false,
    position: "top-right",
    fullscreen: false,
    fSBackgroundColor: "#fff",
    autoplay: false,
    autoplayDirection: 1,
    disableSpin: false,
    disableWrap: false,
    responsive: false,
    zeroPadding: false,
    zeroBased: false,
    plugins: [],
    showCursor: true,
    drag: !0,
    onReady: function() {},
    onDragStart: function() {},
    onDragStop: function() {},
    videoContainer: ".threesixty_images",
    imgArray: null,
    playSpeed: 100
}