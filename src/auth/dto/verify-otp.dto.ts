import { ApiProperty } from '@nestjs/swagger';

export class VerifyOtpDto {
    @ApiProperty({
        example: '165309',
        type: String,
        required: true,
        name: 'otp',
        description: 'Enter received otp number',
    })
    otp: string;

    @ApiProperty({
        example: '+905554443322',
        type: String,
        required: true,
        name: 'phone',
        description: 'Enter your valid phone number',
    })
    phone: string;
}
