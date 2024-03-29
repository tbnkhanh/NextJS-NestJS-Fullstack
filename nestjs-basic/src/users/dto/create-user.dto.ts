import { IsEmail,IsNotEmpty, IsStrongPassword } from "class-validator";

export class CreateUserDto {
    @IsEmail({},{message: "Must be email"})
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty({message: "Password must not empty"})
    password: string
}
