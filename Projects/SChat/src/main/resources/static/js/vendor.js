!function() {
    var s = document.getElementById("container"), e = s ? s.getAttribute("data-init") || "init" : "init", a = document.getElementById("seajsnode").getAttribute("src"), i = a.lastIndexOf("?") > 0 ? a.substring(a.lastIndexOf("?") + 1) : "20141111", t = "";
    seajs.config({alias: {jquery: "jquery-1.8.2.min.js", json2: "lib/json2.js", lazyload: "mod/lazyload.js", silder: "mod/silder.js", init: "app/" + t + "/init.js", index: "app/" + t + "/index.js", details: "app/" + t + "/details.js", activity: "app/" + t + "/activity.js", openclass: "app/" + t + "/openclass.js", publish: "app/" + t + "/publish.js", messages: "app/" + t + "/messages.js", summer: "app/" + t + "/summer.js", forum: "app/" + t + "/forum.js", kingsoft: "app/" + t + "/kingsoft.js"}, map: [[/^(.*\/.*\.(?:css|js))(?:.*)$/i, "$1?" + i]], preload: ["jquery"]}), e && seajs.use(e)
}();
define("app/openclass/init", ["lazyload"], function(i) {
    function n() {
        $(window).scrollTop() > 500 ? $("#u-gotop").fadeIn() : $("#u-gotop").fadeOut()
    }
    i("lazyload"), function() {
        function i(i, n, s) {
            function t() {
                $.ajax({url: i, dataType: "json", success: function(i) {
                        var s = i.data;
                        setTimeout(t, 1e3 * (s.time || 30)), n && n(s)
                    }, error: function(i) {
                        setTimeout(t, 3e4), s && s(i)
                    }})
            }
            t()
        }
        var n = $("#jsMsg"), s = n.next(), t = $("#msgPoint"), a = '<li class="last f-tac">你还没有消息</li>';
        i("ajax.php", function(i) {
            if (i) {
                var e = i.msgList, l = i.isRead, c = "";
                if (!e)
                    return n.html(a), void s.hide();
                s.show();
                for (var o = 0; o < e.length; o++) {
                    var d = "", r = e[o], f = r.type, h = "unread";
                    switch (f) {
                        case"1":
                            d = "discuss_detail.html?";
                            break;
                        case"2":
                            d = "/activity/detail/message/";
                            break;
                        case"3":
                            d = "/openclass/detail/message/"
                    }
                    d = d + r.top_id + ".html?replay_id=" + r.id, o == e.length - 1 && (h += " last"), c += "<li class='" + h + "'><a class='item' href=" + d + "><font>" + r.nick_name + "：</font>&nbsp;回复了你的帖子：<span>" + r.content + "</span></a></li>"
                }
                n.html(c), l ? t.show() : t.hide()
            }
        }), s.find(".line").on("click", function() {
            $.ajax({url: "/Ajax/dosaveMessage", type: "GET", dataType: "json", success: function(i) {
                    i.status && n.parent().fadeOut(function() {
                        t.hide(), n.html(a), s.hide()
                    })
                }})
        })
    }(), function() {
        $(".jsMore").hover(function() {
            clearTimeout(this.timer2);
            var i = this;
            this.timer1 = setTimeout(function() {
                $(i).find(".jsUl").show()
            }, 300)
        }, function() {
            clearTimeout(this.timer1);
            var i = this;
            this.timer2 = setTimeout(function() {
                $(i).find(".jsUl").hide()
            }, 300)
        })
    }(), $.extend({alert: function(i, n, s) {
            if ($("#m-alert").length)
                $("#m-alert").show().find(".bd").html(i);
            else {
                s = s || "确&nbsp;定";
                var t = '<div class="m-alert" id="m-alert" style="display:block;"><div class="in"><div class="hd"><a class="close" href="javascript:;" title="关闭">x</a><h4>温馨提示</h4></div><div class="bd">' + i + '</div><div class="ft"><div class="sibmit f-tac"><span class="close u-btn hover">' + s + "</span></div></div></div></div>", a = $(t);
                $("body").append(a), a.find(".close").unbind("click").bind("click", function() {
                    a.hide(), n && n()
                });
                var e = null;
                a.on("click", function(i) {
                    if ($(i.target).hasClass("m-alert")) {
                        var n = 0;
                        clearInterval(e), e = setInterval(function() {
                            a.find(".sibmit .close").toggleClass("active"), n++, 4 == n && clearInterval(e)
                        }, 120)
                    }
                })
            }
        }, confirm: function(i, n, s, t, a) {
            if (t = t || "确定", a = a || "取消", $("#m-confirm").length)
                $("#m-confirm").show().find(".bd").html(i).end().find(".jsSure").html(t).end().find(".jsCancel").html(a);
            else {
                var e = '<div class="m-alert" id="m-confirm" style="display:block;"><div class="in" style="width:260px;margin-left:-130px;"><div class="hd"><a class="close" href="javascript:;" title="关闭">x</a><h4>温馨提示</h4></div><div class="bd">' + i + '</div><div class="ft"><div class="sibmit f-tac"><span class="u-btn active jsSure">' + t + '</span><i>&nbsp;&nbsp;</i><span class="u-btn hover jsCancel">' + a + "</span></div></div></div></div>", l = $(e);
                $("body").append(l);
                var c = null;
                l.on("click", function(i) {
                    if ($(i.target).hasClass("m-alert")) {
                        var n = 0;
                        clearInterval(c), c = setInterval(function() {
                            l.find(".jsSure").toggleClass("active"), n++, 4 == n && clearInterval(c)
                        }, 120)
                    }
                })
            }
            $("#m-confirm").find(".close,.jsCancel").unbind("click").bind("click", function() {
                $("#m-confirm").hide(), s && s()
            }), $("#m-confirm").find(".jsSure").unbind("click").bind("click", function() {
                $("#m-confirm").hide(), n && n()
            })
        }, loading: function() {
            if ($("#m-load").length)
                $("#m-load").show();
            else {
                var i = '<div class="m-load" id="m-load" style="display:block;">正在努力加载中</div>';
                $("body").append(i)
            }
        }, unloading: function() {
            $("#m-load").hide()
        }, mask: function() {
            $("#j-mask").length ? $("#j-mask").show() : $("body").append("<div id='j-mask'>")
        }, unMask: function() {
            $("#j-mask").hide()
        }}), $.fn.extend({showDialog: function() {
            var i = this.height(), n = this.width(), s = $(window);
            this.css({top: s.height() / 2 + s.scrollTop(), left: "50%", "margin-left": -n / 2, "margin-top": -i / 2, position: "absolute", "z-index": 1 * $("#mask").css("z-index") + 1}), $.mask(), this.show()
        }, hideDialog: function() {
            this.hide(), $.unMask()
        }}), n(), $(window).scroll(function() {
        n()
    }), $("#u-gotop").on("click", function() {
        $("body,html").animate({scrollTop: 0}, "fast")
    })
});
define("mod/silder", [], function() {
    $.fn.extend({silder: function(t) {
            t = t || {};
            var n = {axis: "x", speed: 3e3, autoPlay: !0, hoverBtn: !0, points: !1}, e = $.extend(n, t);
            return this.each(function(t, n) {
                function i() {
                    switch (M) {
                        case"x":
                            0 > p && (p = u - 1, f.css("left", -u * v)), f.stop().animate({left: -p * v}, function() {
                                p == u && (p = 0, f.css("left", 0)), e.points && c()
                            });
                            break;
                        case"y":
                            0 > p && (p = u - 1, f.css("top", -u * m)), f.stop().animate({top: -p * m}, function() {
                                p == u && (p = 0, f.css("top", 0)), e.points && c()
                            })
                        }
                }
                function a() {
                    p--, i()
                }
                function r() {
                    p++, i()
                }
                function o() {
                    clearInterval(x), x = setInterval(function() {
                        r()
                    }, w)
                }
                function l() {
                    for (var t = "", n = 0; u > n; n++)
                        t += "<li></li>";
                    h.show().append(t), h.find("li").on("click", function() {
                        p = $(this).index(), i()
                    }).eq(0).addClass("crt")
                }
                function c() {
                    h.find("li").removeClass("crt").eq(p).addClass("crt")
                }
                var s = $(n), f = s.find("[data-silder='ul']"), d = f.children(), u = d.length, h = s.find("[data-silder='points']");
                if (2 > u)
                    return!0;
                var v = d.eq(0).outerWidth(), m = d.eq(0).outerHeight();
                f[0].innerHTML += f[0].innerHTML;
                var p = 0, x = null, w = e.speed, M = e.axis, g = e.hoverBtn;
                "x" == M ? f.width(v * u * 2) : f.height(m * u * 2);
                var I = s.find("[data-silder='prev']"), b = s.find("[data-silder='next']");
                I.click(function() {
                    f.is(":animated") || a()
                }), b.click(function() {
                    f.is(":animated") || r()
                }), s.mouseenter(function() {
                    g && (I.show(), b.show()), clearInterval(x)
                }).mouseleave(function() {
                    g && (I.hide(), b.hide()), o()
                }), $(window).on("blur", function() {
                    clearInterval(x)
                }), $(window).on("focus", function() {
                    o()
                }), e.autoPlay && o(), e.points && l()
            })
        }, hourglass: function(t) {
            t = t || {};
            var n = {tagName: "i", sEnd: "报名已结束", bStartDay: !1}, e = $.extend(n, t), i = e.tagName, a = e.sEnd, r = e.fnCb, o = e.fnClick, l = e.bStartDay, c = [144e4, 6e4, 6e4, 1e3, 100];
            return this.each(function(t, n) {
                function e() {
                    if (d > 0) {
                        var t = Math.floor(d / 864e5);
                        if (l)
                            var n = Math.floor(d / 36e5) % 24;
                        else
                            var n = Math.floor(d / 36e5);
                        var e = Math.floor(d / 6e4) % 60, i = Math.floor(d / 1e3) % 60, o = Math.floor(d / 100) % 10, c = [t, n, e, i, o];
                        f.each(function(t, n) {
                            var e = c[t];
                            10 > e && (e = "0" + e), $(n).html(e)
                        }), d -= h
                    } else
                        s.html(a), clearInterval(s[0].timer), r && r.call(s);
                    s.attr("data-timer", d)
                }
                var s = $(n), f = s.find(i), d = s.attr("data-timer") || 0, u = s.attr("data-end") || -18e5;
                if (d <= Number(u))
                    return void s.html("报名已结束");
                o && s.on("click", function() {
                    d > 0 && o()
                });
                var h = c[f.length - 1];
                clearInterval(n.timer), e(), n.timer = setInterval(function() {
                    e()
                }, h)
            })
        }})
});
define("mod/lazyload", [], function() {
    var t = $(window), i = $("img");
    t.on("load scroll resize", function() {
        var r = t.scrollTop();
        i.each(function() {
            if (this.src)
                return!0;
            var i = $(this);
            r + t.height() >= i.offset().top && (this.src = this.getAttribute("_src"), this.removeAttribute("_src"))
        })
    })
});