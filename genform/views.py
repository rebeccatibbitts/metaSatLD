from django.shortcuts import render
from django.db.models import Q
from datetime import datetime
from pyld import jsonld
from django.http import HttpResponse
from django.http import JsonResponse
from django.template import RequestContext
from django.views.static import serve
import json
from collections import OrderedDict
from django.core.serializers.json import DjangoJSONEncoder
from .models import *
from .forms import *
import re
import string
from django.views.decorators.csrf import requires_csrf_token
from django.views.decorators.csrf import ensure_csrf_cookie

# // INDEX & LOAD ELEMENTS //

@ensure_csrf_cookie
@requires_csrf_token
def index(request):
    new = {}
    allElements = MetasatElement.objects.filter(deprecated=False).order_by('identifier')

    print("Building cards...")

    context = {
            "form": UploadFileForm,
            "elementList": allElements,
            "serCon": "",
            }

    return render(request, "index.html", context)

# // PROJECT DOCUMENTATION //

def documentation(request):

    return render(request, "documentation.html")

# // GENERATE JSONLD FROM FORM FIELDS //

@ensure_csrf_cookie
def generate(request):
    csrf_token_value = get_token(request)

    url_parameter = request.GET.get("q")

    genform = url_parameter

    print("received request...")
    
    infoDict = {
        "@context": {
            "@version": 1.1,
            "@import": "https://gitlab.com/metasat/metasat-toolkit/-/raw/master/context.jsonld",
            "@vocab": "https://schema.space/metasat/"
            }
        }

    z = json.loads(genform)
    print("zee")
    print(z)

    inside = {}
    for m in z:
        print("emm")
        print(m)

        try:
            children = m["children"]
            if m["children"]:
                print("found a child")

                infoDict[m["id"]] = recursiveInput(m["children"])

        except:
            try:
                infoDict[m["id"]] = m["val"]

            except KeyError:
                pass

    outfile = json.dumps(infoDict)

    return JsonResponse(data=infoDict, encoder=DjangoJSONEncoder, safe=True, json_dumps_params=None)


# // RECURSIVELY BUILD JSONLD //

def recursiveInput(flatList):
    children = {}
    for y in flatList:
        try:
            if y["children"]:
                print("found a child")
                children[y["id"]] = recursiveInput(y["children"])

        except:
            children[y["id"]] = y["val"]
    return children

# // DOWNLOAD JSONLD FILE //

@ensure_csrf_cookie
def download_file(request):
    fileData = json.loads(request.POST["data"])
    print("FILE DATA HERE")
    print(fileData)
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

from django.shortcuts import render
from django.template.loader import render_to_string
from django.http import JsonResponse
from itertools import chain
from operator import attrgetter
from django.middleware.csrf import get_token


# // SEARCH & FILTER ELEMENTS //

def search(request):
    ctx = {}
    url_parameter = request.GET.get("q")

    if url_parameter:

        try:
            qt = MetasatElement.objects.filter(term__icontains=str(url_parameter))

            qi = MetasatElement.objects.filter(identifier__icontains=str(url_parameter))

            qs = MetasatElement.objects.filter(synonym__icontains=str(url_parameter))

            qd = MetasatElement.objects.filter(desc__icontains=str(url_parameter))

            qr = list(set(list(chain(qt, qi, qs, qd))))

            artists = qr

        except (IndexError):

            artists = None

    else:
        artists = MetasatElement.objects.all()

    # artists = "just text"
    ctx["serCon"] = artists

    print("this is SERCON")
    print(type(ctx["serCon"]))
    print(ctx["serCon"])

    if request.META.get('HTTP_X_REQUESTED_WITH') == 'XMLHttpRequest':
        csrf_token_value = get_token(request)
        html = "<p> i am some text </p>"
        html = render_to_string(template_name="concepts-results-partial.html", context={"serCon": artists, "csrf_token_value" : csrf_token_value})
        data_dict = {"html_from_view": html}
        return JsonResponse(data=data_dict, safe=False)

    return render(request, "index.html", context=ctx)


# // UNFINISHED FEATURES //


    # // TESTING SEGMENT QUERIES (JAVASCRIPT IS UNFINISHED) //

def lookUp(request):
    ctx = {}
    print("got here")
    contentType = request.POST.get("lookUp")
    print("my con type is")
    print(contentType)

    if contentType == "segments":
        print("got a seg request")
        req = request.POST.get("contentID")
        print("my req is")
        print(req)

        if req == "user":
            qn = "57"
        if req == "launch":
            qn = "55"
        if req == "space":
            qn = "54"
        if req == "ground":
            qn = "56"

        try:
            q = MetasatElementSegment.objects.filter(segment_id=qn)
            el_list = []
            for i in q:
                element = MetasatElement.objects.get(id=i.element_id)
                el_list.append(element)

            artists = el_list

        except (IndexError):

            artists = None

    ctx["serCon"] = artists

    print("this is SERCON")
    print(type(ctx["serCon"]))
    print(ctx["serCon"])

    if request:
        html = render_to_string(
            template_name="concepts-results-partial.html", context={"serCon": artists}
        )
        data_dict = {"html_from_view": html}
        return JsonResponse(data=data_dict, safe=False)

    return render(request, "index.html", context=ctx)

# // UPLOAD FILE - JAVASCRIPT IS UNFINISHED //

def importTemplate(request):
    form = UploadFileForm(request.POST, request.FILES)
    importResult = {}
    if form.is_valid():
        print("got the file")
        testfile = request.FILES['file']
        print(testfile)
        b = handleUpload(testfile)
        print("dumping b...")
        print(b)
        with open('exfile.jsonld', 'rb+') as new:
            x = new.read()
            importResult = json.loads(x, object_pairs_hook=OrderedDict)
    else:
        print(form.errors)

    return JsonResponse(data=importResult, safe=False)
    # return HttpResponse(
    #         json.dumps(importResult),
    #         content_type="application/json"
    #     )

def handleUpload (file):
    print("in upload")
    with open('exfile.jsonld', 'wb+') as exfile:
        for chunk in file.chunks():
            exfile.write(chunk)
    return exfile
