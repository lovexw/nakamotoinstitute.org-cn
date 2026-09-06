"""drop slug-only unique constraint on blog_series_translations

The initial migration created a slug-only unique constraint, but the model
only declares uniqueness on (blog_series_id, locale). The slug-only
constraint blocks translating a series (en and zh-cn share the same slug).

Revision ID: a3f8c1d92b47
Revises: 7e477abbd00e
Create Date: 2026-09-06
"""

import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision: str = "a3f8c1d92b47"
down_revision: str | None = "7e477abbd00e"
branch_labels: str | tuple[str, ...] | None = None
depends_on: str | tuple[str, ...] | None = None


def upgrade() -> None:
    with op.batch_alter_table("blog_series_translations") as batch_op:
        batch_op.drop_constraint(
            "uq_blog_series_translations_slug", type_="unique"
        )


def downgrade() -> None:
    with op.batch_alter_table("blog_series_translations") as batch_op:
        batch_op.create_unique_constraint(
            "uq_blog_series_translations_slug", ["slug"]
        )
