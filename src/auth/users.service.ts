import { Injectable, Inject, ForbiddenException } from '@nestjs/common';
import { User } from './user.entity';
import { InjectModel } from '@nestjs/sequelize';
import { UserInput, ValToken } from './dao/user.input';
import { SigninArgs, AuthToken } from './dao/signin.args';
import * as nodemailer from 'nodemailer';
import {JwtService} from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { Args } from '@nestjs/graphql';
type DecodedToken = {
    user:String,
    id:number,
    iat:number,
    exp:number
}
@Injectable()
export class UsersService {
        
    constructor(
        @InjectModel(User) private readonly userModel: typeof User,

        private jwtService:JwtService
    ) {}

    async findAll(): Promise < User[] > {
        return this.userModel.findAll < User > ();
    }


    async getCurrentUser(userId):Promise<User>{
        const user = await this.userModel.findOne({
            where:{id:userId}

        });
        return user;
        
    }
    async verifyToken(token):Promise<ValToken>{
        let returnData:ValToken = {valid:false, expiresAt:0}
        try{
            
            const decoded:string|jwt.JwtPayload = jwt.verify(token, process.env.JWT_SECRET)
            console.log(decoded)
            
            returnData.expiresAt = decoded["exp"]
            returnData.valid=true
            return returnData;
        }
        catch(err) {
            console.log("err", err);
            returnData.valid = false
            returnData.expiresAt = null
            return returnData;
        }
        
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
        const verificationToken = await this.jwtService.sign(payload);
        // newUser.token = verificationToken;
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
            html: `<a href="${process.env.FRONTEND_URL}/verifyEmail?token=${verificationToken}">Verify your email</a>`,
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