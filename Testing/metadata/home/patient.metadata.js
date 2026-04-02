export const newPatientMeta = {
  steps: [
    {
      headerProps: {
        meta: {
          template: '-- PATIENT INTAKE WIZARD',
          size: 12,
          color: '#239EC4',
        },
        title: {
          template: 'Demographics & Legal Status',
          size: 20,
          color: '#000000',
        },
        subtitle: {
          template: 'Fill in general info and upload competency licenses',
          size: 10,
          color: '#999999',
        },
        action: {
          icon: '⚲',
          event: 'onFilterPress',
        },
        backButton: true,
      },
      components: [
        {
          type: 'form',
          name: 'PersonalInfo',
          props: {
            title: 'Personal Information',
            required: false,
            icon: 'User',
            size: 15,
            color: '#1780A0',
            layout: 'grid',
            columns: 2,

            components: [
              {
                type: 'text',
                name: 'fullname',
                label: 'Full Name',
                required: false,
                span: 2,
              },
              {
                type: 'date',
                name: 'dob',
                label: 'Date of Birth',
                required: false,
              },
              {
                type: 'text',
                name: 'maNumber',
                label: 'MA Number',
                required: false,
              },
            ],
          },
        },
        {
          type: 'documentUpload',
          name: 'documentUpload',
          props: {
            title: 'Legal & Emergency',
            icon: 'File',
            label: 'Guardianship / SDM Document',
            required: false,
            container: {
              icon: 'Image',
              description:
                'Guardianship or Substitute Decision Maker authorization document',
              title: 'Upload SDM Document',
              buttonLabel: 'Browse Files',
            },
            textbox: {
              name: 'Emergency_Contact_Name',
              label: 'Emergency Contact Name',
              placeholder: 'Full Name',
              required: false,
              startAdornment: {
                icon_name: 'User',
                size: 15,
                color: '#999999',
              },
            },
            phoneinput: {
              name: 'Emergency_Contact_Phone',
              label: 'Telephone Number',
              placeholder: '+1(555) 123-4567',
              required: false,
              startAdornment: {
                icon_name: 'Phone',
                size: 15,
                color: '#999999',
              },
            },
          },
        },
      ],
    },
    {
         headerProps: {
        meta: {
          template: '-- PATIENT INTAKE WIZARD',
          size: 12,
          color: '#239EC4',
        },
        title: {
          template: 'DDA & Waiver Documentation',
          size: 20,
          color: '#000000',
        },
        subtitle: {
          template: 'Fill in general info and upload competency licenses',
          size: 10,
          color: '#999999',
        },
        action: {
          icon: '⚲',
          event: 'onFilterPress',
        },
        backButton: true,
      },
       components: [
        {
          type: 'form',
          name: 'Approved_waiver_services',
          props: {
            title: 'Approved Waiver Services',
            required: false,
            icon: 'User',
            size: 15,
            color: '#1780A0',
            layout: 'grid',
            columns: 2,

            components: [
              {
                type: 'text',
                name: 'PCP',
                label: 'PCP (Primary Care Provider)',
                placeholder: "+1(555) 123-4567",
                required: false,
                startAdornment: {
                    icon_name: 'Phone',
                size: 15,
                color: '#999999',
                },
                span: 2,
              },
               {
                type: 'text',
                name: 'Approval_Number',
                label: 'Approval Number',
                placeholder: "APR-000000",
                required: false,
                 startAdornment: {
                    icon_name: 'Lock',
                size: 15,
                color: '#999999',
                },
                span: 2,
              },
              {
                type: 'dropdown',
                name: 'dropdown',
                label: 'Date of Birth',
                options: [
    { label: 'Option 1', value: 'Option 1' },
    { label: 'Option 2', value: 'Option 2' },
    { label: 'Option 3', value: 'Option 3' },
    { label: 'Option 4', value: 'Option 4' },
    { label: 'Option 5', value: 'Option 5' },
    { label: 'Option 6', value: 'Option 6' }
  ]
              },
              {
                type: 'text',
                name: 'maNumber',
                label: 'MA Number',
              },
            ],
          },
        },
       {
  type: "lontool",
  name: "riskLevel",
  props: {
    title: "LON / Risk Tool",
    label: "Level of Need — select one",
    required: true,
    options: ["Low", "Medium", "High"]
  }
},
      ],

    },
    {
        headerProps: {
             meta: {
          template: '-- PATIENT INTAKE WIZARD',
          size: 12,
          color: '#239EC4',
        },
        title: {
          template: 'Medical & Behavioral Profile',
          size: 20,
          color: '#000000',
        },
        subtitle: {
          template: 'Diagnosis, medications & risk',
          size: 10,
          color: '#999999',
        },
        action: {
          icon: '⚲',
          event: 'onFilterPress',
        },
        backButton: true,
        },
        components: [

        ]
    },
  ],
};
