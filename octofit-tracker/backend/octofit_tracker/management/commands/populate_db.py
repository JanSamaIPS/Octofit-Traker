from datetime import timedelta

from django.core.management.base import BaseCommand
from django.utils import timezone
from pymongo import MongoClient

from octofit_tracker.models import Activity, Leaderboard, Team, User, Workout


class Command(BaseCommand):
    help = "Populate the octofit_db database with test data"

    def handle(self, *args, **options):
        self.stdout.write("Clearing existing data...")
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()
        Team.objects.all().delete()
        User.objects.all().delete()

        self.stdout.write("Creating teams...")
        team_marvel = Team.objects.create(
            name="Team Marvel",
            description="Earth's mightiest heroes building healthy habits.",
        )
        team_dc = Team.objects.create(
            name="Team DC",
            description="Legendary heroes focused on strength and consistency.",
        )

        self.stdout.write("Creating superhero users...")
        heroes = [
            User(name="Peter Parker", email="spiderman@octofit.io", fitness_level="advanced"),
            User(name="Natasha Romanoff", email="blackwidow@octofit.io", fitness_level="advanced"),
            User(name="Bruce Wayne", email="batman@octofit.io", fitness_level="advanced"),
            User(name="Diana Prince", email="wonderwoman@octofit.io", fitness_level="advanced"),
        ]
        User.objects.bulk_create(heroes)

        user_map = {user.email: user for user in User.objects.all()}

        self.stdout.write("Creating workouts...")
        Workout.objects.bulk_create(
            [
                Workout(
                    title="Web Sprint Intervals",
                    intensity="high",
                    target_level="advanced",
                    duration_minutes=35,
                    instructions="Alternate 2 min sprint with 1 min recovery for 10 rounds.",
                ),
                Workout(
                    title="Amazon Strength Circuit",
                    intensity="medium",
                    target_level="intermediate",
                    duration_minutes=40,
                    instructions="Push-ups, lunges, planks, and jump rope in 4 rounds.",
                ),
                Workout(
                    title="Gotham Night Run",
                    intensity="medium",
                    target_level="beginner",
                    duration_minutes=25,
                    instructions="Steady jogging with posture and breathing focus.",
                ),
            ]
        )

        now = timezone.now()
        self.stdout.write("Creating activity logs...")
        Activity.objects.bulk_create(
            [
                Activity(
                    user=user_map["spiderman@octofit.io"],
                    team=team_marvel,
                    activity_type="Running",
                    duration_minutes=30,
                    calories=340,
                    performed_at=now - timedelta(days=1),
                ),
                Activity(
                    user=user_map["blackwidow@octofit.io"],
                    team=team_marvel,
                    activity_type="Strength Training",
                    duration_minutes=45,
                    calories=420,
                    performed_at=now - timedelta(days=2),
                ),
                Activity(
                    user=user_map["batman@octofit.io"],
                    team=team_dc,
                    activity_type="Cycling",
                    duration_minutes=50,
                    calories=500,
                    performed_at=now - timedelta(days=1),
                ),
                Activity(
                    user=user_map["wonderwoman@octofit.io"],
                    team=team_dc,
                    activity_type="HIIT",
                    duration_minutes=35,
                    calories=390,
                    performed_at=now - timedelta(days=3),
                ),
            ]
        )

        self.stdout.write("Creating leaderboard entries...")
        Leaderboard.objects.bulk_create(
            [
                Leaderboard(team=team_marvel, points=760, rank=1),
                Leaderboard(team=team_dc, points=710, rank=2),
            ]
        )

        self.stdout.write("Ensuring unique email index in MongoDB users collection...")
        client = MongoClient("mongodb://127.0.0.1:27017")
        db = client["octofit_db"]
        db["users"].create_index([("email", 1)], unique=True)

        self.stdout.write(self.style.SUCCESS("octofit_db successfully populated."))
