//jQUERY - Start
$(document).ready(function () {
  //CREDIT: Function by W3SCHOOLS - smooth scrolling (using Jquery)
  $("a").on("click", function (event) {
    if (this.hash !== "") {
      event.preventDefault();
      let hash = this.hash;
      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top,
        },
        800,
        function () {
          window.location.hash = hash;
        }
      );
    }
  });
  //--- END CREDIT ---

  // Add/remove active class on nav-items
  $(".nav-link").on("click", function(e){
    $("a.nav-link").removeClass("active");
    $(this).addClass("active");
  });
  // Ease in/out preloader
  setTimeout(function () {  
    $('#preloader').fadeIn(.1);
    $('#preloader').delay(2000).fadeOut(4000);
  });
  
  /*
  CREDIT: Image slideshow inspiration from 
  https://css-tricks.com/snippets/jquery/simple-auto-playing-slideshow/ 
  */
  $(".img-container:gt(0)").hide();
  setInterval(function () {
    $(".img-container:first")
      .fadeOut(5000)
      .next()
      .fadeIn(5000)
      .end()
      .appendTo("#intro-gallery");
  }, 7000);
  //--- END CREDIT ---

  // Function to stop iframe videos playing when button is clicked
  $(".country-button, .navbar-toggler, .btn, .nav-link").click(function () {
    $(".video-player").each(function () {
      /*
      CREDIT: https://stackoverflow.com/a/30358006/14197670 
      stopVideo method no longer supported (below)
      */
      this.contentWindow.postMessage(
        '{"event":"command","func":"stopVideo","args":""}',
        "*"
      );
      //--- END CREDIT ---
    });
  });
});
//jQUERY - End

// Close mobile dropdown menu after item clicked
window.onclick = function (e) {
  let dropDown = document.getElementById("navbarResponsive");
  if (dropDown.classList.contains("show")) {
    dropDown.classList.remove("show");
  }
};
