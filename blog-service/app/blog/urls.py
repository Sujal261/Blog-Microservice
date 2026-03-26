from django.urls import path

from .views import BlogAll, BlogCreateView, DeleteView, SingleBlogView, UpdateView

urlpatterns = [
    path("create/", BlogCreateView.as_view(), name="create"),
    path("all/", BlogAll.as_view(), name="all"),
    path("<int:id>/", SingleBlogView.as_view(), name="single"),
    path("delete/<int:id>/", DeleteView.as_view(), name="delete"),
    path("update/<int:id>/", UpdateView.as_view(), name="update"),
]
