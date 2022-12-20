from .db import db, environment, SCHEMA, add_prefix_for_prod

class Card(db.Model):
    __tablename__ = 'cards'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255))
    list_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("lists.id")))

    list = db.relationship(
        "CardList", back_populates="cards"
    )

    @property
    def title(self):
        return self.title

    @title.setter
    def title(self, new_title):
        self.description = new_title

    @property
    def description(self):
        return self.description

    @description.setter
    def description(self, new_description):
        self.description = new_description

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'list': self.list.to_dict()
        }
