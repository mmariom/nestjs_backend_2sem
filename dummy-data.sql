-- Insert into category table
INSERT INTO "category"("category") VALUES
('Bathroom and kitchen'),
('Pests'),
('Hard white goods'),
('Doorphone and Keys/Tokens'),
('Radiators Doors and windows'),
('Other things');

-- Insert into user_entity table
INSERT INTO "user_entity"("username", "name", "password", "role") VALUES
('johnsmith', 'John Smith', '$2a$10$UqPvOvMQwUzJfU3GCJh9b.aDTffyA2KkD8yTGplctV7ZakuW7cCne', 'user'),
('janesmith', 'Jane Smith', '$2a$10$UqPvOvMQwUzJfU3GCJh9b.aDTffyA2KkD8yTGplctV7ZakuW7cCne', 'user'),
('adminjoe', 'Joe Admin', '$2a$10$UqPvOvMQwUzJfU3GCJh9b.aDTffyA2KkD8yTGplctV7ZakuW7cCne', 'admin'),
('adminmary', 'Mary Admin', '$2a$10$UqPvOvMQwUzJfU3GCJh9b.aDTffyA2KkD8yTGplctV7ZakuW7cCne', 'admin');

-- Insert into tenant table
INSERT INTO "tenant"("email", "userId") VALUES
('john@tenant.com', (SELECT "id" FROM "user_entity" WHERE "username" = 'johnsmith')),
('jane@tenant.com', (SELECT "id" FROM "user_entity" WHERE "username" = 'janesmith'));

-- Insert into administrator_entity table
INSERT INTO "administrator_entity"("phone", "userId") VALUES
('123-456-7890', (SELECT "id" FROM "user_entity" WHERE "username" = 'adminjoe')),
('123-456-7891', (SELECT "id" FROM "user_entity" WHERE "username" = 'adminmary'));

-- Insert into problem table
INSERT INTO "problem"("subject", "description", "tenantId", "categoryId") VALUES
('Problem 1 John', 'Description 1 John', (SELECT "id" FROM "tenant" WHERE "email" = 'john@tenant.com'), 1),
('Problem 1 Jane', 'Description 1 Jane', (SELECT "id" FROM "tenant" WHERE "email" = 'jane@tenant.com'), 1),
('Problem 2 John', 'Description 2 John', (SELECT "id" FROM "tenant" WHERE "email" = 'john@tenant.com'), 2),
('Problem 2 Jane', 'Description 2 Jane', (SELECT "id" FROM "tenant" WHERE "email" = 'jane@tenant.com'), 2),
('Problem 3 John', 'Description 3 John', (SELECT "id" FROM "tenant" WHERE "email" = 'john@tenant.com'), 3),
('Problem 3 Jane', 'Description 3 Jane', (SELECT "id" FROM "tenant" WHERE "email" = 'jane@tenant.com'), 3);
