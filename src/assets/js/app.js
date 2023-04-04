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
  if (isOpen.style.display === "block") {
    isOpen.style.display = "none";
  } else {
    isOpen.style.display = "block";
  }
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

/*********************/
/*  Active Sidebar   */
/*********************/
(function () {
  var current = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );
  if (current === "") return;
  var menuItems = document.querySelectorAll(".sidebar-nav a");
  for (var i = 0, len = menuItems.length; i < len; i++) {
    if (menuItems[i].getAttribute("href").indexOf(current) !== -1) {
      menuItems[i].parentElement.className += " active";
    }
  }
})();

/*********************/
/*   Feather Icons   */
/*********************/
feather.replace();

/*********************/
/*    DD Menu        */
/*********************/
var ddmenu = document.getElementsByClassName("dd-menu");
for (var i = 0, len = ddmenu.length; i < len; i++) {
  ddmenu[i].onclick = function (elem) {
    elem.stopPropagation();
  };
}

/*********************/
/*     Small Menu    */
/*********************/
try {
  var spy = new Gumshoe("#navmenu-nav a");
} catch (err) {}

/*********************/
/* Dark & Light Mode */
/*********************/
try {
  function changeTheme(e) {
    e.preventDefault();
    const htmlTag = document.getElementsByTagName("html")[0];

    if (htmlTag.className.includes("dark")) {
      htmlTag.className = "light";
    } else {
      htmlTag.className = "dark";
    }
  }

  const switcher = document.getElementById("theme-mode");
  switcher?.addEventListener("click", changeTheme);

  const chk = document.getElementById("chk");

  chk.addEventListener("change", changeTheme);
} catch (err) {}

/*********************/
/*      WoW Js       */
/*********************/
try {
  new WOW().init();
} catch (error) {}

/*************************/
/*      Contact Js       */
/*************************/

