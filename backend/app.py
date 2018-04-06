# pip install flask flask-cors jsonify google-api-python-client
import requests
from flask import Flask, jsonify, request
from flask_cors import CORS

# https://developers.google.com/youtube/v3/code_samples/python#search_by_keyword

from googleapiclient.discovery import build

STEAMSPY_URL = 'http://steamspy.com/api.php?request=top100in2weeks'
API_SERVICE_NAME = 'youtube'
API_VERSION = 'v3'


APP = Flask(__name__)
CORS(APP)

YT_DEV_KEY = 'XXX'
TWITCH_CLIENT_ID = 'XXX'

@APP.route('/api/v1.0/steam/bestgames',methods=['GET'])
def getBestGames():
    request_result = runGetRequest(STEAMSPY_URL,{})
    return request_result

@APP.route('/api/v1.0/steam/game/<int:appid>', methods=['GET'])
def getGame(appid):
    request_result = runGetRequest('http://store.steampowered.com/api/appdetails?appids='+str(appid),{})
    return request_result

@APP.route('/api/v1.0/twitch/stream/<string:game>', methods=['GET'])
def getStream(game):
    headers = {'Accept':'application/vnd.twitchtv.v5+json','Client-ID':TWITCH_CLIENT_ID}
    request_result = runGetRequest('https://api.twitch.tv/kraken/search/streams?query='+game,headers)
    return request_result


@APP.route('/api/v1.0/youtube/search', methods=['POST'])
def getVideos():
    youtube = build(API_SERVICE_NAME, API_VERSION, developerKey=YT_DEV_KEY)
    options = request.get_json(silent=True)
    # https://developers.google.com/youtube/v3/docs/search/list
    search_response = youtube.search().list(
        q=options['q'],
        part="id,snippet",
        maxResults=options['maxResults'],
        order='viewCount',
        type='video',
        videoEmbeddable='true'
    ).execute()
    return jsonify(search_response)

def runGetRequest(url,headers):
    r = requests.get(url,headers=headers)
    return r.text

if __name__ == '__main__':
    APP.run(host="0.0.0.0", port=9988, debug=True, threaded=True)
