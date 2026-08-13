import {
  getSessionUser,
} from "@/lib/auth/session-user";

import {
  PublicFooter,
} from "./_components/public-footer";

import {
  PublicHeader,
} from "./_components/public-header";

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user =
    await getSessionUser();

  return (
    <div className="flex min-h-screen flex-col">
      <PublicHeader
        user={user}
      />

      <div className="flex-1">
        {children}
      </div>

      <PublicFooter />
    </div>
  );
}