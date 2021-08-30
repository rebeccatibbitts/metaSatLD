from django.db import models

from genform.models import *
#https://docs.djangoproject.com/en/2.1/topics/db/multi-db/

class MyRouter(object):

    # not adding any write or modify functions, because this is a read only access
    def db_for_read(self, model, **hints):

        if model == CrosswalkExternalelement:
            return 'metasat'

        if model == CrosswalkExternalschema:
            return 'metasat'

        if model == MetasatElement:
            return 'metasat'

        if model == MetasatElementFamily:
            return 'metasat'

        if model == MetasatElementSegment:
            return 'metasat'

        if model == MetasatFamilyMap:
            return 'metasat'

        if model == MetasatSegment:
            return 'metasat'

        return None
