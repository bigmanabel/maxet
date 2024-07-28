import { LISTINGS_SERVICE } from '@app/shared';
import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateCategoryDto } from '../../../../../libs/listings/src/dto/create-category.dto';
import { lastValueFrom } from 'rxjs';
import { UpdateCategoryDto } from '@app/listings';

@Injectable()
export class CategoriesService {
    constructor(
        @Inject(LISTINGS_SERVICE) private readonly client: ClientProxy,
    ) { }

    async create(createCategoryDto: CreateCategoryDto) {
        try {
            const category = await lastValueFrom(
                this.client.send('categories.create', createCategoryDto)
            );
            return category;
        } catch (error) {
            if (error instanceof UnauthorizedException) {
                throw new UnauthorizedException(error.message);
            }
            throw new BadRequestException(error.messsage);
        }
    }

    async findAll() {
        try {
            const categories = await lastValueFrom(
                this.client.send('categories.findAll', {})
            );

            return categories;
        } catch (error) {
            if (error instanceof UnauthorizedException) {
                throw new UnauthorizedException(error.message);
            }
            throw new BadRequestException(error.messsage);
        }
    }

    async findOne(id: string) {
        try {
            const category = await lastValueFrom(
                this.client.send('categories.findOne', id)
            );
            return category;
        } catch (error) {
            if (error instanceof UnauthorizedException) {
                throw new UnauthorizedException(error.message);
            }
            throw new BadRequestException(error.messsage);
        }
    }

    async update(id: string, updateCategoryDto: UpdateCategoryDto) {
        try {
            const category = await lastValueFrom(
                this.client.send('categories.update', { id, updateCategoryDto })
            );
            return category;
        } catch (error) {
            if (error instanceof UnauthorizedException) {
                throw new UnauthorizedException(error.message);
            }
            throw new BadRequestException(error.messsage);
        }
    }

    async remove(id: string) {
        try {
            const category = await lastValueFrom(
                this.client.send('categories.remove', id)
            );
            return category;
        } catch (error) {
            if (error instanceof UnauthorizedException) {
                throw new UnauthorizedException(error.message);
            }
            throw new BadRequestException(error.messsage);
        }
    }
}
