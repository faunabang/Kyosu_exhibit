from flask import Flask, request, abort, render_template, send_from_directory, jsonify, session

app = Flask(__name__)

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

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5001)