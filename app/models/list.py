from .db import db, environment, SCHEMA, add_prefix_for_prod

class CardList(db.Model):
    __tablename__ = 'lists'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    color = db.Column(db.String(100))
    card_order = db.Column(db.Text, default='[]')
    board_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("boards.id")))

    board = db.relationship(
        "Board", back_populates="lists"
    )
    cards = db.relationship(
        "Card", cascade="all, delete-orphan", back_populates="list"
    )

    @property
    def _name(self):
        return self.name

    @_name.setter
    def _name(self, new_name):
        self.name = new_name

    @property
    def _color(self):
        return self.color

    @_color.setter
    def _name(self, new_color):
        self.color = new_color

    @property
    def _card_order():
        return self.card_order

    @_card_order.setter
    def _card_order(self, new_card_order):
        self.card_order = new_card_order

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'color': self.color,
            'card_order': self.card_order,
            'cards': [card.to_dict() for card in self.cards]
        }
