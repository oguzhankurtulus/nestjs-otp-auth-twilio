import { Injectable } from '@nestjs/common';
import { Role } from 'src/enums/role.enum';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
    private readonly users = [
        {
            userId: '1234',
            username: 'john',
            roles: [Role.Admin],
            phone: 'YOUR_PHONE_NUMER',
        },
        {
            userId: '2222',
            username: 'maria',
            roles: [Role.User],
            phone: 'PHONE_NUMBER',
        },
    ];

    async findOne(phone: string): Promise<User | undefined> {
        return this.users.find((user) => user.phone === phone);
    }
}
