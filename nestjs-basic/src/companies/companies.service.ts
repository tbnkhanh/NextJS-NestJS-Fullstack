import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Company, CompanyDocument } from './schemas/company.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/users.interfaces';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel(Company.name)
    private companyModel: SoftDeleteModel<CompanyDocument>,
  ) {}

  async create(data: CreateCompanyDto, user: IUser) {
    return this.companyModel.create({
      ...data,
      createdBy: { _id: user._id, email: user.email },
    });
  }

  findAll() {
    return `This action returns all companies`;
  }

  findOne(id: number) {
    return `This action returns a #${id} company`;
  }

  update(id: string, data: UpdateCompanyDto, user: IUser) {
    return this.companyModel.findByIdAndUpdate(id, {...data, updatedBy: {_id : user._id, email: user.email}});
  }

  async remove(id: string, user: IUser) {
    await this.companyModel.findByIdAndUpdate(id, {updatedBy: {_id : user._id, email: user.email}});
    return this.companyModel.softDelete({_id: id})
  }
}
