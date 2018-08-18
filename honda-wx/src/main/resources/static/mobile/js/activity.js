$(function () {
    /*原型函数，存放全局数据*/
    function activity() {
        this.imgList = [
            {src: "img/page2-bg.jpg"},
            {src: "img/map.png", left: toRem(144), top: toRem(355)},
            {src: "img/store.png", left: toRem(312), top: toRem(374)},
            {src: "img/page4-bg.jpg", left: 749, top: 123},
            {src: "img/page5-bg.jpg"},
        ]
        this.cityList = [
            {left: toRem(445), top: toRem(508)}, //武汉,proportion是高和宽与武汉差之比
            //从乌鲁木齐开始，顺时针
            {left: toRem(246), top: toRem(398)},
            {left: toRem(382), top: toRem(451)},
            {left: toRem(389), top: toRem(406)},
            {left: toRem(436), top: toRem(443)},
            {left: toRem(459), top: toRem(430)},
            {left: toRem(476), top: toRem(414)},
            {left: toRem(514), top: toRem(384)},
            {left: toRem(491), top: toRem(457)},
            {left: toRem(483), top: toRem(489)},
            {left: toRem(512), top: toRem(489)},
            {left: toRem(520), top: toRem(518)},
            {left: toRem(505), top: toRem(557)},
            {left: toRem(472), top: toRem(548)},
            {left: toRem(463), top: toRem(589)},
            {left: toRem(446), top: toRem(554)},
            {left: toRem(421), top: toRem(632)},
            {left: toRem(412), top: toRem(587)},
            {left: toRem(394), top: toRem(558)},
            {left: toRem(340), top: toRem(572)},
            {left: toRem(362), top: toRem(522)},
            {left: toRem(249), top: toRem(506)},
            {left: toRem(293), top: toRem(463)}
        ]
    }

    /*第三页单位换算*/
    function toRem($px) {
        return $px
    }

    /*阻止浏览器默认行为*/
    function preventDefault(event) {
        if (event.cancelable) {
            if (!event.defaultPrevented) {
                event.preventDefault()
            }
            event.stopPropagation()
        }
    }

    /*初始化页面*/
    activity.prototype.init = function () {
        // $(window).bind('orientationchange', function (e) {
        //     alert("请竖屏浏览页面!")
        //     $(window).off("orientationchange")
        // });
        $.showLoading()
        var that = this, numberTh = 0
        /*获取用户信息*/
        that.getCarownerInfo()
        /*加载图片, 并绑定第一页按钮*/
        that.loadImg()
        /*proportion是高和宽与武汉差之比*/
        for (var i = 1, length = this.cityList.length; i < length; i++) {
            this.cityList[i].proportion = (this.cityList[i].top - this.cityList[0].top) / (this.cityList[i].left - this.cityList[0].left)
            if (this.cityList[i].proportion < 0) {
                this.cityList[i].proportion = -this.cityList[i].proportion
            }
        }
        /*第一页动画*/
        $("#page1").animate({"opacity": "1"}, 300, function () {
            showNumber()
        })

        function showNumber() {
            $("#textNumber .text-number").eq(numberTh).animate({"opacity": "1"}, 150, function () {
                numberTh++
                if (numberTh < $("#textNumber .text-number").length) {
                    showNumber()
                } else {
                    $("#page1Btn").fadeIn(300)
                }
            })
        }

        $.hideLoading()
    }
    /*获取用户信息*/
    activity.prototype.getCarownerInfo = function () {
        this.headerImg = "img/header-img.jpg"
        $("#headerImg").attr("src", "img/header-img.jpg")
    }
    /*加载图片, 并绑定第一页按钮*/
    activity.prototype.loadImg = function () {
        $.showLoading()
        var that = this, isLoad = [], length = this.imgList.length
        for (var i = 0; i < length; i++) {
            that.imgList[i].image = new Image()
            that.imgList[i].image.src = that.imgList[i].src
            that.imgList[i].image.onload = function () {
                isLoad.push(1)
            }
        }
        var start = window.setInterval(function () {
            if (isLoad.length == length) {
                $.hideLoading()
                that.start()
                clearInterval(start)
            }
        }, 100)
    }
    /*点击开始按钮,隐藏第一页内容*/
    activity.prototype.start = function (e) {
        var that = this, page1Bg = new Image(), fadeOutList = [
            $("#page1ContentText"), $("#page1ContentBottom"), $("#page1Btn")
        ]
        page1Bg.src = that.imgList[0].src
        $("#page1Btn").click(function (event) {
            if (!event.defaultPrevented) {
                event.preventDefault()
            }
            $("#contentInfo").show()
            $("#headerImg").fadeIn()
            for (var i = 0, length = fadeOutList.length; i < length; i++) {
                fadeOutList[i].fadeOut(500)
            }
            $("#page1").animate({"opacity": "0"}, 500, "linear", function () {
                $(this).css({
                    "background-image": "url(" + page1Bg.src + ")", "opacity": "0"
                }).animate({"opacity": "1"}, 800, "linear", function () {
                    /*显示用户信息动画*/
                    that.showInfo()
                })
            })
        })
    }
    /*显示用户信息动画*/
    activity.prototype.showInfo = function () {
        var showTagList = [
            $("#contentInfoTitle"), $("#contentInfoText"), $("#textTime"), $("#textCong"), $("#textHonda"), $("#textDays"), $("#textPeer"), $("#contentMotto")
        ], listNum = 0, that = this
        $("#headerImg").animate({"bottom": "79%"}, 600, "linear", function () {
            $("#contentInfo").animate({"opacity": "1"}, 500, "linear", function () {
                fadeInCon()
            })
        })

        function fadeInCon() {
            showTagList[listNum].fadeIn(500, function () {
                listNum++
                if (listNum < showTagList.length) {
                    fadeInCon()
                } else {
                    carAnimate()
                }
            })
        }

        /*小车动画*/
        function carAnimate() {
            var isEnd = 0
            $("#car").animate({"bottom": "3rem", "width": "5.575rem", "height": "2.65rem"}, 500);
            $("#more").fadeIn(300)
            console.log(111)
            /*滑到下一页*/
            var swiper = new Swiper('.swiper-container', {
                direction: 'vertical',
                on: {
                    slideChangeTransitionEnd: function () {
                        if (isEnd == 0) {
                            /*动画结束的回调,第三页动画*/
                            that.dot()
                            console.log(222)
                            isEnd = 1
                        }
                    }
                }
            });
            /*如果1.5s后未执行swiper的回调函数*/
            window.setTimeout(function () {
                if (isEnd == 0) {
                    that.dot()
                    console.log(333)
                    isEnd = 1
                }
            }, 1500)
        }
    }
    /*第三页动画,画点*/
    activity.prototype.dot = function () {
        var c = document.getElementById("page3Cvs"),
            ctx = c.getContext("2d"),
            that = this,
            r = 0, //圆的半径
            stop = 0
        /*地图*/
        // ctx.drawImage(that.imgList[1].image, 0, 0, that.imgList[1].image.width, that.imgList[1].image.height, that.imgList[1].left, that.imgList[1].top, toRem(that.imgList[1].image.width), toRem(that.imgList[1].image.height))
        $("#page3Cvs").animate({"opacity": "1"}, 400, "linear")
        $("#btn").animate({"opacity": "1"}, 400, "linear")
        $("#btn").on("touchstart", function (e) {
            preventDefault(e)
            stop = 0
            ctx.fillStyle = 'white'
            ctx.strokeStyle = 'white'
            ctx.beginPath()
            requestAnimationFrame(drawDot)
        })
        $("#btn").on("touchend", function () {
            stop = 1
        })

        /*画点，武汉*/
        function drawDot() {
            ctx.arc(that.cityList[0].left, that.cityList[0].top, r, 0, 2 * Math.PI)
            ctx.fill()
            ctx.stroke()
            r++;
            if (stop == 1) {
                return
            }
            /*控制圆的半径*/
            if (r < 8) {
                requestAnimationFrame(drawDot)
            } else {
                $("#btn").off("touchstart")
                that.line(ctx)
            }
        }
    }
    /*第三页动画,画线*/
    activity.prototype.line = function (ctx) {
        var that = this, time = 2000, cx = [], endx, endy, islarge = 0
        for (var i = 1, length = that.cityList.length; i < length; i++) {
            cx.push(0)
            drawline(i)
        }
        $("#btn").on("touchstart", function (e) {
            preventDefault(e)
            for (var i = 1, length = that.cityList.length; i < length; i++) {
                stop = 0
                drawline(i)
            }
        })
        $("#btn").on("touchend", function () {
            stop = 1
        })

        function drawline(i) {
            ctx.beginPath()
            ctx.moveTo(that.cityList[0].left, that.cityList[0].top)
            /*没有考虑x,y坐标相等的情况*/
            if (that.cityList[i].left > that.cityList[0].left && that.cityList[i].top > that.cityList[0].top) {
                endx = that.cityList[0].left + cx[i - 1]
                endy = that.cityList[0].top + cx[i - 1] * (that.cityList[i].proportion)
                islarge = 1
            } else if (that.cityList[i].left > that.cityList[0].left && that.cityList[i].top < that.cityList[0].top) {
                endx = that.cityList[0].left + cx[i - 1]
                endy = that.cityList[0].top - cx[i - 1] * (that.cityList[i].proportion)
                islarge = 1
            } else if (that.cityList[i].left < that.cityList[0].left && that.cityList[i].top > that.cityList[0].top) {
                endx = that.cityList[0].left - cx[i - 1]
                endy = that.cityList[0].top + cx[i - 1] * (that.cityList[i].proportion)
                islarge = 0

            } else if (that.cityList[i].left < that.cityList[0].left && that.cityList[i].top < that.cityList[0].top) {
                endx = that.cityList[0].left - cx[i - 1]
                endy = that.cityList[0].top - cx[i - 1] * (that.cityList[i].proportion)
                islarge = 0
            }
            if (stop == 1) {
                return
            }
            if (islarge == 1) {
                if (endx < that.cityList[i].left) {
                    ctx.lineTo(endx, endy)
                    ctx.stroke()
                    //控制画线速度
                    cx[i - 1] = cx[i - 1] + 2
                    requestAnimationFrame(function () {
                        drawline(i)
                    })
                }
            } else {
                if (endx > that.cityList[i].left) {
                    ctx.lineTo(endx, endy)
                    ctx.stroke()
                    //控制画线速度
                    cx[i - 1] = cx[i - 1] + 2
                    requestAnimationFrame(function () {
                        drawline(i)
                    })
                } else {
                    //i==1代表乌鲁木齐
                    if (i == 1) {
                        $("#btn").off("touchstart")
                        window.setTimeout(function () {
                            that.storeImg(ctx)
                        }, 200)
                    }
                }
            }
        }
    }
    /*出现专营店*/
    activity.prototype.storeImg = function (ctx) {
        var that = this
        ctx.drawImage(that.imgList[2].image, 0, 0, that.imgList[2].image.width, that.imgList[2].image.height, that.imgList[2].left, that.imgList[2].top, toRem(that.imgList[2].image.width), toRem(that.imgList[2].image.height))
        that.narrow(ctx)
    }
    /*缩小动画*/
    activity.prototype.narrow = function (ctx) {
        var that = this,
            prop = 123 / 749, //比例
            prop2 = 2796 / 1500,
            cx = 0,
            stop = 0
        ctx.drawImage(that.imgList[3].image, 749, 123, 750, 1206, 0, 0, 750, 1206)
        drawBg()
        $("#btn").on("touchstart", function (e) {
            preventDefault(e)
            stop = 0
            drawBg()
        })
        $("#btn").on("touchend", function (e) {
            stop = 1
        })

        function drawBg() {
            ctx.drawImage(that.imgList[3].image, 749 - (cx / 2), 123 - ((cx / 2) * prop), 750 + cx, 1206 + (cx * prop2), 0, 0, 750, 1206)
            if (stop == 1) {
                return
            }
            cx = cx + 3
            if (749 - (cx / 2) > 0) {
                requestAnimationFrame(drawBg)
            } else {
                $("#btn").off("touchstart")
                that.largeMobile(ctx)
            }
        }
    }
    /*放大动画*/
    activity.prototype.largeMobile = function (ctx) {
        var that = this,
            prop = (that.imgList[3].image.height - 172 * (1206 / 750)) / (that.imgList[3].image.width - 172), //yx比例
            scale = that.imgList[3].image.width / 750, //缩小比例
            xscale = 1463 / (615 + 1463),
            yscale = 1901 / 1463,
            left = 1463, top = 1901, //缩小位置
            sx = 0,
            sx2 = 0,
            syscale2 = (1206 - ((172 * prop) / (2250 / 750))) / (750 - (172 / (2250 / 750))),
            stop = 0
        var c = document.getElementById("page4Cvs"),
            ctx2 = c.getContext("2d")
        ctx.clearRect(0, 0, 750, 1206)
        ctx.drawImage(that.imgList[3].image, 0, 0, that.imgList[3].image.width, that.imgList[3].image.height, 0, 0, 750, 1206)
        ctx.drawImage(that.imgList[4].image, 0, 0, that.imgList[4].image.width, that.imgList[4].image.height, 1463 / (2250 / 750), 1901 / (4002 / 1206), 172 / (2250 / 750), 172 * prop / (2250 / 750))
        drawMobile()
        $("#btn").on("touchstart", function (e) {
            preventDefault(e)
            stop = 0
            drawMobile()
        })
        $("#btn").on("touchend", function (e) {
            stop = 1
        })

        function drawMobile() {
            // ctx.drawImage(that.imgList[3].image, 1463, 1901, 172, (172 * 1.608), 0, 0, 750, 1206)
            ctx.drawImage(that.imgList[3].image, sx * xscale, (sx * xscale) * yscale, that.imgList[3].image.width - sx, that.imgList[3].image.height - sx * prop, 0, 0, 750, 1206)
            ctx.drawImage(that.imgList[4].image, 0, 0, that.imgList[4].image.width, that.imgList[4].image.height, 1463 / (2250 / 750) - (sx2 * xscale), 1901 / (4002 / 1206) - ((sx2 * xscale) * yscale), 172 / (2250 / 750) + sx2, 172 * prop / (2250 / 750) + sx2 * syscale2)
            console.log(that.imgList[4].image, 0, 0, that.imgList[4].image.width, that.imgList[4].image.height, 1463 / (2250 / 750) - (sx2 * xscale), 1901 / (4002 / 1206) - ((sx2 * xscale) * yscale), 172 / (4002 / 1206) + sx2, 172 * prop / (4002 / 1206) + sx2 * syscale2)
            if (stop == 1) {
                return
            }
            sx = sx + 3
            //调整手机放大速率
            sx2 = sx2 + 0.3 * ((750 - 172 / (2250 / 750)) / (that.imgList[3].image.width - 172))
            if (172 * prop / (4002 / 1206) + sx2 * syscale2 > 140) {
                sx2 = sx2 + 0.5 * ((750 - 172 / (2250 / 750)) / (that.imgList[3].image.width - 172))
            }
            if (172 * prop / (4002 / 1206) + sx2 * syscale2 > 190) {
                sx2 = sx2 + 0.8 * ((750 - 172 / (2250 / 750)) / (that.imgList[3].image.width - 172))
            }
            if (172 * prop / (4002 / 1206) + sx2 * syscale2 > 270) {
                sx2 = sx2 + 3 * ((750 - 172 / (2250 / 750)) / (that.imgList[3].image.width - 172))
            }
            if (172 * prop / (4002 / 1206) + sx2 * syscale2 > 600) {
                sx2 = sx2 + 9 * ((750 - 172 / (2250 / 750)) / (that.imgList[3].image.width - 172))
            }
            if (172 * prop / (4002 / 1206) + sx2 * syscale2 > 700) {
                sx2 = sx2 + 12 * ((750 - 172 / (2250 / 750)) / (that.imgList[3].image.width - 172))
            }
            if (that.imgList[3].image.width - sx > 172) {

                requestAnimationFrame(drawMobile)
            } else {
                ctx.drawImage(that.imgList[4].image, 0, 0, that.imgList[4].image.width, that.imgList[4].image.height, 0, 0, 750, 1206)
                $("#btn").off("touchstart")
            }
        }

    }
    /*最后一页*/
    // 1.608
    activity.prototype.pageEnd = function () {
        var that = this
        window.setTimeout(function () {
            $(".swiper-wrapper").fadeOut(600, function () {
                $("#pageEnd").fadeIn(400)
            })
        }, 500)
        $("#watchAgain").click(function () {
            window.location.reload()
        })
    }

    var activity = new activity()
    activity.init()
})
