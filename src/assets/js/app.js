/*********************************/
/*         INDEX                 */
/*================================
 *     01.  Loader               *
 *     02.  Toggle Menus         *
 *     03.  Active Menu          *
 *     04.  Clickable Menu       *
 *     05.  Back to top          *
 *     06.  Feather icon         *
 *     06.  DD Menu              *
 *     06.  Active Sidebar Menu  *
 *     07.  Contact us           *
 *     08.  Wow Animation JS     *
 ================================*/

window.addEventListener("load", fn, false);

//  window.onload = function loader() {
function fn() {
  // Preloader
  if (document.getElementById("preloader")) {
    setTimeout(() => {
      document.getElementById("preloader").style.visibility = "hidden";
      document.getElementById("preloader").style.opacity = "0";
    }, 350);
  }
  // Menus
  activateMenu();
}

//Menu
/*********************/
/* Toggle Menu */
/*********************/
function toggleMenu() {
  document.getElementById("isToggle").classList.toggle("open");
  var isOpen = document.getElementById("navigation");
  isOpen.classList.toggle("open");
}
/*********************/
/*    Menu Active    */
/*********************/
function getClosest(elem, selector) {
  // Element.matches() polyfill
  if (!Element.prototype.matches) {
    Element.prototype.matches =
      Element.prototype.matchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.msMatchesSelector ||
      Element.prototype.oMatchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      function (s) {
        var matches = (this.document || this.ownerDocument).querySelectorAll(s),
          i = matches.length;
        while (--i >= 0 && matches.item(i) !== this) {}
        return i > -1;
      };
  }

  // Get the closest matching element
  for (; elem && elem !== document; elem = elem.parentNode) {
    if (elem.matches(selector)) return elem;
  }
  return null;
}

function activateMenu() {
  var menuItems = document.getElementsByClassName("sub-menu-item");
  if (menuItems) {
    var matchingMenuItem = null;
    for (var idx = 0; idx < menuItems.length; idx++) {
      if (menuItems[idx].href === window.location.href) {
        matchingMenuItem = menuItems[idx];
      }
    }

    if (matchingMenuItem) {
      matchingMenuItem.classList.add("active");

      var immediateParent = getClosest(matchingMenuItem, "li");

      if (immediateParent) {
        immediateParent.classList.add("active");
      }

      var parent = getClosest(immediateParent, ".child-menu-item");
      if (parent) {
        parent.classList.add("active");
      }

      var parent = getClosest(parent || immediateParent, ".parent-menu-item");

      if (parent) {
        parent.classList.add("active");

        var parentMenuitem = parent.querySelector(".menu-item");
        if (parentMenuitem) {
          parentMenuitem.classList.add("active");
        }

        var parentOfParent = getClosest(parent, ".parent-parent-menu-item");
        if (parentOfParent) {
          parentOfParent.classList.add("active");
        }
      } else {
        var parentOfParent = getClosest(
          matchingMenuItem,
          ".parent-parent-menu-item"
        );
        if (parentOfParent) {
          parentOfParent.classList.add("active");
        }
      }
    }
  }
}
/*********************/
/*  Clickable manu   */
/*********************/
if (document.getElementById("navigation")) {
  var elements = document
    .getElementById("navigation")
    .getElementsByTagName("a");
  for (var i = 0, len = elements.length; i < len; i++) {
    elements[i].onclick = function (elem) {
      if (elem.target.getAttribute("href") === "javascript:void(0)") {
        var submenu = elem.target.nextElementSibling.nextElementSibling;
        submenu.classList.toggle("open");
      }
    };
  }
}
/*********************/
/*   Menu Sticky     */
/*********************/
function windowScroll() {
  const navbar = document.getElementById("topnav");
  if (navbar != null) {
    if (
      document.body.scrollTop >= 80 ||
      document.documentElement.scrollTop >= 80
    ) {
      navbar.classList.add("nav-sticky");
    } else {
      navbar.classList.remove("nav-sticky");
    }
  }
}

