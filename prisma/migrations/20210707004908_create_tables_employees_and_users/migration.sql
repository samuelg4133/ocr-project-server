-- CreateTable
CREATE TABLE `employees` (
    `id` VARCHAR(191) NOT NULL,
    `firstname` VARCHAR(60) NOT NULL,
    `surname` VARCHAR(200) NOT NULL,
    `cpf` VARCHAR(11) NOT NULL,
    `date_of_birthday` DATE NOT NULL,
    `enabled` BOOLEAN NOT NULL DEFAULT true,
    `created_at` TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(3) DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `employees.cpf_unique`(`cpf`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(60) NOT NULL,
    `email` VARCHAR(60) NOT NULL,
    `enabled` BOOLEAN NOT NULL DEFAULT true,
    `created_at` TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(3) DEFAULT CURRENT_TIMESTAMP(3),
    `employee_id` VARCHAR(191) NOT NULL,
    `password` VARCHAR(200),

    UNIQUE INDEX `users.username_unique`(`username`),
    UNIQUE INDEX `users.email_unique`(`email`),
    INDEX `FK_Employee`(`employee_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
