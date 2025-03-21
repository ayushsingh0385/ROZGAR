import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, LockKeyholeIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/useUserStore";

const ResetPassword = () => {
  const [password, setpassword] = useState("")
  const { loading, resetPassword } = useUserStore();
  const user = JSON.parse(localStorage.getItem("user-name"));
  const state=user.state.user
  const userId = {id:(state ? state.email : localStorage.getItem("email")),password:password};
  const navigate = useNavigate();

  const loginSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      await resetPassword(userId);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <form onSubmit={loginSubmitHandler}
      className="flex flex-col gap-5 md:p-8 w-full max-w-md rounded-lg mx-4">
        <div className="text-center">
          <h1 className="font-extrabold text-2xl mb-2">Reset Password</h1>
          <p className="text-sm text-gray-600">Enter your new password to reset your old one</p>
        </div>
        <div className="relative w-full">
          <Input
            type="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            placeholder="Enter your new password"
            className="pl-10"
          />
          <LockKeyholeIcon className="absolute inset-y-2 left-2 text-gray-600 pointer-events-none" />
        </div>
        {loading ? (
          <Button disabled className="bg-orange hover:bg-hoverOrange">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
          </Button>
        ) : (
          <Button className="bg-orange hover:bg-hoverOrange">Reset Password</Button>
        )}
        <span className="text-center">
          Back to{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};

export default ResetPassword;