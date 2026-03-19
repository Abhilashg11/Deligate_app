export const layout = {
  bottomNavBar: {
    activeColor: "#239EC4",
    inactiveColor: "#D0D0D0",
    iconSize: 22,

    tabs: [
      {
        name: "Home",
        component: "HomeStack",
        icon: "House",
      },
      {
        name: "Patients",
        component: "PatientStack",
        icon: "UserPlus",
      },
      {
        name: "Teams",
        component: "TeamStack",
        icon: "Users",
      },
      {
        name: "Task",
        component: "TaskStack",
        icon: "ClipboardList",
      },
      {
        name: "Profile",
        component: "ProfileStack",
        icon: "UserPen",
      },
    ],
  },
};