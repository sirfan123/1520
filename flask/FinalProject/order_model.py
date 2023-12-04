# order_model.py
from sqlalchemy.orm import declarative_base
import datetime as dt
from sqlalchemy import Column, Integer, String, Date

Base = declarative_base()

class Order(Base):

    __tablename__ = "Order"
    id = Column("id", Integer, primary_key=True, autoincrement=True)
    customer_name = Column("customer_name", String, nullable=False)
    orders = Column("orders", String, nullable=False)
    date_created = Column("date_created", Date, default= dt.datetime.utcnow, nullable=False)

    def __int__(self,content):
        self.content = content
    

    def toJSON(self):
        return {
            "id": self.id,
            "customer_name": self.customer_name,
            "orders": self.orders,
            "date_created": self.date_created.strftime('%Y-%m-%d %H:%M:%S')
        }
