import express from "express";
import {
  createEmployee,
  getEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
} from "#db/queries/employees.js";

const router = express.Router();

function isPositiveInteger(value) {
  const num = Number(value);
  return Number.isInteger(num) && num > 0;
}

// GET /employees - list all employees
router.get("/", async (req, res, next) => {
  try {
    const employees = await getEmployees();
    res.json(employees);
  } catch (err) {
    next(err);
  }
});

// POST /employees - create new employee
router.post("/", async (req, res, next) => {
  try {
    const { name, birthday, salary } = req.body;
    if (!req.body || !name || !birthday || !salary) {
      return res.status(400).send("Missing required fields");
    }
    const employee = await createEmployee({ name, birthday, salary });
    res.status(201).json(employee);
  } catch (err) {
    next(err);
  }
});

// GET /employees/:id - get employee by ID
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isPositiveInteger(id)) {
      return res.status(400).send("Invalid ID");
    }
    const employee = await getEmployee(id);
    if (!employee) {
      return res.status(404).send("Employee not found");
    }
    res.json(employee);
  } catch (err) {
    next(err);
  }
});

// PUT /employees/:id - update employee by ID
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!req.body || !req.body.name || !req.body.birthday || !req.body.salary) {
      return res.status(400).send("Missing required fields");
    }
    if (!isPositiveInteger(id)) {
      return res.status(400).send("Invalid ID");
    }
    const employee = await updateEmployee({ id, ...req.body });
    if (!employee) {
      return res.status(404).send("Employee not found");
    }
    res.json(employee);
  } catch (err) {
    next(err);
  }
});

// DELETE /employees/:id - delete employee by ID
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isPositiveInteger(id)) {
      return res.status(400).send("Invalid ID");
    }
    const employee = await deleteEmployee(id);
    if (!employee) {
      return res.status(404).send("Employee not found");
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

export default router;
