export const teamScreenMeta = {
  headerProps: {
    meta: {
      template: "TEAM MANAGEMENT",
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
      size: 10,
      color: '#999999'
    },
    action: {
      icon: "⚲",
      event: "onFilterPress"
    },
    backButton: false
  },

  components: [
    {
      type: "search",
      props: {
        placeholder: {
          title: "Search by name or role...",
          color: "#D0D0D0"
        },
        icon: {
          icon_name: "Search",
          size: 20,
          color: "#9c9a9a"
        }
      }
    },

    {
      type: "filterchips",
      props: {
        type: "status",
        options: [
          { label: "All", value: "ALL" },
          { label: "Valid", value: "VALID" },
          { label: "Expiring", value: "EXPIRING" },
          { label: "Expired", value: "EXPIRED" }
        ]
      }
    },

    {
      type: "card",
      scroll: true,
      event: "onCardPress",
      props: {
        title: {
          display: "name",
          size: 13,
          color: "#181818",
          weight: 700
        },
        subtitle: {
          display: "role",
          size: 9,
          color: "#0D5F7A",
          weight: 300
        },
        badge: {
          key: "status",
          colors: {
            VALID: "green",
            EXPIRING: "orange",
            EXPIRED: "red"
          }
        }
      }
    },

    {
      type: "fab",
      props: {
        icon: "+",
        size: 56,
        color: "#0D5F7A",
        event: "onAddPress"
      }
    }
  ]
};



export const newStaffMeta = { 
    headerProps: {
    meta: {
      template: "TEAM MANAGEMENT",
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
      size: 10,
      color: '#999999'
    },
    action: {
      icon: "⚲",
      event: "onFilterPress"
    },
    backButton: true
  },

  components: [
    {
      type: "form",
      name: "generalData",
      props: {
        title: "General Data",
        required: true,
        icon: "User",
        size: 15,
        color: "#1780A0",
        layout: "grid",
        columns: 2,

        components: [
          {
            type: "text",
            name: "fullname",
            label: "Full Name",
            span: 2
          },
          {
            type: "date",
            name: "dob",
            label: "Date of Birth"
          },
          {
            type: "text",
            name: "maNumber",
            label: "MA Number"
          }
        ]
      }
    },

    {
      type: "licenseUpload",
      name: "Competencies",
      props: {
        onPress: "onLicensePress",

        title: {
          name: "Competencies / License Upload",
          size: 16,
          color: "#181818",
          icon: {
            name: "Shield",
            size: 15,
            color: "#1780A0"
          }
        },

        required: {
          name: "required",
          display: false,
          color: "#B45309",
          size: 10
        },

        postuploadicons: {
          eye: {
            color: "#239EC4",
            backgroundcolor: "#D3F4FF",
            bordercolor: "#239EC4"
          },
          cancel: {
            color: "#A82828",
            backgroundcolor: "#F8EEEE",
            bordercolor: "#FF0000"
          }
        },

        data: {
          items: [
            "CMT",
            "MTTP",
            "Med Pass",
            "BGM",
            "Seizure Protocol"
          ],
          itemcolor: '#181818',
          descriptioncolor: "#0D5F7A",
          datecolor: '#999999'
        },

        dateMeta: {
          placeholder: "Select expiry date",
          placeholdercolor: '#999999',
          fontsize: 10,
          iconcolor: '#999999',
          iconsize: 10,
          bordercolor: '#999999'
        }
      }
    }
  ],

  submitButton: {
    label: "Save Staff Member",
    color: "#1780A0",
    textColor: "#FFFFFF",
    event: "CREATE_STAFF"
  }

};

 export const example = {
  components: [
    {
      type: "documentUpload",
      name: "documentUpload",
      props: {
        title: "Legal & Emergency",
        icon: "File",
        label: "Guardianship / SDM Document",
        required: true,
        container: {
          icon: "Image",
          description: "Guardianship or Substitute Decision Maker authorization document",
          title: "Upload SDM Document",
          buttonLabel: "Browse Files"
        },
        textbox:{
          name: "Emergency_Contact_Name",
          label: "Emergency Contact Name",
          placeholder: "Full Name",
          required: true,
          startAdornment: {
            icon_name: "User",
            size: 15,
            color: "#999999"
          }
        },
        phoneinput:{
          name: "Emergency_Contact_Phone",
          label: "Telephone Number",
          placeholder: "+1(555) 123-4567",
          required: true,
          startAdornment: {
            icon_name: "Phone",
            size: 15,
            color: "#999999"
          }
        }
      }
    },
    {
      
    }

  ]
}