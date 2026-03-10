export const homeForm = {
  type: 'screen',
  form: true,

  cards: [
    {
      id: 'patientInfo',
      title: 'Patient Information',
      layout: 'card',
      style: {
        backgroundColor: '#9275ac',
        borderColor: '#110b0b',
      },
      sections: [
        {
          id: 'contact',
          layout: 'grid',
          columns: 2,
          gap: 12,
          fields: [
            {
              type: 'text',
              name: 'first_name',
              label: 'First Name',
              required: true,
              span: 1,
              fieldError:{
                message: "First name is required",
              }
            },
            {
              type: 'text',
              name: 'last_name',
              label: 'Last Name',
              required: true,
              span: 1,
              fieldError:{
                message: "Last name is required",
              }
            },
            {
              type: 'email',
              name: 'email',
              label: 'Email',
              required: true,
              span: 1,
              fieldError:{
                message: "Email is required",
              }
            },
            {
              type: 'text',
              name: 'middle_name',
              label: 'Middle Name',
              required: false,
              span: 2,
              
              fieldError:{
                message: "Middle name is required",
              }
            },
            {
              type: 'date',
              name: 'dob',
              label: 'Date of Birth',
              required: false,
              span: 2,
              fieldError:{
                message: "Date of Birth is required",
              }
            },
            {
              type: 'phone',
              name: 'phone',
              label: 'Phone Number',
              required: false,
              span: 2,              
              fieldError:{
                message: "Enter a valid 10 digit phone number",
              }
            },
            {
              type: 'text',
              name: 'gender',
              label: 'Gender',
              required: false,
              span: 2,
              fieldError:{
                message: "Gender is required",
              }
            },
          ],
        },
      ],
    },
    //  {
    //   id: "NurseInfo",
    //   title: "Nurse Information",
    //   layout: "card",
    //   style: {
    //     backgroundColor: "#9275ac",
    //     borderColor: "#110b0b",
    //   },
    //   sections: [
    //     {
    //       id: "contact",
    //       layout: "grid",
    //       columns: 2,
    //       gap: 12,
    //       fields: [
    //         { type: "text", name: "first_name", label: "First Name", required: true, span: 1 },
    //         { type: "text", name: "last_name", label: "Last Name", required: true, span: 1 },
    //         // { type: "email", name: "email", label: "Email", required: true, span: 1 },
    //         // { type: "phone", name: "phone", label: "Phone", required: false, span: 2 },
    //       ],
    //     },
    //   ],
    // },
  ],

  actions: [
    {
      type: 'submit',
      label: 'Create Patient',
      variant: 'primary',
      position: 'floating',
      roles: ['admin', 'nurse'],
    },
  ],
   submit: {
    service: "createPatient",
    sync: true
  },
};
