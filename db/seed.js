import db from "#db/client";

await db.connect();

const employees = [
  { name: "Carolynn McGinlay", birthday: "1980-05-01", salary: 50000 },
  { name: "Lodovico Filon", birthday: "1985-06-15", salary: 55000 },
  { name: "Jefferey Wahlberg", birthday: "1978-12-22", salary: 60000 },
  { name: "Kayley Tures", birthday: "1990-03-10", salary: 52000 },
  { name: "Rickard Carver", birthday: "1982-07-18", salary: 58000 },
  { name: "Michael Stryde", birthday: "1975-09-25", salary: 62000 },
  { name: "Averell Santino", birthday: "1988-01-30", salary: 54000 },
  { name: "Constantina Connue", birthday: "1992-11-11", salary: 51000 },
  { name: "Verile Bondesen", birthday: "1977-04-04", salary: 57000 },
  { name: "Gwen Grollmann", birthday: "1983-08-20", salary: 59000 },
];

async function seedEmployees() {
  for (const emp of employees) {
    await db.query(
      "INSERT INTO employees (name, birthday, salary) VALUES ($1, $2, $3)",
      [emp.name, emp.birthday, emp.salary]
    );
  }
}

await seedEmployees();

await db.end();

console.log("🌱 Database seeded.");
