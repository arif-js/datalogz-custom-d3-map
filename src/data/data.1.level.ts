export const data = {
  name: "Documents test",
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
        { name: "Child 1.1sdf sdfsf sdf", value: 10, type: "column" },
        { name: "Child 1.2", value: 45, type: "column" },
        { name: "Child 1.3", value: 2, type: "column" },
        {
          name: "Completion date",
          type: "column",
          state: "copied",
          data_type: "DateTime",
          value: 20,
          expression: null,
          column_type: "Data"
        }
      ],
    },
  ],
}