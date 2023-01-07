from app.models import db, Card, environment, SCHEMA


# Adds a demo user, you can add other cards here if you want
def seed_cards():
    card1 = Card(
        title='Click on me', description='You can click on the description box to add and edit it', list_id = 2)
    card2 = Card(
        title='Make more cards', description='Give your cards descriptions too!', list_id = 1)
    card3 = Card(
        title='Drag me into another column!', description='', list_id = 1)
    card4 = Card(
        title='Edit the board name', description='You can edit the board name by clicking on it', list_id = 1)

    db.session.add_all([card1, card2, card3, card4])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the cards table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_cards():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.cards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM cards")

    db.session.commit()
