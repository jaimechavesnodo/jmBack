import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './common/common.module';
import { UserModule } from './user/user.module';
import { PointClientModule } from './point-client/point-client.module'
import { RedemptionsModule } from './redemptions/redemptions.module'
import { CatalogueModule } from 'catalogue/catalogue.module';
import { ProductModule } from 'product/product.module';
import { ShoppingModule } from 'shopping-cart/shopping.module';
import { SubcategoriesCatalogoModule } from 'SubCategories/subcategories.module';
import { CorsMiddleware } from '@nest-middlewares/cors';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: process.env.DB_HOST || '8080',
      port: 1433,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/migrations/*{.ts,.js}'],
      synchronize: false,
    }),
    CommonModule,
    UserModule,
    PointClientModule,
    RedemptionsModule,
    CatalogueModule,
    ShoppingModule,
    ProductModule,
    SubcategoriesCatalogoModule,
    ConfigModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CorsMiddleware)
      .forRoutes('*');
  }
}