window.addEventListener("scroll", (ev) => {
  ev.preventDefault();
  windowScroll();
});
/*********************/
/*    Back To TOp    */
/*********************/

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  var mybutton = document.getElementById("back-to-top");
  if (mybutton != null) {
    if (
      document.body.scrollTop > 500 ||
      document.documentElement.scrollTop > 500
    ) {
      mybutton.classList.add("block");
      mybutton.classList.remove("hidden");
    } else {
      mybutton.classList.add("hidden");
      mybutton.classList.remove("block");
    }
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
/*************************/
/*      Section Scroll       */
/*************************/
/*!*/
const sections = document.querySelectorAll("section");
const navLi = document.querySelectorAll(".navigation-menu li a");
window.onscroll = () => {
  var current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 120) {
      current = section.getAttribute("id");
    }
  });

  navLi.forEach((li) => {
    li.classList.remove("active");
    console.log(li.classList, current);
    if (li.classList.contains(current)) {
      li.classList.add("active");
    }
  });
  console.log("current", current);
};

/*************************/
/*      Iframe Lightbox       */
/*************************/
/*!
 * modified Simple lightbox effect in pure JS
 * @see {@link https://github.com/squeral/lightbox}
 * @see {@link https://github.com/squeral/lightbox/blob/master/lightbox.js}
 * @params {Object} elem Node element
 * @params {Object} [rate] debounce rate, default 500ms
 * new IframeLightbox(elem)
 * passes jshint
 */
