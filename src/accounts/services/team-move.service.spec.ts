import { Test, TestingModule } from '@nestjs/testing';
import { TeamMoveService } from './team-move.service';

describe('TeamMoveService', () => {
  let service: TeamMoveService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeamMoveService],
    }).compile();

    service = module.get<TeamMoveService>(TeamMoveService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
