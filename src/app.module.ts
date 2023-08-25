import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import config from './configuration/config';
import { TwilioModule } from './twilio/twilio.module';
import { UsersModule } from './users/users.module';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost/otp'),
        ConfigModule.forRoot({ isGlobal: true, load: [config] }),
        AuthModule,
        UsersModule,
        TwilioModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
