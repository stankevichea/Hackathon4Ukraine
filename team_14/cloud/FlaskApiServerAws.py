from flask import Flask, request, jsonify, escape
from ClientMongoDB import MongoDBClient
from bson.json_util import dumps
import requests
import json

app = Flask(__name__)


@app.route('/id/<int:tweet_id>', methods=['GET'])
def post_request(tweet_id):
    try:
        response = MongoDBClient().read_db({"id": str(tweet_id)})
        if response is None:
            resp = requests.get("https://1b6e-34-136-46-201.ngrok.io/?id={}&fbclid=IwAR2UfyhWnl2uqAVN_6OLcZsIh0_lNdyRmKPNf-dlaFAEFD1ngVm_BWRqdhE".format(tweet_id))

            response = {"id": str(tweet_id), "model_output": resp.json()["prob"]}
            MongoDBClient().update_db(response)
            return json.loads(dumps({str(tweet_id): resp.json()["prob"]}))

        else:
            return jsonify({response["id"]: response["model_output"]})

    except TypeError:
        return "RATE LIMITS", 404


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, ssl_context='adhoc')
