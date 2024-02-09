import { Test } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { UsersService } from "./users.service"; 
import { describe } from "node:test";
import { User } from "./entities/user.entity";

describe('AuthService', () => {
    let service: AuthService;
    let fakeUserService: Partial<UsersService>;

    beforeEach(async () => {
        fakeUserService = {
            find: () => Promise.resolve({} as User),
            create: (email: string, password: string) => Promise.resolve({id:80, email, password} as User),
        };
    
        const module = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UsersService,
                    useValue: fakeUserService
                }
            ],
        }).compile();
        service = module.get(AuthService);
    });

    it('Can create an instanse of auth service', async () => {
        expect(service).toBeDefined();
    });   

    it('Creates a new user with a salted hashed password', async () => {
        const user = await service.signup('www@www.com','www'); 
        expect(user.password).not.toEqual('www');
        const [salt, hash] = user.password.split('.');
        expect(salt).toBeDefined();
        expect(hash).toBeDefined();
    });

})