!(function (t, e) {
  "use strict";
  var i = e.body || "",
    o = "appendChild",
    n = "classList",
    s = "createElement",
    l = "dataset",
    a = "getElementsByClassName",
    d = "addEventListener",
    r = "iframe-lightbox",
    c = "iframe-lightbox--open",
    h = "iframe-lightbox-link--is-binded",
    f = "is-loaded",
    u = "is-opened",
    m = "is-showing",
    p = function (t, i) {
      var o = i || {};
      (this.trigger = t),
        (this.el = e[a](r)[0] || ""),
        (this.body = this.el ? this.el[a]("body")[0] : ""),
        (this.content = this.el ? this.el[a]("content")[0] : ""),
        (this.src = t[l].src || ""),
        (this.href = t.getAttribute("href") || ""),
        (this.dataPaddingBottom = t[l].paddingBottom || ""),
        (this.dataScrolling = t[l].scrolling || ""),
        (this.rate = o.rate || 500),
        (this.scrolling = o.scrolling),
        /*!
         * Event handlers
         */
        (this.onOpened = o.onOpened),
        (this.onIframeLoaded = o.onIframeLoaded),
        (this.onLoaded = o.onLoaded),
        (this.onCreated = o.onCreated),
        (this.onClosed = o.onClosed),
        this.init();
    };
  (p.prototype.init = function () {
    var t = this;
    this.el || this.create();
    var e = function () {
      t.open();
    };
    this.trigger[n].contains(h) ||
      (this.trigger[n].add(h),
      this.trigger[d]("click", function (t) {
        var i, o, n, s, l, a;
        t.stopPropagation(),
          t.preventDefault(),
          ((i = e),
          (o = this.rate),
          function () {
            (l = this), (s = [].slice.call(arguments, 0)), (a = new Date());
            var t = function () {
              var e = new Date() - a;
              e < o ? (n = setTimeout(t, o - e)) : ((n = null), i.apply(l, s));
            };
            n || (n = setTimeout(t, o));
          }).call();
      }));
  }),
    (p.prototype.create = function () {
      var l = this,
        a = e[s]("div");
      (this.el = e[s]("div")),
        (this.content = e[s]("div")),
        (this.body = e[s]("div")),
        this.el[n].add(r),
        a[n].add("backdrop"),
        this.content[n].add("content"),
        this.body[n].add("body"),
        this.el[o](a),
        this.content[o](this.body),
        (this.contentHolder = e[s]("div")),
        this.contentHolder[n].add("content-holder"),
        this.contentHolder[o](this.content),
        this.el[o](this.contentHolder),
        (this.btnClose = e[s]("a")),
        this.btnClose[n].add("btn-close"),
        this.btnClose.setAttribute("href", "javascript:void(0);"),
        this.el[o](this.btnClose),
        i[o](this.el),
        a[d]("click", function () {
          l.close();
        }),
        this.btnClose[d]("click", function () {
          l.close();
        }),
        t[d]("keyup", function (t) {
          27 === (t.which || t.keyCode) && l.close();
        });
      var c = function () {
        l.isOpen() || (l.el[n].remove(m), (l.body.innerHTML = ""));
      };
      this.el[d]("transitionend", c, !1),
        this.el[d]("webkitTransitionEnd", c, !1),
        this.el[d]("mozTransitionEnd", c, !1),
        this.el[d]("msTransitionEnd", c, !1),
        this.callCallback(this.onCreated, this);
    }),
    (p.prototype.loadIframe = function () {
      var t = this;
      (this.iframeId = r + Date.now()),
        (this.iframeSrc = this.src || this.href || "");
      /*!
       * @see {@link https://stackoverflow.com/questions/18648203/how-remove-horizontal-scroll-bar-for-iframe-on-google-chrome}
       */
      var i,
        o,
        s,
        l = [];
      l.push(
        '<iframe src="' +
          this.iframeSrc +
          '" name="' +
          this.iframeId +
          '" id="' +
          this.iframeId +
          '" onload="this.style.opacity=1;" style="opacity:0;border:none;" webkitallowfullscreen="true" mozallowfullscreen="true" allowfullscreen="true" height="166" frameborder="no"></iframe>'
      ),
        /*!
         * @see {@link https://epic-spinners.epicmax.co/}
         */
        l.push(
          '<div class="half-circle-spinner"><div class="circle circle-1"></div><div class="circle circle-2"></div></div>'
        ),
        (this.body.innerHTML = l.join("")),
        (i = this.iframeId),
        (o = this.body),
        ((s = e.getElementById(i)).onload = function () {
          (this.style.opacity = 1),
            o[n].add(f),
            t.scrolling || t.dataScrolling
              ? (s.removeAttribute("scrolling"), (s.style.overflow = "scroll"))
              : (s.setAttribute("scrolling", "no"),
                (s.style.overflow = "hidden")),
            t.callCallback(t.onIframeLoaded, t),
            t.callCallback(t.onLoaded, t);
        });
    }),
    (p.prototype.open = function () {
      this.loadIframe(),
        this.dataPaddingBottom
          ? (this.content.style.paddingBottom = this.dataPaddingBottom)
          : this.content.removeAttribute("style"),
        this.el[n].add(m),
        this.el[n].add(u),
        i[n].add(c),
        this.callCallback(this.onOpened, this);
    }),
    (p.prototype.close = function () {
      this.el[n].remove(u),
        this.body[n].remove(f),
        i[n].remove(c),
        this.callCallback(this.onClosed, this);
    }),
    (p.prototype.isOpen = function () {
      return this.el[n].contains(u);
    }),
    (p.prototype.callCallback = function (t, e) {
      "function" == typeof t && t.bind(this)(e);
    }),
    (t.IframeLightbox = p);
})("undefined" != typeof window ? window : this, document),
  (function (t, e) {
    "use strict";
    [].forEach.call(
      e.getElementsByClassName("iframe-lightbox-link"),
      function (t) {
        t.lightbox = new IframeLightbox(t, {
          onCreated: function () {},
          onLoaded: function () {},
          onError: function () {},
          onClosed: function () {},
          scrolling: !1,
          rate: 500,
        });
      }
    );
  })("undefined" != typeof window && window, document);
