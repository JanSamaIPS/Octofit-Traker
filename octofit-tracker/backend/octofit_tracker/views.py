from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.viewsets import ModelViewSet

from .models import Activity, Leaderboard, Team, User, Workout
from .serializers import (
    ActivitySerializer,
    LeaderboardSerializer,
    TeamSerializer,
    UserSerializer,
    WorkoutSerializer,
)


class UserViewSet(ModelViewSet):
    queryset = User.objects.all().order_by("id")
    serializer_class = UserSerializer


class TeamViewSet(ModelViewSet):
    queryset = Team.objects.all().order_by("id")
    serializer_class = TeamSerializer


class ActivityViewSet(ModelViewSet):
    queryset = Activity.objects.all().order_by("id")
    serializer_class = ActivitySerializer


class LeaderboardViewSet(ModelViewSet):
    queryset = Leaderboard.objects.all().order_by("rank", "id")
    serializer_class = LeaderboardSerializer


class WorkoutViewSet(ModelViewSet):
    queryset = Workout.objects.all().order_by("id")
    serializer_class = WorkoutSerializer


@api_view(["GET"])
def api_root(request, format=None):
    return Response(
        {
            "users": reverse("user-list", request=request, format=format),
            "teams": reverse("team-list", request=request, format=format),
            "activities": reverse("activity-list", request=request, format=format),
            "leaderboard": reverse("leaderboard-list", request=request, format=format),
            "workouts": reverse("workout-list", request=request, format=format),
        }
    )