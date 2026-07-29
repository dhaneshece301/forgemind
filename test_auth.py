import requests
import json
import sys

base_url = "http://localhost:8000/api"

# 1. Login
login_data = {
    "email": "engineer@forgemind.ai",
    "password": "SecurePassword123!"
}

print(f"Logging in with {login_data['email']}...")
res = requests.post(f"{base_url}/auth/login", json=login_data)
if res.status_code != 200:
    print(f"Login failed: {res.status_code} {res.text}")
    sys.exit(1)

data = res.json()
token = data.get("access_token")
if not token:
    print("No access token found in response!")
    sys.exit(1)

print(f"Login successful! Token: {token[:20]}...")

# 2. Access protected endpoint
print("\nFetching /projects with Bearer token...")
headers = {
    "Authorization": f"Bearer {token}"
}
res2 = requests.get(f"{base_url}/projects", headers=headers)
print(f"Response Status: {res2.status_code}")
print(f"Response Body: {res2.text}")
