
$( document ).ready(function() {

  // GET COOKIE //

  function getCookie(name) {
      let cookieValue = null;
      if (document.cookie && document.cookie !== '') {
          const cookies = document.cookie.split(';');
          for (let i = 0; i < cookies.length; i++) {
              const cookie = cookies[i].trim();
              if (cookie.substring(0, name.length + 1) === (name + '=')) {
                  cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                  break;
              }
          }
      }
      return cookieValue;
  }

// FORM NESTABLE //
  var options = {
         'maxDepth': 100,
         'scroll': 'true',
       }
   var sorter = $("#elSort").nestable(options);

   $(".emptyNest").click(function(){
     console.log("clicked a nest")
   $('#workSpace').empty()
 });

 // ADD CONCEPT //

function addConcept(e) {
  var identifier = $(e).attr("data-id")
  var inputEl = '<li class="uk-nestable-item" data-id = "'+identifier+'"><div class="uk-nestable-panel"><div class="uk-nestable-handle" style="display:inline;"><div class="uk-nestable-toggle" data-nestable-action="toggle"></div><i class="uk-icon uk-icon-bars uk-margin-small-right"></i></div>'+identifier+'<input  style="display:inline;" type="text" class="uk-input" id = "in'+identifier+'"><button style = "display:inline;" class="btn btn-danger" type="button" name="X" id= "conPan">X</button></div></li>'
  $("#workSpace").append(inputEl)
  $("#workSpace").nestable(options).disableSelection()
}
   $('.card').on('click', '#elCheck', function () {
       addConcept($(this))
     })

// DELETE CONCEPT //

function deleteConcept(e) {
      var del = $(e).parent().remove()
}
     $("#workSpace").on('click', "#conPan", function () {
       deleteConcept($(this))
   })

// CLEAR CONCEPTS //

function clearConcepts(e) {
  $("#success").attr("style", "display:none")
  $("#workSpace").empty().attr("style", "display:visible")
  $("#genButton").attr("style", "display:visible")
  $("#emptyNest").attr("style", "display:visible")
}
     $("#rbutton").click(clearConcepts())


// SEARCH CONCEPTS //
function searchConcepts(e)
{

}
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
                var inputEl = '<li class="uk-nestable-item" data-id = "'+identifier+'" id = "'+identifier+'"><div class="uk-nestable-panel" data-val = "'+identifier+'" id = "'+identifier+'"><div class="uk-nestable-handle" style="display:inline;"><div class="uk-nestable-toggle" data-nestable-action="toggle"></div><i class="uk-icon uk-icon-bars uk-margin-small-right"></i></div>'+identifier+'<input  style="display:inline;" type="text" class="uk-input" data-id = "in'+identifier+'"><button style = "display:inline;" class="btn btn-danger" type="button" name="X" id= "conPan" data-id = "'+identifier+'">X</button></div></li>'
                $("#workSpace").append(inputEl)
                $("#workSpace").nestable(options).disableSelection()
              })

              $("#workSpace").on('click', "#conPan", function () {
                var del = $(this).parent().remove()
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

  // END SEARCH CONCEPTS //

  // GENERATE ///
  function generateMetasat(e)
  {
// define ajax call
    var genCall = function genCall(endpoint, request_parameters) {
      $.getJSON(endpoint, request_parameters)
        .done(response => {
          $("#filedl").attr("value", JSON.stringify(response))
          $("#genButton").attr("style", "display:none")
          $("#emptyNest").attr("style", "display:none")
          $("#workSpace").attr("style", "display:none")
          $("#success").attr("style", "display:visible")
          })
    }

// catching user-input values
    function catchValues(e) {
      $("#workSpace li").each(function(i, el) {
      var elF = $(el).children(0)
      var elK = $(elF).children(0)
      var elE = $(elK)[1]
      var value = $(elE).val()
     $(e).attr("data-val", value)
   })
  }
    catchValues(e)

    // define asynchronous var
    const goal = 'generate'
    const delay_by = 700
    let jax_function = false

  // get form data
    var cow = $("#workSpace").data("nestable").serialize()
    var newYar = JSON.stringify(cow)
  	const reqp = {
  		q: newYar
  	}

  	// if scheduled_function is NOT false, cancel the execution of the function
  	if (jax_function) {
  		clearTimeout(jax_function)
  	}

  	// setTimeout returns the ID of the function to be executed
  	jax_function = setTimeout(genCall, delay_by, goal, reqp)

}

  $("#yar").click(function() {
    generateMetasat($(this))
  })
  // END GENERATE //

  // DOWNLOAD //

  const goHere = 'download_file'
  const delay_dl = 700
  let dlFuncion = false

  let getDL = function (endpoint, request_parameters) {
    $.getJSON(endpoint, request_parameters)
      .done(response => {
        console.log("success")
        })
      }

  $("#nar").click(function() {

    // new form data
    let myForm = document.getElementById('downLoad');
    let formData = new FormData(myForm);
    var data = JSON.stringify(formData)
    console.log("data?")
    console.log(data)
    console.log("get?")
    console.log(formData)
      //
      // var collection = $("#downLoad")
      // console.log("nar")
      // console.log(collection)
      //
      // var form = $(collection).get(0);
      // var data = new FormData(form);
      // console.log("dl received")
      // var data = $("#filedl").data("value")
      //
      // console.log(typeof(data))
      // fileData = JSON.stringify(data)
      // console.log(fileData)
      // console.log(typeof(fileData))

    	const dlr = {
    		q: data // value of user_input: the HTML element with ID user-input
    	}

    	// if scheduled_function is NOT false, cancel the execution of the function
    	if (dlFuncion) {
    		clearTimeout(dlFuncion)
    	}

    	// setTimeout returns the ID of the function to be executed
    	dlFuncion = setTimeout(getDL, delay_dl, goHere, dlr)
    })

  // END DOWNLOAD //

  // TESTING SEGMENT QUERIES (UNFINISHED) //

  $("#ubutton").on("click", function(){
    console.log("i lciked ubutton")
    var contentID = $(this).data("id")
    var lookUp = "segments"


    $.ajaxSetup({
        headers: { "X-CSRFToken": getCookie("csrfmiddlewaretoken") }

    });

    $.ajax(
    {
        url: "/lookUp",
        type: "post",
        // contentType: "application/json; charset=utf-8",
        // accept: 'application/json',
        // dataType: "json",
        data: {
          "contentID": contentID,
          "lookUp": lookUp
        },
        // processData: false,
        // contentType: false,

        success: function(result)
        {
          console.log(result)
          artists_div.html(result['html_from_view'])
          // $("#listPanel").empty()
          // for (item in result ) {
          //   var yes = "<p>"+item.identifier+"</p>"
          //   $("#listPanel").append(yes)
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

  // END SEGMENT QUERIES //


  // IMPORT TEMPLATE (UNFINISHED) //
         $('#ibutton').on('click', function (){
          event.preventDefault();
          console.log("I clicked the up here button");

          var fileInput = $('#fileUp');

          var importId = $(this).attr("id");

          var collection = document.forms['fileUp']

          var form = $(collection).get(0);
          var data = new FormData(collection);

          if (importId == "ibutton") {
            console.log("correct id")

            jQuery.each(jQuery(collection)[0].files, function(i, file) {
     data.append('file-'+i, file);

      });

            } else {
              console.log("wrong id")
            }


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
                console.log(typeof(resultM))

// need something that keeps track of entire list and adds
                function reObj(obj, nestString){
                  console.log("I'm in reObj")
                  for (var child in obj) {
                    var identifier = child
                    var identifier = $.escapeSelector(identifier)

                    if ( obj[child] instanceof Object ) {
                      var reChild = obj[child]
                      var inputEl = '<li class="uk-nestable-item" data-id = "'+identifier+'" id = "'+identifier+'"><div class="uk-nestable-panel" data-val = "'+identifier+'" id = "'+identifier+'"><div class="uk-nestable-handle" style="display:inline;"><div class="uk-nestable-toggle" data-nestable-action="toggle"></div><i class="uk-icon uk-icon-bars uk-margin-small-right"></i></div>'+identifier+'<button style = "display:inline;" class="btn btn-danger" type="button" name="X" id= "conPan" data-id = "'+identifier+'">X</button></div>'
                      // ul on same level as panel
                      var ul = '<ul class="uk-nestable-list">'
                      var ulEnd = '</ul></li>'
                      var nestChild = reObj(reChild);
                      if ( nestChild == null ) {
                      var nestNow = inputEl

                      } else {
                      var addChild = ul+nestChild+ulEnd
                      var nestNow = inputEl+addChild
                      }
                      // $(cringe).css('color', 'red')
                      // $(cringe).append(addChild)
                      // var final = $("#workSpace").append(nestNow)
                      // var cringe = "#"+$.escapeSelector(final)+""

                      } else {
                      console.log("i am objchild NOT object")
                      console.log(obj[child])
                      var inputEl = '<li class="uk-nestable-item" data-id = "'+identifier+'" id = "'+identifier+'"><div class="uk-nestable-panel" data-val = "'+identifier+'" id = "'+identifier+'"><div class="uk-nestable-handle" style="display:inline;"><div class="uk-nestable-toggle" data-nestable-action="toggle"></div><i class="uk-icon uk-icon-bars uk-margin-small-right"></i></div>'+identifier+'<input  style="display:inline;" type="text" class="uk-input" data-id = "in'+identifier+'" value = "'+obj[child]+'"><button style = "display:inline;" class="btn btn-danger" type="button" name="X" id= "conPan" data-id = "'+identifier+'">X</button></div></li>'
                      return inputEl
                      // var final = $("#workSpace").append(inputEl)
                    }
                     // var final = $("#workSpace").append(nestNow)
                  }
                }

                // function objToHtmlList(obj) {
                //     if (obj instanceof Array) {
                //         // var ol = document.createElement('ol');
                //         var ol = $("workSpace")
                //         for (var child in obj) {
                //           console.log("Array!")
                //             var identifier = child
                //             var inputEl = '<li class="uk-nestable-item uk-parent" data-id = "'+identifier+'" id = "'+identifier+'"><div class="uk-nestable-panel" data-val = "'+identifier+'" id = "'+identifier+'"><div class="uk-nestable-handle" style="display:inline;"><div class="uk-nestable-toggle" data-nestable-action="toggle"></div><i class="uk-icon uk-icon-bars uk-margin-small-right"></i></div>'+identifier+'<input  style="display:inline;" type="text" class="uk-input" data-id = "in'+identifier+'"><button style = "display:inline;" class="btn btn-danger" type="button" name="X" id= "conPan" data-id = "'+identifier+'">X</button></div></li>'
                //             $("#workSpace").append(inputEl)
                //             inputEl.appendChild(objToHtmlList(obj[child]));
                //             ol.appendChild(inputEl);

                //         }
                //         return ol
                //     }
                //     else if (obj instanceof Object && !(obj instanceof String)) {
                //         var ol = $("workSpace")
                //         content = []
                //         for (var child in obj) {
                //           var identifier = child

                //           if ( obj[child] instanceof Object ) {
                //             console.log("i am reChild and a object")
                //             console.log(obj[child])
                //             var reChild = obj[child]
                //             var inputEl = '<li class="uk-nestable-item" data-id = "'+identifier+'" id = "'+identifier+'"><div class="uk-nestable-panel" data-val = "'+identifier+'" id = "'+identifier+'"><div class="uk-nestable-handle" style="display:inline;"><div class="uk-nestable-toggle" data-nestable-action="toggle"></div><i class="uk-icon uk-icon-bars uk-margin-small-right"></i></div>'+identifier+'<button style = "display:inline;" class="btn btn-danger" type="button" name="X" id= "conPan" data-id = "'+identifier+'">X</button></div></li>'
                //             var ul = '<ul class="uk-nestable-list">'
                //             var ulEnd = '</ul>'
                //             var nestChild = objToHtmlList(reChild);
                //             var addChild = ul+nestChild+ulEnd
                //             console.log("i am nestChild")
                //             console.log(nestChild)
                //             $("#workSpace").append(inputEl)
                //             var cringe = "#"+$.escapeSelector(identifier)+""
                //             $(cringe).css('color', 'red')
                //             $(cringe).append(nestChild)
                //             return inputEl;
                //           } else {
                //             console.log("i am objchild NOT object")
                //             console.log(obj[child])
                //             var inputEl = '<li class="uk-nestable-item" data-id = "'+identifier+'" id = "'+identifier+'"><div class="uk-nestable-panel" data-val = "'+identifier+'" id = "'+identifier+'"><div class="uk-nestable-handle" style="display:inline;"><div class="uk-nestable-toggle" data-nestable-action="toggle"></div><i class="uk-icon uk-icon-bars uk-margin-small-right"></i></div>'+identifier+'<input  style="display:inline;" type="text" class="uk-input" data-id = "in'+identifier+'" value = "'+obj[child]+'"><button style = "display:inline;" class="btn btn-danger" type="button" name="X" id= "conPan" data-id = "'+identifier+'">X</button></div></li>'
                //           }
                //         }
                //         return inputEl;
                //     } else {

                //         return document.createTextNode(obj);
                //     }

                // }
                var nestBegin = '<ul class="uk-nestable-list">'
                var nestEnd = '</ul>'
                var nestString = nestBegin
                var genFields = reObj(resultM, nestString)
                $("#thisOne").append(genFields)
                $("workSpace").nestable().disableSelection()
              },



                    error: function (xhr, ajaxOptions, thrownError) {
                      console.log("ERROR")
                      alert("Please choose a JSONLD file.")
                    // alert(xhr.status);
                    // alert(thrownError);
               }
     });

   });

   // END IMPORT TEMPLATE (UNFINISHED) //


      });
