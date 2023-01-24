from .db import db, environment, SCHEMA, add_prefix_for_prod

class Card(db.Model):
    __tablename__ = 'cards'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255))
    position = db.Column(db.Integer)
    list_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("lists.id")))

    list = db.relationship(
        "CardList", back_populates="cards"
    )
    comments = db.relationship(
        "Comment", cascade="all, delete-orphan", back_populates="card"
    )

    @property
    def _title(self):
        return self.title

    @_title.setter
    def _title(self, new_title):
        self.description = new_title

    @property
    def _description(self):
        return self.description

    @_description.setter
    def _description(self, new_description):
        self.description = new_description

    @property
    def _position():
        return self.position

    @_position.setter
    def _position(self, new_position):
        self.position = new_position

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'position': self.position,
            'list_id': self.list_id,
            'comments': [comment.to_dict() for comment in self.comments]
        }
