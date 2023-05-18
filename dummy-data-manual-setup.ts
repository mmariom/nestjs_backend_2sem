import { MigrationInterface, QueryRunner } from "typeorm";
import * as bcryptjs from 'bcryptjs';

export class Insrt1684359403356 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Insert into category table
        await queryRunner.query(`
            INSERT INTO "category"("category") VALUES 
            ('Bathroom and kitchen'),
            ('Pests'),
            ('Hard white goods'),
            ('Doorphone and Keys/Tokens'),
            ('Radiators Doors and windows'),
            ('Other things');
        `);

        // Hashed passwords
        const johnPassword = await bcryptjs.hash('password', 10);
        const janePassword = await bcryptjs.hash('password', 10);
        const adminJoePassword = await bcryptjs.hash('password', 10);
        const adminMaryPassword = await bcryptjs.hash('password', 10);

        // Insert into user_entity table
        await queryRunner.query(`
            INSERT INTO "user_entity"("username", "name", "password", "role") VALUES 
            ('johnsmith', 'John Smith', '${johnPassword}', 'user'),
            ('janesmith', 'Jane Smith', '${janePassword}', 'user'),
            ('adminjoe', 'Joe Admin', '${adminJoePassword}', 'admin'),
            ('adminmary', 'Mary Admin', '${adminMaryPassword}', 'admin');
        `);

        // Insert into tenant table
        await queryRunner.query(`
            INSERT INTO "tenant"("email", "userId") VALUES 
            ('john@tenant.com', (SELECT "id" FROM "user_entity" WHERE "username" = 'johnsmith')),
            ('jane@tenant.com', (SELECT "id" FROM "user_entity" WHERE "username" = 'janesmith'));
        `);

        // Insert into administrator_entity table
        await queryRunner.query(`
            INSERT INTO "administrator_entity"("phone", "userId") VALUES 
            ('123-456-7890', (SELECT "id" FROM "user_entity" WHERE "username" = 'adminjoe')),
            ('123-456-7891', (SELECT "id" FROM "user_entity" WHERE "username" = 'adminmary'));
        `);

        // Insert into problem table
        for(let i = 1; i <= 3; i++) {
            await queryRunner.query(`
                INSERT INTO "problem"("subject", "description", "tenantId", "categoryId") VALUES 
                ('Problem ${i} John', 'Description ${i} John', (SELECT "id" FROM "tenant" WHERE "email" = 'john@tenant.com'), ${i}),
                ('Problem ${i} Jane', 'Description ${i} Jane', (SELECT "id" FROM "tenant" WHERE "email" = 'jane@tenant.com'), ${i});
            `);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        for(let i = 1; i <= 3; i++) {
            await queryRunner.query(`
                DELETE FROM "problem" WHERE "subject" IN ('Problem ${i} John', 'Problem ${i} Jane');
            `);
        }

        await queryRunner.query(`
            DELETE FROM "tenant" WHERE "email" IN ('john@tenant.com', 'jane@tenant.com');
        `);

        await queryRunner.query(`
            DELETE FROM "administrator_entity" WHERE "phone" IN ('123-456-7890', '123-456-7891');
        `);

        await queryRunner.query(`
            DELETE FROM "user_entity" WHERE "username" IN ('johnsmith', 'janesmith', 'adminjoe', 'adminmary');
        `);

        await queryRunner.query(`
            DELETE FROM "category" WHERE "category" IN ('Bathroom and kitchen', 'Pests', 'Hard white goods', 'Doorphone and Keys/Tokens', 'Radiators Doors and windows', 'Other things');
        `);
    }
}