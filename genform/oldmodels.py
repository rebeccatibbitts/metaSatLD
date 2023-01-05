from django.db import models

class CrosswalkExternalelement(models.Model):
    identifier = models.CharField(max_length=255)
    label = models.CharField(max_length=50, blank=True, null=True)
    url = models.TextField(blank=True, null=True)
    metasatelement = models.ForeignKey('MetasatElement', models.DO_NOTHING, blank=True, null=True)
    source = models.ForeignKey('CrosswalkExternalschema', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'crosswalk_externalelement'


class CrosswalkExternalschema(models.Model):
    name = models.CharField(max_length=255)
    url = models.CharField(max_length=255, blank=True, null=True)
    identifier = models.CharField(max_length=255, blank=True, null=True)
    lang = models.CharField(max_length=4, blank=True, null=True)
    desc = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'crosswalk_externalschema'


class MetasatElement(models.Model):
    identifier = models.CharField(unique=True, max_length=255)
    desc = models.TextField(blank=True, null=True)
    example = models.TextField(blank=True, null=True)
    synonym = models.CharField(max_length=255, blank=True, null=True)
    source = models.TextField(blank=True, null=True)
    term = models.CharField(max_length=255)
    deprecated = models.IntegerField()
    deprecatedon = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'metasat_element'


class MetasatElementFamily(models.Model):
    element = models.ForeignKey(MetasatElement, models.DO_NOTHING)
    elementfamily = models.ForeignKey('MetasatElementfamily', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'metasat_element_family'
        unique_together = (('element', 'elementfamily'),)


# class MetasatElementMapping(models.Model):
#     from_element = models.ForeignKey(MetasatElement, models.DO_NOTHING)
#     to_element = models.ForeignKey(MetasatElement, models.DO_NOTHING)
#
#     class Meta:
#         managed = False
#         db_table = 'metasat_element_mapping'
#         unique_together = (('from_element', 'to_element'),)


class MetasatElementSegment(models.Model):
    element = models.ForeignKey(MetasatElement, models.DO_NOTHING)
    segment = models.ForeignKey('MetasatSegment', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'metasat_element_segment'
        unique_together = (('element', 'segment'),)


class MetasatFamilyMap(models.Model):
    family = models.CharField(unique=True, max_length=255)

    class Meta:
        managed = False
        db_table = 'metasat_elementfamily'


class MetasatSegment(models.Model):
    segment = models.CharField(unique=True, max_length=255)

    class Meta:
        managed = False
        db_table = 'metasat_segment'
