from .db import db, environment, SCHEMA, add_prefix_for_prod

class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    card_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("cards.id")))

    card = db.relationship(
        "Card", back_populates="comments"
    )

    @property
    def _content(self):
        return self.content

    @_content.setter
    def _content(self, new_content):
        self.content = new_content

    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'user_id': self.user_id,
            'card_id': self.card_id
        }
