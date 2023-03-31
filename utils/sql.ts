export const checkStatementIsSelect = (statement: string) => {
  return statement.toUpperCase().trim().startsWith("SELECT") || statement.toUpperCase().trim().startsWith("SHOW");
};
