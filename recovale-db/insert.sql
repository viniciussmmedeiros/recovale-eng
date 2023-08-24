INSERT INTO "user" (id, "type", "username", "password", email, cpf, current_points, total_points)
    VALUES 
        (50, 'SENDER', 'João Silva', 'batata25', 'Silva25@email.com', '00011122244', 850, 850),
        (51, 'SENDER', 'Roberto Gonçalves', '123456', 'Robertinho22@email.com', '00011122255', 1, 200),
        (52, 'RECIPIENT', 'Juliana Souza', 'senha123', 'JuSouza@email.com', '00001111222266', 0, 0),
        (53, 'RECIPIENT', 'Hildefonso Rodrigues', '000000', 'qwe7@email.com', '00001111222267', 0, 0),
        (54, 'RECIPIENT', 'Pedro', '147852369', 'Pedro@email.com', '00001111222268', 0, 0),
        (55, 'SENDER', 'Alberto', '192837465', 'Beto@email.com', '00091122255', 1, 200),
	(56, 'SENDER', 'Lipe', 'Lipe', 'Lipe@email.com', '00011122277', 990, 999),
	(57, 'SENDER', 'Vinicius', 'Vinicius', 'Vinicius@email.com', '00011122288', 990, 999),
	(58, 'SENDER', 'Andres', 'Andres', 'Andres@email.com', '00011122299', 990, 999);

INSERT INTO employee (id, "type", username, "password")
    VALUES 
        (50, 'ADMIN', 'admin', 'admin'),
        (51, 'COLLECTOR', 'collector', '123');

INSERT INTO reward (id, title, description, points, quantity_available)
    VALUES 
        (50, 'Ingresso Show do Coldplay', 'Ingresso para o show da banda Coldplay na Arena.', 580, 5),
	(51, 'Ingresso Show do U2', 'Ingresso para o show da banda U2 no Beira-Rio.', 780, 5),
	(52, 'Garrafinha De Água', 'Uma Garrafinha De Água Personalizada.', 280, 5),
        (53, 'Bateria usada', 'Uma bela bateria usada.', 1, 999),
        (54, 'Ingresso Cinema - Oppenheimer', 'Ingresso para o filme Oppenheimer.', 130, 999),
        (55, 'Ingresso Cinema - Barbie', 'Ingresso para o filme Barbie.', 357, 2);
