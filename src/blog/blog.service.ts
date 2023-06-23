import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './blog.entity';
import {Repository} from 'typeorm'
import { BlogInput } from './dto/create-blog.input';
@Injectable()
export class BlogService {
    constructor(
        @InjectRepository(Blog)
        private blogRepository: Repository<Blog>,
    ) {}
    async getAll(): Promise<Blog[]> {
        return await this.blogRepository.find();
    }
    async createBlog(blogInput: BlogInput): Promise<Blog> {
        const newBlog = this.blogRepository.create(blogInput);
    
        return this.blogRepository.save(newBlog);
    }
}
