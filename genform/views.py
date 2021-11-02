from django.shortcuts import render
from datetime import datetime
from pyld import jsonld
from django.http import HttpResponse
from django.views.static import serve
import json
from collections import OrderedDict
from .models import *
from .forms import *
# from django.contrib.staticfiles.templatetags.staticfiles import static
import re
import string
# import mimetypes

def index(request):
    # templateData = {
    # "outer": "<div class = col-sm-6>",
    # "tag" : "<div class='buttonHolder'",
    # "inner" : "<button type='submit'",
    # "contentList": ["Cool Template", "Great Template"],
    # "end" : "</button></div></div>"
    # }
    #
    # templateJSON = json.dumps(templateData)
    elementList = {}
    allElements = MetasatElement.objects.filter(deprecated=False).order_by('identifier').only('identifier')
    print("Building cards...")
    # for item in allElements:
    #     elData = {
    #     'identifier': item.identifier,
    #     'term': item.term,
    #     'desc': item.desc,
    #     }
    #     elementList[item.identifier] = elData

    context = {
            "form": UploadFileForm,
            "elementList": allElements,
            # "elementList": elementList,
            # "templateData": templateJSON
            }
    return render(request, "index.html", context)

def lookUp(request):
    contentList = {}

    contentType = request.POST.get("contentType")

    if contentType == "getGroup":
        print("got a group request")
        contentRequest = request.POST.get("contentID")
        if contentRequest == "segments":
            print("got a seg request")
            segments = MetasatSegment.objects.order_by('segment')
            seggroups = {}
            for x in segments:
                print("thinking about...")
                print(x.segment)
                type = contentType+contentRequest
                # el_list = []
                # el_q = MetasatElementSegment.objects.filter(segment_id=x.id)
                # for i in el_q:
                #     element = MetasatElement.objects.get(id=i.element_id)
                #     el_list.append(element.term)
                buttonData = {
                # "outer": "<div class = col-sm-6>",
                # "tag" : "<div class='buttonHolder'",
                # "inner" : "<button type='submit'",
                "outer": '<button type="button" class="modeButton" data-type= "elList" data-id="segments" data-look="'+str(x.id)+'">',
                # "outer": '<a href="#" class="list-group-item list-group-item-action" id="'+type+'">',
                # "outer": '<button type="button" id = "elList" data-type = "elList" data-id = "segments" data-trigger="yar"<a href="google.com">',
                "contentList": x.segment,
                "type": type,
                # "end" : "</button></div></div><br>"
                "end": "</button>"
                }
                seggroups[x.segment] = buttonData
                print("done with")
                print(x.segment)
            contentList = seggroups
        if contentRequest == "families":
            print("got a fam request")
            families = MetasatFamilyMap.objects.order_by('family')
            famgroups = {}
            for x in families:
                print("thinking about...")
                print(x.family)
                # el_list = []
                # el_q = MetasatElementFamily.objects.filter(elementfamily_id=x.id)
                # for i in el_q:
                #     element = MetasatElement.objects.get(id=i.element_id)
                #     el_list.append(element.term)
                buttonData = {
                # "outer": "<div class = col-sm-6>",
                # "tag" : "<div class='buttonHolder'",
                # "inner" : "<button type='submit'",
                "outer": '<button type="button" class="list-group-item list-group-item-action" data-type = "elList" data-id = "families">',
                "contentList": x.family,
                "type": contentType+contentRequest,
                # "end" : "</button></div></div><br>"
                "end": "</button>"
                }
                famgroups[x.family] = buttonData
                print("done with")
                print(x.family)
            contentList = famgroups
        print("done!")

    if contentType == "elList":
        print("i got an el request")
        contentRequest = request.POST.get("contentID")
        contentLook = request.POST.get("lookID")
        print("our contentLook is")
        print(contentLook)
        if contentRequest == "segments":
            print("got a seg request")
            seggroups = {}
            seggroups["type"] = "elListsegments"
            el_list = []
            el_q = MetasatElementSegment.objects.filter(segment_id=contentLook)
            for i in el_q:
                element = MetasatElement.objects.get(id=i.element_id)
                print("thinking about...")
                print(element.term)
                seggroups[element.term] = [element.identifier, element.desc]
                # el_list.append(element.term)
                # whatever = MetasatSegment.objects.get(id=contentLook)
                # seggroups[whatever.segment] = el_list
            contentList = seggroups
        if contentRequest == "families":
            print("got a fam request")
            families = MetasatFamilyMap.objects.order_by('family')
            famgroups = {}
            for x in families:
                print("thinking about...")
                print(x.family)
                el_list = []
                el_q = MetasatElementFamily.objects.filter(elementfamily_id=x.id)
                for i in el_q:
                    element = MetasatElement.objects.get(id=i.element_id)
                    el_list.append([element.term, element.identifier, element.desc])
                famgroups[x] = el_list
            contentList = famgroups

    return HttpResponse(
            json.dumps(contentList),
            content_type="application/json"
        )


