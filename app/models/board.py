from .db import db, environment, SCHEMA, add_prefix_for_prod

class Board(db.Model):
    __tablename__ = 'boards'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False)
    background = db.Column(db.String(255), default="snowmountain")
    private = db.Column(db.Boolean, default=False)
    list_order = db.Column(db.Text, default='[]')
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))

    lists = db.relationship(
        "CardList", cascade="all, delete-orphan", back_populates="board"
    )
    user = db.relationship(
        "User", back_populates="boards"
    )

    @property
    def _name(self):
        return self.name

    @_name.setter
    def _name(self, new_name):
        self.name = new_name

    @property
    def _background(self):
        return self.background

    @_background.setter
    def _background(self, new_background):
        self.background = new_background

    @property
    def _list_order(self):
        return self.list_order

    @_list_order.setter
    def _list_order(self, new_list_order):
        self.list_order = new_list_order

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'background': self.background,
            'list_order': self.list_order,
            'private': self.private,
            'lists': [list.to_dict() for list in self.lists]
        }
