-- migrate:up
create table posts (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  content VARCHAR(100) NOT NULL,
  user_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT create_posts_create_users FOREIGN KEY (user_id) REFERENCES users (id)
)

-- migrate:down
drop table posts;