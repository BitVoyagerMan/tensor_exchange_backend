import { Injectable, Inject } from '@nestjs/common';
import { User } from './user.entity';
import { InjectModel } from '@nestjs/sequelize';
import { UserInput } from './dao/user.input';
import { SigninArgs, AuthToken } from './dao/signin.args';
import * as nodemailer from 'nodemailer';
import {JwtService} from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User) private readonly userModel: typeof User,
        private jwtService:JwtService
    ) {}

    async findAll(): Promise < User[] > {
        return this.userModel.findAll < User > ();
    }
    async signUp(data: UserInput): Promise < User > {
        console.log(data)
        
        const hashPassword = async (plainPassword) => {
            const hashedPassword = await bcrypt.hash(plainPassword, 10); // 10 is the number of rounds to use, it's commonly used number
            return hashedPassword;
        };
        data.password = await hashPassword(data.password)
        console.log(data)
        const newUser:User = await this.userModel.create({
            ...data
        });
        const payload = {user:newUser.username, id:newUser.id};
        const verificationToken = this.jwtService.sign(payload);
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT, // standard port for SMTPS
            secure: false, // true for SMTPS
            requireTLS: true, 
            auth: {
                type: 'login', 
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASSWORD,
            },
        });
        const mailOptions = {
            from: process.env.SMTP_EMAIL,
            to: newUser.email,
            subject: 'Please confirm your email',
            html: `<a href="${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}">Verify your email</a>`,
        };

        await transporter.sendMail(mailOptions);
        return newUser
    }
    async signin(signinArgs:SigninArgs):Promise<AuthToken>{
        const user = await this.userModel.findOne({
            where:{username:signinArgs.username}

        });
        if(user && bcrypt.compareSync(signinArgs.password, user.password)){
            const payload = {user:user.username, id:user.id};
            const access_token = this.jwtService.sign(payload);
            // user.apikey = access_token;
            return {
                token:access_token,
                expiresAt:Date.now() + 36000 * 1000
            };

        }
        return null;
    }
}