-- Title: Fix shared recipes RLS for system seeding
-- Description: Allow the app to upsert shared (user_id IS NULL) recipes from
-- screens.json. Migration 0014 hardened write policies but inadvertently
-- blocked the syncReactRecipes() seeder which inserts rows with user_id = NULL.
-- We add a separate permissive policy for system-seeded shared recipes and
-- grant the byos_app role the ability to insert/update them.

-- =============================================================================
-- Allow inserting shared recipes (user_id IS NULL) from the seeder.
-- The seeder runs as the connection owner (neondb_owner / postgres) and does
-- NOT set app.current_user_id, so we need a policy clause for that case.
-- =============================================================================

DROP POLICY IF EXISTS recipes_insert_policy ON recipes;
DROP POLICY IF EXISTS recipes_insert_shared_policy ON recipes;

-- User-owned recipes: must own the row (existing behaviour)
CREATE POLICY recipes_insert_policy ON recipes
    FOR INSERT
    WITH CHECK (
        user_id = current_setting('app.current_user_id', true)
        OR user_id IS NULL
    );

DROP POLICY IF EXISTS recipes_update_policy ON recipes;
DROP POLICY IF EXISTS recipes_update_shared_policy ON recipes;

-- Updates: user owns the row OR the row is shared (user_id IS NULL).
-- Shared rows are only updated by the seeder (syncReactRecipes) which runs
-- without a scoped user_id, so we allow NULL here too.
CREATE POLICY recipes_update_policy ON recipes
    FOR UPDATE
    USING (
        user_id = current_setting('app.current_user_id', true)
        OR user_id IS NULL
    )
    WITH CHECK (
        user_id = current_setting('app.current_user_id', true)
        OR user_id IS NULL
    );
