import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from '@app/listings';
import { Payload } from '@nestjs/microservices';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Auth, AuthType } from '@app/iam';

// @ApiBearerAuth()
@Auth(AuthType.None)
@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) { }
    
    @Post()
    @UseInterceptors(FileInterceptor('image'))
    create(@Body() createCategoryDto: CreateCategoryDto, @UploadedFile() file: Express.Multer.File) {
        createCategoryDto.image = file?.buffer.toString('base64');
        return this.categoriesService.create(createCategoryDto);
    }
    

    @Get()
    findAll() {
        return this.categoriesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.categoriesService.findOne(id);
    }

    @Put(':id')
    @UseInterceptors(FileInterceptor('image'))
    update(@Param('id') id: string, @Payload() updateCategoryDto: UpdateCategoryDto, @UploadedFile() file: Express.Multer.File) {
        updateCategoryDto.image = file?.buffer.toString('base64');
        return this.categoriesService.update(id, updateCategoryDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.categoriesService.remove(id);
    }
}
