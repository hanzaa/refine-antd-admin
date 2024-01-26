import { AuthPage } from "../../components/pages/auth";

export const Login = () => {
  return (
    <AuthPage
      type="login"
      title={<img src="./zeal-horizontal-removebg.png" width={290} alt="zeal-logo" />}
      formProps={{
        initialValues: { email: "demo@refine.dev", password: "demodemo" },
      }}
      rememberMe={false}
      forgotPasswordLink={false}
    />
  );
};
