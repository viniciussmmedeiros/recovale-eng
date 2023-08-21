INSERT INTO "user" (id, "type", "username", "password", email, cpf, current_points, total_points)
    VALUES 
        (50, 'SENDER', 'qwe', 'qwe', 'qwe@email.com', '00011122244', 850, 850),
        (51, 'SENDER', 'qwe2', 'qwe2', 'qwe2@email.com', '00011122255', 1, 200),
        (52, 'RECIPIENT', 'qwe3', 'qwe3', 'qwe3@email.com', '00001111222266', 0, 0),
        (53, 'RECIPIENT', 'qwe5', 'qwe5', 'qwe5@email.com', '00001111222267', 0, 0),
        (54, 'RECIPIENT', 'qwe3', 'qwe3', 'qwe6@email.com', '00001111222268', 0, 0);

INSERT INTO employee (id, "type", username, "password")
    VALUES 
        (50, 'ADMIN', 'admin', 'admin'),
        (51, 'COLLECTOR', 'collector', '123');

INSERT INTO reward (id, title, description, points, quantity_available)
    VALUES 
        (50, 'Ingresso show', 'Ingresso para o show da banda xyz.', 280, 5),
        (51, 'Bateria usada', 'Uma bela bateria usada.', 1, 999),
        (52, 'Ingresso cinema', 'Ingresso para o filme xyz.', 130, 999),
        (53, 'Ingresso cinema2', 'Ingresso para o filme xyz.', 357, 2),
        (54, 'Ingresso cinema3', 'Ingresso para o filme xyz.', 14, 4),
        (55, 'Ingresso cinema4', 'Ingresso para o filme xyz.', 99, 9);

UPDATE "user" SET is_deleted = false WHERE id = 50;
