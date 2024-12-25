const validOperations = ["add", "subtract", "divide", "multiply"] as const;
// Because validOperations is a const array, validOperations[index] can get those strings. 
// Therefore, validOperations[number] here can get all those string (ex: "add", etc.)
// So the OperationType type is equal to `type OperationType = "add" | "subtract" | "divide" | "multiply";`
type OperationType = typeof validOperations[number];

interface LogEntry {
  a: number;
  b: number;
  op: OperationType;
  result: number;
}
