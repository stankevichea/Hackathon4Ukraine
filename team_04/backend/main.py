import os
from flask import Flask, send_from_directory
from flask import request
from pymongo import MongoClient

app = Flask(__name__, static_folder='../frontend/build')
client = MongoClient()
# db = client['database-name']

@app.route('/api/search/')
def search():
    '''search for entries matching the given filters'''
    language = request.args.get('language', '')
    country = request.args.get('country', '')
    city = request.args.get('city', '')
    # TODO: query mongoDB
    results = [{'url': 'https://test.com', 'name': 'Test', 'language': language, 'country': country, 'city': city}]  # just for testing
    return {'results': results}


@app.route('/api/regions/')
def regions():
    '''get available regions'''
    # TODO: query mongoDB
    results = ['Poland', 'Ukraine', 'Border Ukraine-Poland', 'London']  # just for testing
    return {'regions': results}


@app.route('/api/languages/')
def languages():
    '''get available languages'''
    # TODO: query mongoDB
    results = ['English', 'Ukrainian', 'Polish', 'German']  # just for testing
    return {'languages': results}


@app.route('/api/newentry/')
def newentry():
    keys = ['url', 'name', 'language', 'country', 'city']
    data = {key: request.args.get(key, '') for key in keys}
    # TODO: insert into mongodb (including key "not verified")
    success = all(data.values())  # just for testing
    return {'success': success}


# Serve React App if none of the above entries matched
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path == "" or not os.path.exists(app.static_folder + '/' + path):
        path = 'index.html'
    return send_from_directory(app.static_folder, path)
