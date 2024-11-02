import requests
import pytest
from backend.config import base_url

def test_getTask(base_url):
    url = f"{base_url}/todos"
    res = requests.get(url)
    # print(res.json())
    assert res.status_code == 200

def test_createTask(base_url):
    url = f"{base_url}/todos"
    data = {
  "id": "string",
  "text": "string",
  "done": True,
  "email": "user@example.com",
  "category": [
    {
      "id": 0,
      "name": "string",
      "slug": "string"
    }
  ],
  "createdAt": "2024-11-01T12:47:17.372Z",
  "updatedAt": "2024-11-01T12:47:17.372Z"
}
    res = requests.post(url,data)
    # print(res.json())
    assert res.status_code == 201


def test_getTask(base_url):
    url = f"{base_url}/todos/0"
    res = requests.get(url)
    # print(res.json())
    assert res.status_code == 200

def test_getSingleTask(base_url):
    url = f"{base_url}/todos/0"
    res = requests.get(url)
    # print(res.json())
    assert res.status_code == 200
    
    
def test_updataTask(base_url):
    url = f"{base_url}/todos/0"
    data = {
  "id": "string",
  "text": "string",
  "done": True,
  "email": "user@example.com",
  "category": [
    {
      "id": 0,
      "name": "string",
      "slug": "string"
    }
  ],
  "createdAt": "2024-11-01T12:56:47.518Z",
  "updatedAt": "2024-11-01T12:56:47.518Z"
}
    res = requests.put(url,data)
    # print(res.json())
    assert res.status_code == 200
    
def test_deleteTask(base_url):
    url = f"{base_url}/todos/0"
    res = requests.delete(url)
    print(res)
    
    
    
if __name__ == "__main__":
    test_getTask(base_url)
    test_createTask(base_url)
    test_updataTask(base_url)
    test_deleteTask(base_url)