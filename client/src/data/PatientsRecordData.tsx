const PatientsRecordData = [
    {
        id: 0,
        name: 'Jean Tremblay',
        diagnosis: "Trauma Crânien",
        age : "2a 2m 10j",
        weight: 10.400,
        numberOfStayDays: 3,
        scanType: "CT scan",
        affectedSystems: ["Brain"],
    },
    {
        id: 1,
        name: "Philippe Roy",
        diagnosis: "Trauma Crânien",
        age : "4a 4m 12j",
        weight: 12.300,
        numberOfStayDays: 3,
        scanType: "CT scan",
        affectedSystems: ["Lungs", "Kidney"],
    },
    {
        id: 2,
        name: "Alexa Girard",
        diagnosis: "Pneumonie",
        age : "5a 3m 28j",
        weight: 23,
        numberOfStayDays: 18,
        scanType: "CT scan",
        affectedSystems: ["Brain", "Kidney"],

    },
    // {
    //     id: 3,
    //     name: "Gaston Parré",
    //     age : 3,
    //     weight: 23,
    //     numberOfStayDays: 18,
    //     diagnosis: "Pneumonie",
    //     scanType: "CT scan",
    // },
    // {
    //     id: 4,
    //     name: "Catherine Larouche",
    //     // TODO Age interface ans/mois/jours formattage service
    //     age : 1,
    //     weight: 4,
    //     numberOfStayDays: 18,
    //     diagnosis: "Pneumonie",
    //     // TODO set of Scan types
    //     scanType: "CT scan",
    //     // TODO set of Syste
    // },
];

export default PatientsRecordData;