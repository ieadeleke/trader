import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const SignUpForm = () => {
  const { control } = useForm();
  return (
    <div>
      <form action="">
        <div className="mb-8">
          <h2 className="text-2xl mb-1 font-ibm text-center font-semibold text-white">
            Create a free account
          </h2>
          <p className="text-base leading-relaxed text-center font-ibm text-white opacity-80">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
            aliquam, beatae dicta, maiores, expedita natus placeat
          </p>
        </div>
        <div className="grid grid-cols-2 mb-4 gap-3">
          <div className="form-group">
            <Label className="mb-1 font-ibm font-normal text-white opacity-80">First name</Label>
            <Controller
              control={control}
              defaultValue=""
              name="firstName"
              render={({ field }) => (
                <Input type="text" {...field} className="py-7" />
              )}
            />
          </div>
          <div className="form-group">
            <Label className="mb-1 font-ibm font-normal text-white opacity-80">Last name</Label>
            <Controller
              control={control}
              defaultValue=""
              name="lastName"
              render={({ field }) => (
                <Input type="text" {...field} className="py-7" />
              )}
            />
          </div>
        </div>
        <div className="form-group mb-4">
          <Label className="mb-1 font-ibm font-normal text-white opacity-80">Email address</Label>
          <Controller
            control={control}
            defaultValue=""
            name="emailAddress"
            render={({ field }) => (
              <Input type="email" {...field} className="py-7" />
            )}
          />
        </div>
        <div className="form-group mb-8">
          <Label className="mb-1 font-ibm font-normal text-white opacity-80">Phone number</Label>
          <Controller
            control={control}
            defaultValue=""
            name="phoneNumber"
            render={({ field }) => (
              <Input type="tel" {...field} className="py-7" />
            )}
          />
        </div>
        <Button className="w-full py-7 text-sm bg-primary text-white mb-3">
          Click here to Signup
        </Button>
      </form>
    </div>
  );
};

export default SignUpForm;
