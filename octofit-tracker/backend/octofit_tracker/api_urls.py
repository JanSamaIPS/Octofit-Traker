from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (
    ActivityViewSet,
    LeaderboardViewSet,
    TeamViewSet,
    UserViewSet,
    WorkoutViewSet,
)

router = DefaultRouter()
router.register("users", UserViewSet, basename="user")
router.register("teams", TeamViewSet, basename="team")
router.register("activities", ActivityViewSet, basename="activity")
router.register("leaderboard", LeaderboardViewSet, basename="leaderboard")
router.register("workouts", WorkoutViewSet, basename="workout")

urlpatterns = [
    path("", include(router.urls)),
]