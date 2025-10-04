import React, { useState, useRef, useEffect } from "react";
import { FaApple, FaGoogle } from "react-icons/fa";
import { SiTesla, SiTcs, SiInfosys } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import {
  CognitoUserPool,
  CognitoUser,
  CognitoUserSession,
  CognitoIdToken,
  CognitoAccessToken,
  CognitoRefreshToken,
} from "amazon-cognito-identity-js";

const COGNITO_DOMAIN = "ap-south-1x8dtvzk9h.auth.ap-south-1.amazoncognito.com";
const CLIENT_ID = "70sk2pmn2orrjtck89thg6ogqu";
const REDIRECT_URI = window.location.origin + "/auth";
const TOKEN_ENDPOINT = `https://${COGNITO_DOMAIN}/oauth2/token`;

const poolData = {
  UserPoolId: "ap-south-1_X8dTvZK9H",
  ClientId: CLIENT_ID,
};

const userPool = new CognitoUserPool(poolData);

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    captcha: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    captcha: "",
  });
  const [touched, setTouched] = useState({
    email: false,
    password: false,
    captcha: false,
  });
  const [captchaCode, setCaptchaCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shake, setShake] = useState(false);
  const [isProcessingSSO, setIsProcessingSSO] = useState(false);

  const [dynamicText, setDynamicText] = useState("");
  const [dynamicLogo, setDynamicLogo] = useState(null);
  const [dynamicImage, setDynamicImage] = useState("");

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const captchaRef = useRef(null);

  useEffect(() => {
    const checkForSSO = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      const state = urlParams.get("state");

      if (code && state) {
        const storedState = sessionStorage.getItem("oauth_state");
        const codeVerifier = sessionStorage.getItem("pkce_code_verifier");

        if (!storedState || !codeVerifier) {
          window.history.replaceState(
            {},
            document.title,
            window.location.pathname
          );
          return;
        }

        setIsProcessingSSO(true);
        setIsLoading(true);
        try {
          await exchangeCodeForTokens(code, state);
          window.history.replaceState(
            {},
            document.title,
            window.location.pathname
          );
          navigate("/upload");
        } catch (err) {
          console.error("SSO error:", err);
          if (err.message === "Invalid state parameter") {
            setError(
              "Your login session has expired. Please try signing in again."
            );
          } else {
            setError(err.message || "SSO login failed. Please try again.");
          }
        } finally {
          setIsProcessingSSO(false);
          setIsLoading(false);
        }
      }
    };

    checkForSSO();
  }, [navigate]);

  const exchangeCodeForTokens = async (code, stateParam) => {
    try {
      const storedState = sessionStorage.getItem("oauth_state");
      const codeVerifier = sessionStorage.getItem("pkce_code_verifier");

      if (stateParam !== storedState) {
        throw new Error("Invalid state parameter");
      }

      const formData = new URLSearchParams();
      formData.append("grant_type", "authorization_code");
      formData.append("client_id", CLIENT_ID);
      formData.append("code", code);
      formData.append("redirect_uri", REDIRECT_URI);
      formData.append("code_verifier", codeVerifier);

      const response = await fetch(TOKEN_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString(),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Token exchange failed: ${response.status} - ${errorText}`
        );
      }

      const data = await response.json();

      if (data.id_token) {
        const base64Url = data.id_token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const payload = JSON.parse(atob(base64));
        const username = payload["cognito:username"] || payload.sub;

        const session = new CognitoUserSession({
          IdToken: new CognitoIdToken({ IdToken: data.id_token }),
          AccessToken: new CognitoAccessToken({
            AccessToken: data.access_token,
          }),
          RefreshToken: new CognitoRefreshToken({
            RefreshToken: data.refresh_token,
          }),
        });

        const user = new CognitoUser({
          Username: username,
          Pool: userPool,
        });
        user.setSignInUserSession(session);

        return true;
      } else {
        throw new Error("Failed to get tokens from Cognito");
      }
    } catch (err) {
      throw err;
    } finally {
      sessionStorage.removeItem("pkce_code_verifier");
      sessionStorage.removeItem("oauth_state");
    }
  };

  const startDynamicContent = () => {
    let textIndex = 0;
    let logoIndex = 0;
    let imageIndex = 0;

    setDynamicText(dynamicTexts[textIndex]);
    setDynamicLogo(companyLogos[logoIndex].icon);
    setDynamicImage(dynamicImages[imageIndex]);

    const textInterval = setInterval(() => {
      textIndex = (textIndex + 1) % dynamicTexts.length;
      setDynamicText(dynamicTexts[textIndex]);
    }, 3000);

    const logoInterval = setInterval(() => {
      logoIndex = (logoIndex + 1) % companyLogos.length;
      setDynamicLogo(companyLogos[logoIndex].icon);
    }, 2500);

    const imageInterval = setInterval(() => {
      imageIndex = (imageIndex + 1) % dynamicImages.length;
      setDynamicImage(dynamicImages[imageIndex]);
    }, 4000);

    return () => {
      clearInterval(textInterval);
      clearInterval(logoInterval);
      clearInterval(imageInterval);
    };
  };

  const loginWithGoogle = () => {
    const state = Math.random().toString(36).substring(2, 15);
    const codeVerifier =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);

    sessionStorage.setItem("pkce_code_verifier", codeVerifier);
    sessionStorage.setItem("oauth_state", state);

    const requiredScopes = [
      "openid",
      "email",
      "profile",
      "aws.cognito.signin.user.admin",
    ].join("+");

    const googleLoginUrl = `https://${COGNITO_DOMAIN}/oauth2/authorize?identity_provider=Google&response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&scope=${requiredScopes}&state=${state}&prompt=select_account`;

    window.location.href = googleLoginUrl;
  };

  const GoogleSSOButton = () => (
    <button
      type="button"
      onClick={loginWithGoogle}
      disabled={isSubmitting || isProcessingSSO}
      className="w-full h-11 md:h-12 mt-4 rounded-md border border-gray-300 bg-white text-gray-700 font-semibold text-[15px] transition-all duration-300 hover:bg-gray-50 hover:-translate-y-[2px] hover:shadow-md active:translate-y-0 flex items-center justify-center gap-3"
    >
   
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path
          fill="#EA4335"
          d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"
        />
        <path
          fill="#34A853"
          d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"
        />
        <path
          fill="#4A90E2"
          d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"
        />
        <path
          fill="#FBBC05"
          d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"
        />
      </svg>
      {isProcessingSSO ? "Processing..." : "Continue with Google"}
    </button>
  );

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const dynamicTexts = [
    "sysmind",
    "Consysmind",
    "Rabinnson",
    "Tesla",
    "Dettol",
    "Workforce",
    "Citi",
    "Prabulu",
  ];

  const companyLogos = [
    { icon: <SiTcs className="w-full h-full text-[#0047ab]" />, name: "TCS" },
    { icon: <FaApple className="w-full h-full text-black" />, name: "Apple" },
    {
      icon: <FaGoogle className="w-full h-full text-[#4285f4]" />,
      name: "Google",
    },
    {
      icon: <SiTesla className="w-full h-full text-[#cc0000]" />,
      name: "Tesla",
    },
    {
      icon: <SiInfosys className="w-full h-full text-[#007cc3]" />,
      name: "Infosys",
    },
  ];

  const dynamicImages = [
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2069&q=80",
    "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=2070&q=80",
  ];

  useEffect(() => {
    generateCaptcha();
    const stop = startDynamicContent();
    return stop;
  }, []);

  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let out = "";
    for (let i = 0; i < 5; i++) {
      out += chars[Math.floor(Math.random() * chars.length)];
    }
    setCaptchaCode(out);
    setFormData((p) => ({ ...p, captcha: "" }));
    setErrors((p) => ({ ...p, captcha: "" }));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Please enter a valid username or work email address.";
    if (!emailRegex.test(email)) return "Please enter a valid email address.";
    return "";
  };

  const validatePassword = (password) => {
    if (!password) return "Please enter your password.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    return "";
  };

  const validateCaptcha = (captcha) => {
    if (!captcha) return "Please enter the captcha.";
    if (captcha !== captcha.toUpperCase()) return "Captcha must be uppercase ";
    if (captcha.toUpperCase() !== captchaCode) return "Captcha does not match.";
    return "";
  };

  const handleChange = (field, value) => {
    setFormData((p) => ({ ...p, [field]: value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: "" }));
  };

  const handleBlur = (field) => {
    setTouched((p) => ({ ...p, [field]: true }));
    let error = "";
    if (field === "email") error = validateEmail(formData.email);
    if (field === "password") error = validatePassword(formData.password);
    if (field === "captcha") error = validateCaptcha(formData.captcha);
    setErrors((p) => ({ ...p, [field]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    const captchaError = validateCaptcha(formData.captcha);

    const newErrors = {
      email: emailError,
      password: passwordError,
      captcha: captchaError,
    };
    setErrors(newErrors);
    setTouched({ email: true, password: true, captcha: true });

    if (emailError || passwordError || captchaError) {
      setShake(true);
      setTimeout(() => setShake(false), 500);

      if (emailError && emailRef.current) emailRef.current.focus();
      else if (passwordError && passwordRef.current)
        passwordRef.current.focus();
      else if (captchaError && captchaRef.current) captchaRef.current.focus();
      return;
    }

    setIsSubmitting(true);
    try {
      await new Promise((res) => setTimeout(res, 1500));
      navigate("/upload");
    } catch (err) {
      console.error("Login failed:", err);
      setError("Login failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStateClasses = (field) => {
    const base =
      "w-full h-[48px] px-[12px] py-[10px] md:h-[52px] md:px-[14px] md:py-[12px] border rounded-md text-[14px] outline-none bg-white transition-all duration-300";
    const touchedField = touched[field];
    const hasError = !!errors[field];
    const hasValue = !!formData[field];
    if (touchedField && hasError)
      return `${base} border-red-500 shadow-[0_0_0_3px_rgba(239,68,68,0.15)] focus:shadow-[0_0_0_3px_rgba(239,68,68,0.25)] focus:border-red-500`;
    if (touchedField && !hasError && hasValue)
      return `${base} border-emerald-500 focus:border-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.15)]`;
    return `${base} border-gray-200 focus:border-[#516cc6] focus:shadow-[0_0_0_3px_rgba(81,108,198,0.15)]`;
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row md:items-start md:justify-end md:-mt-[70px] md:-ml-10 md:w-[115%] px-2 sm:px-4 pt-6 pb-10 overflow-hidden">
      {/* Loading Overlay */}
      {(isLoading || isProcessingSSO) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-700">Signing in with Google...</p>
          </div>
        </div>
      )}

     
      {error && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50">
          {error}
          <button
            onClick={() => setError(null)}
            className="float-right font-bold"
          >
            ×
          </button>
        </div>
      )}

      {/* Left mobile */}
      <div className="hidden md:flex flex-1 md:flex-[2] flex-col bg-[#f8f9fa]">
        <div className="flex justify-start items-center py-8 px-4 md:py-12 md:px-8 bg-white border-b border-[#e9ecef] min-h-[150px] md:min-h-[200px]">
          <div className="text-4xl md:text-6xl text-[#333] flex items-center justify-center animate-[float_3s_ease-in-out_infinite] md:-mx-12">
            {dynamicLogo}
          </div>
        </div>

        <div
          className="flex flex-1 bg-cover bg-center bg-no-repeat relative items-center justify-center min-h-[500px] -mt-16 -ml-32"
          style={{ backgroundImage: `url(${dynamicImage})` }}
        >
          <div className="text-center text-white bg-black/60 px-12 py-8 rounded-lg">
            <h2 className="text-[2.5rem] font-semibold mb-4">Welcome</h2>
            <p className="text-[1.2rem] opacity-90 m-0">
              Glad you&apos;re here!
            </p>
          </div>
        </div>
      </div>

      {/* Right Login Form */}
      <div className="w-full md:flex-[1] flex justify-center items-center p-2 sm:p-4 md:p-8 bg-white relative mt-7">
        {/* Dynamic Logo  top right desktop */}
        <div className="hidden md:flex absolute top-8 right-8 w-[160px] h-[42px] items-center justify-end font-semibold text-[14px] gap-3">
          <div className="text-[2rem] transition-all duration-500 animate-[float_3s_ease-in-out_infinite] flex items-center justify-center">
            {dynamicLogo}
          </div>
        </div>

        <main
          aria-label="Login"
          className={`w-full max-w-[500px] mx-auto ${
            shake ? "animate-[shake_0.5s_ease-in-out]" : ""
          }`}
        >
          {/* Mobile Logo */}
          <div className="md:hidden w-full flex justify-center mb-4">
            <div className="w-[120px] h-[32px] flex items-center justify-center font-semibold text-[14px]">
              <div className="text-[1.5rem] transition-all duration-500 animate-[float_3s_ease-in-out_infinite]">
                {dynamicLogo}
              </div>
            </div>
          </div>

          <section className="mt-1 p-3 sm:p-4 md:p-6 bg-white rounded-xl shadow-none">
            <h1 className="m-0 mb-1 text-[18px] sm:text-[20px] md:text-[22px] font-bold text-[#111827] flex items-center justify-center md:justify-start flex-wrap text-center md:text-left">
              Login to
              <span
                className="ml-[6px] font-semibold bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(45deg,#1f6fd8,#3aa655)",
                }}
              >
                {dynamicText}
              </span>
            </h1>

            <form onSubmit={handleSubmit} noValidate>
              {/* Email */}
              <div className="mt-3">
                <input
                  ref={emailRef}
                  type="email"
                  placeholder="Email"
                  aria-label="Email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  onBlur={() => handleBlur("email")}
                  disabled={isSubmitting}
                  className={inputStateClasses("email")}
                />
                <div
                  className={`mt-[6px] text-[12px] text-left text-red-500 transition-all duration-300 transform ${
                    errors.email
                      ? "opacity-100 translate-y-0 h-auto"
                      : "opacity-0 -translate-y-1 h-0"
                  }`}
                >
                  {errors.email}
                </div>
              </div>

              {/* Password */}
              <div className="mt-3">
                <input
                  ref={passwordRef}
                  type="password"
                  placeholder="Password"
                  aria-label="Password"
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  onBlur={() => handleBlur("password")}
                  disabled={isSubmitting}
                  className={inputStateClasses("password")}
                />
                <div
                  className={`mt-[6px] text-left text-[12px] text-red-500 transition-all duration-300 transform ${
                    errors.password
                      ? "opacity-100 translate-y-0 h-auto"
                      : "opacity-0 -translate-y-1 h-0"
                  }`}
                >
                  {errors.password}
                </div>
              </div>

              {/* Captcha */}
              <div className="mt-3">
                <div className="flex flex-col gap-2 sm:gap-3 md:flex-row md:items-center md:gap-3">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="flex h-[48px] md:h-[52px] min-w-[100px] sm:min-w-[110px] border border-gray-200 rounded-md items-center justify-center bg-white font-mono text-[18px] sm:text-[20px] md:text-[24px] tracking-[2px] text-[#3aa655] select-none font-bold transition-transform duration-300 hover:scale-[1.05]">
                      {captchaCode}
                    </div>

                    <button
                      className="flex-none w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 bg-white transition-all duration-300 hover:bg-gray-100 hover:text-gray-700 hover:rotate-90 active:rotate-180 disabled:opacity-50 disabled:cursor-not-allowed disabled:rotate-0"
                      type="button"
                      title="Refresh captcha"
                      aria-label="Refresh captcha"
                      onClick={generateCaptcha}
                      disabled={isSubmitting}
                    >
                      <span className="text-base">⟳</span>
                    </button>
                  </div>

                  <div className="flex-1">
                    <input
                      ref={captchaRef}
                      type="text"
                      placeholder="Captcha"
                      aria-label="Captcha"
                      value={formData.captcha}
                      onChange={(e) => handleChange("captcha", e.target.value)}
                      onBlur={() => handleBlur("captcha")}
                      disabled={isSubmitting}
                      className={inputStateClasses("captcha")}
                    />
                  </div>
                </div>
                <div
                  className={`mt-[6px] text-end text-[12px] text-red-500 transition-all duration-300 transform ${
                    errors.captcha
                      ? "opacity-100 translate-y-0 h-auto"
                      : "opacity-0 -translate-y-1 h-0"
                  }`}
                >
                  {errors.captcha}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`relative w-full h-11 md:h-12 mt-4 rounded-md text-white font-semibold text-[15px] transition-all duration-300 ${
                  isSubmitting
                    ? "bg-[#1f6fd8] opacity-70 cursor-not-allowed"
                    : "bg-[#1f6fd8] hover:bg-[#195db4] hover:-translate-y-[2px] hover:shadow-[0_4px_12px_rgba(31,111,216,0.3)] active:translate-y-0"
                }`}
              >
                {isSubmitting ? (
                  <span className="inline-flex items-center">
                    <span className="w-4 h-4 mr-2 border-2 border-transparent border-t-white rounded-full animate-spin" />
                    Logging in...
                  </span>
                ) : (
                  "Login"
                )}
              </button>
            </form>

            {/* Google SSO Button */}
            <div className="mt-4">
              <div className="relative flex items-center">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink mx-4 text-gray-400 text-sm">
                  OR
                </span>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>

              <GoogleSSOButton />
            </div>

            <div className="mt-3 text-[14px] flex items-center justify-center">
              <a
                href="#"
                className="text-[#2563eb] hover:underline hover:text-[#195db4]"
              >
                Forgot password ?
              </a>
            </div>

            <p className="mt-5 mb-3 text-[13px] text-[#4b5563] leading-[1.45] text-center">
              Any queries or help write to Bluecats@rabinnson.in
            </p>

            <div className="flex justify-center gap-2 sm:gap-3 mt-3 flex-wrap">
              <a
                href="https://apps.apple.com/app/your-app-id"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="Download on the App Store"
                  className="h-[38px] sm:h-[40px] md:h-[50px] w-auto transition-transform duration-200"
                />
              </a>

              <a
                href="https://play.google.com/store/apps/details?id=your.app.id"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Get it on Google Play"
                  className="h-[38px] sm:h-[40px] md:h-[50px] w-auto transition-transform duration-200"
                />
              </a>
            </div>

            {/* Terms and Privacy Policy  dynamic logo left */}
            <div className="mt-5 flex items-center justify-start gap-3">
              {/* Dynamic Logo left side */}
              <div className="hidden md:flex w-[40px] h-[40px] items-center justify-center">
                <div className="text-[1.8rem] transition-all duration-500 animate-[float_3s_ease-in-out_infinite]">
                  {dynamicLogo}
                </div>
              </div>

              <p className="text-[12px] text-[#6b7280] text-left flex-1">
                By logging in, you agree to{" "}
                <a
                  href="#"
                  className="text-[#2563eb] hover:underline hover:text-[#195db4]"
                >
                  Terms of Use
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="text-[#2564ebf0] hover:underline hover:text-[#195db4]"
                >
                  Privacy Policy
                </a>
              </p>
            </div>

            {/* Mobile Footer Logo */}
            <div className="md:hidden w-full flex justify-center mt-5">
              <div className="w-[120px] h-[32px] flex items-center justify-center font-semibold text-[14px]">
                <div className="text-[1.5rem] transition-all duration-500 animate-[float_3s_ease-in-out_infinite]">
                  {dynamicLogo}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Login;
