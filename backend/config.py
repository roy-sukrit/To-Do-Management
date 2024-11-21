import pytest

@pytest.fixture
def base_url():
    base_url = "http://ec2-98-81-1-246.compute-1.amazonaws.com:8000/api"
    return base_url
