"""(Hyperfocus): add related hyperfocuses column

Revision ID: 6615252b898f
Revises: e64d0e0a1103
Create Date: 2025-02-10 05:30:38.589837

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '6615252b898f'
down_revision: Union[str, None] = 'e64d0e0a1103'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('Hyperfocus', sa.Column('related_hyperfocuses', sa.ARRAY(sa.String()), nullable=False))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('Hyperfocus', 'related_hyperfocuses')
    # ### end Alembic commands ###
