import jwt_decode from "jwt-decode";

export function SaveDataToLocalStorage(data, lable) {
    let a = JSON.parse(localStorage.getItem("tempData")) || {};
    if (!a.hostInstitution) {
        a.hostInstitution = {
            id: '53c77c9c-8ce2-4367-a63b-7c3fff56ffae',
            name: 'John Snow Inc'
        }
    }
    if (!a.eventExpense){
        a.eventExpense = {
            venueProvided: false,
            refreshmentProvided: false,
            maskProvided: false,
            lodgingProvided: false,
            breakfastProvided: false,
            stationaryMaterialProvided: false,
            dinnerProvided: false,
            lunchProvided: false,
            nonJSITraineeTreatedAsJSI: 0,
            venueCost: 1500,
            stationaryCost: 50,
            refreshmentCost: 400,
            estimatedTransportCost: 0,
            covidEquipment: 900
        }
    }
    if (!a.JSIParticipantsCount) {
        a.JSIParticipantsCount = 0
    }
    if (!a.NonJSIAsTrainersCount) {
        a.NonJSIAsTrainersCount = 0
    }
    if (!a.regionalZoneExperts) {
        a.regionalZoneExperts = 0
    }
    if (!a.totalParticipantsCount) {
        a.totalParticipantsCount = 0
    }
    if (!a.totalTraineesCount) {
        a.totalTraineesCount = 0
    }
    if (!a.usgParticipantsCount) {
        a.usgParticipantsCount = 0
    }
    let decoded = undefined
    try {
        let token = sessionStorage.getItem("token");
        decoded = jwt_decode(token);
        if (!a.requester){
            a.requester = {
                id: localStorage.getItem("id") || "0",
                name: decoded && decoded.name,
                email: decoded && decoded.email
            }
        }
    } catch (e) {}

    if (lable === "eventExpense") {
        let eventExpense = a.eventExpense || {
            venueProvided: false,
            refreshmentProvided: false,
            maskProvided: false,
            lodgingProvided: false,
            breakfastProvided: false,
            stationaryMaterialProvided: false,
            dinnerProvided: false,
            lunchProvided: false,
            nonJSITraineeTreatedAsJSI: 0,
            venueCost: 1500,
            stationaryCost: 50,
            refreshmentCost: 400,
            estimatedTransportCost: 0,
            covidEquipment: 900
        }
        if (data.type === "numberOf") {
            eventExpense.nonJSITraineeTreatedAsJSI = parseInt(data.value)
        } else if(data.type === "cost"){
            eventExpense[data.name] = data.value
        }else {
            if (data.name.toLowerCase() === 'stationarymaterials'){
                eventExpense.stationaryMaterialProvided = data.value
            }else {
                eventExpense[data.name.toLowerCase() + "Provided"] = data.value
            }
        }
        a.eventExpense = eventExpense
    } else if (lable === "perDiem") {
        let perDiem = a.perdiem || {
            standardPerdiem: false,
            trainer: {
                "breakfast": "NO",
                "lunch": "NO",
                "dinner": "NO",
                "travelAir": "NO",
                "travelLocalTransport": "NO",
                "lodging": "NO",
                "incidentals": "NO"
            },
            trainee: {
                "breakfast": "NO",
                "lunch": "NO",
                "dinner": "NO",
                "travelAir": "NO",
                "travelLocalTransport": "NO",
                "lodging": "NO",
                "incidentals": "NO"
            },
        }
        perDiem.standardPerdiem = data
        a.perdiem = perDiem
    } else if (lable === "standardPerDiem") {
        let perdiem = a.perdiem || {
            standardPerdiem: false,
            trainer: {
                "breakfast": "NO",
                "lunch": "NO",
                "dinner": "NO",
                "travelAir": "NO",
                "travelLocalTransport": "NO",
                "lodging": "NO",
                "incidentals": "NO"
            },
            trainee: {
                "breakfast": "NO",
                "lunch": "NO",
                "dinner": "NO",
                "travelAir": "NO",
                "travelLocalTransport": "NO",
                "lodging": "NO",
                "incidentals": "NO"
            },
        }
        if (data.type === "Trainees") {
            perdiem.trainee[data.name] = data.value.toUpperCase() === "NOT PROVIDED/NOT REIMBURSABLE" ? "NO" : data.value.toUpperCase()
        } else {
            perdiem.trainer[data.name] = data.value.toUpperCase() === "NOT PROVIDED/NOT REIMBURSABLE" ? "NO" : data.value.toUpperCase()
        }
        a.perdiem = perdiem
    } else if (lable === "nonStandardPerDiem") {
        let nonStandardPerDiem = a.nonStandardPerDiem || []
        nonStandardPerDiem.push(data)
        a.nonStandardPerDiem = nonStandardPerDiem
    } else {
        a[lable] = data
    }
    localStorage.setItem("tempData", JSON.stringify(a));
}


export function decoded() {
    let token = sessionStorage.getItem("token");
    let decoded = undefined
    try {
        decoded = jwt_decode(token);
    } catch (e) {
    }
    return decoded;
}

export function clearStorage(name) {
    localStorage.removeItem(name)
}


export default function removeItemOnce(arr, value) {
    let index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
    localStorage.setItem("invalidFields", arr)
    return arr;
}
