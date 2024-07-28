import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from '../../../../libs/listings/src/dto/create-category.dto';
import { UpdateCategoryDto } from '../../../../libs/listings/src/dto/update-category.dto';

@Controller()
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @MessagePattern('categories.create')
  create(@Payload() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @MessagePattern('categories.findAll')
  findAll() {
    return this.categoriesService.findAll();
  }

  @MessagePattern('categories.findOne')
  findOne(@Payload() id: string) {
    return this.categoriesService.findOne(id);
  }

  @MessagePattern('categories.update')
  update(@Payload('id') id: string, @Payload() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @MessagePattern('categories.remove')
  remove(@Payload() id: string) {
    return this.categoriesService.remove(id);
  }
}
