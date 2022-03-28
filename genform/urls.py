from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', views.index, name="index"),
    path("importTemplate", views.importTemplate, name="import"),
    path("generate", views.generate, name="generate"),
    path('download_file', views.download_file),
    path('lookUp', views.lookUp),
    path('search', views.search, name="search")
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
