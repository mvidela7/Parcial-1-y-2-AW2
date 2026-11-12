CREATE TABLE autos (
    id INTEGER PRIMARY KEY,
    marca VARCHAR(100) NOT NULL,
    modelo VARCHAR(100) NOT NULL,
    año INTEGER NOT NULL,
    precio NUMERIC(15, 2) NOT NULL,
    stock INTEGER NOT NULL
);

INSERT INTO autos (id, marca, modelo, año, precio, stock) VALUES
(1, 'Toyota', 'Corolla', 2024, 28500000, 3),
(2, 'Volkswagen', 'Golf', 2023, 32000000, 2),
(3, 'Ford', 'Focus', 2022, 24500000, 4),
(4, 'Chevrolet', 'Cruze', 2023, 26000000, 2),
(5, 'Honda', 'Civic', 2024, 35000000, 2),
(6, 'Fiat', 'Cronos', 2024, 22000000, 5),
(7, 'Renault', 'Sandero', 2023, 21500000, 3),
(8, 'Peugeot', '208', 2024, 24000000, 4);