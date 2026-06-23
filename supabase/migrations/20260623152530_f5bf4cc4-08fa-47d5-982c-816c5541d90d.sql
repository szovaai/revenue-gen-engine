
-- Explicitly deny SELECT on waitlist for anon and authenticated by adding a restrictive policy.
-- Only service_role (bypasses RLS) can read waitlist entries.
CREATE POLICY "No public read access to waitlist"
  ON public.waitlist
  AS RESTRICTIVE
  FOR SELECT
  TO anon, authenticated
  USING (false);

-- Prevent duplicate signups
CREATE UNIQUE INDEX IF NOT EXISTS waitlist_email_unique_idx ON public.waitlist (lower(email));
