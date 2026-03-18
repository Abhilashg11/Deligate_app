export const loginForm = {
  type: "form",
  logoName:"abton's",
  heroText:"Care starts with you.",
  title:"Welcome back",
  subtitle:"Sign in to access your dashboard",
  emailLabel:"WORK EMAIL",
  emailPlaceHolder:"you@hospital.org",
   passwordLabel:"PASSWORD",
  passwordPlaceHolder:"Enter your password",
  forgotLabel:"Forgot password?",
  ssoText:"Continue with SSO",
  fields: [
    { type: "text", name: "email", label: "Email", required: true },
    { type: "text", name: "password", label: "Password", secureTextEntry: true }
  ],

  actions: [
    {
      type: "submit",
      label: "Login"
    }
  ],

  submit: {
    service: "loginUser"
  }
};