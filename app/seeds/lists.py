from app.models import db, CardList, environment, SCHEMA


# Adds a demo user, you can add other boards here if you want
def seed_lists():
    new_list1 = CardList(
        name = "To-Do",
        board_id = 1
    )
    new_list2 = CardList(
        name = "In Progress",
        board_id = 1
    )
    new_list3 = CardList(
        name = "Complete",
        board_id = 1
    )
    new_list4 = CardList(
        name = "To-Do",
        board_id = 2
    )
    new_list5 = CardList(
        name = "In Progress",
        board_id = 2
    )
    new_list6 = CardList(
        name = "Complete",
        board_id = 2
    )

    db.session.add_all([new_list1, new_list2, new_list3, new_list4, new_list5, new_list6])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the boards table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_lists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.lists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM lists")

    db.session.commit()
