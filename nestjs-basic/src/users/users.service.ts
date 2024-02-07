import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User , UserDocument} from './schemas/user.schema';
import { Model } from 'mongoose';
import { genSaltSync, hashSync , compareSync} from 'bcryptjs';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: SoftDeleteModel<UserDocument>) {}

  getHashPassword = (password : string) => {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash
  };

  checkPassword = (password: string, hashPassword: string) => {
    return compareSync(password, hashPassword); 
  }

  async create(data: CreateUserDto) {
    const hashPassword = this.getHashPassword(data.password)
    data.password = hashPassword
    let user = await this.userModel.create({...data});
    return user;
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: string) {
    try {
      let user = await this.userModel.findOne({_id: id})
      return user
    } catch (error) {
      console.log(error);
      return "not found"
    }
  }

  
  async findUserByUsername(username: string) {
    return this.userModel.findOne({
      email: username
    })
  }

  async update( data: UpdateUserDto) {
    try {
      let user = await this.userModel.findByIdAndUpdate(data.id, {...data})
      return user
    } catch (error) {
      console.log(error);
      return "Update failed" 
    }
  }

  remove(id: string) {
    return this.userModel.softDelete({_id: id})
  }
}
