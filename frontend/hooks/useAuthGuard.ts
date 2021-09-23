import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import { useStore } from "../store/store";

export const useAuthGuard = (requireAuth: boolean) => {
  const user = useStore((store) => store.user);
  const router = useRouter();
  useEffect(() => {
    if (requireAuth && !user) {
      router.replace("/");
    } else if (!requireAuth && user) {
      router.replace("/home");
    }
  }, [requireAuth, user, router]);
};