def importTemplate(request):
    temp = request.POST.get("templateId")
    form = UploadFileForm(request.POST, request.FILES)
    importResult = {}
    if form.is_valid():
        testfile = request.FILES['file']
        boo = handleUpload(testfile)
        with open('exfile.jsonld', 'rb+') as new:
            x = new.read()
            importResult = json.loads(x, object_pairs_hook=OrderedDict)
    else:
        print(form.errors)
    flatStructure = {}
    flatTemp = makeFlat(importResult, flatStructure, None)
    flatImport = checkParent(flatTemp)
    return HttpResponse(
            json.dumps(flatImport),
            content_type="application/json"
        )

def handleUpload (file):
    with open('exfile.jsonld', 'wb+') as exfile:
        for chunk in file.chunks():
            exfile.write(chunk)
    return exfile


def makeFlat (file, flatStructure, previous):
    current = 0
    for i in file:
        if previous == None:
            path = current
        else:
            path = str(previous)+"_"+str(current)

        if isinstance(file[i], dict):
            flatStructure[str(path)] = {}
            parent = flatStructure[str(path)]
            parent["key"] = i
            makeFlat(file[i], flatStructure, path)
        else:
            flatStructure[str(path)] = {}
            child = flatStructure[str(path)]
            child["key"] = i
            child["value"] = file[i]
        current+=1
    return flatStructure

def checkParent(flatTemp):
    for i in flatTemp:
        place = i.split("_")
        if len(place) == 1:
            flatTemp[i]["parent"] = True
            findParent(i, place, flatTemp)
    return flatTemp

def generate(request):
    if request.method == 'POST':
        genform = request.POST
        field_list = (genform.dict()).copy()
        flatList = []
        del field_list['csrfmiddlewaretoken']
        del field_list['generate']
        for path in field_list:
            nested = re.findall(r"\d+_", path)
            nunested = path.split("_")
            placement = nunested[:-1]
            for num in range(0, len(placement)):
                placement[num] = int(placement[num])
            elementName = re.sub(r"\d+_", "", path)
            inputValue = field_list.get(path)
            infoDict = {}
            infoDict["placement"] = placement
            infoDict["key"] = elementName
            infoDict["value"] = inputValue
            flatList.append(infoDict)
        output = makeJSON(flatList)
        outfile = json.dumps(output)

        context = {
            "outfile": outfile
        }
        return render(request, "success.html", context)

def makeJSON(flatList):
    structure = {}
    for x in flatList:
        if len(x["placement"]) == 1:
            parent = x["key"]
            children = recursiveBuild(x, flatList)
            structure[x["key"]] = children
    return structure

def recursiveBuild(x, flatList):
    children = {}
    for y in flatList:
        if y["placement"][:-1] == x["placement"]:
            #### CHECK THIS LATER
            if y["value"] == "":
                children[y["key"]] = recursiveBuild(y, flatList)
                # check = recursiveBuild(y, flatList)
                # if check == None:
                #     children[y["key"]] = y["value"]
            else:
                children[y["key"]] = y["value"]
    return children

def findParent(x, place, flatImport):
    for y in flatImport:
        newPlace = y.split("_")
        if newPlace[:-1] == place:
            #### CHECK THIS LATER
            try:
                value = flatImport[y]["value"]
            except KeyError:
                flatImport[y]["parent"] = True
                findParent(y, newPlace, flatImport)
                # check = recursiveBuild(y, flatList)
                # if check == None:
                #     children[y["key"]] = y["value"]
            else:
                flatImport[y]["parent"] = False
    return flatImport

def download_file(request):
    fileData = json.loads(request.POST["data"])
    timestamp = datetime.now().strftime("%Y_%m%d_%H%M%S")
    new_file = "metasat"+timestamp+".jsonld"
    with open(new_file, 'w') as outfile:
         outfile.write(json.dumps(fileData))
         outfile.close()
    print(new_file)
    fl = open(new_file, 'r')
    response = HttpResponse(fl, content_type='text/plain')
    response['Content-Disposition'] = "attachment; filename="+new_file
    return response
