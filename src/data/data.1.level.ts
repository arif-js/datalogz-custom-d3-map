export const data = {
  name: "Documents",
  value: 50,
  children: [
    {
      name: "table 1",
      value: 87.3333333,
      state: "added",
      type: "table"
    },
    { name: "CommunityStructure", value: 30, type: "table" },
    { name: "Child 2", value: 8, type: "table" },
    {
      name: "Child 1",
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