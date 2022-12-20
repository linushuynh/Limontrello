from .db import db, environment, SCHEMA, add_prefix_for_prod

class Board(db.Model):
    __tablename__ = 'boards'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False)
    background = db.Column(db.String(255), nullable=False)
    private = db.Column(db.Boolean, default=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))

    lists = db.relationship(
        "CardList", cascade="all, delete-orphan", back_populates="board"
    )
    user = db.relationship(
        "User", back_populates="boards"
    )

    @property
    def name(self):
        return self.name

    @name.setter
    def name(self, new_name):
        self.name = new_name

    @property
    def name(self):
        return self.name

    @name.setter
    def name(self, new_name):
        self.name = new_name

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'background': self.background,
            'private': self.private
        }
