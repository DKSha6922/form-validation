import JustValidate from "just-validate";
import {formatMyDate} from "./utils";
import { v4 as uuidv4 } from 'uuid';

const form = document.getElementById("form");

const validate = new JustValidate(form);

validate.addField(
  "#fname",
  [
    {
      rule: "required",
    },
    {
      rule: "minLength",
      value: 3,
    },
    {
      rule: "maxLength",
      value: 20,
    },
  ],

  {
    errorLabelCssClass: ["form-error"],
    errorFieldCssClass: ["form-error-field"],
    successLabelCssClass: ["form-success"],
    successFieldCssClass: ["form-error-success"],
  }
);

validate.addField(
  "#mail",
  [
    {
      rule: "required",
    },
    {
      rule: "email",
    },
  ],
  {
    errorLabelCssClass: ["form-error"],
    errorFieldCssClass: ["form-error-field"],
    successLabelCssClass: ["form-success"],
    successFieldCssClass: ["form-error-success"],
  }
);

validate.addField(
  "#cell",
  [
    {
      rule: "required",
    },
    {
      rule: "number",
    },
    {
      rule: "minLength",
      value: 10,
    },
    {
      rule: "maxLength",
      value: 13,
    },
  ],
  {
    errorLabelCssClass: ["form-error"],
    errorFieldCssClass: ["form-error-field"],
    successLabelCssClass: ["form-success"],
    successFieldCssClass: ["form-error-success"],
  }
);

validate.addField(
  "#date",
  [
    {
      rule: "required",
    },
  ],
  {
    errorLabelCssClass: ["form-error"],
    errorFieldCssClass: ["form-error-field"],
    successLabelCssClass: ["form-success"],
    successFieldCssClass: ["form-error-success"],
  }
);

validate.addField(
  "#address",
  [
    {
      rule: "required",
    },
  ],
  {
    errorLabelCssClass: ["form-error"],
    errorFieldCssClass: ["form-error-field"],
    successLabelCssClass: ["form-success"],
    successFieldCssClass: ["form-error-success"],
  }
);

validate.addField(
  "#agreements",
  [
    {
      rule: "required",
    },
  ],
  {
    errorLabelCssClass: ["form-error"],
  }
);

//get form values after submitting

validate.onSuccess(() => {
  let formData = new FormData(form);

 formData.append("id",uuidv4());

 formData.append("createAt", Date.now());

  let formDataValue = Object.fromEntries(formData.entries());

  let newDataArr = [];

  let getExisitingValues = JSON.parse(localStorage.getItem("datas"));
  if (getExisitingValues) {
    getExisitingValues.push(formDataValue);
    localStorage.setItem("datas", JSON.stringify(getExisitingValues));
  } else {
    newDataArr.push(formDataValue);
    localStorage.setItem("datas", JSON.stringify(newDataArr));
  }

  alert("Your Data SuccessFully Submitted");
  getAllData();
  form.reset();
});

function getAllData() {
  let courierData = localStorage.getItem("datas");
  let courierDataArr = JSON.parse(courierData);
  const dataCard = document.getElementById("courierCard");

  if (courierDataArr && courierDataArr.length > 0) {
    dataCard.classList.remove("hidden");

    const dataTable = document.getElementById("courierDataTable");

    dataTable.innerHTML = "";

    const newFinalValue = [];

    courierDataArr.map((courierData,index) => {
      let trEl = document.createElement("tr");
      let tdCustomerNoEl = document.createElement("td");
      let td1El = document.createElement("td");
      let td2El = document.createElement("td");
      let td3El = document.createElement("td");
      let td4El = document.createElement("td");
      let td5El = document.createElement("td");
      let td6El = document.createElement("td");
      let deleteBtnEl = document.createElement("button");

      tdCustomerNoEl.classList.add("p-1", "border");
      tdCustomerNoEl.textContent = index + 1;

      td1El.classList.add("p-1", "border");
      td1El.textContent = courierData.name;
      td2El.classList.add("p-1", "border");
      td2El.textContent = courierData.email;
      td3El.classList.add("p-1", "border");
      td3El.textContent = courierData["p-no"];
      td4El.classList.add("p-1", "border");
      td4El.textContent = formatMyDate(courierData.date);
      td5El.classList.add("p-1", "border");
      td5El.textContent = courierData.address;

      deleteBtnEl.className=
        "px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white  text-sm";

      deleteBtnEl.textContent = "Delete";
      
      deleteBtnEl.addEventListener("click", (e) => {
        deleteCourierRequest(courierData);
      });

      td6El.classList.add("px-2", "py-1", "border");

      td6El.append(deleteBtnEl);

      trEl.append(tdCustomerNoEl,td1El, td2El, td3El, td4El, td5El, td6El);

      newFinalValue.push(trEl);
    });

    newFinalValue.forEach((el) => dataTable.append(el));
    document.getElementById("courierCount").textContent = newFinalValue.length;
  }else{
    dataCard.classList.add("hidden");

    console.log("no value available on localStorage");
  }
}
function deleteCourierRequest(courierRequest){
    const confirmation =confirm(`Do you want to delete ${courierRequest["name"]} record?`    
);

if(confirmation){
    const existingCourierData = localStorage.getItem("datas");

    const courierDataObj = JSON.parse(existingCourierData);

    const otherRecords = courierDataObj.filter((courierReq)=> courierReq.id != courierRequest["id"]);

    localStorage.setItem("datas",JSON.stringify(otherRecords));

    getAllData();
}
}

getAllData();
