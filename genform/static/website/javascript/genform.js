// To Do:
// fix element sorter icon
// get group buttons to work

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
     console.log("what am i getting?")
     console.log(data)
    // var data = JSON.parse("{{buttonData|escapejs}}");
    // var buttonList = data["contentList"];
    // var buttonList = data["contentList"];
    // console.log("are these buttons?")
    // console.log(buttonList)
    var buttonList = [];
    for (var x in data){
      var buttonData = data[x];
      var result = $(writeButtons(x, buttonData));
      console.log("this is result")
      console.log(result)
      buttonList.push(result);
      var newtype = buttonData["type"]

      // $(html)
      // $(".list-group").append(result);
    }
    if (newtype == "getGroupfamilies") {
    var wrapper = '<div class="card-body"><div class="list-group" style = "width: 100%">'
    var end = '</div></div>'
    var final = wrapper + buttonList + end
    $("#collapseFamGroup").append(buttonList);
  } else if (newtype == "getGroupsegments") {
    $("#collapseSegGroup").append(buttonList);
  } else if (newtype == "elListfamilies"){
    console.log("i'm an element list for families")
  }
  else if (newtype == "elListsegments"){
    console.log("i'm an element list for segments")
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
     console.log("wtf")
     console.log(outer)
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
    console.log(add)

     return add
    }

    $(document.querySelector("#getGroupsegments")).click(function(){
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
        console.log("CONTENT ID")
        console.log(content_id)
        $.ajaxSetup({
            headers: { "X-CSRFToken": getCookie("csrftoken") }

        });

        $.ajax(
        {
            url: "/lookUp",
            type:"POST",
            data: {
              contentID: content_id,
              contentType: content_type
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
    $("#40element").click(function(){
      console.log("ok ok ok")
    });
    // <button type="button" class="list-group-item list-group-item-action"></button>

   // var yar = $(getButtons())
   // console.log("i'm worming")
 });
