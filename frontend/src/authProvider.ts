import { AuthBindings } from "@refinedev/core";

export const TOKEN_KEY = "zeal-auth";

const backend = import.meta.env.VITE_BACKEND_SERVER

export const authProvider: AuthBindings = {
   login: async ({ username, email, password }) => {
      console.log(backend)
      const response = await fetch(`${backend}/login`, {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.token) {
         sessionStorage.setItem(TOKEN_KEY, JSON.stringify(data.token));
         return {
            success: true,
            redirectTo: "",
         };
      }

      return {
         success: false,
         error: {
            name: "LoginError",
            message: data.message,
         },
      };
   },
   logout: async () => {
      sessionStorage.removeItem(TOKEN_KEY);
      return {
         success: true,
         redirectTo: "/login",
      };
   },
   check: async () => {
      const token = sessionStorage.getItem(TOKEN_KEY);
      if (token) {
         return {
            authenticated: true,
         };
      }

      return {
         authenticated: false,
         logout: true,
         redirectTo: "/login",
         error: {
            name: "Unauthorized",
            message: "Check failed",
         },
      };
   },
   getPermissions: async () => null,
   getIdentity: async () => {
      const token = sessionStorage.getItem(TOKEN_KEY);
      if (token) {
         const base64Url = token.split(".")[1];
         const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
         const jsonPayload = decodeURIComponent(
            atob(base64)
               .split("")
               .map(function (c) {
                  return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
               })
               .join("")
         );

         const { email, username, role } = JSON.parse(jsonPayload);

         return {
            id: 1,
            name: username,
            email: email,
            role: role,
            avatar: "https://i.pravatar.cc/300",
         };
      }
      return null;
   },
   onError: async (error) => {
      if (error.status === 401 || error.status === 403) {
         return {
            logout: true,
            redirectTo: "/login",
            error,
         };
      }
      console.error(error);
      return { error };
   },
   updatePassword: async ({ password, confirmPassword, token }) => {
      //update the user's password here

      // if the password was updated successfully
      return {
         success: true,
         redirectTo: "/login",
      };

      // if the password update failed
      return {
         success: false,
         error: {
            message: "Password update failed",
            name: "Password update failed",
         },
      };
   },
   forgotPassword: async ({ email }) => {
      // send password reset link to the user's email address here

      // if request is successful
      return {
         success: true,
         redirectTo: "/login",
      };

      // if request is not successful
      return {
         success: false,
         error: {
            name: "Forgot Password Error",
            message: "Email address does not exist",
         },
      };
   },

   register: async ({ username, email, password,role }) => {
      const response = await fetch(`${backend}/accounts`, {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({username,email, password, role }),
      });

      const data = await response.json();

      if (response.status === 201) {
         // Handle successful registration
         return {
            success: true,
            redirectTo: "/login",
         };
      } else if (response.status === 400) {
         // Handle user already exists error
         return {
            success: false,
            error: {
               name: "Register Error",
               message: data.message || "User already exists",
            },
         };
      } else {
         // Handle other errors
         return {
            success: false,
            error: {
               name: "Register Error",
               message: data.message || "An error occurred",
            },
         };
      }
   },
};
