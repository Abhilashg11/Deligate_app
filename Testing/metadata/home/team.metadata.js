export const teamScreenMeta = [
  {
  type: "header",
  props: {
    meta: {
      template:"TEAM MANAGEMENT",
      size: 12,
      color: '#239EC4'
    },
    title: {
      template: "DSP / CMT Staff List",
      size: 20,
      color: '#000000'
    },
    subtitle: {
      template: "{total} members - {expiring} expiring soon",
      size: 8,
      color: '#999999'
    },
    action: {
      icon: "⚲",
      event: "onFilterPress"
    },
    backButton: false
  }
},
  {
    type: "search",          // Component Type
    props: {
      placeholder: {
        title: "Search by name or role...",
        color: "#D0D0D0"
      },
      icon:{
        icon_name:"Search",
        size: 20,
        color:"#9c9a9a"
      }
    },
  },
{
  type: "filterchips",
  props: {
    type: "status",
    options: [
      { label: "All", value: "ALL" },
      { label: "Valid", value: "VALID" },
      { label: "Expiring", value: "EXPIRING" },
      { label: "Expired", value: "EXPIRED" },
    ],
  },
},
,
  {
    type: "card",
    scroll: true,
    dataSource: "filteredData",   // 👈 DATA COMES FROM PIPELINE
    event: "onCardPress", 
    props: {
      // title: "name",
      title:{
        display:"name",
          size: 13,
          color: "#181818",
          weight: 700
        
      },           // 👈 Explicit, stable naming
      subtitle: {
        display:"role",
        size: 9,
        color: "#0D5F7A",
        weight: 300
      },

      badge: {
        key: "status",
        colors: {
          VALID: "green",
          EXPIRING: "orange",
          EXPIRED: "red",
        },
        
      },
    },
  },
  {
  type: "fab",
  position: "bottom-right",
  props: {
    icon: "+",
    size: 56,
    color: "#0D5F7A",
    event: "onAddPress"
  }
}
];

export const newStaffMeta = () => [
  {
  type: "header",
  props: {
    meta: {
      template:"TEAM MANAGEMENT",
      size: 12,
      color: '#239EC4'
    },
    title: {
      template: "Add New DSP/CMT",
      size: 20,
      color: '#000000'
    },
    subtitle: {
      template: "Fill in general info and upload competency licenses",
      size: 8,
      color: '#999999'
    },
    action: {
      icon: "⚲",
      event: "onFilterPress"
    },
    backButton: true
  }
  }
]