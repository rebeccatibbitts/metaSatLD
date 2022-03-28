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



//fix Upload
// generate!

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

   function getButtons(data)
   {
     // console.log("what am i getting?")
     // console.log(data)
    // var data = JSON.parse("{{buttonData|escapejs}}");
    // var buttonList = data["contentList"];
    // var buttonList = data["contentList"];
    // console.log("are these buttons?")
    // console.log(buttonList)


    var buttonList = [];
    for (var x in data){
      var buttonData = data[x];
      var result = $(writeButtons(x, buttonData));
      buttonList.push(result);
      var newtype = buttonData["type"]

      // $(html)
      // $(".list-group").append(result);
    }
    var check = data["type"]
    var pattern = /elList/;
    var exists = pattern.test(check);

    if (exists) {
      var newtype = check
      var createList = "<div class = 'container'><div class = 'elList'></div></div>"
      $(".browse").empty()
      $(".browse").html(createList)
    }
    if (newtype == "getGroupfamilies") {
    var wrapper = '<div class="card-group"><div class="card-body"><div class="list-group" style = "width: 100%">'
    var end = '</div></div></div>'
    var final = wrapper + buttonList + end
    var addButton = '<input'
    $("#collapseFamGroup").append(buttonList);
  } else if (newtype == "getGroupsegments") {
    $("#collapseSegGroup").append(buttonList);
  } else if (newtype == "elListfamilies"){
    console.log("i'm an element list for families")
  }
  else if (newtype == "elListsegments"){
    console.log("i'm an element list for segments")

    var newdata = Object.entries(data).slice(1)
    var buttonData = data

    for (var x in buttonData){
      var wrapper = '<div class ="card"><div class = "card-title" style="text-align:center"><div class="container"><h6><b><a href = "https://schema.space/metasat/'+buttonData[x][0]+'" class = "card-link">'+x+'</a></b></h6></div></div> <div class="card-body"><div class="container"'
      // var link = '<a href = "https://schema.space/metasat/'+x+'" class = "card-link">'+x+'</a>'
      var desc = '<div class="card-text">'+buttonData[x][1]+'<br><br>'
      var check = '<div class="form-check" style="text-align:right"><input class="form-check-input" type="checkbox" value="" id="crab" data-term="'+x+'" data-id="'+buttonData[x][0]+'">'+'<label class="form-check-label" for="'+buttonData[x][0]+'">Add to WorkBook</label>'
      var end = '</div></div></div></div></div>'
      var final = wrapper + desc + check + end
      $(".elList").append(final)
  }
}
}

   function writeButtons(x, data){
     // try {
     //    var buttonList = data["contentList"];
     //    x = x["contentList"]
     // }
     // catch(err) {
     //   var buttonList = data
     //   x = x
     // }
     // var yay = x["contentList"]
     // if (typeof yay  === "undefined") {
     //   var x = x
     // } else {
     //   console.log("let's see...")
     //   var x = yay
     // }
     // console.log(x)
     var outer = data["outer"]
     var tag = data["tag"]
     var inner = data["inner"]
     var end = data["end"]
     // var ranNum = Math.round((Math.random()* 10))
     // var ranNum = ''
     // var classAdd = " "+x+""
     // var buttonID = '" id="'+x+ranNum+'"'
     // var tagID = " id=holder"+x+">"
     // var value = " value='"+x+"'"
     // var buttonClass = ' class = "btn btn-primary button white btn-lg'+' '+'goLook'+buttonID+'>'+x+''
     // var buttonOuter = ' '+x+'">'
     // var add = outer+tag+tagID+inner+buttonClass+buttonID+value+end
    // var add = outer+tag+tagID+inner+buttonClass+end
    var add = outer+x+end
    // console.log(add)

     return add
    }

    $(document.querySelector("#getGroupsegments")).one( "click", function(){
      // button[id='elList']"

           // console.log("this is this")
           // console.log(this)
           // var whatever = $(this).find("data-id")
           // console.log(whatever)
           // lookUp(whatever)
           console.log("did you get here?")
           });

    $(".dd").nestable();

    function lookUp(e){
        var content_id = $(e).attr('data-id')
        var content_type = $(e).attr('data-type')
        var look_id = $(e).attr('data-look')
        $.ajaxSetup({
            headers: { "X-CSRFToken": getCookie("csrftoken") }

        });

        $.ajax(
        {
            url: "/lookUp",
            type:"POST",
            data: {
              contentID: content_id,
              contentType: content_type,
              lookID: look_id
            },
            success: function(result)
            {
              getButtons(result)
    },
              error: function (xhr, ajaxOptions, thrownError) {
                console.log("ERROR")
                console.log(thrownError)
              alert(xhr.status);
              alert(thrownError);
         },

      });
    }

    $(".yar").click(function(){
      console.log("you are a yar")
      lookUp(this)
    });
    $("#collapseSegGroup").one( "click", function(){
      console.log("you clicked seg group")
      var $this = $(this)
    $(".modeButton").on("click", function(){
      $(this).attr("data-toggle", "modal")
      $(this).attr("data-target", "#browseList")
      lookUp(this)
    })
    $this.toggleClass('active')
  });


