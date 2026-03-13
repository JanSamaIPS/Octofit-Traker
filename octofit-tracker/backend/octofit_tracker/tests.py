from django.test import TestCase
from rest_framework.test import APIClient


class ApiRoutingTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_root_endpoint(self):
        response = self.client.get("/")
        self.assertEqual(response.status_code, 200)
        self.assertIn("users", response.data)

    def test_users_endpoint(self):
        response = self.client.get("/api/users/")
        self.assertEqual(response.status_code, 200)