export const data = {
  "id": "ed743b23-9de8-4727-9d4d-f2ddbaed97ac",
  "duplicate_dataset_id": "fd0435ff-b7dd-4917-a453-7d453f79f4c4",
  "name": "Air Traffic Analysis",
  "type": "dataset",
  "sim_score": 0.578,
  "children": [
      {
          "name": "ABX Air",
          "type": "table",
          "state": "removed",
          "children": [
              {
                  "name": "ABX Air",
                  "type": "column",
                  "state": "removed",
                  "data_type": "String",
                  "sim_score": 0.25,
                  "expression": null,
                  "column_type": "Data",
                  "count_children": 0
              }
          ],
          "sim_score": 0.25,
          "count_children": 1
      },
      {
          "name": "Air_Traffic_Passenger_Statistics",
          "type": "table",
          "state": "copied",
          "children": [
              {
                  "name": "Activity Period",
                  "type": "column",
                  "state": "copied",
                  "data_type": "Int64",
                  "sim_score": 1,
                  "expression": null,
                  "column_type": "Data",
                  "count_children": 0
              },
              {
                  "name": "Activity Type Code",
                  "type": "column",
                  "state": "copied",
                  "data_type": "String",
                  "sim_score": 1,
                  "expression": null,
                  "column_type": "Data",
                  "count_children": 0
              },
              {
                  "name": "Boarding Area",
                  "type": "column",
                  "state": "added",
                  "data_type": "String",
                  "sim_score": 0.25,
                  "expression": null,
                  "column_type": "Data",
                  "count_children": 0
              },
              {
                  "name": "Date",
                  "type": "column",
                  "state": "copied",
                  "data_type": "String",
                  "sim_score": 1,
                  "expression": "DATE(Air_Traffic_Passenger_Statistics[Year],Air_Traffic_Passenger_Statistics[Month],1)",
                  "column_type": "Calculated",
                  "count_children": 0
              },
              {
                  "name": "GEO Region",
                  "type": "column",
                  "state": "copied",
                  "data_type": "String",
                  "sim_score": 1,
                  "expression": null,
                  "column_type": "Data",
                  "count_children": 0
              },
              {
                  "name": "GEO Summary",
                  "type": "column",
                  "state": "copied",
                  "data_type": "String",
                  "sim_score": 1,
                  "expression": null,
                  "column_type": "Data",
                  "count_children": 0
              },
              {
                  "name": "Month",
                  "type": "column",
                  "state": "copied",
                  "data_type": "Int64",
                  "sim_score": 1,
                  "expression": null,
                  "column_type": "Data",
                  "count_children": 0
              },
              {
                  "name": "Month Year",
                  "type": "column",
                  "state": "copied",
                  "data_type": "String",
                  "sim_score": 1,
                  "expression": "FORMAT(Air_Traffic_Passenger_Statistics[Date],\"MMM yyyy\")",
                  "column_type": "Calculated",
                  "count_children": 0
              },
              {
                  "name": "Operating Airline",
                  "type": "column",
                  "state": "copied",
                  "data_type": "String",
                  "sim_score": 1,
                  "expression": null,
                  "column_type": "Data",
                  "count_children": 0
              },
              {
                  "name": "Operating Airline IATA Code",
                  "type": "column",
                  "state": "copied",
                  "data_type": "String",
                  "sim_score": 1,
                  "expression": null,
                  "column_type": "Data",
                  "count_children": 0
              },
              {
                  "name": "Passenger Count",
                  "type": "column",
                  "state": "added",
                  "data_type": "Int64",
                  "sim_score": 0.25,
                  "expression": null,
                  "column_type": "Data",
                  "count_children": 0
              },
              {
                  "name": "Price Category Code",
                  "type": "column",
                  "state": "added",
                  "data_type": "String",
                  "sim_score": 0.25,
                  "expression": null,
                  "column_type": "Data",
                  "count_children": 0
              },
              {
                  "name": "Published Airline",
                  "type": "column",
                  "state": "copied",
                  "data_type": "String",
                  "sim_score": 1,
                  "expression": null,
                  "column_type": "Data",
                  "count_children": 0
              },
              {
                  "name": "Published Airline IATA Code",
                  "type": "column",
                  "state": "copied",
                  "data_type": "String",
                  "sim_score": 1,
                  "expression": null,
                  "column_type": "Data",
                  "count_children": 0
              },
              {
                  "name": "Terminal",
                  "type": "column",
                  "state": "added",
                  "data_type": "String",
                  "sim_score": 0.25,
                  "expression": null,
                  "column_type": "Data",
                  "count_children": 0
              },
              {
                  "name": "Year",
                  "type": "column",
                  "state": "copied",
                  "data_type": "Int64",
                  "sim_score": 1,
                  "expression": null,
                  "column_type": "Data",
                  "count_children": 0
              }
          ],
          "sim_score": 0.8125,
          "count_children": 16
      },
      {
          "name": "Geo Region",
          "type": "table",
          "state": "copied",
          "children": [
              {
                  "name": "GEO Region",
                  "type": "column",
                  "state": "copied",
                  "data_type": "String",
                  "sim_score": 1,
                  "expression": null,
                  "column_type": "Data",
                  "count_children": 0
              }
          ],
          "sim_score": 1.0,
          "count_children": 1
      },
      {
          "name": "Operating Airline",
          "type": "table",
          "state": "added",
          "children": [
              {
                  "name": "Operating Airline",
                  "type": "column",
                  "state": "added",
                  "data_type": "String",
                  "sim_score": 0.25,
                  "expression": null,
                  "column_type": "Data",
                  "count_children": 0
              }
          ],
          "sim_score": 0.25,
          "count_children": 1
      }
  ],
  "count_children": 4,
  "data": {
      "id": "fd0435ff-b7dd-4917-a453-7d453f79f4c4",
      "name": "Air Traffic Cargo Analysis",
      "type": "dataset",
      "children": [
          {
              "name": "ABX Air",
              "type": "table",
              "state": "removed",
              "children": [
                  {
                      "name": "ABX Air",
                      "type": "column",
                      "state": "removed",
                      "data_type": "String",
                      "sim_score": 0.25,
                      "expression": null,
                      "column_type": "Data",
                      "count_children": 0
                  }
              ],
              "sim_score": 0.25,
              "count_children": 1
          },
          {
              "name": "Air_Traffic_Passenger_Statistics",
              "type": "table",
              "state": "copied",
              "children": [
                  {
                      "name": "Activity Period",
                      "type": "column",
                      "state": "copied",
                      "data_type": "Int64",
                      "sim_score": 1,
                      "expression": null,
                      "column_type": "Data",
                      "count_children": 0
                  },
                  {
                      "name": "Activity Type Code",
                      "type": "column",
                      "state": "copied",
                      "data_type": "String",
                      "sim_score": 1,
                      "expression": null,
                      "column_type": "Data",
                      "count_children": 0
                  },
                  {
                      "name": "Boarding Area",
                      "type": "column",
                      "state": "added",
                      "data_type": "String",
                      "sim_score": 0.25,
                      "expression": null,
                      "column_type": "Data",
                      "count_children": 0
                  },
                  {
                      "name": "Date",
                      "type": "column",
                      "state": "copied",
                      "data_type": "String",
                      "sim_score": 1,
                      "expression": "DATE(Air_Traffic_Passenger_Statistics[Year],Air_Traffic_Passenger_Statistics[Month],1)",
                      "column_type": "Calculated",
                      "count_children": 0
                  },
                  {
                      "name": "GEO Region",
                      "type": "column",
                      "state": "copied",
                      "data_type": "String",
                      "sim_score": 1,
                      "expression": null,
                      "column_type": "Data",
                      "count_children": 0
                  },
                  {
                      "name": "GEO Summary",
                      "type": "column",
                      "state": "copied",
                      "data_type": "String",
                      "sim_score": 1,
                      "expression": null,
                      "column_type": "Data",
                      "count_children": 0
                  },
                  {
                      "name": "Month",
                      "type": "column",
                      "state": "copied",
                      "data_type": "Int64",
                      "sim_score": 1,
                      "expression": null,
                      "column_type": "Data",
                      "count_children": 0
                  },
                  {
                      "name": "Month Year",
                      "type": "column",
                      "state": "copied",
                      "data_type": "String",
                      "sim_score": 1,
                      "expression": "FORMAT(Air_Traffic_Passenger_Statistics[Date],\"MMM yyyy\")",
                      "column_type": "Calculated",
                      "count_children": 0
                  },
                  {
                      "name": "Operating Airline",
                      "type": "column",
                      "state": "copied",
                      "data_type": "String",
                      "sim_score": 1,
                      "expression": null,
                      "column_type": "Data",
                      "count_children": 0
                  },
                  {
                      "name": "Operating Airline IATA Code",
                      "type": "column",
                      "state": "copied",
                      "data_type": "String",
                      "sim_score": 1,
                      "expression": null,
                      "column_type": "Data",
                      "count_children": 0
                  },
                  {
                      "name": "Passenger Count",
                      "type": "column",
                      "state": "added",
                      "data_type": "Int64",
                      "sim_score": 0.25,
                      "expression": null,
                      "column_type": "Data",
                      "count_children": 0
                  },
                  {
                      "name": "Price Category Code",
                      "type": "column",
                      "state": "added",
                      "data_type": "String",
                      "sim_score": 0.25,
                      "expression": null,
                      "column_type": "Data",
                      "count_children": 0
                  },
                  {
                      "name": "Published Airline",
                      "type": "column",
                      "state": "copied",
                      "data_type": "String",
                      "sim_score": 1,
                      "expression": null,
                      "column_type": "Data",
                      "count_children": 0
                  },
                  {
                      "name": "Published Airline IATA Code",
                      "type": "column",
                      "state": "copied",
                      "data_type": "String",
                      "sim_score": 1,
                      "expression": null,
                      "column_type": "Data",
                      "count_children": 0
                  },
                  {
                      "name": "Terminal",
                      "type": "column",
                      "state": "added",
                      "data_type": "String",
                      "sim_score": 0.25,
                      "expression": null,
                      "column_type": "Data",
                      "count_children": 0
                  },
                  {
                      "name": "Year",
                      "type": "column",
                      "state": "copied",
                      "data_type": "Int64",
                      "sim_score": 1,
                      "expression": null,
                      "column_type": "Data",
                      "count_children": 0
                  }
              ],
              "sim_score": 0.8125,
              "count_children": 16
          },
          {
              "name": "Geo Region",
              "type": "table",
              "state": "copied",
              "children": [
                  {
                      "name": "GEO Region",
                      "type": "column",
                      "state": "copied",
                      "data_type": "String",
                      "sim_score": 1,
                      "expression": null,
                      "column_type": "Data",
                      "count_children": 0
                  }
              ],
              "sim_score": 1.0,
              "count_children": 1
          },
          {
              "name": "Operating Airline",
              "type": "table",
              "state": "added",
              "children": [
                  {
                      "name": "Operating Airline",
                      "type": "column",
                      "state": "added",
                      "data_type": "String",
                      "sim_score": 0.25,
                      "expression": null,
                      "column_type": "Data",
                      "count_children": 0
                  }
              ],
              "sim_score": 0.25,
              "count_children": 1
          }
      ],
      "sim_score": 0.578125,
      "count_children": 4
  }
}