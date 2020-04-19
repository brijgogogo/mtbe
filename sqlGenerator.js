const sql = require("sql");

sql.setDialect("postgres");

const user = sql.define({
  name: "user",
  columns: ["id", "name", "email"],
});

let userQuery = user.select(user.star()).from(user).toQuery();
console.log(userQuery.text);

userQuery = user
  .select(user.id)
  .from(user)
  .where(user.name.equals("boom").and(user.id.equals(1)))
  .or(user.name.equals("bang").and(user.id.equals(2)))
  .toQuery();

console.log(userQuery.text);
console.log(userQuery.values);
