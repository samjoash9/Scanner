from django.urls import re_path
from django.views.generic import TemplateView

urlpatterns = [
    # Catch-all pattern to serve React's index.html for all frontend routes
    re_path(r'^.*$', TemplateView.as_view(template_name="index.html"), name="index"),
]
