export const teamScreenMeta = [
  {
    type: "search",
    props: {
      placeholder: "Search...",
    },
  },
  {
    type: "filterchips",
    props: {
      options: [
        { label: "All", value: "ALL" },
        { label: "Valid", value: "VALID" },
        { label: "Expired", value: "EXPIRED" },
      ],
    },
  },
  {
    type: "card",
    dataSource: "filteredData",
    props: {
      title: "name",
      subtitle: "role",
      badge: {                     // ✅ ADD THIS
        key: "status",
        colors: {
          VALID: "green",
          EXPIRED: "red",
        },
      },
    },
  },
];