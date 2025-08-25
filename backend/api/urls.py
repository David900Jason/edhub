from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('admin/', admin.site.urls),

    # Users / Authentication
    path('auth/', include('users.auth')),
    path("users/", include("users.urls")),

    # Courses API
    path('courses/', include('courses.urls')),

    # Payments API
    path('payments/', include('payments.urls')),

    # Productivity API
    path('notes/', include('notes.urls')),
    path('todos/', include('todo.urls')),

    # Enrollments API
    path("enrollments/", include("enrollments.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

