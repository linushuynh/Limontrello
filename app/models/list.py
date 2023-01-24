from .db import db, environment, SCHEMA, add_prefix_for_prod

class CardList(db.Model):
    __tablename__ = 'lists'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    position = db.Column(db.Integer)
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
    def _position():
        return self.position

    @_position.setter
    def _position(self, new_position):
        self.position = new_position

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'position': self.position,
            'cards': [card.to_dict() for card in self.cards]
        }
