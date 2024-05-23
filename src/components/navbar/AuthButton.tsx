"use client";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useState } from "react";
import { toast } from "../ui/use-toast";
import { signOut, useSession } from "next-auth/react";
function AuthButton() {
  const session = useSession();
  console.log("🚀 ~ AuthButton ~ session:", session);

  const pathName = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  if (pathName === "/sign-in" || pathName === "/sign-up") {
    return;
  }
  const onLogoutHandler = async () => {
    try {
      setLoading(true);
      const response = await signOut();
      router.push("/");
      toast({
        title: "Logged out successfully",
        description: "You were logged out!",
      });
    } catch (error: any) {
      console.log("🚀 ~ onLogoutHandler ~ error:", error);
      toast({
        title: "Error",
        description: error?.data?.response?.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  if (!session.data && session.status === "unauthenticated") {
    return (
      <Button
        onClick={() => {
          router.push("/sign-in");
        }}>
        Sign In
      </Button>
    );
  }
  return (
    <Button
      onClick={onLogoutHandler}
      disabled={loading}
      type="button"
      variant="default">
      {!loading ? "Logout" : "Logging out..."}
    </Button>
  );
}

export default AuthButton;
