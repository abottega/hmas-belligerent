/* On screen keyboard https://www.jqueryscript.net/other/Minimal-Virtual-Keyboard-Plugin-For-jQuery-SoftKey.html */
!(function(a) {
  a.fn.softkeys = function(e) {
    var t = a.extend(
        { layout: [], target: "", rowSeperator: "br", buttonWrapper: "li" },
        e
      ),
      s = function(a, e) {
        for (var s = 0; s < e.length; s++) r(a, e[s]);
        a.append("<" + t.rowSeperator + ">");
      },
      r = function(a, e) {
        var s = "",
          r = "letter",
          n = "";
        switch (typeof e) {
          case "array":
          case "object":
            void 0 !== e[0] && (s += "<span>" + e[0] + "</span>"),
              void 0 !== e[1] && (s += "<span>" + e[1] + "</span>"),
              (r = "symbol");
            break;
          case "string":
            switch (e) {
              case "capslock":
                (s = "<span>caps</span>"), (r = "capslock");
                break;
              case "shift":
                (s = "<span>shift</span>"), (r = "shift");
                break;
              case "return":
                (s = "<span>return</span>"), (r = "return");
                break;
              case "tab":
                (s = "<span>tab</span>"), (r = "tab");
                break;
              case "space":
                (s = "<span>space</span>"),
                  (r = "space"),
                  (n = "softkeys__btn--space");
                break;
              case "delete":
                (s = "<span>delete</span>"), (r = "delete");
                break;
              default:
                (s = e), (r = "letter");
            }
        }
        a.append(
          "<" +
            t.buttonWrapper +
            ' class="softkeys__btn  ' +
            n +
            '" data-type="' +
            r +
            '">' +
            s +
            "</" +
            t.buttonWrapper +
            ">"
        );
      },
      n = function(a) {
        a.toggleClass("softkeys--caps");
      },
      c = function(a) {
        a.toggleClass("softkeys--alt");
      };
    return this.each(function() {
      for (var e = 0; e < t.layout.length; e++) s(a(this), t.layout[e]);
      var r;
      (r = a(this))
        .children(t.buttonWrapper)
        .on("click touchstart", function(e) {
          e.preventDefault();
          var s = "",
            p = a(this).data("type"),
            o = a(t.target).val();
          switch (p) {
            case "capslock":
              n(r);
              break;
            case "shift":
              n(r), c(r);
              break;
            case "return":
              s = "\n";
              break;
            case "tab":
              s = "\t";
              break;
            case "space":
              s = " ";
              break;
            case "delete":
              o = o.substr(0, o.length - 1);
              break;
            case "symbol":
              s = r.hasClass("softkeys--alt")
                ? a(this)
                    .children("span")
                    .eq(1)
                    .html()
                : a(this)
                    .children("span")
                    .eq(0)
                    .html();
              break;
            case "letter":
              (s = a(this).html()),
                r.hasClass("softkeys--caps") && (s = s.toUpperCase());
          }
          a(t.target)
            .focus()
            .val(o + s);
        });
    });
  };
})(jQuery);

/* Initialise jquery on page load */

