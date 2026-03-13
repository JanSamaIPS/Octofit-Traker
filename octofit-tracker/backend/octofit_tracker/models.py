from django.db import models


class User(models.Model):
    name = models.CharField(max_length=120)
    email = models.EmailField(unique=True)
    fitness_level = models.CharField(max_length=40)

    class Meta:
        db_table = "users"

    def __str__(self):
        return f"{self.name} ({self.email})"


class Team(models.Model):
    name = models.CharField(max_length=80, unique=True)
    description = models.TextField(blank=True)

    class Meta:
        db_table = "teams"

    def __str__(self):
        return self.name


class Activity(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="activities")
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name="activities")
    activity_type = models.CharField(max_length=60)
    duration_minutes = models.PositiveIntegerField()
    calories = models.PositiveIntegerField(default=0)
    performed_at = models.DateTimeField()

    class Meta:
        db_table = "activities"


class Leaderboard(models.Model):
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name="leaderboard_entries")
    points = models.IntegerField(default=0)
    rank = models.PositiveIntegerField(default=1)

    class Meta:
        db_table = "leaderboard"


class Workout(models.Model):
    title = models.CharField(max_length=120)
    intensity = models.CharField(max_length=30)
    target_level = models.CharField(max_length=40)
    duration_minutes = models.PositiveIntegerField()
    instructions = models.TextField(blank=True)

    class Meta:
        db_table = "workouts"

    def __str__(self):
        return self.title