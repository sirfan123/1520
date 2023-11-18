from flask import Flask, url_for, redirect, render_template, request, abort

app = Flask(__name__)

@app.route("/")
def default():
    return render_template("main.html")  

@app.route("/<play_name>/")
def play_details(play_name):
    return render_template("play.html", play_name=play_name) 

@app.route("/buy_tickets/<play_name>", methods=["GET", "POST"])
def buy_tickets(play_name):
    return render_template("buy_tickets.html", play_name=play_name) 

@app.route("/transaction_page/<play_name>", methods=["GET", "POST"])
def transaction_page(play_name):
    if request.method == "POST":
        seat_zone = request.form.get("seat_zone")
        section = request.form.get("section")
        time = request.form.get("time")
        date = request.form.get("date")
        customer_name = request.form.get("customer_name")

        return render_template(
            "transaction_page.html",
            play_name=play_name,
            seat_zone=seat_zone,
            section=section,
            time=time,
            date=date,
            customer_name=customer_name,
        )

    return redirect(url_for("default")) # ERROR GO MAIN


if __name__ == "__main__":
    app.run(debug=True)
