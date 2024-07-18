import { Controller, Get, Param, Delete, Post, Put, Body } from '@nestjs/common';
import { PointClientService } from './point-client.service';
import { PointClientLogic } from './point-client.logic';
import { PointClientDto } from './dto/point-client'


@Controller('PointClient')
export class PointClientController {
  constructor(private readonly PointClientService: PointClientService, private readonly PointClientLogic: PointClientLogic) { }

  @Get('getPointClient/:idUser')
  findOne(@Param('idUser') idUser: number): Promise<PointClientDto> {
    return this.PointClientService.findOne(+idUser);
  }
  
} 