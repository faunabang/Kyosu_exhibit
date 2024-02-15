from flask import Flask, request, abort, render_template, send_from_directory, jsonify, session
import os
from datetime import datetime
from dotenv import load_dotenv
import time

load_dotenv()  # openai_key .env 선언 사용

app = Flask(__name__) 
app.secret_key = 'jedolstory'

# 오류 핸들러
@app.errorhandler(404)
def not_found(e):
    return render_template('/html/404.html'), 404

# 루트 경로
@app.route("/")
def index():
    return render_template("/html/chat.html")

# 페이지 경로
@app.route('/<path:page>')
def page(page):
    print(f"Page request: {page}")
    try:
        if ".html" in page:
            return render_template(page)
        else:
            return send_from_directory("templates", page)
    except Exception as e:
        print(f'Error serving page {page}: {e}')
        abort(404)

# AI 쿼리 경로
@app.route("/query", methods=["POST"])
def query():
    today = str(datetime.now().date().today())
    query = request.json.get("query")
    print(query)
    answer = "test" 
    print(f"Answer: {answer}")
    time.sleep(1)
    return jsonify({"answer" : answer})


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5001)