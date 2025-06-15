
-- 1. Create an enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- 2. Create table to assign roles to users
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

-- 3. Enable RLS and allow users to see their own roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own user_roles"
  ON public.user_roles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all user_roles"
  ON public.user_roles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.user_roles AS ur2
      WHERE ur2.user_id = auth.uid()
        AND ur2.role = 'admin'
    )
  );

-- 4. Create SECURITY DEFINER function to check for admin
CREATE OR REPLACE FUNCTION public.is_admin(uid uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = uid AND role = 'admin'
  );
$$;

-- 5. Update RLS for profiles so admins see all, users see themselves
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
CREATE POLICY "Admins can view all profiles"
  ON public.profiles
  FOR SELECT USING (public.is_admin(auth.uid()));
CREATE POLICY "Users can view their own profile"
  ON public.profiles
  FOR SELECT USING (auth.uid() = id);

-- 6. Optionally, allow admin to update all, users to update themselves (future-proofing)
CREATE POLICY "Admins can update all profiles"
  ON public.profiles
  FOR UPDATE USING (public.is_admin(auth.uid()));
CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- 7. Optionally, allow admins to insert into user_roles (future-proofed for user management via UI)
CREATE POLICY "Admins can assign roles"
  ON public.user_roles
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

