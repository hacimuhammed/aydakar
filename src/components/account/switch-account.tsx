"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { authClient, getSession } from "@/lib/auth-client";
import { LogOutIcon, UserIcon, PlusIcon, UserCheckIcon } from "lucide-react";
import Link from "next/link";
import { Session, User } from "better-auth";
import { useRouter } from "next/navigation";
const SwitchAccount = () => {
  const [open, setOpen] = useState(false);
  const [activeSession, setActiveSession] = useState<{
    session: Session;
    user: User;
  } | null>(null);
  const router = useRouter();
  const [sessions, setSessions] = useState<
    {
      session: Session;
      user: User;
    }[]
  >([]);

  const fetchActiveSession = useCallback(async () => {
    const result = await getSession();
    if (!result.error) {
      setActiveSession(result.data);
    }
  }, []);

  useEffect(() => {
    fetchActiveSession();
  }, [fetchActiveSession]);

  useEffect(() => {
    const fetchSessions = async () => {
      const result = await authClient.multiSession.listDeviceSessions();
      if (!result.error) {
        setSessions(result.data);
      }
    };
    fetchSessions();
  }, []);

  const handleSwitchAccount = async (sessionToken: string) => {
    await authClient.multiSession.setActive({
      sessionToken: sessionToken,
    });
    await fetchActiveSession();
    router.refresh();
  };

  const handleLogout = async () => {
    if (activeSession) {
      await authClient.multiSession.revoke({
        sessionToken: activeSession.session.token,
      });
      router.refresh();
    }
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button onMouseOver={() => setOpen(true)}>Hesaplar</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <div className="flex items-center gap-2">
            <UserCheckIcon className="w-4 h-4" />
            <span>{activeSession?.user.email}</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        {sessions
          .filter((s) => s.session.id !== activeSession?.session.id)
          .map((session) => (
            <DropdownMenuItem
              key={session.session.id}
              onClick={() => handleSwitchAccount(session.session.token)}
            >
              <UserIcon className="w-4 h-4" />
              <span>{session.user.email}</span>
            </DropdownMenuItem>
          ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/sign_in">
            <PlusIcon className="w-4 h-4" />
            <span>Hesap Ekle</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => handleLogout()}>
          <LogOutIcon className="w-4 h-4" />
          <span>Çıkış Yap</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SwitchAccount;
