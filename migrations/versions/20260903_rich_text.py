"""Allow card descriptions to store Tiptap JSON.

Revision ID: 20260903_rich_text
Revises: df99b6cec616
"""
from alembic import op
import sqlalchemy as sa


revision = "20260903_rich_text"
down_revision = "df99b6cec616"
branch_labels = None
depends_on = None


def upgrade():
    with op.batch_alter_table("cards") as batch_op:
        batch_op.alter_column(
            "description",
            existing_type=sa.String(length=255),
            type_=sa.Text(),
            existing_nullable=True,
        )


def downgrade():
    with op.batch_alter_table("cards") as batch_op:
        batch_op.alter_column(
            "description",
            existing_type=sa.Text(),
            type_=sa.String(length=255),
            existing_nullable=True,
        )
