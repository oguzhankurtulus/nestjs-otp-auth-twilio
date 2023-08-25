import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TwilioService } from 'src/twilio/twilio.service';
import { generateOTP, getExpiry, isTokenExpired } from 'src/util';
import { UsersService } from '../users/users.service';
import { Auth } from './auth.schema';
import { SignInDto } from './dto/sing-in.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        @InjectModel(Auth.name) private authModel: Model<Auth>,
        private twilioService: TwilioService
    ) {}

    async signIn(dto: SignInDto): Promise<any> {
        const user = await this.usersService.findOne(dto.phone);

        if (!user) {
            throw new NotFoundException('User not found!');
        }
        const otp = generateOTP(6);
        await this.authModel.create({ code: otp, userId: user.userId, expiresAt: getExpiry(), phone: user.phone });
        await this.twilioService.sendSMS(dto.phone, `Please use the following code to login: ${otp}`);
        return { success: true };
    }

    async verifyOtp(dto: VerifyOtpDto): Promise<any> {
        const otpRecord = await this.authModel.findOne({ code: dto.otp, phone: dto.phone });
        if (!otpRecord) {
            throw new NotFoundException('Please enter a valid code!');
        }
        const isExpired = isTokenExpired(otpRecord.expiresAt);
        if (isExpired) {
            throw new BadRequestException('Your token is expired!');
        }

        const user = await this.usersService.findOne(dto.phone);

        const payload = { sub: user.userId, username: user.username, roles: user.roles, phone: user.phone };
        return { accest_token: await this.jwtService.signAsync(payload) };
    }
}
