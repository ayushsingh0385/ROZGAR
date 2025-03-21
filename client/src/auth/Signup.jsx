import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { userSignupSchema } from "@/schema/userSchema";
import { useUserStore } from "@/store/useUserStore";
import { Loader2, LockKeyhole, Mail, PhoneOutgoing, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toast } from "@radix-ui/react-toast";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
    contact: "",
  });

  const [errors, setErrors] = useState({});
  const { signup, loading } = useUserStore();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const loginSubmitHandler = async (e) => {
    e.preventDefault();
    const result = userSignupSchema.safeParse(input);
  
    if (!result.success) {
      setErrors(result.error.formErrors.fieldErrors);
      return;
    }
  
    try {
      await signup(input);  // ✅ If signup fails, it will throw an error
      navigate("/verify-email");  // ✅ Will not execute if error is thrown
    } catch (error) {
      console.log("Signup2 failed, staying on signup page");
    }
  };  

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={loginSubmitHandler}
        className="md:p-8 w-full max-w-md rounded-lg md:border border-gray-200 mx-4"
      >
        <div className="mb-4">
          <h1 className="font-bold text-2xl">ROZGAR</h1>
        </div>

        <div className="mb-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Full Name"
              name="fullname"
              value={input.fullname}
              onChange={changeEventHandler}
              className="pl-10 focus-visible:ring-1"
            />
            <User className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            {errors.fullname && (
              <span className="text-xs text-red-500">{errors.fullname}</span>
            )}
          </div>
        </div>

        <div className="mb-4">
          <div className="relative">
            <Input
              type="email"
              placeholder="Email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              className="pl-10 focus-visible:ring-1"
            />
            <Mail className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            {errors.email && (
              <span className="text-xs text-red-500">{errors.email}</span>
            )}
          </div>
        </div>

        <div className="mb-4">
          <div className="relative">
            <Input
              type="password"
              placeholder="Password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              className="pl-10 focus-visible:ring-1"
            />
            <LockKeyhole className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            {errors.password && (
              <span className="text-xs text-red-500">{errors.password}</span>
            )}
          </div>
        </div>

        <div className="mb-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Contact"
              name="contact"
              value={input.contact}
              onChange={changeEventHandler}
              className="pl-10 focus-visible:ring-1"
            />
            <PhoneOutgoing className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            {errors.contact && (
              <span className="text-xs text-red-500">{errors.contact}</span>
            )}
          </div>
        </div>

        <div className="mb-10">
          {loading ? (
            <Button disabled className="w-full bg-orange hover:bg-hoverOrange">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full bg-orange hover:bg-hoverOrange">
              Signup
            </Button>
          )}
        </div>

        <div>
            
            <p className="text-gray-700 mt-3">
              New Here? <Link to="/signup" className="text-yellow-500 font-medium">Sign Up</Link>
            </p>
          </div>

        <Separator />

        <p className="mt-2">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;