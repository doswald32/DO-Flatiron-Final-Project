"""added courses table

Revision ID: 0dc929299ce3
Revises: 2f9ccd46f246
Create Date: 2025-01-28 01:10:12.898425

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0dc929299ce3'
down_revision = '2f9ccd46f246'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('courses',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('address', sa.String(), nullable=False),
    sa.Column('rating', sa.Float(), nullable=True),
    sa.Column('favorite', sa.Boolean(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('courses')
    # ### end Alembic commands ###
