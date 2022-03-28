// To Do:
// alphabetical jump / search


// NEW UI STUFF
// alphabetical --> search
//
// hamburger menu for entire modal
// organized alphabetically
//
// add families/segments
// query python side
// save elements to browser and then render as batch
// stick menu -> tab selected elements
// infinite scroll + list
// ground space launch at stop
// if alphabetical list --> icons on the side

$( document ).ready(function() {

  function getCookie(c_name)
  {
      if (document.cookie.length > 0)
      {
          c_start = document.cookie.indexOf(c_name + "=");
          if (c_start != -1)
          {
              c_start = c_start + c_name.length + 1;
              c_end = document.cookie.indexOf(";", c_start);
              if (c_end == -1) c_end = document.cookie.length;
              return unescape(document.cookie.substring(c_start,c_end));
          }
      }
      return "";
   };

 var options = {
         'maxDepth': 100,
         'scroll': 'true',
}
   var sorter = $("#elSort").nestable(options);

   $(".emptyNest").click(function(){
     console.log("clicked a nest")
   $('#workSpace').empty()
 });

   $('.card').on('click', '#elCheck', function () {
       console.log('did i click a crab?');
       var identifier = $(this).attr("data-id")
       var inputEl = '<li class="uk-nestable-item" id = "'+identifier+'"><div class="uk-nestable-panel" id = "'+identifier+'"><div class="uk-nestable-handle" style="display:inline;"><div class="uk-nestable-toggle" data-nestable-action="toggle"></div><i class="uk-icon uk-icon-bars uk-margin-small-right"></i></div>'+identifier+'<input  style="display:inline;" type="text" class="uk-input" data-id = "in'+identifier+'"></div></li><button class="btn btn-danger" type="button" value="X" id= "conPan" data-id = "'+identifier+'"></button>'
       $("#workSpace").append(inputEl)
       $("#workSpace").nestable(options).disableSelection()
     })


     $("#rbutton").click(function(){
       $("#success").attr("style", "display:none")
       $("#workSpace").empty().attr("style", "display:visible")
       $("#genButton").attr("style", "display:visible")
       $("#emptyNest").attr("style", "display:visible")
     })

       $('#ibutton').on('click', function (){
        event.preventDefault();
        console.log("I clicked the up here button");

        var formData = new FormData();
        var fileInput = $('#fileUp');
        //
        // console.log("fileInput")
        // console.log(fileInput)
        // console.log("next")
        // console.log(fileInput[0])
        // console.log("files time")
        // var grabFile = fileInput[0].files[0]
        //
        // formData.append("grab", grabFile)

        var importId = $(this).attr("id");
        console.log(importId)

        console.log("listing forms")
        var collection = document.forms['fileUp']
        console.log(collection)

        console.log("fomr daya")
        console.log($(fileInput[0]))
        console.log(typeof($(fileInput)))

        if (importId == "ibutton") {
          console.log("correct id")
            var data = new FormData(collection);

          } else {
            console.log("wrong id")
            data = {}
          }

        console.log(data)
    //     $.each($(fileInput).get(0).files, function (index, value) {
    //        formData.append('avatar', value);
    // });
    //
    //     formData.append($('avatar', $('#fileIn'))[0].files[0])
    //
    //     console.log(formData)

        // var data = new FormData($('#fileUp').get(0));
        // console.log("this is data")
        // console.log(data)


        $.ajaxSetup({
            headers: { "X-CSRFToken": getCookie("csrftoken") }

        });

        $.ajax(
        {
            url: "/importTemplate",
            type:"POST",
            data: data,
            cache: false,
            contentType: false,
            processData: false,

            success: function(resultM)
            {
              console.log("success upload")
              console.log(resultM)

              function upRecur(content) {
                var children = {}
                for (y in content) {

                  if ( typeof y === 'object' ) {
                    console.log("object time")
                  children[y] =  upRecur(content[y])
                  } else {
                    var li = document.createElement('li');
                    children[y] = content[y]
                    }

                }

            return children  }

            var createSublist = function(container, args) {
              var ul = document.getElementById('workSpace');

              console.log("I am in the function")
              console.log("my container is")
              console.log(container)
              console.log("my args is")
              console.log(args)

              var argFix = Object.keys(args).length

              for(var j = 0; j < argFix; j++) {
                var row = args[j];
                var li = document.createElement('li');
                li.innerText = row;

                var nodes = row.nodes;
                if(nodes && nodes.length) {
                  createSublist(li, nodes);
                }

                ul.appendChild(li);
              }

              container.appendChild(ul);
          };


                  var getSON = JSON.stringify(resultM)
                  var winSON = upRecur(resultM)

                  var container = document.getElementById("thisOne")
                    if(container)
                    {
                      console.log("i am a container!")
                      createSublist(container, winSON);
                    }
                    else
                    {
                      console.log('Container has not been found');
                    }

                  var items = [];

                    // $( "<ul/>", {
                    //   "class": "my-new-list",
                    //   html: items.join( "" )
                    // }).appendTo( "#workSpace" )


                    // var inputEl = '<li class="uk-nestable-item" data-id = "'+identifier+'"><div class="uk-nestable-panel"><div class="uk-nestable-handle" style="display:inline;"><div class="uk-nestable-toggle" data-nestable-action="toggle"></div><i class="uk-icon uk-icon-bars uk-margin-small-right"></i></div>'+identifier+'<input  style="display:inline;" type="text" class="uk-input" id = "in'+identifier+'"></div></li>'
                    // $("#workSpace").append(inputEl)

                  //  var exoptions = {
                  //          'maxDepth': 100,
                  //          'scroll': 'true',
                  //          'group': result,
                  // }
                  //  $("#workSpace").nestable(exoptions).disableSelection()

              },



                  error: function (xhr, ajaxOptions, thrownError) {
                    console.log("ERROR")
                    alert("Please choose a JSONLD file.")
                  // alert(xhr.status);
                  // alert(thrownError);
             },

           });
   });

     $("#genButton").click(function(){
       var dataObj = {}

       $("#workSpace li").each(function(i, el) {
         var elF = $(el).children(0)
         var elK = $(elF).children(0)
         var elE = $(elK)[1]
         var value = $(elE).val()
        $(this).attr("data-val", value)

      });

      var wrow = $("#workSpace").data("nestable").serialize()
      var newW = JSON.stringify(wrow)




         console.log(newW)
         console.log(typeof(newW))
          $.ajaxSetup({
              headers: { "X-CSRFToken": getCookie("csrftoken") }

          });

          $.ajax(
          {
              url: "/generate",
              type: "post",
              // contentType: "application/json; charset=utf-8",
              // accept: 'application/json',
              // dataType: "json",
              data: newW,
              // processData: false,
              // contentType: false,

              success: function(result)
              {
                console.log("success")
                console.log(result)

                $("#filedl").attr("value", result)
                $("#genButton").attr("style", "display:none")
                $("#emptyNest").attr("style", "display:none")
                $("#workSpace").attr("style", "display:none")
                $("#success").attr("style", "display:visible")

            },


              error: function (xhr, ajaxOptions, thrownError) {
                console.log("ERROR")
              alert(xhr.status);
              alert(thrownError);
              console.log("this is the thrown error")
              console.log(thrownError)
           },

          });

        });

        // BEGIN SEARCH

  const user_input = $("#user-input")
  const search_icon = $('#search-icon')
  const artists_div = $('#replaceable-content')
  const endpoint = 'search'
  const delay_by_in_ms = 700
  let scheduled_function = false

  let ajax_call = function (endpoint, request_parameters) {
  	$.getJSON(endpoint, request_parameters)
  		.done(response => {
  			// fade out the artists_div, then:
  			artists_div.fadeTo('slow', 0).promise().then(() => {
  				// replace the HTML contents
  				artists_div.html(response['html_from_view'])
  				// fade-in the div with new contents
  				artists_div.fadeTo('slow', 1)
  				// stop animating search icon
  				search_icon.removeClass('blink')


        $('.card').on('click', '#elCheck', function () {
            console.log('did i click a crab?');
            var identifier = $(this).attr("data-id")
            var inputEl = '<li class="uk-nestable-item" data-id = "'+identifier+'"><div class="uk-nestable-panel"><div class="uk-nestable-handle" style="display:inline;"><div class="uk-nestable-toggle" data-nestable-action="toggle"></div><i class="uk-icon uk-icon-bars uk-margin-small-right"></i></div>'+identifier+'<input  style="display:inline;" type="text" class="uk-input" id = "in'+identifier+'"></div></li>'
            $("#workSpace").append(inputEl)
            $("#workSpace").nestable(options).disableSelection()
          })
  			})
  		})
  }


  user_input.on('keyup', function () {
    console.log("received")

  	const request_parameters = {
  		q: $(this).val() // value of user_input: the HTML element with ID user-input
  	}

  	// start animating the search icon with the CSS class
  	search_icon.addClass('blink')

  	// if scheduled_function is NOT false, cancel the execution of the function
  	if (scheduled_function) {
  		clearTimeout(scheduled_function)
  	}

  	// setTimeout returns the ID of the function to be executed
  	scheduled_function = setTimeout(ajax_call, delay_by_in_ms, endpoint, request_parameters)
  })

  // STOP SEARCH



  // $('.btn-btn-primary-button').on('click', '#exUploadSubmit', function () {
  $('#exUploadSubmit').on('click', function (){
     event.preventDefault();
     console.log("I clicked the down here button");
     var importId = $(this).attr("id");
     console.log(importId)

   });



      });
