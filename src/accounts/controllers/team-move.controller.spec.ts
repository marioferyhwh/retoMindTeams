import { Test, TestingModule } from '@nestjs/testing';
import { TeamMoveController } from './team-move.controller';

describe('TeamMoveController', () => {
  let controller: TeamMoveController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeamMoveController],
    }).compile();

    controller = module.get<TeamMoveController>(TeamMoveController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
