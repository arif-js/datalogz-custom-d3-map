export const data = {
  name: "Any Doc",
  value: 50,
  children: [
    {
      name: "arif test",
      value: 78.3333333,
      state: "added",
      type: "table"
    },
    { name: "heme test", value: 78, type: "table" },
    { name: "ron test", value: 18, type: "table" },
    {
      name: "hello 1",
      value: 20.5,
      type: "table",
      state: "removed",
      children: [
        { name: "Child 1.1", value: 10, type: "column" },
        { name: "Child 1.2", value: 45, type: "column" },
        { name: "Child 1.3", value: 2, type: "column" },
        { name: "Child 1.4", value: 23, type: "column" },
      ],
    },
  ],
}