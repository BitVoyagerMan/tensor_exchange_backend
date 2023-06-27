import { Injectable, Inject } from '@nestjs/common';
// import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './cat.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CatsService {
  constructor(
    @InjectModel(Cat)
    private readonly catModel: typeof Cat
  ) {}

  async findAll(): Promise<Cat[]> {
    return this.catModel.findAll();
  }
}