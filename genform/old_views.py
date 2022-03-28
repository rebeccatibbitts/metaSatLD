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

# Create your views here.
def index(request):

    #this gives list of families & famgroups is elements in each family
    families = MetasatFamilyMap.objects.order_by('family')
    famgroups = {}
    for x in families:
        el_list = []
        el_q = MetasatElementFamily.objects.filter(elementfamily_id=x.id)
        for i in el_q:
            element = MetasatElement.objects.get(id=i.element_id)
            el_list.append(element.term)
        famgroups[x.family] = el_list

    segments = MetasatSegment.objects.order_by('segment')
    seggroups = {}
    for x in segments:
        el_list = []
        el_q = MetasatElementSegment.objects.filter(segment_id=x.id)
        for i in el_q:
            element = MetasatElement.objects.get(id=i.element_id)
            el_list.append(element.term)
        seggroups[x.segment] = el_list

    famjson = jsonloads(famgroups)
    segjson = json.load(seggroups)
    print(type(segjson))



    context = {
            # "famjson" : fammgroups, # all elements by family
            # "segjson" : seggroups, # all elements by segment
            # "all_elements" : "allplace", # all elements
            # "alphabet" : "alphabetplace",
            "form": UploadFileForm,
            # "newSegment": newSegment,
            # "element" : "noelement",
            }
    return render(request, "index.html", context)