jQuery(document).ready(function($) {
	
  $(".softkeys").softkeys({
    target: $(".softkeys").data("target"),
    layout: [
      [
        ["`", "~"],
        ["1", "!"],
        ["2", "@"],
        ["3", "#"],
        ["4", "$"],
        ["5", "%"],
        ["6", "^"],
        ["7", "&amp;"],
        ["8", "*"],
        ["9", "("],
        ["0", ")"],
        ["-", "_"],
        ["=", "+"],
        "delete"
      ],
      [
        "q",
        "w",
        "e",
        "r",
        "t",
        "y",
        "u",
        "i",
        "o",
        "p",
        ["[", "{"],
        ["]", "}"]
      ],
      [
        "capslock",
        "a",
        "s",
        "d",
        "f",
        "g",
        "h",
        "j",
        "k",
        "l",
        [";", ":"],
        ["'", "&quot;"],
        ["\\", "|"]
      ],
      [
        "shift",
        "z",
        "x",
        "c",
        "v",
        "b",
        "n",
        "m",
        [",", "&lt;"],
        [".", "&gt;"],
        ["/", "?"],
        ["@"]
      ]
    ]
  });

  $("#missionControlPasscode").submit(function(e) {
    e.preventDefault();
    if ($(".passcode").val() == "atlas") {
      $(this).hide();
      $(".missionControl, .lockedHeading").show();
    } else if ($(".passcode").val() != "atlas") {
      $(".passcode").val("");
      $(".invalidEntry").show();
    }
  });

  $("#captainsLogPasscode").submit(function(e) {
    e.preventDefault();
    if ($(".passcode").val() == "therock") {
      $(this).hide();
      $(".captainsLog, .lockedHeading").show();
    } else if ($(".passcode").val() != "therock") {
      $(".passcode").val("");
      $(".invalidEntry").show();
    }
  });
  
  $("#recordingsPasscode").submit(function(e) {
    e.preventDefault();
    if ($(".passcode").val() == "2913") {
      $(this).hide();
      $(".recordings, .lockedHeading").show();
    } else if ($(".passcode").val() != "2913") {
      $(".passcode").val("");
      $(".invalidEntry").show();
    }
  });

  $("#medicalNavPasscode").submit(function(e) {
    e.preventDefault();
    if ($(".passcode").val() == "tk421") {
      window.location.href = '../menu';
    } else if ($(".passcode").val() != "tk421") {
      $(".passcode").val("");
      $(".invalidEntry").show();
    }
  });
  
  $("#labNavPasscode").submit(function(e) {
    e.preventDefault();
    if ($(".passcode").val() == "sciencebitch") {
      window.location.href = '../menu';
    } else if ($(".passcode").val() != "sciencebitch") {
      $(".passcode").val("");
      $(".invalidEntry").show();
    }
  });

  // Enhance
  var counter = 1;

  $('.enhance__button').on('click', function() {
    $('.enhance__image').attr('src','../../img/Zoom' + counter + '.jpg');
    if (counter < 9){
      counter++;
    }
  });

  // Post form to slack channel
	const getForm = selector =>
  $(selector).serializeArray().reduce( (accum, entry) => {accum[entry.name] = entry.value; return accum}, {});

  const postMessage = (formSelector, text, url) => {
  $.ajax({
    type: "POST",
    url: url,
    data: JSON.stringify({ text }),
    dataType: "json",
    complete: function() {
    $(".reportSubmitted").show().delay(5000).fadeOut();
    $(".textInput, .textArea").val("");
    }
  });
  };
  $("#submitReport").submit(event => {
    event.preventDefault();
    const formSelector = "#submitReport";
    const form = getForm(formSelector);
    const text = `Field Report - *Name: ${form.name}* | Email: ${form.email} | Report: ${form.report}`;
    postMessage(formSelector, text, "https://hooks.slack.com/services/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");
  });

  // On period of inactivity, reset to home screen

  var idleTime = 0;
  //Increment the idle time counter every 10 seconds.
  var idleInterval = setInterval(timerIncrement, 10000); // 10 seconds

  //Zero the idle timer on mouse movement.
  $(this).mousemove(function (e) {
      idleTime = 0;
  });
  $(this).keypress(function (e) {
      idleTime = 0;
  });

  function timerIncrement() {
      idleTime = idleTime + 1;
      if (idleTime > 5) { // 50 seconds
          if ($("body").hasClass("submitReport")) {
            return false;
          }
          else if ($("body").hasClass("medicalTerminal")) {
            window.location.href = '../';
          }
          else if ($("body").hasClass("labTerminal")) {
            window.location.href = '../';
          }
          else {
            window.location.href = '../';
          }
      }
  }

});
