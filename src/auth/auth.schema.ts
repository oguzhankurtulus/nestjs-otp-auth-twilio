import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AuthDocument = HydratedDocument<Auth>;

@Schema()
export class Auth {
    @Prop({ required: true })
    userId: string;

    @Prop({ required: true })
    code: string;

    @Prop({ required: true })
    expiresAt: string;

    @Prop({ required: true })
    phone: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
