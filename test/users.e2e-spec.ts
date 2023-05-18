import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm'
import { Problem } from './../src/problems/entities/problem.entity';
import { CreateProblemDto } from './../src/problems/dto/create-problem.dto';
import { User } from 'src/users/users.service';

describe('ProblemController (e2e)', () => {
  let app: INestApplication;
  let moduleFixture: TestingModule;
  let connection: Connection

  beforeEach(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    connection = moduleFixture.get(Connection)
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
        // problemRepository.query("DELETE FROM problem")
        // await moduleFixture.close()
    })

    describe('Login', () => {
        it('should create a board member user', async () => {
          // 1: Login the super-admin user
          // 2: Call the signup board member endpoint
          // 3: Check what is returned to verify I have a
          // board member user.  


          const user = { username: 'chr', password: '1234' }; // Could be loaded from env file to avoid sharing the password for the super-admin
            // Act
          const {body} = await request(app.getHttpServer())
                            .post('/auth/login')
                            .send(user)
                            .expect(201)

          const access_token = body.access_token;
          console.log("body is", body);

          const boardmember = {username: 'Zishan', password: '1234', phone: '12345678'};
          const response = await request(app.getHttpServer())
                            .post('/auth/signup-boardmember')
                            .auth(access_token, { type: 'bearer' })
                            .send(boardmember)
                            .expect(201)

          console.log("after creating", response.body);
          expect(response.body.user.username).toEqual('Zishan');
          expect(response.body.user.role).toEqual('admin');
          
        });
    })


    
  afterAll(() => {
    app.close();
  });
});
