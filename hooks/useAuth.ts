import { api } from "@/lib/api";
import { useUserStore } from "@/store/user.store";

type RegisterPayload = {
  realName: string;
  username: string;
  email: string;
  password: string;
  gender: "MALE" | "FEMALE";
  age: number;
  location?: string;
  latitude?: number;
  longitude?: number;
};

export function useAuth() {
  const clearUser = useUserStore((s) => s.clear);

  const register = async (data: RegisterPayload) => {
    console.log("🟢 [useAuth][REGISTER] Called");
    console.log("🟢 [useAuth][REGISTER] Email:", data.email);

    try {
      const res = await api("/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
      });

      console.log("✅ [useAuth][REGISTER] Success");
      return res;
    } catch (err: any) {
      console.log("🔴 [useAuth][REGISTER] Error received");
      console.log("🔴 [useAuth][REGISTER] Message:", err?.message);
      throw err;
    }
  };

  const login = async (email: string, password: string) => {
    console.log("🟢 [useAuth][LOGIN] Called");
    console.log("🟢 [useAuth][LOGIN] Email:", email);

    try {
      const res = await api("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      console.log("✅ [useAuth][LOGIN] Success");
      return res;
    } catch (err: any) {
      console.log("🔴 [useAuth][LOGIN] Error:", err?.message);
      throw err;
    }
  };

  const logout = async () => {
    console.log("🟢 [useAuth][LOGOUT] Called");

    await api("/auth/logout", { method: "POST" });
    clearUser();

    console.log("✅ [useAuth][LOGOUT] Completed");
  };

  return { register, login, logout };
}
