from .db import db, environment, SCHEMA, add_prefix_for_prod

class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(100), nullable=False)
    board_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("boards.id")))

    cards = db.relationship(
        "Card", cascade="all, delete-orphan", back_populates="list"
    )

    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'cards': [card.to_dict() for card in self.cards]
        }
