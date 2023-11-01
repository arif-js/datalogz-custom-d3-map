export const data = {
  name: "Documents test",
  sim_score: 0.578125,
  children: [
    {
      name: "table 1",
      sim_score: 0.25,
      state: "added",
      type: "table"
    },
    { name: "CommunityStructure", sim_score: 0.25, type: "table", state: "removed", },
    { name: "Child 2", sim_score: 0, type: "table", state: "modified" },
    {
      name: "Child 1",
      sim_score: 0.25,
      type: "table",
      state: "removed",
      children: [
        { name: "Child 1.1", sim_score: 0.25, type: "column", state: "removed", },
        { name: "Child 1.2", sim_score: 0.815, type: "column", state: "copied", },
        { name: "Child 1.3", sim_score: 0.815, type: "column", state: "copied", },
        {
          name: "Completion date",
          type: "column",
          state: "copied",
          data_type: "DateTime",
          sim_score: 1,
          column_type: "Data",
          expression: `
          Measure=
          SUMX(
          FILTER(
              Table,
              Table[Column] > 10
          ),
          Table[ValueColumn]
          )
          `
        }
      ],
    },
  ],
}