def importTemplate(request):
    temp = request.POST.get("templateId")
    form = UploadFileForm(request.POST, request.FILES)
    importResult = {}
    if temp == "icontext":
        # cpath = static("context.jsonld")
        #cpath = "./static/context.jsonld"
        #cfile = open(cpath, 'rb')
        #fileContext = json.load(cfile, object_pairs_hook=OrderedDict)
        fileContext = {
            "@context": {
                "id": "@id",
                "@vocab": "https://schema.space/metasat/",

                "as": "https://www.w3.org/ns/activitystreams#",
                "cc": "http://creativecommons.org/ns#",
                "codemeta": "https://doi.org/10.5063/schema/codemeta-2.0",
                "csvw": "http://www.w3.org/ns/csvw#",
                "ctag": "http://commontag.org/ns#",
                "dc": "http://purl.org/dc/terms/",
                "dc11": "http://purl.org/dc/elements/1.1/",
                "dcat": "http://www.w3.org/ns/dcat#",
                "dcterms": "http://purl.org/dc/terms/",
                "dqv": "http://www.w3.org/ns/dqv#",
                "duv": "https://www.w3.org/ns/duv#",
                "foaf": "http://xmlns.com/foaf/0.1/",
                "gr": "http://purl.org/goodrelations/v1#",
                "grddl": "http://www.w3.org/2003/g/data-view#",
                "ical": "http://www.w3.org/2002/12/cal/icaltzd#",
                "jsonld": "http://www.w3.org/ns/json-ld#",
                "ldp": "http://www.w3.org/ns/ldp#",
                "ma": "http://www.w3.org/ns/ma-ont#",
                "oa": "http://www.w3.org/ns/oa#",
                "odrl": "http://www.w3.org/ns/odrl/2/",
                "og": "http://ogp.me/ns#",
                "org": "http://www.w3.org/ns/org#",
                "owl": "http://www.w3.org/2002/07/owl#",
                "prov": "http://www.w3.org/ns/prov#",
                "qb": "http://purl.org/linked-data/cube#",
                "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
                "rdfa": "http://www.w3.org/ns/rdfa#",
                "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
                "rev": "http://purl.org/stuff/rev#",
                "rif": "http://www.w3.org/2007/rif#",
                "rr": "http://www.w3.org/ns/r2rml#",
                "schema": "http://schema.org/",
                "sd": "http://www.w3.org/ns/sparql-service-description#",
                "sioc": "http://rdfs.org/sioc/ns#",
                "skos": "http://www.w3.org/2004/02/skos/core#",
                "skosxl": "http://www.w3.org/2008/05/skos-xl#",
                "sosa": "http://www.w3.org/ns/sosa/",
                "ssn": "http://www.w3.org/ns/ssn/",
                "time": "http://www.w3.org/2006/time#",
                "v": "http://rdf.data-vocabulary.org/#",
                "vcard": "http://www.w3.org/2006/vcard/ns#",
                "void": "http://rdfs.org/ns/void#",
                "wdr": "http://www.w3.org/2007/05/powder#",
                "wdrs": "http://www.w3.org/2007/05/powder-s#",
                "xhv": "http://www.w3.org/1999/xhtml/vocab#",
                "xml": "http://www.w3.org/XML/1998/namespace",
                "xsd": "http://www.w3.org/2001/XMLSchema#",
                "describedby": "http://www.w3.org/2007/05/powder-s#describedby",
                "license": "http://www.w3.org/1999/xhtml/vocab#license",
                "role": "http://www.w3.org/1999/xhtml/vocab#role"
            }
        }
        importResult = fileContext
    elif temp == "iexample":
        # epath = static("gen_example.jsonld")
        # gefile = open(epath, 'rb')
        # generalExample = json.load(gefile, object_pairs_hook=OrderedDict)
        generalExample = {
            "@context": {
                "id": "@id",
                "@vocab": "https://schema.space/metasat/",

                "schema": "http://schema.org/"
            },
            "mission": {
                "missionName": "",
                "missionShortName": "",
                "missionType": "",
                "operator": "",
                "country": "",
                "spaceSegment": {
                    "spacecraft": {
                        "spacecraftName": "",
                        "spacecraftShortName": "",
                        "spacecraftType": "",
                        "internationalDesignator": "",
                        "noradID": "",
                        "mass": {
                            "schema:value": "",
                            "schema:unitCode": ""
                        },
                        "lastContact": "",
                        "orbitType": "",
                        "orbitalElements": {
                            "orbitalEccentricity": {
                                "schema:value": "",
                                "schema:unitCode": ""
                            },
                            "semiMajorAxis": {
                                "schema:value": "",
                                "schema:unitCode": ""
                            },
                            "orbitalInclination": {
                                "schema:value": "",
                                "schema:unitCode": ""
                            },
                            "longitudeOfAscendingNode": {
                                "schema:value": "",
                                "schema:unitCode": ""
                            },
                            "argumentOfPeriapsis": {
                                "schema:value": "",
                                "schema:unitCode": ""
                            },
                            "trueAnomaly": {
                                "schema:value": "",
                                "schema:unitCode": ""
                            }
                        },
                        "payload": {
                            "instrument": {
                                "instrumentName": "",
                                "instrumentShortName": "",
                                "instrumentType": ""
                            }
                        }
                    }
                },
                "launchSegment": {
                    "launchDate": "",
                    "launchSite": "",
                    "launchServiceProvider": "",
                    "launchVehicle": ""
                },
                "groundSegment": {
                    "groundStation": {
                        "frequencyBand": "",
                        "radioFrequency": {
                            "schema:value": "",
                            "schema:unitCode": ""
                        },
                        "longitude": {
                            "schema:value": "",
                            "schema:unitCode": ""
                        },
                        "latitude": {
                            "schema:value": "",
                            "schema:unitCode": ""
                        },
                        "altitude": {
                            "schema:value": "",
                            "schema:unitCode": ""
                        }
                    }
                }
            }
        }
        importResult = generalExample
    elif form:
        if form.is_valid():
            testfile = request.FILES['file']
            boo = handleUpload(testfile)
            with open('exfile.jsonld', 'rb+') as new:
                x = new.read()
                importResult = json.loads(x, object_pairs_hook=OrderedDict)
        else:
            print(form.errors)
    else:
        print("how did you get here?")
        importResult = ""
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





    
