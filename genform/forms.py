from django import forms
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Fieldset, ButtonHolder, Submit
from .models import *
# from betterforms.multiform import MultiForm
# make new form for the segments

class UploadFileForm(forms.Form):
    file = forms.FileField(widget=forms.FileInput(attrs={
    'label': 'Upload Your Own JSON-LD',}))
    # file.widget.attrs.update({'placeholder': 'Upload Your Own JSON-LD'})

    def __init__(self, *args, **kwargs):
            super().__init__(*args, **kwargs)
            self.helper = FormHelper()
            self.helper.form_class = 'external-file'
            self.helper.label_class = 'custom-file-label'
            self.helper.field_class = 'custom-file-input'
            self.helper.help_text_inline = True

# class AddMission(forms.Form):
#     exvoc = forms.CharField(
#     label = 'External Vocabulary Code'
#     )
#
#     exvocurl = forms.CharField(
#     label = "External Vocabulary URL"
#     )
#
#     mtype = forms.CharField(
#     label = "Mission Type"
#     )
#
#     mname = forms.CharField(
#     label = "Mission Name"
#     )
#
#     aname = forms.CharField(
#     label = "Space Agency"
#     )
#
#     acode = forms.CharField(
#     label = "Space Agency Abbreviation"
#     )
#
#     country = forms.CharField(
#     label = "Country"
#     )
#
#     segment = forms.MultipleChoiceField(
#     widget=forms.CheckboxSelectMultiple(
#         attrs = {
#         'class': 'seg'
#         },
#     ),
#     choices= [(c.id, c.segment) for c in Segment.objects.all()],
#     )
#     def __init__(self, *args, **kwargs):
#         super().__init__(*args, **kwargs)
#         self.helper = FormHelper()
#         self.helper.form_class = 'form-horizontal'
#         self.helper.label_class = 'col-lg-2'
#         self.helper.field_class = 'col-lg-8'
#         self.helper.form_method = 'post'
#         self.helper.form_action = 'submit_survey'
#         self.helper.help_text_inline = True
#         self.helper.layout = Layout(
#             Fieldset(
#                 '',
#                 'exvoc',
#                 'exvocurl',
#                 'mtype',
#                 'mname',
#                 'aname',
#                 'acode',
#                 'country',
#                 'segment',
#
#
#             ),
#
#             ButtonHolder(
#                 Submit('submit', 'Submit', css_class='button white')
#             )
#         )
#
# class GroundSeg(forms.Form):
#     gseg = forms.BooleanField(
#     label = "Ground Segment",
#     widget = forms.CheckboxInput(
#         attrs = {
#         'class': "gseg"
#         }
#         )
#     )
#
#     def __init__(self, *args, **kwargs):
#         super().__init__(*args, **kwargs)
#         self.helper = FormHelper()
#         self.helper.form_class = 'form-horizontal'
#         self.helper.label_class = 'col-lg-2'
#         self.helper.field_class = 'col-lg-8'
#         self.helper.form_method = 'post'
#         self.helper.form_action = 'submit_survey'
#         self.helper.help_text_inline = True
#
#
# class SpaceSeg(forms.Form):
#     sseg = forms.BooleanField(
#     label = "Space Segment",
#     widget = forms.CheckboxInput(
#         attrs = {
#         'class': "sseg"
#         }
#         )
#     )
#
#     def __init__(self, *args, **kwargs):
#         super().__init__(*args, **kwargs)
#         self.helper = FormHelper()
#         self.helper.form_class = 'form-horizontal'
#         self.helper.label_class = 'col-lg-2'
#         self.helper.field_class = 'col-lg-8'
#         self.helper.form_method = 'post'
#         self.helper.form_action = 'submit_survey'
#         self.helper.help_text_inline = True
#
#
# class LaunchSeg(forms.Form):
#     lseg = forms.BooleanField(
#     label = "Launch Segment",
#     widget = forms.CheckboxInput(
#         attrs = {
#         'class': "lseg"
#         }
#         )
#     )
#
#     def __init__(self, *args, **kwargs):
#         super().__init__(*args, **kwargs)
#         self.helper = FormHelper()
#         self.helper.form_class = 'form-horizontal'
#         self.helper.label_class = 'col-lg-2'
#         self.helper.field_class = 'col-lg-8'
#         self.helper.form_method = 'post'
#         self.helper.form_action = 'submit_survey'
#         self.helper.help_text_inline = True
#
# class UserSeg(forms.Form):
#     useg = forms.BooleanField(
#     label = "User Segment",
#     widget = forms.CheckboxInput(
#         attrs = {
#         'class': "useg"
#         }
#         )
#     )
#
#     def __init__(self, *args, **kwargs):
#         super().__init__(*args, **kwargs)
#         self.helper = FormHelper()
#         self.helper.form_class = 'form-horizontal'
#         self.helper.label_class = 'col-lg-2'
#         self.helper.field_class = 'col-lg-8'
#         self.helper.form_method = 'post'
#         self.helper.form_action = 'submit_survey'
#         self.helper.help_text_inline = True

# class ParentForm(MultiForm):
#     form_classes = {
#         # 'mission': AddMission,
#         'groundSegment': GroundSeg,
#         'spaceSegment': SpaceSeg,
#         'launchSegment': LaunchSeg,
#         'userSegment': UserSeg,
#
#     }
#         # super().__init__(*args, **kwargs)
#         # self.helper = FormHelper()
#         # self.helper.form_class = 'form-horizontal'
#         # self.helper.label_class = 'col-lg-2'
#         # self.helper.field_class = 'col-lg-8'
#         # self.helper.form_method = 'post'
#         # self.helper.form_action = 'submit_survey'
#         # self.helper.help_text_inline = True
#         # self.helper.layout = Layout(
#         #     Fieldset(
#         #         '',
#         #         'mission',
#         #         'groundSegment',
#         #         'spaceSegment',
#         #         'launchSegment',
#         #         'userSegment',
#         #
#         #     ),
#             # )
#     ParentForm(initial={
#     'mission': {
#     },
#     'groundSegment': {
#     },
#     'spaceSegment': {
#     },
#     'launchSegment':{
#     },
#     'userSegment':{
#     },
# })
#

# class AddElement(forms.Form):
#     notparent = forms.ModelChoiceField(
#     label = ""
#     )
#     def __init__(self, *args, **kwargs):
#         super().__init__(*args, **kwargs)
#         self.helper = FormHelper()
#         self.helper.form_class = 'form-horizontal'
#         self.helper.label_class = 'col-lg-2'
#         self.helper.field_class = 'col-lg-8'
#         self.helper.form_method = 'post'
#         self.helper.form_action = 'submit_survey'
#         self.helper.help_text_inline = True
#         self.helper.layout = Layout(
#             Fieldset(
#                 '',
#                 'exvoc',
#                 'exvocurl',
#                 'parent',
#
#             ),
#
#             ButtonHolder(
#                 Submit('submit', 'Submit', css_class='button white')
#             )
#         )
