import { Body, Controller, Delete, Get, HttpStatus, Param, Post, UploadedFiles, Put, Req, Res } from "@nestjs/common";
import { User } from "../model/user.schema.js";
import { UserService } from "../service/user.service.js";
import { JwtService } from '@nestjs/jwt'



@Controller('/api/v1/user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService
    ) { }
    @Post('/signup')
    async Signup(@Body() user: User) {
        return this.userService.signup(user);
    }
    @Post('/signin')
    async SignIn(@Body() user: User) {
        return this.userService.signin(user, this.jwtService);
    }
}