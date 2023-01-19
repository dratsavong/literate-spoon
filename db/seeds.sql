INSERT INTO departments (id, name)
VALUES (1, "Human Recources"),
       (2, "Finance"),
       (3, "Technology"),
       (4, "Marketing");
       
INSERT INTO roles (department_id, title, salary)
VALUES (1, "Manager", 93000),
       (1, "Analyst", 66000),
       (2, "Accountant", 83000),
       (2, "Bussiness Analyst", 98000),
       (3, "Senior Developer", 140000),
       (3, "Junior Developer", 78000),
       (4, "Consultant", 67000),
       (4, "Director", 125000);
       
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Scoobert", "Doo", 2, NULL),
       ("Shaggy", "Rogers", 1, 1),
       ("Daphne", "Blake", 3, 3),
       ("Fred", "Jones", 4, 4),
       ("Scrappy", "Do", 4, 4),
       ("Yabba", "Dooo", 1, 3) ,
       ("Alice", "May", 2, 1),
       ("Nova", "Spaniel", 3, 4);