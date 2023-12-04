from flask import Flask, render_template, request, redirect, abort
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from order_model import Base, Order

app = Flask(__name__)
engine = create_engine("sqlite:///mydb.db", echo=True)
Base.metadata.create_all(bind=engine)
Session = sessionmaker(bind=engine)
session = Session();

@app.route("/")
def default():
    return render_template("index.html")

@app.route('/order-summary', methods=['POST'])
def order_summary():
    # Retrieve data from the form
    customer_name = request.form.get("customerName")
    order_summary = request.form.get("orderSummary")

    # Create a new order object
    new_order = Order(
        customer_name=customer_name,
        orders=order_summary,
    )

     # Add the new order to the database
    session.add(new_order)
    session.commit()

    # Redirect to the order summary page
    return render_template('order_summary.html', customer_name = customer_name, order_items=order_summary, order_num = new_order.id)

@app.route('/kitchen/')
def kitchen():
    # Retrieve all orders from the database
    orders = session.query(Order).all()

    # Convert each Order object to a JSON object using toJSON()
    orders_json = [order.toJSON() for order in orders]

    # Render the kitchen.html file and pass the JSON object array
    return render_template('kitchen.html', orders_json=orders_json)

@app.route('/delete/<int:id>')
def delete(id):
    # Retrieve the order to be deleted from the database
    order_to_delete = session.query(Order).filter_by(id=id).first()

    if order_to_delete:
        # Delete the order from the database
        session.delete(order_to_delete)
        session.commit()

    # Redirect to the kitchen page
    return redirect('/kitchen')

if __name__ == "__main__":
    app.run(debug=True)
