import { useState } from "react";

import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

import FormField from "~/components/form/FormField";
import Layout from '~/components/Layout';
import { login, register } from "~/utils/auth.server";
import { validateEmail, validateName, validatePassword } from "~/utils/validators.server";

enum LoginAction {
  LOGIN = "login",
  REGISTER = "register",
}

const Login = () => {
  const [action, setAction] = useState<LoginAction>(LoginAction.LOGIN);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setFormData((form) => ({ ...form, [field]: e.target.value }));
  };

  const isLogin = action === LoginAction.LOGIN;

  return (
    <Layout>
      <div className="flex h-full flex-col items-center justify-center gap-y-4">
        <button
          onClick={() => setAction(isLogin ? LoginAction.REGISTER : LoginAction.LOGIN)}
          className="absolute right-8 top-8 rounded-xl bg-yellow-300 px-3 py-2 font-semibold text-blue-600 transition duration-300 ease-in-out hover:-translate-y-1 hover:bg-yellow-400"
        >
          {isLogin ? "Sign Up" : "Sign In"}
        </button>
        <h2 className="text-5xl font-extrabold text-yellow-300">Welcome to SWC Progress!</h2>
        <p className="font-semibold text-slate-300">
          {isLogin ? "Log In To Give your space!" : "Sign Up To Get Started!"}
        </p>

        <form method="post" className="w-96 rounded-2xl bg-gray-200 p-6">
          <FormField
            htmlFor="email"
            label="Email"
            value={formData.email}
            onChange={(e) => handleInputChange(e, "email")}
          />
          <FormField
            htmlFor="password"
            type="password"
            label="Password"
            value={formData.password}
            onChange={(e) => handleInputChange(e, "password")}
          />
          {!isLogin && (
            <>
              <FormField
                htmlFor="firstName"
                label="First Name"
                value={formData.firstName}
                onChange={(e) => handleInputChange(e, "firstName")}
              />
              <FormField
                htmlFor="lastName"
                type="lastName"
                label="Last Name"
                value={formData.lastName}
                onChange={(e) => handleInputChange(e, "lastName")}
              />
            </>
          )}

          <div className="w-full text-center">
            <button
              type="submit"
              name="_action"
              value={action}
              className="mt-2 rounded-xl bg-yellow-300 px-3 py-2 font-semibold text-blue-600 transition duration-300 ease-in-out hover:-translate-y-1 hover:bg-yellow-400"
            >
              {isLogin ? "Sign In" : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const action = form.get("_action");
  const email = form.get("email");
  const password = form.get("password");
  let firstName = form.get("firstName");
  let lastName = form.get("lastName");

  if (typeof action !== "string" || typeof email !== "string" || typeof password !== "string") {
    return json({ error: `Invalid Form Data`, form: action }, { status: 400 });
  }

  if (action === "register" && (typeof firstName !== "string" || typeof lastName !== "string")) {
    return json({ error: `Invalid Form Data`, form: action }, { status: 400 });
  }

  const errors = {
    email: validateEmail(email),
    password: validatePassword(password),
    ...(action === "register"
      ? {
        firstName: validateName((firstName as string) || ""),
        lastName: validateName((lastName as string) || ""),
      }
      : {}),
  };

  if (Object.values(errors).some(Boolean)) {
    return json(
      { errors, fields: { email, password, firstName, lastName }, form: action },
      { status: 400 }
    );
  }

  switch (action) {
  case LoginAction.LOGIN: {
    return login({ email, password });
  }
  case LoginAction.REGISTER: {
    firstName = firstName as string;
    lastName = lastName as string;

    return register({ email, password, firstName, lastName });
  }
  default:
    return json({ error: `Invalid Form Data` }, { status: 400 });
  }
};

export default Login;
