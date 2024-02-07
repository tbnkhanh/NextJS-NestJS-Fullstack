import { IsEmail,IsNotEmpty, IsStrongPassword } from "class-validator";

export class CreateCompanyDto {
    @IsNotEmpty({message: "Name Company must not empty"})
    name: string;

    @IsNotEmpty({message: "Address company must not empty"})
    address: string;

    @IsNotEmpty({message: "Description company must not empty"})
    description: string
}