try {
  function validateForm() {
    var name = document.forms["myForm"]["name"].value;
    var email = document.forms["myForm"]["email"].value;
    var subject = document.forms["myForm"]["subject"].value;
    var comments = document.forms["myForm"]["comments"].value;
    document.getElementById("error-msg").style.opacity = 0;
    document.getElementById("error-msg").innerHTML = "";
    if (name == "" || name == null) {
      document.getElementById("error-msg").innerHTML =
        "<div class='alert alert-warning error_message'>*Please enter a Name*</div>";
      fadeIn();
      return false;
    }
    if (email == "" || email == null) {
      document.getElementById("error-msg").innerHTML =
        "<div class='alert alert-warning error_message'>*Please enter a Email*</div>";
      fadeIn();
      return false;
    }
    if (subject == "" || subject == null) {
      document.getElementById("error-msg").innerHTML =
        "<div class='alert alert-warning error_message'>*Please enter a Subject*</div>";
      fadeIn();
      return false;
    }
    if (comments == "" || comments == null) {
      document.getElementById("error-msg").innerHTML =
        "<div class='alert alert-warning error_message'>*Please enter a Comments*</div>";
      fadeIn();
      return false;
    }
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("simple-msg").innerHTML = this.responseText;
        document.forms["myForm"]["name"].value = "";
        document.forms["myForm"]["email"].value = "";
        document.forms["myForm"]["subject"].value = "";
        document.forms["myForm"]["comments"].value = "";
      }
    };
    xhttp.open("POST", "php/contact.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(
      "name=" +
        name +
        "&email=" +
        email +
        "&subject=" +
        subject +
        "&comments=" +
        comments
    );
    return false;
  }

  function fadeIn() {
    var fade = document.getElementById("error-msg");
    var opacity = 0;
    var intervalID = setInterval(function () {
      if (opacity < 1) {
        opacity = opacity + 0.5;
        fade.style.opacity = opacity;
      } else {
        clearInterval(intervalID);
      }
    }, 200);
  }
} catch (error) {}
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
!function(t,e){"use strict";var i=e.body||"",o="appendChild",n="classList",s="createElement",l="dataset",a="getElementsByClassName",d="addEventListener",r="iframe-lightbox",c="iframe-lightbox--open",h="iframe-lightbox-link--is-binded",f="is-loaded",u="is-opened",m="is-showing",p=function(t,i){var o=i||{};this.trigger=t,this.el=e[a](r)[0]||"",this.body=this.el?this.el[a]("body")[0]:"",this.content=this.el?this.el[a]("content")[0]:"",this.src=t[l].src||"",this.href=t.getAttribute("href")||"",this.dataPaddingBottom=t[l].paddingBottom||"",this.dataScrolling=t[l].scrolling||"",this.rate=o.rate||500,this.scrolling=o.scrolling,
/*!
     * Event handlers
     */
this.onOpened=o.onOpened,this.onIframeLoaded=o.onIframeLoaded,this.onLoaded=o.onLoaded,this.onCreated=o.onCreated,this.onClosed=o.onClosed,this.init()};p.prototype.init=function(){var t=this;this.el||this.create();var e=function(){t.open()};this.trigger[n].contains(h)||(this.trigger[n].add(h),this.trigger[d]("click",(function(t){var i,o,n,s,l,a;t.stopPropagation(),t.preventDefault(),(i=e,o=this.rate,function(){l=this,s=[].slice.call(arguments,0),a=new Date;var t=function(){var e=new Date-a;e<o?n=setTimeout(t,o-e):(n=null,i.apply(l,s))};n||(n=setTimeout(t,o))}).call()})))},p.prototype.create=function(){var l=this,a=e[s]("div");this.el=e[s]("div"),this.content=e[s]("div"),this.body=e[s]("div"),this.el[n].add(r),a[n].add("backdrop"),this.content[n].add("content"),this.body[n].add("body"),this.el[o](a),this.content[o](this.body),this.contentHolder=e[s]("div"),this.contentHolder[n].add("content-holder"),this.contentHolder[o](this.content),this.el[o](this.contentHolder),this.btnClose=e[s]("a"),this.btnClose[n].add("btn-close"),this.btnClose.setAttribute("href","javascript:void(0);"),this.el[o](this.btnClose),i[o](this.el),a[d]("click",(function(){l.close()})),this.btnClose[d]("click",(function(){l.close()})),t[d]("keyup",(function(t){27===(t.which||t.keyCode)&&l.close()}));var c=function(){l.isOpen()||(l.el[n].remove(m),l.body.innerHTML="")};this.el[d]("transitionend",c,!1),this.el[d]("webkitTransitionEnd",c,!1),this.el[d]("mozTransitionEnd",c,!1),this.el[d]("msTransitionEnd",c,!1),this.callCallback(this.onCreated,this)},p.prototype.loadIframe=function(){var t=this;this.iframeId=r+Date.now(),this.iframeSrc=this.src||this.href||"";
/*!
     * @see {@link https://stackoverflow.com/questions/18648203/how-remove-horizontal-scroll-bar-for-iframe-on-google-chrome}
     */
var i,o,s,l=[];l.push('<iframe src="'+this.iframeSrc+'" name="'+this.iframeId+'" id="'+this.iframeId+'" onload="this.style.opacity=1;" style="opacity:0;border:none;" webkitallowfullscreen="true" mozallowfullscreen="true" allowfullscreen="true" height="166" frameborder="no"></iframe>'),
/*!
     * @see {@link https://epic-spinners.epicmax.co/}
     */
l.push('<div class="half-circle-spinner"><div class="circle circle-1"></div><div class="circle circle-2"></div></div>'),this.body.innerHTML=l.join(""),i=this.iframeId,o=this.body,(s=e.getElementById(i)).onload=function(){this.style.opacity=1,o[n].add(f),t.scrolling||t.dataScrolling?(s.removeAttribute("scrolling"),s.style.overflow="scroll"):(s.setAttribute("scrolling","no"),s.style.overflow="hidden"),t.callCallback(t.onIframeLoaded,t),t.callCallback(t.onLoaded,t)}},p.prototype.open=function(){this.loadIframe(),this.dataPaddingBottom?this.content.style.paddingBottom=this.dataPaddingBottom:this.content.removeAttribute("style"),this.el[n].add(m),this.el[n].add(u),i[n].add(c),this.callCallback(this.onOpened,this)},p.prototype.close=function(){this.el[n].remove(u),this.body[n].remove(f),i[n].remove(c),this.callCallback(this.onClosed,this)},p.prototype.isOpen=function(){return this.el[n].contains(u)},p.prototype.callCallback=function(t,e){"function"==typeof t&&t.bind(this)(e)},t.IframeLightbox=p}("undefined"!=typeof window?window:this,document),function(t,e){"use strict";[].forEach.call(e.getElementsByClassName("iframe-lightbox-link"),(function(t){t.lightbox=new IframeLightbox(t,{onCreated:function(){},onLoaded:function(){},onError:function(){},onClosed:function(){},scrolling:!1,rate:500})}))}("undefined"!=typeof window&&window,document);