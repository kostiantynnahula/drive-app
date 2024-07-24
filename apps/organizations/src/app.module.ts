import { Module } from '@nestjs/common';
import { OrganizationsModule } from './organizations/organizations.module';
import { LocationsModule } from './locations/locations.module';

@Module({
  imports: [OrganizationsModule, LocationsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
