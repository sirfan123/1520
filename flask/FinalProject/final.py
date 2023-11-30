from flask import Flask, url_for, redirect, render_template, request, abort

app = Flask(__name__)

@app.route("/")
def default():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)
