import pytest
from dotenv import load_dotenv
import os


load_dotenv()


@pytest.fixture
def base_url():
    base_url = os.getenv("BASE_URL")
    print("base_url",base_url)
    return 'http://ec2-98-81-1-246.compute-1.amazonaws.com:8000/api'
