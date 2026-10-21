const{q}=require('./db');
exports.initDb=async()=>{
  await q(`
CREATE TABLE IF NOT EXISTS gini_users(id SERIAL PRIMARY KEY,name TEXT NOT NULL,email TEXT UNIQUE NOT NULL,password TEXT NOT NULL,role TEXT DEFAULT 'user',credits INT DEFAULT 100,created_at TIMESTAMPTZ DEFAULT now());
CREATE TABLE IF NOT EXISTS gini_workspaces(id SERIAL PRIMARY KEY,user_id INT REFERENCES gini_users ON DELETE CASCADE,name TEXT NOT NULL,created_at TIMESTAMPTZ DEFAULT now());
CREATE TABLE IF NOT EXISTS gini_outputs(id SERIAL PRIMARY KEY,user_id INT REFERENCES gini_users ON DELETE CASCADE,workspace_id INT REFERENCES gini_workspaces ON DELETE SET NULL,tool TEXT,input TEXT,content TEXT,image_url TEXT,favourite BOOLEAN DEFAULT false,created_at TIMESTAMPTZ DEFAULT now());
CREATE TABLE IF NOT EXISTS gini_usage_log(id SERIAL PRIMARY KEY,user_id INT,tool TEXT,cost INT,created_at TIMESTAMPTZ DEFAULT now());
CREATE TABLE IF NOT EXISTS gini_meta(k TEXT PRIMARY KEY);`);
  // one-time migration: lift existing accounts to the new 100-credit allowance
  const r=await q("INSERT INTO gini_meta(k) VALUES('credits_100') ON CONFLICT DO NOTHING RETURNING k");
  if(r.length)await q('UPDATE gini_users SET credits=GREATEST(credits,100)');
};