$("#browseList").on('click', '#crab', function () {
    console.log('did i click a crab?');
    var identifier = $(this).attr("data-id")
    var term = $(this).attr("data-term")
    console.log(identifier)
    console.log(term)
    var newform = '<li class="dd-item list-group-item" data-id="1">'+'<div class="dd-handle">'+term+'</div>'+'</li>'
    $("#workSort").append(newform)

});

 var options = {
         'maxDepth': 100,
         'scroll': 'true',
}
   var sorter = $("#elSort").nestable(options);
   $(".emptyNest").click(function(){
     console.log("clicked a nest")
   $('#workSpace').empty()
 });

   $(".getJSON").click(function(){
     console.log("clicked a json")
     var jResult = $('#workSort').toArray()
     var newJ = jResult[0]["childNodes"]
     for (i in newJ){
       var sugar = newJ[i]["innerHTML"]
       if (sugar){
       var newform = '<li class="dd-item list-group-item" data-id="'+sugar+'">'+'<div class="dd-handle">'+'</div>'
       var mid ='<input type="text">'
       var ending ='</li>'
       var field = newform+mid+ending
       $("#formSort").append(field)
       $("#formSort").nestable(options)

     }
   }
   //   var cars = [];
   // $(jResult).each(function(i, elem) {
   //     cars.push($(elem).text());
   //     console.log("inside cars")
   //     console.log(cars)
   // });
   // console.log("result")
   // console.log(cars)
     // makeForm(jResult)
   });

   function makeForm(e){
     console.log("this is e")
     console.log(e)
     for (x in e){
       console.log("this is x")
       console.log(x)
       console.log("this is e[x]")
       console.log(e[x])
       var field = '<input type="text">'
       $("#formSort").append(field)
     }
     // $("#formSort").nestable(e);
   }

   $('.card').on('click', '#elCheck', function () {
       console.log('did i click a crab?');
       var identifier = $(this).attr("data-id")
       var inputEl = '<li class="uk-nestable-item"><div class="uk-nestable-panel"><div class="uk-nestable-handle" style="display:inline;"><div class="uk-nestable-toggle" data-nestable-action="toggle"></div><i class="uk-icon uk-icon-bars uk-margin-small-right"></i></div>'+identifier+'<input  style="display:inline;" type="text" class="uk-input"></div></li>'
       $("#workSpace").append(inputEl)
       $("#workSpace").nestable(options).disableSelection()
     })

     $("#testSort").nestable(options).disableSelection();


$("#genButton").click(){
    var data = new FormData($('form').get(0));
     $.ajaxSetup({
         headers: { "X-CSRFToken": getCookie("csrftoken") }

     });

     $.ajax(
     {
         url: "/generate",
         type:"POST",
         data: {
           "form": form,
         },

         success: function(result)
         {
           console.log("success")

       },



         error: function (xhr, ajaxOptions, thrownError) {
           console.log("ERROR")
         alert(xhr.status);
         alert(thrownError);
         console.log("this is the thrown error")
         console.log(thrownError)
      },

     });

   }
 });
