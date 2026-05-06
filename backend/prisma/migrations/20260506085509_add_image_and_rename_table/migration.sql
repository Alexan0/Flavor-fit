-- Переименование таблицы
ALTER TABLE recipe_step RENAME TO recipe_steps;

-- Добавление нового столбца
ALTER TABLE recipe_steps ADD COLUMN image TEXT DEFAULT '';