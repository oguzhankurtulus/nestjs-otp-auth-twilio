import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
    @ApiProperty({
        example: '+905554443322',
        type: String,
        required: true,
        name: 'phone',
        description: 'Enter your valid phone number',
    })
    phone: string;
}
