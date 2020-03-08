CREATE TABLE `files` (
  `id` int NOT NULL,
  `course_id` int NOT NULL,
  `filename` varchar(255) NOT NULL,
  `comment` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `upload_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE `files`
  ADD PRIMARY KEY (`id`),
  ADD KEY `course_id` (`course_id`);

ALTER TABLE `files`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

ALTER TABLE `files`
  ADD CONSTRAINT `files_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;