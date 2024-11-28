import requests
import pytest
import allure
from config import base_url

category_id = None
task_id = None


@allure.feature('get task')
@allure.story('get all to-do-task through email')
def test_getTask(base_url):
    url = f"{base_url}/todos"
    res = requests.get(url)
    assert res.status_code == 200


@allure.feature('get category')
@allure.story('get all category through email')
def test_getCategory(base_url):
    url = f"{base_url}/categories/sheen729@gmail.com"
    res = requests.get(url)
    assert res.status_code == 200


@allure.feature('create category')
@allure.story('create a to-do-task cartegory')
@pytest.mark.parametrize("data, status_code", [
    ({"name": "categoryname",
      "slug": "task",
      "email": "sheen729@gmail.com"}, 201),
    ({"name": "",
      "slug": "task",
      "email": "sheen729@gmail.com"}, 400),
    ({"name": "categoryname1",
      "slug": "",
      "email": "sheen729@gmail.com"}, 400),
    ({"name": "categoryname1",
      "slug": "task",
      "email": ""}, 400)])
def test_createCategory(base_url, data, status_code):
    global category_id
    url = f"{base_url}/categories"
    res = requests.post(url, json=data)
    print(res.json())
    if res.status_code == 201:
         if "_id" in res.json():
            category_id = res.json()['_id']
            print("Category created")

         elif "message" in res.json():
           print("Category already exists.")
    assert res.status_code == status_code


@allure.feature('create task')
@allure.story('create a to-do-task in category')
@pytest.mark.parametrize("data, status_code", [
    ({
        "email": "sheen729@gmail.com",
        "text": "My first todo",
        "done": "false",
        "categories": []}, 201),
    ({
        "email": "",
        "text": "My first todo",
        "done": "false",
        "categories": []}, 400),
    ({
        "email": "sheen729@gmail.com",
        "text": "",
        "done": "false",
        "categories": []}, 400),
    ({
        "email": "sheen729@gmail.com",
        "text": "My first todo",
        "done": "",
        "categories": []}, 500)])
def test_createTask(base_url, data, status_code):
    global category_id
    global task_id
    data["category"] = [{"_id": category_id}]
    url = f"{base_url}/todos"
    res = requests.post(url, json=data)
    # print(res.json())
    if res.status_code == 201:
        task_id = res.json()['_id']
    assert res.status_code == status_code


@allure.feature('get single task')
@allure.story('get to-do-task by task id')
def test_searchTask(base_url):
    url = f"{base_url}/todos/672766f355d1cdbbc1f45135"
    res = requests.get(url)
    assert res.status_code == 200


@allure.feature('update task')
@allure.story('update the task status and task text')
@pytest.mark.parametrize("data, status_code", [
    ({
        "done": "true",
        "text": "test111"
    }, 200),
    ({
        "done": "false"
    }, 200),
    ({
        "text": "test222"
    }, 200)
])
def test_updataTask(base_url, data, status_code):
    global task_id
    url = f"{base_url}/todos/{task_id}"
    res = requests.put(url, data)
    # print(res.json())
    assert res.status_code == status_code





@allure.feature('delete task')
@allure.story('delete tato-do-tasksk by task id')
def test_deleteTask(base_url):
    global task_id
    url = f"{base_url}/todos/{task_id}"
    res = requests.delete(url)
    print(res)


# @allure.feature('delete category')
# @allure.story('delete category by category id')
# def test_deleteCategory(base_url):
#     global category_id
#     print(category_id)
#     url = f"{base_url}/categories/{category_id}"
#     res = requests.delete(url)
#     assert res.status_code == 200


if __name__ == "__main__":
    test_getTask(base_url)
    test_createTask(base_url)
    test_updataTask(base_url)
    test_deleteTask(base_url)
    # test_deleteCategory(base_url)
    test_createCategory(base_url)
